<p align="center">
  <img src="youtube-speed-booster/icon128.png" width="128" height="128" alt="YouTube Speed Booster logo">
</p>

<h1 align="center">YouTube Speed Booster</h1>

<p align="center"><strong>Control seeking, volume, and playback speed with the mouse wheel directly over the YouTube player.</strong></p>

Chrome extension for fast, precise playback control on YouTube. Built with
Manifest V3 and plain HTML, CSS, and JavaScript.

## Mouse wheel controls

Keep the pointer over the video and control the most-used playback actions
without reaching for YouTube's small controls:

| Gesture | Default action |
| --- | --- |
| Wheel over the left third of the player | Seek backward or forward in 5-second steps |
| Wheel over the right third of the player | Decrease or increase volume in 5% steps |
| Hold the left mouse button and use the wheel | Change playback speed in 0.25x steps |

The player zones, actions, directions, and step sizes are configurable. Wheel
zones can be always active, limited to fullscreen, or disabled.

## Features

- Configurable mouse-wheel control for seeking, volume, and playback speed.
- Playback speed from 0.1x to 16x with six configurable presets.
- Speed controls in the native YouTube player.
- Automatic speed restore and per-channel speed memory.
- Live-stream catch-up with automatic reset to 1x at the live edge.
- Remaining live delay displayed beside the player controls.
- Frame stepping, A-B repeat, and frame screenshots.
- Optional volume boost, video zoom, and compact progress line.
- Settings export and import in JSON.
- Popup interface in English, Russian, Spanish, and Korean.

## Installation

The Chrome Web Store release is in preparation. To install the development
version:

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose the `youtube-speed-booster` directory.
5. Reload existing YouTube tabs.

After changing extension files, press **Reload** on the extension card and
reload the YouTube tab.

## Default shortcuts

| Action | Windows/Linux | macOS |
| --- | --- | --- |
| Decrease speed | `Ctrl+Shift+Down` | `Command+Shift+Down` |
| Reset to 1x | `Ctrl+Shift+Left` | `Command+Shift+Left` |
| Increase speed | `Ctrl+Shift+Up` | `Command+Shift+Up` |
| Toggle 1x / remembered speed | `Ctrl+Shift+Right` | `Command+Shift+Right` |

Additional frame-step and A-B repeat shortcuts can be enabled in the popup.
Chrome shortcut assignments are available at
`chrome://extensions/shortcuts`.

## Permissions and privacy

| Access | Purpose |
| --- | --- |
| `storage` | Save settings and synchronize them through Chrome |
| `*.youtube.com` | Add controls and apply playback settings on YouTube |

The extension:

- does not collect analytics or browsing history;
- does not send user data to the developer or a third-party server;
- does not use remote code;
- stores settings through `chrome.storage.sync`;
- opens external support and rating pages only after an explicit click.

Project documents:

- [Privacy policy](PRIVACY.md)
- [Release recommendations](docs/release-recommendations.md)
- [Publication plan and Chrome Web Store copy](docs/publication-plan.md)
- [Telegram support research](docs/telegram-support.md)

## Development

No build step or package installation is required.

```powershell
node --test tests/live-catch-up.test.js
```

Main sources:

```text
youtube-speed-booster/
|-- manifest.json
|-- background.js
|-- content.js
|-- main-world.js
|-- popup.html
|-- popup.css
|-- popup.js
|-- config.js
`-- icon16.png / icon32.png / icon48.png / icon128.png
```

## Release checklist

- Update the version in `youtube-speed-booster/manifest.json`.
- Set the published Chrome Web Store URL in
  `youtube-speed-booster/config.js`.
- Run the test suite.
- Load the unpacked extension and verify the popup in both themes.
- Test regular videos, advertisements, and a DVR-enabled live stream.
- Build the upload archive from tracked extension files only:

```powershell
git archive --format=zip --output youtube-speed-booster.zip HEAD:youtube-speed-booster
```
