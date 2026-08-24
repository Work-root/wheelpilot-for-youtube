const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..", "youtube-speed-booster");
const html = fs.readFileSync(path.join(root, "popup.html"), "utf8");
const css = fs.readFileSync(path.join(root, "popup.css"), "utf8");
const popup = fs.readFileSync(path.join(root, "popup.js"), "utf8");
const content = fs.readFileSync(path.join(root, "content.js"), "utf8");

test("popup offers a one-time tour and keeps a replay entry point", () => {
  assert.match(html, /id="onboardingPrompt"[^>]*\shidden/);
  assert.match(html, /id="onboardingStartButton"/);
  assert.match(html, /id="onboardingDismissButton"/);
  assert.match(html, /id="onboardingButton"/);
  assert.match(css, /\.onboarding-prompt\[hidden\]\s*{[^}]*display:\s*none/s);
  assert.match(popup, /chrome\.storage\.local\.get/);
  assert.match(popup, /ytSpeedBoosterOnboardingState/);
});

test("popup starts the tour only after an explicit click", () => {
  assert.match(popup, /type:\s*"YSB_ONBOARDING_START"/);
  assert.match(
    popup,
    /onboardingStartButton\.addEventListener\("click"[\s\S]*startOnboarding/,
  );
  assert.match(
    popup,
    /onboardingButton\.addEventListener\("click"[\s\S]*startOnboarding/,
  );
  assert.doesNotMatch(popup, /chrome\.tabs\.create\([^)]*youtube\.com/i);
});

test("all supported popup languages contain onboarding copy", () => {
  for (const key of [
    "onboardingTitle",
    "onboardingStart",
    "onboardingDismiss",
    "onboardingButton",
    "onboardingNeedVideo",
  ]) {
    const occurrences = popup.match(new RegExp(`\\b${key}:`, "g")) || [];
    assert.equal(occurrences.length, 4, `${key} must exist in RU, EN, ES, and KO`);
  }
});

test("content tour has overview, six steps including time-wheel speed and zoom", () => {
  assert.match(content, /const ONBOARDING_TOTAL_STEPS = 6/);
  assert.match(content, /tourOverviewTitle/);
  assert.match(content, /onboardingTour\.step === 1/);
  assert.match(content, /onboardingTour\.step === 2/);
  assert.match(content, /onboardingTour\.step === 3/);
  assert.match(content, /onboardingTour\.step === 4/);
  assert.match(content, /onboardingTour\.step === 5/);
  assert.match(content, /tourTimeSpeedTitle/);
  assert.match(content, /tourMapTimeSpeed/);
  assert.match(content, /noteOnboardingAction\("time-speed"\)/);
  assert.match(content, /tourZoomTitle/);
  assert.match(content, /tourMapZoom/);
  assert.match(content, /addOnboardingZoneEditor\(targets\.playerRect\)/);
  assert.match(content, /cursor:\s*col-resize/);
  assert.match(content, /setPointerCapture\(event\.pointerId\)/);
  assert.match(content, /ZONE_LEFT_EDGE_STORAGE_KEY/);
  assert.match(content, /ZONE_RIGHT_EDGE_STORAGE_KEY/);
  assert.match(content, /noteOnboardingAction\("video-zoom"\)/);
  assert.match(content, /tourTimeTitle/);
  assert.match(content, /runWheelAction\([^\n]+"lmb"\)/);
  assert.match(content, /noteOnboardingAction\("player-control"\)/);
  assert.match(content, /tour\.resizeObserver\.disconnect\(\)/);
  assert.match(content, /tour\.root\.remove\(\)/);
  assert.match(content, /document\.removeEventListener\("keydown", onOnboardingKeyDown, true\)/);
});

test("tour language is passed from popup and all tour copy is localized", () => {
  assert.match(
    popup,
    /type:\s*"YSB_ONBOARDING_START"[\s\S]*language:\s*currentLanguage/,
  );
  assert.match(
    content,
    /message\.type === "YSB_ONBOARDING_START"[\s\S]*normalizeLanguage\(message\.language/,
  );

  for (const key of [
    "tourBrand",
    "tourOverviewTitle",
    "tourMapZoom",
    "tourMapTimeSpeed",
    "tourTimeSpeedTitle",
    "tourTimeSpeedBody",
    "tourTimeSpeedOff",
    "tourTryTimeSpeed",
    "tourTriedTimeSpeed",
    "tourZoneLeftHandle",
    "tourZoneRightHandle",
    "tourZonesDragging",
    "tourZonesSaved",
    "tourZoomTitle",
    "tourZoomBody",
    "tourZoomOff",
    "tourTryZoom",
    "tourTriedZoom",
    "tourFinish",
  ]) {
    const occurrences = content.match(new RegExp(`\\b${key}:`, "g")) || [];
    assert.equal(occurrences.length, 4, `${key} must exist in RU, EN, ES, and KO`);
  }

  assert.equal((content.match(/tourBrand:\s*"WheelPilot for YouTube/g) || []).length, 4);
});

test("content script exposes a guarded start message and records completion locally", () => {
  assert.match(content, /message\.type === "YSB_ONBOARDING_START"/);
  assert.match(content, /reason:\s*"not-watch-page"/);
  assert.match(content, /chrome\.storage\.local\.set/);
  assert.match(content, /completed:\s*true/);
  assert.match(content, /promptSeen:\s*true/);
});
