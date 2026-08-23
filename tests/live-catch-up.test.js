const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

class FakeCustomEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.detail = options.detail;
  }
}

function createDocument(player = null) {
  const listeners = new Map();
  return {
    addEventListener(type, listener) {
      const group = listeners.get(type) || [];
      group.push(listener);
      listeners.set(type, group);
    },
    dispatchEvent(event) {
      for (const listener of listeners.get(event.type) || []) listener(event);
      return true;
    },
    getElementById(id) {
      return id === "movie_player" ? player : null;
    },
    querySelector() {
      return null;
    },
  };
}

function loadContentContext() {
  const document = createDocument();
  const context = vm.createContext({
    chrome: {
      runtime: { onMessage: { addListener() {} } },
      storage: {
        onChanged: { addListener() {} },
        sync: { get: () => ({ then() {} }), set() {} },
      },
    },
    console,
    CustomEvent: FakeCustomEvent,
    document,
    isFinite,
    location: { pathname: "/watch" },
    MutationObserver: class {},
    URL,
    window: {},
  });
  const source = fs.readFileSync(
    path.join(root, "youtube-speed-booster", "content.js"),
    "utf8",
  );
  vm.runInContext(source, context, { filename: "content.js" });
  return context;
}

test("MAIN-world bridge reports YouTube live-head state", () => {
  const player = {
    getProgressState: () => ({
      isAtLiveHead: true,
      current: 120.25,
      seekableEnd: 125.75,
    }),
    getVideoData: () => ({ isLive: true }),
    getPlayerResponse: () => ({ videoDetails: { isLiveContent: true } }),
    getStatsForNerds: () => ({ live_latency_secs: "1.25" }),
  };
  const document = createDocument(player);
  const context = vm.createContext({ CustomEvent: FakeCustomEvent, document });
  const source = fs.readFileSync(
    path.join(root, "youtube-speed-booster", "main-world.js"),
    "utf8",
  );
  vm.runInContext(source, context, { filename: "main-world.js" });

  let state = null;
  document.addEventListener("ysb-player-state", (event) => {
    state = event.detail;
  });
  document.dispatchEvent(
    new FakeCustomEvent("ysb-player-cmd", {
      detail: { cmd: "getPlayerState" },
    }),
  );

  assert.deepEqual(JSON.parse(JSON.stringify(state)), {
    isLive: true,
    hasLiveHead: true,
    isAtLiveHead: true,
    progress: {
      current: 120.25,
      seekableEnd: 125.75,
    },
  });
});

test("MAIN-world bridge treats a finished stream recording as VOD", () => {
  const player = {
    getProgressState: () => ({
      isAtLiveHead: false,
      current: 600,
      seekableEnd: 3600,
    }),
    getVideoData: () => ({ isLive: false, isLiveContent: true }),
    getPlayerResponse: () => ({ videoDetails: { isLiveContent: true } }),
    getStatsForNerds: () => ({}),
  };
  const document = createDocument(player);
  const context = vm.createContext({ CustomEvent: FakeCustomEvent, document });
  const source = fs.readFileSync(
    path.join(root, "youtube-speed-booster", "main-world.js"),
    "utf8",
  );
  vm.runInContext(source, context, { filename: "main-world.js" });

  let state = null;
  document.addEventListener("ysb-player-state", (event) => {
    state = event.detail;
  });
  document.dispatchEvent(
    new FakeCustomEvent("ysb-player-cmd", {
      detail: { cmd: "getPlayerState" },
    }),
  );

  assert.equal(state.isLive, false);
  assert.equal(state.hasLiveHead, true);
  assert.equal(state.isAtLiveHead, false);
  assert.equal(state.progress.current, 600);
  assert.equal(state.progress.seekableEnd, 3600);
});

test("DVR delay uses MAIN-world progress, formats and clamps safely", () => {
  const context = loadContentContext();
  vm.runInContext(`
    const bridgeState = {
      isLive: true,
      hasLiveHead: true,
      isAtLiveHead: false,
      progress: { current: 120.4, seekableEnd: 392.6 },
    };
    globalThis.bridgeDelay = getLiveDelaySeconds(null, bridgeState);
    globalThis.bridgeText = formatLiveDelay(globalThis.bridgeDelay);

    const fallbackVideo = {
      currentTime: 45,
      seekable: { length: 1, end: () => 75.4 },
    };
    globalThis.fallbackDelay = getLiveDelaySeconds(fallbackVideo, null);
    globalThis.clampedDelay = getLiveDelaySeconds(null, {
      progress: { current: 101, seekableEnd: 100 },
    });
    globalThis.atHeadDelay = getLiveDelaySeconds(null, {
      hasLiveHead: true,
      isAtLiveHead: true,
      progress: null,
    });
    globalThis.invalidDelay = getLiveDelaySeconds(null, {
      progress: { current: NaN, seekableEnd: 100 },
    });
  `, context);

  assert.ok(Math.abs(context.bridgeDelay - 272.2) < 1e-9);
  assert.equal(context.bridgeText, "−4:32");
  assert.ok(Math.abs(context.fallbackDelay - 30.4) < 1e-9);
  assert.equal(context.clampedDelay, 0);
  assert.equal(context.atHeadDelay, 0);
  assert.equal(context.invalidDelay, null);
});

test("live edge blocks reapply immediately and resets to 1x after 500ms", () => {
  const context = loadContentContext();
  vm.runInContext(`
    currentSpeed = 2;
    let testNow = 1000;
    Date.now = () => testNow;
    const appliedSpeeds = [];
    applySpeed = (speed) => { currentSpeed = speed; appliedSpeeds.push(speed); };
    showActionBezel = () => {};
    isLiveStream = () => true;
    const testVideo = { playbackRate: 2, readyState: 4 };
    const atHead = { isLive: true, hasLiveHead: true, isAtLiveHead: true };

    globalThis.firstResult = adoptLiveCatchUpReset(testVideo, atHead);
    globalThis.rapidResult = adoptLiveCatchUpReset(testVideo, atHead);
    globalThis.beforeConfirm = [...appliedSpeeds];
    testNow = 1500;
    globalThis.confirmedResult = adoptLiveCatchUpReset(testVideo, atHead);
    globalThis.afterConfirm = [...appliedSpeeds];
  `, context);

  assert.equal(context.firstResult, true);
  assert.equal(context.rapidResult, true);
  assert.deepEqual(Array.from(context.beforeConfirm), []);
  assert.equal(context.confirmedResult, true);
  assert.deepEqual(Array.from(context.afterConfirm), [1]);
});

test("DVR playback and a new video clear pending live-edge confirmation", () => {
  const context = loadContentContext();
  vm.runInContext(`
    currentSpeed = 2;
    let testNow2 = 2000;
    Date.now = () => testNow2;
    const appliedSpeeds2 = [];
    applySpeed = (speed) => { currentSpeed = speed; appliedSpeeds2.push(speed); };
    showActionBezel = () => {};
    isLiveStream = () => true;
    const videoA = { playbackRate: 2, readyState: 4 };
    const videoB = { playbackRate: 2, readyState: 4 };
    const atHead2 = { isLive: true, hasLiveHead: true, isAtLiveHead: true };
    const behind = { isLive: true, hasLiveHead: true, isAtLiveHead: false };

    adoptLiveCatchUpReset(videoA, atHead2);
    testNow2 = 2400;
    globalThis.behindResult = adoptLiveCatchUpReset(videoA, behind);
    testNow2 = 2600;
    adoptLiveCatchUpReset(videoA, atHead2);
    testNow2 = 3000;
    adoptLiveCatchUpReset(videoB, atHead2);
    testNow2 = 3100;
    adoptLiveCatchUpReset(videoB, atHead2);
    globalThis.switchApplied = [...appliedSpeeds2];
  `, context);

  assert.equal(context.behindResult, false);
  assert.deepEqual(Array.from(context.switchApplied), []);
});
