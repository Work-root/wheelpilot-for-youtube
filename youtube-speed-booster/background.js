const STORAGE_KEY = "ytSpeedControllerSpeed";
const DEFAULT_SPEED = 1.5;
const MIN_SPEED = 0.25;
const MAX_SPEED = 5;
const SPEED_STEPS = [
  0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5,
];

function clampSpeed(value) {
  const speed = Number(value);

  if (Number.isNaN(speed)) {
    return DEFAULT_SPEED;
  }

  return Math.min(
    MAX_SPEED,
    Math.max(MIN_SPEED, Math.round(speed * 100) / 100),
  );
}

function getSteppedSpeed(currentSpeed, direction) {
  const speed = clampSpeed(currentSpeed);
  const epsilon = 0.001;

  if (direction > 0) {
    return SPEED_STEPS.find((step) => step > speed + epsilon) || MAX_SPEED;
  }

  return (
    [...SPEED_STEPS].reverse().find((step) => step < speed - epsilon) ||
    MIN_SPEED
  );
}

async function getCurrentSpeed() {
  const data = await chrome.storage.sync.get({
    [STORAGE_KEY]: DEFAULT_SPEED,
  });

  return clampSpeed(data[STORAGE_KEY]);
}

async function saveCurrentSpeed(speed) {
  await chrome.storage.sync.set({
    [STORAGE_KEY]: clampSpeed(speed),
  });
}

async function sendSpeedCommandToActiveTab(type, speed) {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const tab = tabs[0];

  if (!tab || !tab.id) {
    return;
  }

  try {
    const message = typeof speed === "number" ? { type, speed } : { type };
    await chrome.tabs.sendMessage(tab.id, message);
  } catch {
    // Активная вкладка может быть не YouTube. В этом случае просто сохраняем скорость.
  }
}

chrome.commands.onCommand.addListener(async (command) => {
  const currentSpeed = await getCurrentSpeed();

  if (command === "speed-up") {
    const nextSpeed = getSteppedSpeed(currentSpeed, 1);

    await saveCurrentSpeed(nextSpeed);
    await sendSpeedCommandToActiveTab("YT_SPEED_SET", nextSpeed);
    return;
  }

  if (command === "speed-down") {
    const nextSpeed = getSteppedSpeed(currentSpeed, -1);

    await saveCurrentSpeed(nextSpeed);
    await sendSpeedCommandToActiveTab("YT_SPEED_SET", nextSpeed);
    return;
  }

  if (command === "reset-speed") {
    await saveCurrentSpeed(1);
    await sendSpeedCommandToActiveTab("YT_SPEED_SET", 1);
    return;
  }

  if (command === "toggle-memory-speed") {
    await sendSpeedCommandToActiveTab("YT_SPEED_TOGGLE_BOOST");
  }
});
