const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..", "youtube-speed-booster");
const html = fs.readFileSync(path.join(root, "popup.html"), "utf8");
const css = fs.readFileSync(path.join(root, "popup.css"), "utf8");
const js = fs.readFileSync(path.join(root, "popup.js"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));

function rule(selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `Missing CSS rule: ${selector}`);
  return css.slice(start, css.indexOf("}", start) + 1);
}

test("footer keeps support left and GitHub immediately before rating", () => {
  const footer = html.slice(html.indexOf('<footer class="pp-footer">'), html.indexOf("</footer>"));
  assert.ok(footer.indexOf('id="donateButton"') < footer.indexOf('class="footer-spacer"'));
  assert.ok(footer.indexOf('id="githubButton"') < footer.indexOf('id="rateButton"'));
  assert.doesNotMatch(footer, /sync-note|syncShort/);
});

test("GitHub footer button opens the public repository", () => {
  const config = fs.readFileSync(path.join(root, "config.js"), "utf8");
  assert.match(config, /https:\/\/github\.com\/Work-root\/wheelpilot-for-youtube/);
  assert.match(js, /openGitHubPage/);
  assert.match(js, /chrome\.tabs\.create\(\{ url: GITHUB_URL \}\)/);
});

test("rating button targets the exact Chrome Web Store item", () => {
  const config = fs.readFileSync(path.join(root, "config.js"), "utf8");
  assert.match(
    config,
    /chromeStoreUrl:\s*\n?\s*"https:\/\/chromewebstore\.google\.com\/detail\/mcfpmdhigeechfodngfolmfflffcimoh"/,
  );
});

test("Telegram support opens the pinned channel post directly", () => {
  const config = fs.readFileSync(path.join(root, "config.js"), "utf8");
  assert.match(html, /Поблагодарить в Telegram/);
  assert.match(config, /https:\/\/t\.me\/YouTubeSpeedBooster\/3/);
  assert.match(js, /openTelegramSupport/);
  assert.match(js, /chrome\.tabs\.create\(\{ url: TELEGRAM_SUPPORT_URL \}\)/);
  assert.doesNotMatch(js, /donate\.html|openDonatePage/);
});

test("confirm overlay is scoped to the popup canvas", () => {
  assert.match(rule(".popup"), /position:\s*relative/);
  assert.match(rule(".popup"), /overflow:\s*hidden/);
  assert.match(rule(".confirm-overlay"), /position:\s*absolute/);
});

test("settings import updates in place without reloading the popup", () => {
  const start = js.indexOf("if (importInput)");
  const end = js.indexOf("const factoryResetButton", start);
  const importHandler = js.slice(start, end);
  assert.match(importHandler, /await initPopup\(\)/);
  assert.match(importHandler, /setTemporaryStatus/);
  assert.doesNotMatch(importHandler, /location\.reload/);
});

test("settings import keeps the file input out of the popup layout", () => {
  const confirmStart = js.indexOf("function showConfirm");
  const confirmEnd = js.indexOf("function bindCheckbox", confirmStart);
  const confirmHandler = js.slice(confirmStart, confirmEnd);
  const dataGroupStart = html.indexOf('id="grpBody-data"');
  const dataGroupEnd = html.indexOf("</section>", dataGroupStart);
  const dataGroup = html.slice(dataGroupStart, dataGroupEnd);
  const importStart = js.indexOf("if (importInput)");
  const importEnd = js.indexOf("const factoryResetButton", importStart);
  const importHandler = js.slice(importStart, importEnd);

  assert.match(dataGroup, /<button id="importButton"[^>]*>.*?<\/button>/s);
  assert.match(dataGroup, /<input id="importInput"[^>]*\shidden\s*\/>/);
  assert.doesNotMatch(dataGroup, /<label[^>]*>[\s\S]*id="importInput"/);
  assert.match(js, /importButton\.addEventListener\("click", \(\) => importInput\.click\(\)\)/);
  assert.match(confirmHandler, /focus\(\{\s*preventScroll:\s*true\s*\}\)/);
  assert.match(confirmHandler, /requestAnimationFrame\(restorePopupViewport\)/);
  assert.ok((importHandler.match(/restorePopupViewport\(\)/g) || []).length >= 2);
});

test("manifest metadata is localized in every supported popup language", () => {
  assert.equal(manifest.version, "0.2.3");
  assert.equal(manifest.default_locale, "en");
  assert.equal(manifest.name, "__MSG_extensionName__");
  assert.equal(manifest.description, "__MSG_extensionDescription__");
  assert.equal(manifest.action.default_title, "__MSG_actionTitle__");

  for (const locale of ["en", "ru", "es", "ko"]) {
    const messages = JSON.parse(
      fs.readFileSync(path.join(root, "_locales", locale, "messages.json"), "utf8"),
    );
    for (const key of [
      "extensionName",
      "extensionDescription",
      "actionTitle",
      "commandSpeedDown",
      "commandResetSpeed",
      "commandSpeedUp",
      "commandToggleMemorySpeed",
    ]) {
      assert.ok(messages[key]?.message, `${locale}.${key} is missing`);
    }
    assert.equal(messages.extensionName.message, "WheelPilot for YouTube");
    assert.equal(messages.actionTitle.message, "WheelPilot for YouTube");
  }
});

test("settings export uses the new brand and imports legacy backups", () => {
  assert.match(js, /extension:\s*"WheelPilot for YouTube"/);
  assert.match(js, /wheelpilot-settings-\$\{stamp\}\.json/);
  assert.match(js, /"WheelPilot for YouTube"[\s\S]*"YouTube Speed Booster"/);
  assert.match(js, /supportedExportBrands\.includes\(payload\.extension\)/);
});
