// Popup — единственная поверхность настроек расширения (options.html
// удалён 2026-08-02: отдельная страница была лишней, все разделы теперь
// живут здесь на двух вкладках — «Плеер» и «Общее»).

// --- Ключи storage ----------------------------------------------------------

const STORAGE_KEY = "ytSpeedControllerSpeed";
const LANGUAGE_STORAGE_KEY = "ytSpeedControllerLanguage";
const AUTO_APPLY_STORAGE_KEY = "ytSpeedControllerAutoApplyDefault";
const APPLY_TO_ADS_STORAGE_KEY = "ytSpeedControllerApplyToAds";
const PRESETS_STORAGE_KEY = "ytSpeedControllerPresets";
const SPEED_MIN_STORAGE_KEY = "ytSpeedControllerSpeedMin";
const SPEED_MAX_STORAGE_KEY = "ytSpeedControllerSpeedMax";
const SPEED_STEP_STORAGE_KEY = "ytSpeedControllerSpeedStep";
const THEME_STORAGE_KEY = "ytSpeedControllerTheme";
const CHANNEL_SPEEDS_STORAGE_KEY = "ytSpeedControllerChannelSpeeds";
const ONBOARDING_STORAGE_KEY = "ytSpeedBoosterOnboardingState";
const ONBOARDING_VERSION = 1;

const PLAYER_BUTTONS_STORAGE_KEY = "ytSpeedControllerPlayerButtons";
const PB_FRAME_BUTTONS_STORAGE_KEY = "ytSpeedControllerPlayerFrameButtons";
const PB_LOOP_BUTTONS_STORAGE_KEY = "ytSpeedControllerPlayerLoopButtons";
const SCREENSHOT_BUTTON_STORAGE_KEY = "ytSpeedControllerScreenshotButton";
const VIDEO_ZOOM_STORAGE_KEY = "ytSpeedControllerVideoZoom";
const PLAYER_TIME_LEFT_STORAGE_KEY = "ytSpeedControllerPlayerTimeLeft";
const MINI_PROGRESS_STORAGE_KEY = "ytSpeedControllerMiniProgress";
const MINI_PROGRESS_HEIGHT_STORAGE_KEY = "ytSpeedControllerMiniProgressHeight";
const MINI_PROGRESS_COLOR_STORAGE_KEY = "ytSpeedControllerMiniProgressColor";
const WHEEL_ZONES_MODE_STORAGE_KEY = "ytSpeedControllerWheelZonesMode";
const WHEEL_SEEK_STEP_STORAGE_KEY = "ytSpeedControllerWheelSeekStep";
const WHEEL_VOLUME_STEP_STORAGE_KEY = "ytSpeedControllerWheelVolumeStep";
const LMB_WHEEL_ACTION_STORAGE_KEY = "ytSpeedControllerLmbWheelAction";
const RMB_WHEEL_ACTION_STORAGE_KEY = "ytSpeedControllerRmbWheelAction";
const ZONE_LEFT_EDGE_STORAGE_KEY = "ytSpeedControllerZoneLeftEdge";
const ZONE_RIGHT_EDGE_STORAGE_KEY = "ytSpeedControllerZoneRightEdge";
const ZONE_LEFT_ACTION_STORAGE_KEY = "ytSpeedControllerZoneLeftAction";
const ZONE_RIGHT_ACTION_STORAGE_KEY = "ytSpeedControllerZoneRightAction";
const ZONE_LEFT_INVERT_STORAGE_KEY = "ytSpeedControllerZoneLeftInvert";
const ZONE_RIGHT_INVERT_STORAGE_KEY = "ytSpeedControllerZoneRightInvert";
const LMB_WHEEL_INVERT_STORAGE_KEY = "ytSpeedControllerLmbWheelInvert";
const RMB_WHEEL_INVERT_STORAGE_KEY = "ytSpeedControllerRmbWheelInvert";
const VOLUME_BOOST_STORAGE_KEY = "ytSpeedControllerVolumeBoost";
const VOLUME_BOOST_MAX_STORAGE_KEY = "ytSpeedControllerVolumeBoostMax";
const FRAME_STEP_HOTKEYS_STORAGE_KEY = "ytSpeedControllerFrameStepHotkeys";
const FRAME_STEP_LARGE_STORAGE_KEY = "ytSpeedControllerFrameStepLarge"; // legacy, для миграции
const FRAME_STEP_BACK_STORAGE_KEY = "ytSpeedControllerFrameStepLargeBack";
const FRAME_STEP_FORWARD_STORAGE_KEY = "ytSpeedControllerFrameStepLargeForward";
const LOOP_HOTKEYS_STORAGE_KEY = "ytSpeedControllerLoopHotkeys";

// --- Дефолты и границы -------------------------------------------------------

const DEFAULT_THEME = "dark";
const DEFAULT_SPEED = 1.5;
const DEFAULT_LANGUAGE = "en";
const DEFAULT_AUTO_APPLY = true;
const DEFAULT_APPLY_TO_ADS = true;
const DEFAULT_PRESETS = [0.75, 1.5, 2, 2.5, 3, 4];
const DEFAULT_SPEED_MIN = 0.25;
const DEFAULT_SPEED_MAX = 5;
const HARD_SPEED_MIN = 0.1;
const HARD_SPEED_MAX = 16;
const DEFAULT_SPEED_STEP = 0.25;
const SPEED_STEP_MIN = 0.05;
const SPEED_STEP_MAX = 1.0;
const SUPPORTED_LANGUAGES = ["ru", "en", "es", "ko"];

const DEFAULT_PLAYER_BUTTONS = true;
const DEFAULT_PB_FRAME_BUTTONS = true;
const DEFAULT_PB_LOOP_BUTTONS = true;
const DEFAULT_SCREENSHOT_BUTTON = true;
const DEFAULT_VIDEO_ZOOM = false;
const DEFAULT_PLAYER_TIME_LEFT = true;
const DEFAULT_MINI_PROGRESS = "fullscreen";
const DEFAULT_MINI_PROGRESS_HEIGHT = 3;
const MINI_PROGRESS_HEIGHT_MIN = 1;
const MINI_PROGRESS_HEIGHT_MAX = 20;
const DEFAULT_MINI_PROGRESS_COLOR = "#ff0000";
const DEFAULT_WHEEL_ZONES_MODE = "always";
const DEFAULT_WHEEL_SEEK_STEP = 5;
const DEFAULT_WHEEL_VOLUME_STEP = 5;
const DEFAULT_LMB_WHEEL_ACTION = "speed";
const DEFAULT_RMB_WHEEL_ACTION = "off";
const DEFAULT_ZONE_LEFT_EDGE = 33;
const DEFAULT_ZONE_RIGHT_EDGE = 67;
const ZONE_EDGE_MIN = 5;
const ZONE_EDGE_MAX = 95;
const ZONE_EDGE_GAP = 10;
const DEFAULT_ZONE_LEFT_ACTION = "seek";
const DEFAULT_ZONE_RIGHT_ACTION = "volume";
const DEFAULT_VOLUME_BOOST = true;
const DEFAULT_VOLUME_BOOST_MAX = 200;
const VOLUME_BOOST_MAX_MIN = 110;
const VOLUME_BOOST_MAX_MAX = 200;
const DEFAULT_FRAME_STEP_HOTKEYS = false;
const DEFAULT_FRAME_STEP_LARGE = 5;
const DEFAULT_FRAME_STEP_BACK = 5;
const DEFAULT_FRAME_STEP_FORWARD = 5;
const FRAME_STEP_MIN = 1;
const FRAME_STEP_MAX = 60;
const DEFAULT_LOOP_HOTKEYS = false;

// Границы ползунка скорости — динамические (задаются пользователем в
// «Общее → Скорость»), обновляются applySpeedBounds(). Используются и
// пинним-блоком скорости, и редактором пресетов — раньше это были две
// независимые (и местами рассинхронизированные) переменные в popup.js и
// options.js, здесь — одна пара на весь popup.
let MIN_SPEED = DEFAULT_SPEED_MIN;
let MAX_SPEED = DEFAULT_SPEED_MAX;

const TAB_NAMES = ["player", "general"];
const ACTIVE_TAB_STORAGE_KEY = "ysbPopupTab"; // localStorage, не sync — состояние UI одного устройства

// URL Chrome Web Store берётся из config.js, чтобы редактировать его в одном месте.
const CHROME_STORE_URL =
  (window.YSB_CONFIG && window.YSB_CONFIG.chromeStoreUrl) ||
  "https://chromewebstore.google.com/detail/mcfpmdhigeechfodngfolmfflffcimoh";
const TELEGRAM_SUPPORT_URL =
  (window.YSB_CONFIG && window.YSB_CONFIG.telegramSupportUrl) ||
  "https://t.me/WheelPilotYT/5";
const GITHUB_URL =
  (window.YSB_CONFIG && window.YSB_CONFIG.githubUrl) ||
  "https://github.com/Work-root/wheelpilot-for-youtube";

// --- Локализация -------------------------------------------------------------
// Единый словарь для всего popup. Между старыми popup.js/options.js была
// одна настоящая коллизия имени — statusSaved — options-вариант переименован
// в statusSavedShort. Остальное перенесено как было.

const translations = {
  ru: {
    title: "WheelPilot for YouTube",
    brandSub: "Настройки воспроизведения",
    languageLabel: "Язык",
    themeToggleTitle: "Переключить светлую/тёмную тему",
    speedLabel: "Скорость",
    speedRangeAria: "Скорость воспроизведения",
    resetButton: "Сбросить на 1×",
    resetButtonTitle: "Сбросить скорость до 1×\nWin: Ctrl+Shift+←\nMac: ⌘+Shift+←",
    donateButton: "♡ Поблагодарить в Telegram",
    githubButton: "GitHub",
    rateButton: "★ Оценить",
    onboardingKicker: "Быстрый старт",
    onboardingTitle: "Познакомиться с расширением?",
    onboardingDescription: "Увидьте управление колесом над плеером и временем, приближение и кнопки.",
    onboardingStart: "Показать возможности",
    onboardingDismiss: "Не сейчас",
    onboardingButton: "✦ Знакомство",
    onboardingButtonTitle: "Показать карту возможностей на странице YouTube",
    onboardingNeedVideo: "Откройте любое видео на YouTube и снова нажмите «Знакомство».",
    statusDefault: "Открой YouTube и выбери скорость.",
    statusApplied: (speed) => `Скорость ${speed} применена.`,
    statusSaved: "Скорость сохранена. Открой активную вкладку YouTube, чтобы применить её.",
    statusOpenYoutube: "Открой вкладку YouTube, затем выбери скорость.",
    presetTitle: "Установить эту скорость",

    tabPlayer: "Плеер",
    tabGeneral: "Общее",

    // Подписи групп-аккордеонов (редизайн 2026-08-02)
    grpPbButtonsDesc: "Скорость, кадры, повтор A-B, скриншот",
    grpTimeProgressDesc: "Остаток времени и линия прогресса",
    grpWheelZonesDesc: "Границы зон, действия жестов, направление",
    grpVolumeBoostDesc: "Громкость выше 100% через WebAudio",
    grpToolsDesc: "Хоткеи кадров и повтора отрезка",
    grpBehaviorDesc: "Автоприменение скорости и реклама",
    grpPresetsDesc: "Значения кнопок в верхнем блоке",
    grpSpeedRangeDesc: "Границы и шаг ползунка",
    grpChannelsDesc: "Своя скорость для каждого канала",
    grpDataDesc: "Экспорт и импорт настроек",
    grpDangerDesc: "Необратимый сброс всех настроек",

    confirmOk: "Да",
    confirmCancel: "Отмена",
    confirmDelete: "Удалить",
    confirmReset: "Сбросить",
    confirmImport: "Импортировать",

    statusSavedShort: "Сохранено",
    statusInvalid: "Допустимы значения от 0.25× до 5×.",

    // Плеер — кнопки в панели
    pbButtonsTitle: "Кнопки в панели плеера",
    pbButtonsHint:
      "Собраны в одной пилюле рядом с тайм-кодом YouTube: скорость, кадры, повтор A-B, скриншот.",
    pbSpeedLabel: "Скорость (− N× +), колесо меняет значение",
    pbFrameLabel: "Покадровый шаг (◀ ▶ и большие шаги)",
    pbLoopLabel: "Повтор отрезка A-B",
    pbScreenshotLabel: "Скриншот текущего кадра",
    pbVideoZoomLabel: "Приближение видео (колесо в зоне вверху по центру)",

    // Плеер — время и прогресс
    timeProgressTitle: "Время и прогресс",
    playerTimeLeftLabel: "Остаток времени с учётом скорости в тайм-коде плеера",
    miniProgressModeLabel: "Линия прогресса внизу плеера:",
    miniProgressOff: "Выключена",
    miniProgressFullscreen: "Только в полноэкранном режиме",
    miniProgressAlways: "Всегда",
    miniProgressHeightLabel: "Толщина линии (px):",
    miniProgressColorLabel: "Цвет линии:",
    miniProgressColorReset: "Сбросить на красный YouTube",

    // Плеер — колесо мыши
    wheelZonesTitle: "Колёсные зоны плеера",
    wheelZonesHint:
      "Окно плеера делится на три вертикальные зоны. Колесо мыши в левой трети — перемотка, в правой — громкость. Центральная треть без функции: там страница прокручивается как обычно.",
    wheelZonesModeLabel: "Когда зоны активны:",
    wheelZonesModeAlways: "Всегда (в оконном режиме центр плеера продолжает прокручивать страницу)",
    wheelZonesModeFullscreen: "Только в полноэкранном режиме",
    wheelZonesModeOff: "Выключены",
    wheelSeekStepLabel: "Шаг перемотки (секунд):",
    wheelVolumeStepLabel: "Шаг громкости (%):",
    zoneEdgesLabel: "Границы зон (% ширины плеера):",
    zoneEdgesReset: "Сбросить",
    wheelSlotsTitle: "Назначение жестов",
    zoneLeftSlotLabel: "Левая зона:",
    zoneRightSlotLabel: "Правая зона:",
    lmbWheelSlotLabel: "ЛКМ + колесо:",
    rmbWheelSlotLabel: "ПКМ + колесо:",
    wheelActionSpeed: "Скорость",
    wheelActionSeek: "Перемотка",
    wheelActionVolume: "Громкость",
    wheelActionOff: "Выключено",
    wheelInvertLabel: "наоборот",
    lmbWheelHint: "Зажми левую кнопку мыши на видео и крути колесо.",

    // Плеер — звук
    volumeBoostTitle: "Усиление звука",
    volumeBoostHint:
      "После 100% громкости колесо в правой зоне продолжает крутить — включается усиление через WebAudio.",
    volumeBoostEnableLabel: "Разрешить усиление выше 100%",
    volumeBoostMaxLabel: "Потолок усиления (%):",

    // Плеер — инструменты
    toolsTitle: "Инструменты",
    frameStepHotkeysLabel: "Хоткеи Alt+, / Alt+. (с Shift — большой шаг)",
    frameStepBackLabel: "Назад",
    frameStepForwardLabel: "Вперёд",
    frameStepLargeLabel: "Размер большого шага (кадров):",
    loopHotkeysLabel: "Хоткеи Alt+A / Alt+B / Alt+L",

    // Общее — поведение
    behaviorTitle: "Поведение",
    autoApplyDefault: "Автоматически применять эту скорость к новым видео YouTube",
    applyToAdsLabel: "Ускорять также рекламу",

    // Общее — скорость
    presetsTitle: "Кнопки быстрых пресетов",
    presetsHint: "6 значений, которые видны кнопками наверху popup.",
    presetLabel: (i) => `Пресет ${i}`,
    resetPresetsButton: "Вернуть стандартные значения",
    speedRangeTitle: "Диапазон скорости",
    speedRangeHint: "Границы ползунка вверху. Можно расширить до 0.1×–16×.",
    resetSpeedRangeButton: "Вернуть стандартные значения",
    speedRangeInvalid: "Минимум должен быть меньше максимума.",
    speedStepLabel: "Шаг изменения скорости (×):",

    // Общее — каналы
    channelsTitle: "Сохранённые скорости каналов",
    channelsToggle: "Показать / скрыть список",
    channelMemoryLabel: "Текущий канал:",
    channelMemoryNoChannel: "Открой ролик YouTube, чтобы привязать скорость к каналу.",
    channelSavedBadge: (speed) => `сохранено ${speed}`,
    channelSavePrefix: "Сохранить",
    channelSaveSuffix: "для этого канала",
    channelForget: "Забыть скорость канала",
    channelClearAll: (count) => `Очистить все каналы (${count})`,
    channelClearAllConfirm: "Удалить сохранённые скорости для всех каналов?",
    channelsSearchPlaceholder: "Поиск по имени канала…",
    channelsEmpty: "Сохранённых каналов пока нет.",
    channelsClearAll: "Очистить все",
    channelsNothingFound: (q) => `Ничего не найдено: ${q}`,
    channelsDeleted: "Удалено.",
    statusChannelSaved: (channel, speed) => `Скорость ${speed} сохранена для канала «${channel}».`,
    statusChannelForgotten: (channel) => `Скорость для канала «${channel}» забыта.`,
    statusChannelsCleared: "Настройки скоростей всех каналов очищены.",
    statusNoChannelDetected: "Канал не определён. Перейди на страницу видео YouTube.",

    // Общее — данные и сброс
    dataTitle: "Данные",
    exportButton: "Экспорт настроек (JSON)",
    importButton: "Импорт настроек…",
    exportedStatus: "Файл сохранён.",
    importConfirm: "Заменить текущие настройки данными из файла?",
    importInvalid: "Файл повреждён или не от этого расширения.",
    importedStatus: (n) => `Импортировано настроек: ${n}.`,
    dangerTitle: "Сброс к заводским настройкам",
    dangerHint: "Скорость, язык, все параметры и сохранённые каналы будут сброшены. Действие необратимо.",
    factoryResetButton: "↺ Сбросить всё",
    factoryResetConfirm:
      "Сбросить все настройки к заводским?\n\nСкорость, язык и все параметры будут сброшены.",
  },
  en: {
    title: "WheelPilot for YouTube",
    brandSub: "Playback settings",
    languageLabel: "Language",
    themeToggleTitle: "Toggle light/dark theme",
    speedLabel: "Speed",
    speedRangeAria: "Playback speed",
    resetButton: "Reset to 1×",
    resetButtonTitle: "Reset speed to 1×\nWin: Ctrl+Shift+←\nMac: ⌘+Shift+←",
    donateButton: "♡ Say thanks on Telegram",
    githubButton: "GitHub",
    rateButton: "★ Rate",
    onboardingKicker: "Quick start",
    onboardingTitle: "Take a quick tour?",
    onboardingDescription: "See wheel controls over the player and time display, video zoom, and buttons.",
    onboardingStart: "Show features",
    onboardingDismiss: "Not now",
    onboardingButton: "✦ Tour",
    onboardingButtonTitle: "Show the feature map on the YouTube page",
    onboardingNeedVideo: "Open any YouTube video, then click “Tour” again.",
    statusDefault: "Open YouTube and choose a speed.",
    statusApplied: (speed) => `Speed ${speed} applied.`,
    statusSaved: "Speed saved. Open the active YouTube tab to apply it.",
    statusOpenYoutube: "Open a YouTube tab, then choose a speed.",
    presetTitle: "Set this speed",

    tabPlayer: "Player",
    tabGeneral: "General",

    grpPbButtonsDesc: "Speed, frames, A-B loop, screenshot",
    grpTimeProgressDesc: "Remaining time and progress line",
    grpWheelZonesDesc: "Zone edges, gesture mapping, direction",
    grpVolumeBoostDesc: "Volume above 100% via WebAudio",
    grpToolsDesc: "Frame-step and loop hotkeys",
    grpBehaviorDesc: "Auto-apply speed and ads",
    grpPresetsDesc: "Values of the buttons above",
    grpSpeedRangeDesc: "Slider bounds and step",
    grpChannelsDesc: "A personal speed per channel",
    grpDataDesc: "Export and import settings",
    grpDangerDesc: "Irreversible reset of everything",

    confirmOk: "Yes",
    confirmCancel: "Cancel",
    confirmDelete: "Delete",
    confirmReset: "Reset",
    confirmImport: "Import",

    statusSavedShort: "Saved",
    statusInvalid: "Values must be between 0.25× and 5×.",

    pbButtonsTitle: "Player control-bar buttons",
    pbButtonsHint:
      "Grouped in one pill next to the YouTube timecode: speed, frames, A-B loop, screenshot.",
    pbSpeedLabel: "Speed (− N× +), wheel over it changes speed",
    pbFrameLabel: "Frame-by-frame step (◀ ▶ and large steps)",
    pbLoopLabel: "A-B section loop",
    pbScreenshotLabel: "Screenshot current frame",
    pbVideoZoomLabel: "Video zoom (wheel over top-center zone)",

    timeProgressTitle: "Time & progress",
    playerTimeLeftLabel: "Remaining time at current speed in the player timecode",
    miniProgressModeLabel: "Progress line at the bottom of the player:",
    miniProgressOff: "Off",
    miniProgressFullscreen: "Fullscreen only",
    miniProgressAlways: "Always",
    miniProgressHeightLabel: "Line thickness (px):",
    miniProgressColorLabel: "Line color:",
    miniProgressColorReset: "Reset to YouTube red",

    wheelZonesTitle: "Player wheel zones",
    wheelZonesHint:
      "The player window is split into three vertical zones. Mouse wheel over the left third seeks, over the right third changes volume. The middle third is neutral.",
    wheelZonesModeLabel: "When zones are active:",
    wheelZonesModeAlways: "Always (in windowed mode the middle third still scrolls the page)",
    wheelZonesModeFullscreen: "Fullscreen only",
    wheelZonesModeOff: "Disabled",
    wheelSeekStepLabel: "Seek step (seconds):",
    wheelVolumeStepLabel: "Volume step (%):",
    zoneEdgesLabel: "Zone edges (% of player width):",
    zoneEdgesReset: "Reset",
    wheelSlotsTitle: "Gesture mapping",
    zoneLeftSlotLabel: "Left zone:",
    zoneRightSlotLabel: "Right zone:",
    lmbWheelSlotLabel: "LMB + wheel:",
    rmbWheelSlotLabel: "RMB + wheel:",
    wheelActionSpeed: "Speed",
    wheelActionSeek: "Seek",
    wheelActionVolume: "Volume",
    wheelActionOff: "Disabled",
    wheelInvertLabel: "reverse",
    lmbWheelHint: "Hold the left mouse button on the video and scroll the wheel.",

    volumeBoostTitle: "Volume boost",
    volumeBoostHint:
      "Past 100% volume, the wheel in the right zone keeps going — WebAudio boost kicks in.",
    volumeBoostEnableLabel: "Allow boost above 100%",
    volumeBoostMaxLabel: "Boost ceiling (%):",

    toolsTitle: "Tools",
    frameStepHotkeysLabel: "Alt+, / Alt+. hotkeys (Shift = large step)",
    frameStepBackLabel: "Back",
    frameStepForwardLabel: "Forward",
    frameStepLargeLabel: "Large step size (frames):",
    loopHotkeysLabel: "Alt+A / Alt+B / Alt+L hotkeys",

    behaviorTitle: "Behavior",
    autoApplyDefault: "Automatically apply this speed to new YouTube videos",
    applyToAdsLabel: "Speed up ads as well",
    presetsTitle: "Quick speed presets",
    presetsHint: "Six values shown as buttons at the top of the popup.",
    presetLabel: (i) => `Preset ${i}`,
    resetPresetsButton: "Restore defaults",
    speedRangeTitle: "Speed range",
    speedRangeHint: "Bounds for the slider above. Can be expanded up to 0.1×–16×.",
    resetSpeedRangeButton: "Restore defaults",
    speedRangeInvalid: "Minimum must be less than maximum.",
    speedStepLabel: "Speed step (×):",

    channelsTitle: "Saved channel speeds",
    channelsToggle: "Show / hide list",
    channelMemoryLabel: "Current channel:",
    channelMemoryNoChannel: "Open a YouTube video to bind a speed to its channel.",
    channelSavedBadge: (speed) => `saved ${speed}`,
    channelSavePrefix: "Save",
    channelSaveSuffix: "for this channel",
    channelForget: "Forget speed for this channel",
    channelClearAll: (count) => `Clear all channels (${count})`,
    channelClearAllConfirm: "Remove saved speeds for all channels?",
    channelsSearchPlaceholder: "Search by channel name…",
    channelsEmpty: "No saved channels yet.",
    channelsClearAll: "Clear all",
    channelsNothingFound: (q) => `Nothing found: ${q}`,
    channelsDeleted: "Removed.",
    statusChannelSaved: (channel, speed) => `Speed ${speed} saved for channel “${channel}”.`,
    statusChannelForgotten: (channel) => `Saved speed for channel “${channel}” cleared.`,
    statusChannelsCleared: "All per-channel speed settings cleared.",
    statusNoChannelDetected: "No channel detected. Open a YouTube video page.",

    dataTitle: "Data",
    exportButton: "Export settings (JSON)",
    importButton: "Import settings…",
    exportedStatus: "File saved.",
    importConfirm: "Replace current settings with the file's data?",
    importInvalid: "File is corrupted or not from this extension.",
    importedStatus: (n) => `Imported settings: ${n}.`,
    dangerTitle: "Factory reset",
    dangerHint: "Speed, language, all preferences and saved channels will be cleared. This cannot be undone.",
    factoryResetButton: "↺ Reset everything",
    factoryResetConfirm: "Reset all settings to factory defaults?\n\nSpeed, language and all preferences will be cleared.",
  },
  es: {
    title: "WheelPilot for YouTube",
    brandSub: "Ajustes de reproducción",
    languageLabel: "Idioma",
    themeToggleTitle: "Cambiar tema claro/oscuro",
    speedLabel: "Velocidad",
    speedRangeAria: "Velocidad de reproducción",
    resetButton: "Restablecer a 1×",
    resetButtonTitle: "Restablecer velocidad a 1×\nWin: Ctrl+Shift+←\nMac: ⌘+Shift+←",
    donateButton: "♡ Dar las gracias en Telegram",
    githubButton: "GitHub",
    rateButton: "★ Calificar",
    onboardingKicker: "Inicio rápido",
    onboardingTitle: "¿Quieres conocer la extensión?",
    onboardingDescription: "Descubre el control con la rueda sobre el reproductor y el tiempo, el zoom y los botones.",
    onboardingStart: "Mostrar funciones",
    onboardingDismiss: "Ahora no",
    onboardingButton: "✦ Recorrido",
    onboardingButtonTitle: "Mostrar el mapa de funciones en la página de YouTube",
    onboardingNeedVideo: "Abre cualquier vídeo de YouTube y vuelve a pulsar «Recorrido».",
    statusDefault: "Abre YouTube y elige una velocidad.",
    statusApplied: (speed) => `Velocidad ${speed} aplicada.`,
    statusSaved: "Velocidad guardada. Abre la pestaña activa de YouTube para aplicarla.",
    statusOpenYoutube: "Abre una pestaña de YouTube y luego elige una velocidad.",
    presetTitle: "Establecer esta velocidad",

    tabPlayer: "Reproductor",
    tabGeneral: "General",

    grpPbButtonsDesc: "Velocidad, fotogramas, bucle A-B, captura",
    grpTimeProgressDesc: "Tiempo restante y línea de progreso",
    grpWheelZonesDesc: "Límites, asignación de gestos, dirección",
    grpVolumeBoostDesc: "Volumen por encima del 100% con WebAudio",
    grpToolsDesc: "Atajos de fotogramas y de bucle",
    grpBehaviorDesc: "Aplicación automática y anuncios",
    grpPresetsDesc: "Valores de los botones de arriba",
    grpSpeedRangeDesc: "Límites y paso del control",
    grpChannelsDesc: "Una velocidad propia por canal",
    grpDataDesc: "Exportar e importar la configuración",
    grpDangerDesc: "Restablecimiento irreversible",

    confirmOk: "Sí",
    confirmCancel: "Cancelar",
    confirmDelete: "Eliminar",
    confirmReset: "Restablecer",
    confirmImport: "Importar",

    statusSavedShort: "Guardado",
    statusInvalid: "Los valores deben estar entre 0.25× y 5×.",

    pbButtonsTitle: "Botones en la barra del reproductor",
    pbButtonsHint:
      "Agrupados en una píldora junto al código de tiempo de YouTube: velocidad, fotogramas, repetición A-B, captura.",
    pbSpeedLabel: "Velocidad (− N× +), la rueda sobre el bloque la cambia",
    pbFrameLabel: "Paso fotograma a fotograma (◀ ▶ y pasos grandes)",
    pbLoopLabel: "Repetición de sección A-B",
    pbScreenshotLabel: "Captura del fotograma actual",
    pbVideoZoomLabel: "Zoom de video (rueda en la zona superior central)",

    timeProgressTitle: "Tiempo y progreso",
    playerTimeLeftLabel: "Tiempo restante según la velocidad en el código de tiempo",
    miniProgressModeLabel: "Línea de progreso abajo del reproductor:",
    miniProgressOff: "Desactivada",
    miniProgressFullscreen: "Solo en pantalla completa",
    miniProgressAlways: "Siempre",
    miniProgressHeightLabel: "Grosor de la línea (px):",
    miniProgressColorLabel: "Color de la línea:",
    miniProgressColorReset: "Restablecer al rojo de YouTube",

    wheelZonesTitle: "Zonas de rueda del reproductor",
    wheelZonesHint:
      "La ventana del reproductor se divide en tres zonas verticales. La rueda sobre el tercio izquierdo avanza/retrocede, sobre el derecho cambia el volumen. El tercio central es neutral.",
    wheelZonesModeLabel: "Cuándo están activas las zonas:",
    wheelZonesModeAlways: "Siempre (en modo ventana el tercio central sigue desplazando la página)",
    wheelZonesModeFullscreen: "Solo en pantalla completa",
    wheelZonesModeOff: "Desactivadas",
    wheelSeekStepLabel: "Paso de avance (segundos):",
    wheelVolumeStepLabel: "Paso de volumen (%):",
    zoneEdgesLabel: "Límites de las zonas (% del ancho):",
    zoneEdgesReset: "Restablecer",
    wheelSlotsTitle: "Asignación de gestos",
    zoneLeftSlotLabel: "Zona izquierda:",
    zoneRightSlotLabel: "Zona derecha:",
    lmbWheelSlotLabel: "Botón izq. + rueda:",
    rmbWheelSlotLabel: "Botón der. + rueda:",
    wheelActionSpeed: "Velocidad",
    wheelActionSeek: "Avance",
    wheelActionVolume: "Volumen",
    wheelActionOff: "Desactivado",
    wheelInvertLabel: "invertir",
    lmbWheelHint: "Mantén pulsado el botón izquierdo sobre el video y gira la rueda.",

    volumeBoostTitle: "Refuerzo de volumen",
    volumeBoostHint:
      "Pasado el 100% de volumen, la rueda en la zona derecha sigue funcionando — se activa el refuerzo vía WebAudio.",
    volumeBoostEnableLabel: "Permitir refuerzo por encima del 100%",
    volumeBoostMaxLabel: "Tope del refuerzo (%):",

    toolsTitle: "Herramientas",
    frameStepHotkeysLabel: "Atajos Alt+, / Alt+. (Shift = paso grande)",
    frameStepBackLabel: "Atrás",
    frameStepForwardLabel: "Adelante",
    frameStepLargeLabel: "Tamaño del paso grande (fotogramas):",
    loopHotkeysLabel: "Atajos Alt+A / Alt+B / Alt+L",

    behaviorTitle: "Comportamiento",
    autoApplyDefault: "Aplicar automáticamente esta velocidad a nuevos videos de YouTube",
    applyToAdsLabel: "Acelerar también los anuncios",
    presetsTitle: "Botones de velocidad rápida",
    presetsHint: "Seis valores que se muestran como botones arriba del popup.",
    presetLabel: (i) => `Preset ${i}`,
    resetPresetsButton: "Restaurar valores por defecto",
    speedRangeTitle: "Rango de velocidad",
    speedRangeHint: "Límites del control deslizante de arriba. Se puede ampliar hasta 0.1×–16×.",
    resetSpeedRangeButton: "Restaurar valores por defecto",
    speedRangeInvalid: "El mínimo debe ser menor que el máximo.",
    speedStepLabel: "Paso de velocidad (×):",

    channelsTitle: "Velocidades guardadas por canal",
    channelsToggle: "Mostrar / ocultar lista",
    channelMemoryLabel: "Canal actual:",
    channelMemoryNoChannel: "Abre un video de YouTube para asociar una velocidad al canal.",
    channelSavedBadge: (speed) => `guardada ${speed}`,
    channelSavePrefix: "Guardar",
    channelSaveSuffix: "para este canal",
    channelForget: "Olvidar velocidad del canal",
    channelClearAll: (count) => `Borrar todos los canales (${count})`,
    channelClearAllConfirm: "¿Eliminar las velocidades guardadas para todos los canales?",
    channelsSearchPlaceholder: "Buscar por nombre del canal…",
    channelsEmpty: "Aún no hay canales guardados.",
    channelsClearAll: "Borrar todos",
    channelsNothingFound: (q) => `No se encontró: ${q}`,
    channelsDeleted: "Eliminado.",
    statusChannelSaved: (channel, speed) => `Velocidad ${speed} guardada para el canal «${channel}».`,
    statusChannelForgotten: (channel) => `Velocidad guardada para el canal «${channel}» eliminada.`,
    statusChannelsCleared: "Velocidades por canal eliminadas.",
    statusNoChannelDetected: "No se detecta el canal. Abre una página de video de YouTube.",

    dataTitle: "Datos",
    exportButton: "Exportar configuración (JSON)",
    importButton: "Importar configuración…",
    exportedStatus: "Archivo guardado.",
    importConfirm: "¿Reemplazar la configuración actual con los datos del archivo?",
    importInvalid: "El archivo está dañado o no es de esta extensión.",
    importedStatus: (n) => `Configuraciones importadas: ${n}.`,
    dangerTitle: "Restablecimiento de fábrica",
    dangerHint: "La velocidad, el idioma, todas las preferencias y los canales guardados se borrarán. No se puede deshacer.",
    factoryResetButton: "↺ Restablecer todo",
    factoryResetConfirm: "¿Restablecer toda la configuración a los valores predeterminados?\n\nLa velocidad, el idioma y todas las preferencias se borrarán.",
  },
  ko: {
    title: "WheelPilot for YouTube",
    brandSub: "재생 설정",
    languageLabel: "언어",
    themeToggleTitle: "라이트/다크 테마 전환",
    speedLabel: "속도",
    speedRangeAria: "재생 속도",
    resetButton: "1×로 재설정",
    resetButtonTitle: "속도를 1×로 재설정\nWin: Ctrl+Shift+←\nMac: ⌘+Shift+←",
    donateButton: "♡ Telegram에서 감사하기",
    githubButton: "GitHub",
    rateButton: "★ 평가하기",
    onboardingKicker: "빠른 시작",
    onboardingTitle: "확장 프로그램을 둘러볼까요?",
    onboardingDescription: "플레이어와 시간 표시의 휠 제어, 동영상 확대 및 버튼을 확인하세요.",
    onboardingStart: "기능 보기",
    onboardingDismiss: "나중에",
    onboardingButton: "✦ 둘러보기",
    onboardingButtonTitle: "YouTube 페이지에서 기능 지도를 표시합니다",
    onboardingNeedVideo: "YouTube 동영상을 연 다음 «둘러보기»를 다시 누르세요.",
    statusDefault: "YouTube를 열고 속도를 선택하세요.",
    statusApplied: (speed) => `속도 ${speed} 적용됨.`,
    statusSaved: "속도가 저장되었습니다. 적용하려면 활성 YouTube 탭을 여세요.",
    statusOpenYoutube: "YouTube 탭을 연 다음 속도를 선택하세요.",
    presetTitle: "이 속도로 설정",

    tabPlayer: "플레이어",
    tabGeneral: "일반",

    grpPbButtonsDesc: "속도, 프레임, A-B 반복, 스크린샷",
    grpTimeProgressDesc: "남은 시간과 진행률 선",
    grpWheelZonesDesc: "영역 경계, 제스처 매핑, 방향",
    grpVolumeBoostDesc: "WebAudio로 100% 이상 음량",
    grpToolsDesc: "프레임 이동 및 구간 반복 단축키",
    grpBehaviorDesc: "속도 자동 적용 및 광고",
    grpPresetsDesc: "위쪽 버튼에 표시되는 값",
    grpSpeedRangeDesc: "슬라이더 범위와 단위",
    grpChannelsDesc: "채널마다 다른 속도",
    grpDataDesc: "설정 내보내기 및 가져오기",
    grpDangerDesc: "되돌릴 수 없는 전체 초기화",

    confirmOk: "예",
    confirmCancel: "취소",
    confirmDelete: "삭제",
    confirmReset: "초기화",
    confirmImport: "가져오기",

    statusSavedShort: "저장됨",
    statusInvalid: "값은 0.25×와 5× 사이여야 합니다.",

    pbButtonsTitle: "플레이어 컨트롤 바 버튼",
    pbButtonsHint: "YouTube 타임코드 옆 하나의 캡슐: 속도, 프레임, A-B 반복, 스크린샷.",
    pbSpeedLabel: "속도 (− N× +), 블록 위 휠로 변경",
    pbFrameLabel: "프레임 단위 이동 (◀ ▶ 및 큰 스텝)",
    pbLoopLabel: "A-B 구간 반복",
    pbScreenshotLabel: "현재 프레임 스크린샷",
    pbVideoZoomLabel: "동영상 확대 (상단 중앙 영역에서 휠)",

    timeProgressTitle: "시간 및 진행률",
    playerTimeLeftLabel: "타임코드에 현재 속도 기준 남은 시간 표시",
    miniProgressModeLabel: "플레이어 하단 진행률 선:",
    miniProgressOff: "꺼짐",
    miniProgressFullscreen: "전체 화면에서만",
    miniProgressAlways: "항상",
    miniProgressHeightLabel: "선 두께 (px):",
    miniProgressColorLabel: "선 색상:",
    miniProgressColorReset: "YouTube 빨강으로 재설정",

    wheelZonesTitle: "플레이어 휠 영역",
    wheelZonesHint:
      "플레이어 창이 세 개의 세로 영역으로 나뉩니다. 왼쪽 1/3에서 휠은 탐색, 오른쪽 1/3에서는 음량을 조절합니다. 가운데 1/3은 중립입니다.",
    wheelZonesModeLabel: "영역 활성화 시점:",
    wheelZonesModeAlways: "항상 (창 모드에서는 가운데 1/3이 여전히 페이지를 스크롤)",
    wheelZonesModeFullscreen: "전체 화면에서만",
    wheelZonesModeOff: "사용 안 함",
    wheelSeekStepLabel: "탐색 단위 (초):",
    wheelVolumeStepLabel: "음량 단위 (%):",
    zoneEdgesLabel: "영역 경계 (플레이어 너비 %):",
    zoneEdgesReset: "초기화",
    wheelSlotsTitle: "제스처 매핑",
    zoneLeftSlotLabel: "왼쪽 영역:",
    zoneRightSlotLabel: "오른쪽 영역:",
    lmbWheelSlotLabel: "왼쪽 버튼 + 휠:",
    rmbWheelSlotLabel: "오른쪽 버튼 + 휠:",
    wheelActionSpeed: "속도",
    wheelActionSeek: "탐색",
    wheelActionVolume: "음량",
    wheelActionOff: "사용 안 함",
    wheelInvertLabel: "반대로",
    lmbWheelHint: "동영상 위에서 왼쪽 마우스 버튼을 누른 채 휠을 돌리세요.",

    volumeBoostTitle: "음량 증폭",
    volumeBoostHint: "음량 100% 이후 오른쪽 영역에서 휠을 계속 돌리면 WebAudio 증폭이 켜집니다.",
    volumeBoostEnableLabel: "100% 이상 증폭 허용",
    volumeBoostMaxLabel: "증폭 한계 (%):",

    toolsTitle: "도구",
    frameStepHotkeysLabel: "Alt+, / Alt+. 단축키 (Shift = 큰 스텝)",
    frameStepBackLabel: "뒤로",
    frameStepForwardLabel: "앞으로",
    frameStepLargeLabel: "큰 스텝 크기 (프레임):",
    loopHotkeysLabel: "Alt+A / Alt+B / Alt+L 단축키",

    behaviorTitle: "동작",
    autoApplyDefault: "새 YouTube 동영상에 이 속도 자동 적용",
    applyToAdsLabel: "광고도 빠르게 재생",
    presetsTitle: "빠른 속도 프리셋",
    presetsHint: "팝업 상단에 버튼으로 표시되는 6개의 값입니다.",
    presetLabel: (i) => `프리셋 ${i}`,
    resetPresetsButton: "기본값 복원",
    speedRangeTitle: "속도 범위",
    speedRangeHint: "위 슬라이더의 범위입니다. 0.1×–16×까지 확장할 수 있습니다.",
    resetSpeedRangeButton: "기본값 복원",
    speedRangeInvalid: "최소값은 최대값보다 작아야 합니다.",
    speedStepLabel: "속도 단위 (×):",

    channelsTitle: "저장된 채널 속도",
    channelsToggle: "목록 표시 / 숨기기",
    channelMemoryLabel: "현재 채널:",
    channelMemoryNoChannel: "YouTube 동영상을 열면 채널에 속도를 저장할 수 있습니다.",
    channelSavedBadge: (speed) => `저장됨 ${speed}`,
    channelSavePrefix: "저장",
    channelSaveSuffix: "이 채널에",
    channelForget: "이 채널 속도 잊기",
    channelClearAll: (count) => `모든 채널 초기화 (${count})`,
    channelClearAllConfirm: "모든 채널의 저장된 속도를 삭제하시겠습니까?",
    channelsSearchPlaceholder: "채널 이름 검색…",
    channelsEmpty: "저장된 채널이 아직 없습니다.",
    channelsClearAll: "모두 지우기",
    channelsNothingFound: (q) => `검색 결과 없음: ${q}`,
    channelsDeleted: "삭제됨.",
    statusChannelSaved: (channel, speed) => `"${channel}" 채널에 속도 ${speed}를 저장했습니다.`,
    statusChannelForgotten: (channel) => `"${channel}" 채널의 저장된 속도를 삭제했습니다.`,
    statusChannelsCleared: "모든 채널별 속도 설정이 삭제되었습니다.",
    statusNoChannelDetected: "채널을 감지할 수 없습니다. YouTube 동영상 페이지를 여세요.",

    dataTitle: "데이터",
    exportButton: "설정 내보내기 (JSON)",
    importButton: "설정 가져오기…",
    exportedStatus: "파일이 저장되었습니다.",
    importConfirm: "파일의 데이터로 현재 설정을 교체할까요?",
    importInvalid: "파일이 손상되었거나 이 확장 프로그램의 파일이 아닙니다.",
    importedStatus: (n) => `가져온 설정: ${n}개.`,
    dangerTitle: "공장 초기화",
    dangerHint: "속도, 언어, 모든 설정 및 저장된 채널이 초기화됩니다. 되돌릴 수 없습니다.",
    factoryResetButton: "↺ 모두 초기화",
    factoryResetConfirm: "모든 설정을 초기값으로 되돌리시겠습니까?\n\n속도, 언어 및 모든 설정이 초기화됩니다.",
  },
};

let currentLanguage = DEFAULT_LANGUAGE;

// --- Общие DOM-ссылки ---------------------------------------------------------

const speedRange = document.getElementById("speedRange");
const currentSpeedEl = document.getElementById("currentSpeed");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const donateButton = document.getElementById("donateButton");
const githubButton = document.getElementById("githubButton");
const rateButton = document.getElementById("rateButton");
const onboardingPrompt = document.getElementById("onboardingPrompt");
const onboardingStartButton = document.getElementById("onboardingStartButton");
const onboardingDismissButton = document.getElementById("onboardingDismissButton");
const onboardingButton = document.getElementById("onboardingButton");
const languageSelect = document.getElementById("languageSelect");
const themeToggleButton = document.getElementById("themeToggleButton");
const presetButtons = document.querySelectorAll("#presets .preset-btn");
const speedRangeMinLabel = document.getElementById("speedRangeMinLabel");
const speedRangeMaxLabel = document.getElementById("speedRangeMaxLabel");

const confirmOverlay = document.getElementById("confirmOverlay");
const confirmText = document.getElementById("confirmText");
const confirmOkButton = document.getElementById("confirmOk");
const confirmCancelButton = document.getElementById("confirmCancel");

const tabButtons = document.querySelectorAll(".pp-tab-btn");
const tabPanels = document.querySelectorAll(".pp-panel");

let sliderDebounceTimer = null;

// --- Хелперы ------------------------------------------------------------------

function clampSpeed(value) {
  const speed = Number(value);
  if (Number.isNaN(speed)) return DEFAULT_SPEED;
  return Math.min(MAX_SPEED, Math.max(MIN_SPEED, Math.round(speed * 100) / 100));
}

function clampHardSpeed(value, fallback) {
  const n = Number(value);
  if (!isFinite(n)) return fallback;
  return Math.min(HARD_SPEED_MAX, Math.max(HARD_SPEED_MIN, Math.round(n * 100) / 100));
}

// Применяет границы скорости к пинним-ползунку и к MIN_SPEED/MAX_SPEED —
// используются также редактором пресетов на вкладке «Общее».
function applySpeedBounds(rawMin, rawMax) {
  const safeMin = clampHardSpeed(rawMin, DEFAULT_SPEED_MIN);
  let safeMax = clampHardSpeed(rawMax, DEFAULT_SPEED_MAX);
  if (safeMax < safeMin) safeMax = safeMin;
  MIN_SPEED = safeMin;
  MAX_SPEED = safeMax;
  if (speedRange) {
    speedRange.min = String(safeMin);
    speedRange.max = String(safeMax);
  }
  // Подписи концов ползунка — редизайн 2026-08-02.
  if (speedRangeMinLabel) speedRangeMinLabel.textContent = formatSpeed(safeMin);
  if (speedRangeMaxLabel) speedRangeMaxLabel.textContent = formatSpeed(safeMax);
}

function formatSpeed(speed) {
  return `${clampSpeed(speed).toFixed(2).replace(/\.?0+$/, "")}×`;
}

function clampSpeedStep(value) {
  const n = Number(value);
  if (!isFinite(n)) return DEFAULT_SPEED_STEP;
  return Math.min(SPEED_STEP_MAX, Math.max(SPEED_STEP_MIN, Math.round(n * 20) / 20));
}

function clampFrameStep(value) {
  const n = Math.round(Number(value));
  if (!isFinite(n) || n < FRAME_STEP_MIN) return DEFAULT_FRAME_STEP_LARGE;
  return Math.min(FRAME_STEP_MAX, Math.max(FRAME_STEP_MIN, n));
}

function clampWheelSeekStep(value) {
  const n = Math.round(Number(value));
  if (!isFinite(n)) return DEFAULT_WHEEL_SEEK_STEP;
  return Math.min(60, Math.max(1, n));
}

function clampWheelVolumeStep(value) {
  const n = Math.round(Number(value));
  if (!isFinite(n)) return DEFAULT_WHEEL_VOLUME_STEP;
  return Math.min(20, Math.max(1, n));
}

function clampMiniProgressHeight(value) {
  const n = Math.round(Number(value));
  if (!isFinite(n)) return DEFAULT_MINI_PROGRESS_HEIGHT;
  return Math.min(MINI_PROGRESS_HEIGHT_MAX, Math.max(MINI_PROGRESS_HEIGHT_MIN, n));
}

function normalizeHexColor(value) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value)
    ? value
    : DEFAULT_MINI_PROGRESS_COLOR;
}

function clampVolumeBoostMax(value) {
  const n = Math.round(Number(value) / 10) * 10;
  if (!isFinite(n)) return DEFAULT_VOLUME_BOOST_MAX;
  return Math.min(VOLUME_BOOST_MAX_MAX, Math.max(VOLUME_BOOST_MAX_MIN, n));
}

function normalizeWheelZonesMode(v) {
  return ["off", "fullscreen", "always"].includes(v) ? v : DEFAULT_WHEEL_ZONES_MODE;
}

// Единый набор действий на колесо для всех слотов (зоны, ЛКМ, ПКМ).
function normalizeWheelAction(v, fallback) {
  return ["off", "seek", "speed", "volume"].includes(v) ? v : fallback;
}

function normalizeLmbWheelAction(v) {
  return normalizeWheelAction(v, DEFAULT_LMB_WHEEL_ACTION);
}

// Границы зон валидны только в паре: левая ∈ [ZONE_EDGE_MIN, правая − GAP],
// правая ∈ [левая + GAP, ZONE_EDGE_MAX]. Дублирует normalizeZoneEdges из
// content.js — держать синхронно.
function normalizeZoneEdges(left, right) {
  let l = Math.round(Number(left));
  let r = Math.round(Number(right));
  if (!isFinite(l)) l = DEFAULT_ZONE_LEFT_EDGE;
  if (!isFinite(r)) r = DEFAULT_ZONE_RIGHT_EDGE;
  l = Math.min(ZONE_EDGE_MAX - ZONE_EDGE_GAP, Math.max(ZONE_EDGE_MIN, l));
  r = Math.min(ZONE_EDGE_MAX, Math.max(ZONE_EDGE_MIN + ZONE_EDGE_GAP, r));
  if (l > r - ZONE_EDGE_GAP) l = r - ZONE_EDGE_GAP;
  return [l, r];
}

function normalizeMiniProgressMode(v) {
  return ["off", "fullscreen", "always"].includes(v) ? v : DEFAULT_MINI_PROGRESS;
}

function normalizeLanguage(language) {
  const normalizedLanguage = String(language || "").slice(0, 2).toLowerCase();
  return SUPPORTED_LANGUAGES.includes(normalizedLanguage) ? normalizedLanguage : DEFAULT_LANGUAGE;
}

function getDefaultLanguage() {
  try {
    if (chrome && chrome.i18n && typeof chrome.i18n.getUILanguage === "function") {
      return normalizeLanguage(chrome.i18n.getUILanguage());
    }
  } catch {
    // chrome.i18n может быть недоступен в нестандартных контекстах.
  }
  return DEFAULT_LANGUAGE;
}

function translate(key, ...args) {
  const dictionary = translations[currentLanguage] || translations[DEFAULT_LANGUAGE];
  const value = dictionary[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("theme-light", isLight);
  if (themeToggleButton) themeToggleButton.textContent = isLight ? "☀" : "🌙";
}

async function toggleTheme() {
  const isLight = document.body.classList.contains("theme-light");
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  await chrome.storage.sync.set({ [THEME_STORAGE_KEY]: next });
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  languageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (element.querySelector("img")) {
      const textNode = [...element.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) textNode.textContent = translate(element.dataset.i18n);
    } else {
      element.textContent = translate(element.dataset.i18n);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = translate(element.dataset.i18nTitle);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });
}

// Подсветка пресета, совпадающего с текущей скоростью — редизайн 2026-08-02.
function markActivePreset(speed) {
  const safeSpeed = clampSpeed(speed);
  presetButtons.forEach((button) => {
    const presetSpeed = Number(button.dataset.speed);
    button.classList.toggle("active", Math.abs(presetSpeed - safeSpeed) < 0.001);
  });
}

function updateUi(speed) {
  const safeSpeed = clampSpeed(speed);
  speedRange.value = String(safeSpeed);
  currentSpeedEl.textContent = formatSpeed(safeSpeed);
  markActivePreset(safeSpeed);
}

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle("error", isError);
}

let temporaryStatusTimer = null;
function setTemporaryStatus(message, isError = false, ms = 2500) {
  const previousMessage = statusText.textContent;
  const previousIsError = statusText.classList.contains("error");
  window.clearTimeout(temporaryStatusTimer);
  setStatus(message, isError);
  temporaryStatusTimer = window.setTimeout(() => {
    setStatus(previousMessage, previousIsError);
  }, ms);
}

// Статус-строка карточки: общий хелпер для всех второстепенных настроек
// (раньше это были 6 почти одинаковых функций в options.js).
function setCardStatus(el, message, isError = false, ms = 1800) {
  if (!el) return;
  el.textContent = message || "";
  el.classList.toggle("error", Boolean(isError));
  if (message) {
    window.clearTimeout(el._timer);
    el._timer = window.setTimeout(() => {
      el.textContent = "";
      el.classList.remove("error");
    }, ms);
  }
}

// Focus on the hidden file input or dialog buttons can scroll the root popup
// even with overflow:hidden. Keep only the settings panel independently scrollable.
function restorePopupViewport() {
  window.scrollTo(0, 0);
}

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

async function sendMessageToActiveTab(message) {
  const tab = await getActiveTab();
  if (!tab || !tab.id) throw new Error("Активная вкладка не найдена.");
  return chrome.tabs.sendMessage(tab.id, message);
}

// Обобщённый confirm — общая замена showConfirm (popup) + confirmDialog
// (options). okKey задаёт подпись подтверждающей кнопки.
function showConfirm(message, okKey = "confirmOk") {
  return new Promise((resolve) => {
    confirmText.textContent = message;
    confirmOkButton.textContent = translate(okKey);
    confirmCancelButton.textContent = translate("confirmCancel");
    confirmOverlay.hidden = false;

    const finish = (result) => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      confirmOverlay.hidden = true;
      confirmOkButton.removeEventListener("click", onOk);
      confirmCancelButton.removeEventListener("click", onCancel);
      document.removeEventListener("keydown", onKey);
      restorePopupViewport();
      window.requestAnimationFrame(restorePopupViewport);
      resolve(result);
    };

    const onOk = () => finish(true);
    const onCancel = () => finish(false);
    const onKey = (event) => {
      if (event.key === "Escape") finish(false);
      if (event.key === "Enter") finish(true);
    };

    confirmOkButton.addEventListener("click", onOk);
    confirmCancelButton.addEventListener("click", onCancel);
    document.addEventListener("keydown", onKey);
    confirmOkButton.focus({ preventScroll: true });
  });
}

// Простые обёртки для повторяющихся паттернов «чекбокс/select/radio →
// storage, с колёсной подсказкой статуса». Сокращают ~20 почти одинаковых
// обработчиков, унаследованных от options.js, до вызовов в одну строку.
function bindCheckbox(el, storageKey, statusEl) {
  if (!el) return;
  el.addEventListener("change", async () => {
    await chrome.storage.sync.set({ [storageKey]: el.checked });
    setCardStatus(statusEl, translate("statusSavedShort"));
  });
}

function bindSelect(el, storageKey, normalizeFn, statusEl) {
  if (!el) return;
  el.addEventListener("change", async () => {
    await chrome.storage.sync.set({ [storageKey]: normalizeFn(el.value) });
    setCardStatus(statusEl, translate("statusSavedShort"));
  });
}

function bindRadioGroup(radios, storageKey, normalizeFn, statusEl) {
  radios.forEach((radio) => {
    radio.addEventListener("change", async () => {
      if (!radio.checked) return;
      await chrome.storage.sync.set({ [storageKey]: normalizeFn(radio.value) });
      setCardStatus(statusEl, translate("statusSavedShort"));
    });
  });
}

// Числовое поле: дебаунс на ввод + нормализация на blur.
function bindNumberInput(input, storageKey, clampFn, statusEl, debounceMs = 400) {
  if (!input) return;
  let timer = null;
  input.addEventListener("input", () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(async () => {
      await chrome.storage.sync.set({ [storageKey]: clampFn(input.value) });
      setCardStatus(statusEl, translate("statusSavedShort"));
    }, debounceMs);
  });
  input.addEventListener("blur", async () => {
    window.clearTimeout(timer);
    const safe = clampFn(input.value);
    input.value = String(safe);
    await chrome.storage.sync.set({ [storageKey]: safe });
    setCardStatus(statusEl, translate("statusSavedShort"));
  });
}

// --- Вкладки -------------------------------------------------------------------
// В отличие от options.html, popup открывается каждый раз с чистым URL —
// hash не переживает переоткрытие. Активная вкладка хранится в localStorage
// (состояние UI одного устройства, не нужно тратить квоту storage.sync).

function activateTab(name, { focus = false } = {}) {
  const safe = TAB_NAMES.includes(name) ? name : TAB_NAMES[0];

  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === safe;
    btn.setAttribute("aria-selected", String(isActive));
    btn.classList.toggle("active", isActive);
    btn.tabIndex = isActive ? 0 : -1;
    if (isActive && focus) btn.focus();
  });

  tabPanels.forEach((panel) => {
    panel.hidden = panel.id !== `tab-${safe}`;
  });

  try {
    localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, safe);
  } catch {
    // localStorage может быть недоступен в приватных режимах — не критично.
  }
}

tabButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  btn.addEventListener("keydown", (e) => {
    let nextIndex = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = tabButtons.length - 1;
    if (nextIndex === null) return;
    e.preventDefault();
    activateTab(tabButtons[nextIndex].dataset.tab, { focus: true });
  });
});

// --- Группы-аккордеоны ------------------------------------------------------
// Редизайн 2026-08-02: карточки настроек свёрнуты в группы. Какие из них
// раскрыты — состояние UI одного устройства, поэтому localStorage, как и
// активная вкладка. Начальное состояние (класс open) задано в разметке и
// используется, пока пользователь ничего не сворачивал.

const GROUPS_STORAGE_KEY = "ysbPopupGroups";
const groupElements = document.querySelectorAll(".group[data-group]");

function setGroupOpen(group, isOpen) {
  group.classList.toggle("open", isOpen);
  const head = group.querySelector(".group-head");
  if (head) head.setAttribute("aria-expanded", String(isOpen));
}

function saveOpenGroups() {
  const open = Array.from(groupElements)
    .filter((group) => group.classList.contains("open"))
    .map((group) => group.dataset.group);
  try {
    localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(open));
  } catch {
    // localStorage может быть недоступен в приватных режимах — не критично.
  }
}

function readOpenGroups() {
  try {
    const raw = localStorage.getItem(GROUPS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const savedOpenGroups = readOpenGroups();

groupElements.forEach((group) => {
  if (savedOpenGroups) setGroupOpen(group, savedOpenGroups.includes(group.dataset.group));

  const head = group.querySelector(".group-head");
  if (!head) return;
  head.addEventListener("click", () => {
    setGroupOpen(group, !group.classList.contains("open"));
    saveOpenGroups();
  });
});

// --- Пинним-блок скорости -------------------------------------------------------

function normalizePresets(value) {
  const arr = Array.isArray(value) ? value : DEFAULT_PRESETS;
  const result = [];
  for (let i = 0; i < 6; i++) {
    const speed = clampSpeed(arr[i]);
    result.push(speed || DEFAULT_PRESETS[i]);
  }
  return result;
}

function renderPresets(presets) {
  const safe = normalizePresets(presets);
  presetButtons.forEach((button, index) => {
    const speed = safe[index];
    button.textContent = formatSpeed(speed);
    button.dataset.speed = String(speed);
    button.title = translate("presetTitle");
  });
  markActivePreset(speedRange.value);
}

async function applySpeed(rawSpeed) {
  const speed = clampSpeed(rawSpeed);
  updateUi(speed);
  channelState.currentSpeed = speed;
  renderChannelSection();

  await chrome.storage.sync.set({ [STORAGE_KEY]: speed });

  try {
    await sendMessageToActiveTab({ type: "YT_SPEED_SET", speed });
    setStatus(translate("statusApplied", formatSpeed(speed)));
  } catch {
    setStatus(translate("statusSaved"), true);
  }
}

speedRange.addEventListener("input", () => {
  const speed = clampSpeed(speedRange.value);
  currentSpeedEl.textContent = formatSpeed(speed);
  markActivePreset(speed);
  window.clearTimeout(sliderDebounceTimer);
  sliderDebounceTimer = window.setTimeout(() => applySpeed(speedRange.value), 300);
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => applySpeed(button.dataset.speed));
});

resetButton.addEventListener("click", () => applySpeed(1));

languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value));
themeToggleButton.addEventListener("click", () => toggleTheme());
donateButton.addEventListener("click", () => openTelegramSupport());
githubButton.addEventListener("click", () => openGitHubPage());
rateButton.addEventListener("click", () => openRatePage());

async function initOnboardingPrompt() {
  if (!onboardingPrompt) return;

  const data = await chrome.storage.local.get({
    [ONBOARDING_STORAGE_KEY]: null,
  });
  const state = data[ONBOARDING_STORAGE_KEY];
  const shouldShow =
    !state || state.version !== ONBOARDING_VERSION || !state.promptSeen;

  onboardingPrompt.hidden = !shouldShow;
  if (!shouldShow) return;

  await chrome.storage.local.set({
    [ONBOARDING_STORAGE_KEY]: {
      version: ONBOARDING_VERSION,
      promptSeen: true,
      completed: false,
    },
  });
}

async function startOnboarding({ keepPromptOnError = false } = {}) {
  if (onboardingStartButton) onboardingStartButton.disabled = true;
  if (onboardingButton) onboardingButton.disabled = true;

  try {
    const response = await sendMessageToActiveTab({
      type: "YSB_ONBOARDING_START",
      version: ONBOARDING_VERSION,
      language: currentLanguage,
    });

    if (!response || response.ok !== true) {
      throw new Error(response && response.reason ? response.reason : "not-watch-page");
    }

    if (onboardingPrompt) onboardingPrompt.hidden = true;
    window.close();
  } catch {
    if (keepPromptOnError && onboardingPrompt) onboardingPrompt.hidden = false;
    setStatus(translate("onboardingNeedVideo"), true);
  } finally {
    if (onboardingStartButton) onboardingStartButton.disabled = false;
    if (onboardingButton) onboardingButton.disabled = false;
  }
}

if (onboardingStartButton) {
  onboardingStartButton.addEventListener("click", () =>
    startOnboarding({ keepPromptOnError: true }),
  );
}

if (onboardingDismissButton) {
  onboardingDismissButton.addEventListener("click", () => {
    if (onboardingPrompt) onboardingPrompt.hidden = true;
  });
}

if (onboardingButton) {
  onboardingButton.addEventListener("click", () => startOnboarding());
}

async function applyLanguage(language) {
  currentLanguage = normalizeLanguage(language);
  applyTranslations();
  renderChannelSection();
  renderPresetLabels();
  setStatus(translate("statusDefault"));

  await chrome.storage.sync.set({ [LANGUAGE_STORAGE_KEY]: currentLanguage });

  try {
    await sendMessageToActiveTab({ type: "YT_LANGUAGE_SET", language: currentLanguage });
  } catch {
    // Активная вкладка может быть не YouTube. Язык всё равно сохранён.
  }
}

async function openTelegramSupport() {
  await chrome.tabs.create({ url: TELEGRAM_SUPPORT_URL });
}

async function openGitHubPage() {
  await chrome.tabs.create({ url: GITHUB_URL });
}

async function openRatePage() {
  await chrome.tabs.create({ url: CHROME_STORE_URL });
}

// --- Плеер: кнопки в панели плеера ----------------------------------------------

bindCheckbox(document.getElementById("playerButtonsToggle"), PLAYER_BUTTONS_STORAGE_KEY, document.getElementById("pbButtonsStatus"));
bindCheckbox(document.getElementById("pbFrameButtonsToggle"), PB_FRAME_BUTTONS_STORAGE_KEY, document.getElementById("pbButtonsStatus"));
bindCheckbox(document.getElementById("pbLoopButtonsToggle"), PB_LOOP_BUTTONS_STORAGE_KEY, document.getElementById("pbButtonsStatus"));
bindCheckbox(document.getElementById("screenshotButtonToggle"), SCREENSHOT_BUTTON_STORAGE_KEY, document.getElementById("pbButtonsStatus"));
bindCheckbox(document.getElementById("videoZoomToggle"), VIDEO_ZOOM_STORAGE_KEY, document.getElementById("pbButtonsStatus"));

// --- Плеер: время и прогресс -----------------------------------------------------

bindCheckbox(document.getElementById("playerTimeLeftToggle"), PLAYER_TIME_LEFT_STORAGE_KEY, document.getElementById("timeProgressStatus"));
bindSelect(document.getElementById("miniProgressMode"), MINI_PROGRESS_STORAGE_KEY, normalizeMiniProgressMode, document.getElementById("timeProgressStatus"));
bindNumberInput(document.getElementById("miniProgressHeight"), MINI_PROGRESS_HEIGHT_STORAGE_KEY, clampMiniProgressHeight, document.getElementById("timeProgressStatus"));

const miniProgressColorInput = document.getElementById("miniProgressColor");
if (miniProgressColorInput) {
  miniProgressColorInput.addEventListener("input", async () => {
    const safe = normalizeHexColor(miniProgressColorInput.value);
    await chrome.storage.sync.set({ [MINI_PROGRESS_COLOR_STORAGE_KEY]: safe });
    setCardStatus(document.getElementById("timeProgressStatus"), translate("statusSavedShort"));
  });
}
const miniProgressColorResetBtn = document.getElementById("miniProgressColorReset");
if (miniProgressColorResetBtn) {
  miniProgressColorResetBtn.addEventListener("click", async () => {
    miniProgressColorInput.value = DEFAULT_MINI_PROGRESS_COLOR;
    await chrome.storage.sync.set({ [MINI_PROGRESS_COLOR_STORAGE_KEY]: DEFAULT_MINI_PROGRESS_COLOR });
    setCardStatus(document.getElementById("timeProgressStatus"), translate("statusSavedShort"));
  });
}

// --- Плеер: колесо мыши -----------------------------------------------------------

bindRadioGroup(
  document.querySelectorAll('input[name="wheelZonesMode"]'),
  WHEEL_ZONES_MODE_STORAGE_KEY,
  normalizeWheelZonesMode,
  document.getElementById("wheelZonesStatus"),
);
bindNumberInput(document.getElementById("wheelSeekStepInput"), WHEEL_SEEK_STEP_STORAGE_KEY, clampWheelSeekStep, document.getElementById("wheelZonesStatus"));
bindNumberInput(document.getElementById("wheelVolumeStepInput"), WHEEL_VOLUME_STEP_STORAGE_KEY, clampWheelVolumeStep, document.getElementById("wheelZonesStatus"));

// Четыре слота жестов: действие + инверсия направления.
const wheelSlotsStatus = document.getElementById("lmbWheelStatus");
bindSelect(document.getElementById("zoneLeftActionSelect"), ZONE_LEFT_ACTION_STORAGE_KEY, (v) => normalizeWheelAction(v, DEFAULT_ZONE_LEFT_ACTION), wheelSlotsStatus);
bindSelect(document.getElementById("zoneRightActionSelect"), ZONE_RIGHT_ACTION_STORAGE_KEY, (v) => normalizeWheelAction(v, DEFAULT_ZONE_RIGHT_ACTION), wheelSlotsStatus);
bindSelect(document.getElementById("lmbWheelActionSelect"), LMB_WHEEL_ACTION_STORAGE_KEY, normalizeLmbWheelAction, wheelSlotsStatus);
bindSelect(document.getElementById("rmbWheelActionSelect"), RMB_WHEEL_ACTION_STORAGE_KEY, (v) => normalizeWheelAction(v, DEFAULT_RMB_WHEEL_ACTION), wheelSlotsStatus);
bindCheckbox(document.getElementById("zoneLeftInvertToggle"), ZONE_LEFT_INVERT_STORAGE_KEY, wheelSlotsStatus);
bindCheckbox(document.getElementById("zoneRightInvertToggle"), ZONE_RIGHT_INVERT_STORAGE_KEY, wheelSlotsStatus);
bindCheckbox(document.getElementById("lmbWheelInvertToggle"), LMB_WHEEL_INVERT_STORAGE_KEY, wheelSlotsStatus);
bindCheckbox(document.getElementById("rmbWheelInvertToggle"), RMB_WHEEL_INVERT_STORAGE_KEY, wheelSlotsStatus);

// Интерактивная полоса границ зон: два range поверх трёхсегментного трека.
// Ползунки не могут перепрыгнуть друг друга — зажимаем при вводе.
const zoneLeftEdgeInput = document.getElementById("zoneLeftEdgeInput");
const zoneRightEdgeInput = document.getElementById("zoneRightEdgeInput");
const zonesRangeValues = document.getElementById("zonesRangeValues");
const zonesRangeEl = document.getElementById("zonesRange");
let zoneEdgesSaveTimer = null;

function renderZoneEdges(left, right) {
  if (zoneLeftEdgeInput) zoneLeftEdgeInput.value = String(left);
  if (zoneRightEdgeInput) zoneRightEdgeInput.value = String(right);
  if (zonesRangeValues) zonesRangeValues.textContent = `${left}% / ${right}%`;
  if (zonesRangeEl) {
    const segs = zonesRangeEl.querySelectorAll(".zones-range-seg");
    const widths = [left, right - left, 100 - right];
    segs.forEach((seg, i) => {
      seg.style.width = `${widths[i]}%`;
    });
  }
}

function saveZoneEdges() {
  const [l, r] = normalizeZoneEdges(zoneLeftEdgeInput.value, zoneRightEdgeInput.value);
  renderZoneEdges(l, r);
  window.clearTimeout(zoneEdgesSaveTimer);
  zoneEdgesSaveTimer = window.setTimeout(async () => {
    await chrome.storage.sync.set({
      [ZONE_LEFT_EDGE_STORAGE_KEY]: l,
      [ZONE_RIGHT_EDGE_STORAGE_KEY]: r,
    });
    setCardStatus(document.getElementById("wheelZonesStatus"), translate("statusSavedShort"));
  }, 300);
}

if (zoneLeftEdgeInput && zoneRightEdgeInput) {
  zoneLeftEdgeInput.addEventListener("input", () => {
    // Левый не правее правого минус зазор — центральная зона не схлопывается.
    const maxL = Number(zoneRightEdgeInput.value) - ZONE_EDGE_GAP;
    if (Number(zoneLeftEdgeInput.value) > maxL) zoneLeftEdgeInput.value = String(maxL);
    saveZoneEdges();
  });
  zoneRightEdgeInput.addEventListener("input", () => {
    const minR = Number(zoneLeftEdgeInput.value) + ZONE_EDGE_GAP;
    if (Number(zoneRightEdgeInput.value) < minR) zoneRightEdgeInput.value = String(minR);
    saveZoneEdges();
  });
}

const zoneEdgesResetBtn = document.getElementById("zoneEdgesReset");
if (zoneEdgesResetBtn) {
  zoneEdgesResetBtn.addEventListener("click", async () => {
    renderZoneEdges(DEFAULT_ZONE_LEFT_EDGE, DEFAULT_ZONE_RIGHT_EDGE);
    window.clearTimeout(zoneEdgesSaveTimer);
    await chrome.storage.sync.set({
      [ZONE_LEFT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_LEFT_EDGE,
      [ZONE_RIGHT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_RIGHT_EDGE,
    });
    setCardStatus(document.getElementById("wheelZonesStatus"), translate("statusSavedShort"));
  });
}

// --- Плеер: звук -------------------------------------------------------------------

bindCheckbox(document.getElementById("volumeBoostToggle"), VOLUME_BOOST_STORAGE_KEY, document.getElementById("volumeBoostStatus"));
bindNumberInput(document.getElementById("volumeBoostMaxInput"), VOLUME_BOOST_MAX_STORAGE_KEY, clampVolumeBoostMax, document.getElementById("volumeBoostStatus"));

// --- Плеер: инструменты -------------------------------------------------------------

bindCheckbox(document.getElementById("frameStepHotkeys"), FRAME_STEP_HOTKEYS_STORAGE_KEY, document.getElementById("toolsStatus"));
bindNumberInput(document.getElementById("frameStepBackInput"), FRAME_STEP_BACK_STORAGE_KEY, clampFrameStep, document.getElementById("toolsStatus"));
bindNumberInput(document.getElementById("frameStepForwardInput"), FRAME_STEP_FORWARD_STORAGE_KEY, clampFrameStep, document.getElementById("toolsStatus"));
bindCheckbox(document.getElementById("loopHotkeys"), LOOP_HOTKEYS_STORAGE_KEY, document.getElementById("toolsStatus"));

// --- Общее: поведение ---------------------------------------------------------------

const autoApplyCheckbox = document.getElementById("autoApplyDefault");
if (autoApplyCheckbox) {
  autoApplyCheckbox.addEventListener("change", async () => {
    const enabled = autoApplyCheckbox.checked;
    await chrome.storage.sync.set({ [AUTO_APPLY_STORAGE_KEY]: enabled });
    try {
      await sendMessageToActiveTab({ type: "YT_AUTO_APPLY_SET", enabled });
    } catch {
      // Активная вкладка может быть не YouTube.
    }
    setCardStatus(document.getElementById("behaviorStatus"), translate("statusSavedShort"));
  });
}
bindCheckbox(document.getElementById("applyToAds"), APPLY_TO_ADS_STORAGE_KEY, document.getElementById("behaviorStatus"));

// --- Общее: скорость (пресеты-редактор, диапазон, шаг) -------------------------------

const presetsGrid = document.getElementById("presetsGrid");

function getCurrentPresetInputs() {
  return presetsGrid ? presetsGrid.querySelectorAll('input[type="number"]') : [];
}

function renderPresetInputs(values) {
  if (!presetsGrid) return;
  presetsGrid.innerHTML = "";
  values.forEach((speed, index) => {
    const row = document.createElement("div");
    row.className = "preset-row";

    const label = document.createElement("label");
    label.htmlFor = `preset-${index}`;
    label.textContent = translate("presetLabel", index + 1);

    const wrap = document.createElement("div");
    wrap.className = "input-wrap";

    const input = document.createElement("input");
    input.type = "number";
    input.id = `preset-${index}`;
    input.min = String(MIN_SPEED);
    input.max = String(MAX_SPEED);
    input.step = "0.05";
    input.value = String(speed);
    input.dataset.index = String(index);

    const suffix = document.createElement("span");
    suffix.className = "suffix";
    suffix.textContent = "×";

    wrap.append(input, suffix);
    row.append(label, wrap);
    presetsGrid.append(row);

    input.addEventListener("input", onPresetEditorInput);
    input.addEventListener("blur", onPresetEditorBlur);
  });
}

function renderPresetLabels() {
  getCurrentPresetInputs().forEach((input, i) => {
    const label = input.closest(".preset-row")?.querySelector("label");
    if (label) label.textContent = translate("presetLabel", i + 1);
  });
}

function validatePresetInputs() {
  let allValid = true;
  getCurrentPresetInputs().forEach((input) => {
    const n = Number(input.value);
    const valid = isFinite(n) && n >= MIN_SPEED && n <= MAX_SPEED;
    input.classList.toggle("invalid", !valid);
    if (!valid) allValid = false;
  });
  return allValid;
}

let presetsSaveTimer = null;

function onPresetEditorInput() {
  validatePresetInputs();
  window.clearTimeout(presetsSaveTimer);
  presetsSaveTimer = window.setTimeout(savePresetsFromEditor, 400);
}

async function onPresetEditorBlur(e) {
  const input = e.target;
  const idx = Number(input.dataset.index);
  const safe = clampSpeed(input.value) || DEFAULT_PRESETS[idx] || 1.5;
  input.value = String(safe);
  input.classList.remove("invalid");
  await savePresetsFromEditor();
}

async function savePresetsFromEditor() {
  const presetsStatusEl = document.getElementById("presetsStatus");
  if (!validatePresetInputs()) {
    setCardStatus(presetsStatusEl, translate("statusInvalid"), true, 2500);
    return;
  }
  const presets = Array.from(getCurrentPresetInputs()).map(
    (input, i) => clampSpeed(input.value) || DEFAULT_PRESETS[i] || 1.5,
  );
  await chrome.storage.sync.set({ [PRESETS_STORAGE_KEY]: presets });
  renderPresets(presets);
  setCardStatus(presetsStatusEl, translate("statusSavedShort"), false, 2500);
}

const resetPresetsButton = document.getElementById("resetPresetsButton");
if (resetPresetsButton) {
  resetPresetsButton.addEventListener("click", async () => {
    await chrome.storage.sync.set({ [PRESETS_STORAGE_KEY]: DEFAULT_PRESETS });
    renderPresetInputs(DEFAULT_PRESETS);
    renderPresets(DEFAULT_PRESETS);
    setCardStatus(document.getElementById("presetsStatus"), translate("statusSavedShort"), false, 2500);
  });
}

// Двусторонний слайдер диапазона скорости
const speedMinInput = document.getElementById("speedMinInput");
const speedMaxInput = document.getElementById("speedMaxInput");
const speedRangeTrack = document.getElementById("speedRangeTrack");
const speedRangeFill = document.getElementById("speedRangeFill");
const speedRangeMinHandle = document.getElementById("speedRangeMinHandle");
const speedRangeMaxHandle = document.getElementById("speedRangeMaxHandle");
const resetSpeedRangeButton = document.getElementById("resetSpeedRangeButton");
const speedRangeStatusEl = document.getElementById("speedRangeStatus");

let currentMin = DEFAULT_SPEED_MIN;
let currentMax = DEFAULT_SPEED_MAX;
let speedRangeSaveTimer = null;

function speedToPercent(speed) {
  const t = (speed - HARD_SPEED_MIN) / (HARD_SPEED_MAX - HARD_SPEED_MIN);
  return Math.max(0, Math.min(1, t)) * 100;
}

function percentToSpeed(percent) {
  const t = Math.max(0, Math.min(1, percent / 100));
  return Math.round((HARD_SPEED_MIN + t * (HARD_SPEED_MAX - HARD_SPEED_MIN)) * 100) / 100;
}

function renderSpeedRangeTrack() {
  if (!speedRangeTrack) return;
  const minPct = speedToPercent(currentMin);
  const maxPct = speedToPercent(currentMax);
  speedRangeMinHandle.style.left = `${minPct}%`;
  speedRangeMaxHandle.style.left = `${maxPct}%`;
  speedRangeFill.style.left = `${minPct}%`;
  speedRangeFill.style.width = `${Math.max(0, maxPct - minPct)}%`;
  speedMinInput.value = String(currentMin);
  speedMaxInput.value = String(currentMax);
  speedRangeMinHandle.setAttribute("aria-valuenow", String(currentMin));
  speedRangeMaxHandle.setAttribute("aria-valuenow", String(currentMax));
}

function scheduleSaveSpeedRange() {
  window.clearTimeout(speedRangeSaveTimer);
  speedRangeSaveTimer = window.setTimeout(saveSpeedRange, 250);
}

async function saveSpeedRange() {
  if (currentMax <= currentMin) {
    setCardStatus(speedRangeStatusEl, translate("speedRangeInvalid"), true, 2200);
    speedMinInput.classList.add("invalid");
    speedMaxInput.classList.add("invalid");
    return;
  }
  speedMinInput.classList.remove("invalid");
  speedMaxInput.classList.remove("invalid");
  await chrome.storage.sync.set({
    [SPEED_MIN_STORAGE_KEY]: currentMin,
    [SPEED_MAX_STORAGE_KEY]: currentMax,
  });
  applySpeedBounds(currentMin, currentMax);
  setCardStatus(speedRangeStatusEl, translate("statusSavedShort"), false, 2200);
}

if (speedRangeTrack) {
  function startHandleDrag(event, which) {
    event.preventDefault();
    const handle = event.currentTarget;
    try { handle.setPointerCapture(event.pointerId); } catch { /* ignore */ }
    const trackRect = speedRangeTrack.getBoundingClientRect();

    const onMove = (e) => {
      const x = e.clientX - trackRect.left;
      const pct = (x / trackRect.width) * 100;
      let speed = percentToSpeed(pct);
      if (which === "min") {
        speed = Math.max(HARD_SPEED_MIN, Math.min(speed, currentMax - 0.05));
        currentMin = Math.round(speed * 100) / 100;
      } else {
        speed = Math.min(HARD_SPEED_MAX, Math.max(speed, currentMin + 0.05));
        currentMax = Math.round(speed * 100) / 100;
      }
      renderSpeedRangeTrack();
      scheduleSaveSpeedRange();
    };

    const onUp = (e) => {
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
      try { handle.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      saveSpeedRange();
    };

    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  }

  speedRangeMinHandle.addEventListener("pointerdown", (e) => startHandleDrag(e, "min"));
  speedRangeMaxHandle.addEventListener("pointerdown", (e) => startHandleDrag(e, "max"));

  speedRangeTrack.addEventListener("pointerdown", (e) => {
    if (e.target === speedRangeMinHandle || e.target === speedRangeMaxHandle) return;
    const rect = speedRangeTrack.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    const speed = percentToSpeed(pct);
    const distMin = Math.abs(speed - currentMin);
    const distMax = Math.abs(speed - currentMax);
    if (distMin <= distMax) {
      currentMin = Math.max(HARD_SPEED_MIN, Math.min(speed, currentMax - 0.05));
    } else {
      currentMax = Math.min(HARD_SPEED_MAX, Math.max(speed, currentMin + 0.05));
    }
    renderSpeedRangeTrack();
    saveSpeedRange();
  });

  function onMinInputChange() {
    let v = clampHardSpeed(speedMinInput.value, currentMin);
    if (v >= currentMax) v = Math.max(HARD_SPEED_MIN, currentMax - 0.05);
    currentMin = v;
    renderSpeedRangeTrack();
    scheduleSaveSpeedRange();
  }
  function onMaxInputChange() {
    let v = clampHardSpeed(speedMaxInput.value, currentMax);
    if (v <= currentMin) v = Math.min(HARD_SPEED_MAX, currentMin + 0.05);
    currentMax = v;
    renderSpeedRangeTrack();
    scheduleSaveSpeedRange();
  }
  speedMinInput.addEventListener("input", onMinInputChange);
  speedMinInput.addEventListener("blur", () => { onMinInputChange(); saveSpeedRange(); });
  speedMaxInput.addEventListener("input", onMaxInputChange);
  speedMaxInput.addEventListener("blur", () => { onMaxInputChange(); saveSpeedRange(); });

  resetSpeedRangeButton.addEventListener("click", async () => {
    currentMin = DEFAULT_SPEED_MIN;
    currentMax = DEFAULT_SPEED_MAX;
    renderSpeedRangeTrack();
    await saveSpeedRange();
  });
}

bindNumberInput(document.getElementById("speedStepInput"), SPEED_STEP_STORAGE_KEY, clampSpeedStep, document.getElementById("speedStepStatus"));

// --- Общее: каналы -------------------------------------------------------------------

const channelMemorySection = document.getElementById("channelMemory");
const channelMemoryName = document.getElementById("channelMemoryName");
const channelMemoryHint = document.getElementById("channelMemoryHint");
const channelSavedBadge = document.getElementById("channelSavedBadge");
const channelSaveButton = document.getElementById("channelSaveButton");
const channelSaveSpeedEl = document.getElementById("channelSaveSpeed");
const channelForgetButton = document.getElementById("channelForgetButton");
const channelClearAllButton = document.getElementById("channelClearAllButton");

const channelsSearchInput = document.getElementById("channelsSearchInput");
const channelsListEl = document.getElementById("channelsList");
const channelsEmptyEl = document.getElementById("channelsEmpty");
const channelsStatusEl = document.getElementById("channelsStatus");

let channelState = {
  channel: null,
  savedSpeed: null,
  totalSavedChannels: 0,
  currentSpeed: DEFAULT_SPEED,
};
let channelsMap = {};
let channelsFilter = "";

function normalizeChannelsMap(raw) {
  if (!raw || typeof raw !== "object") return {};
  const out = {};
  for (const [id, entry] of Object.entries(raw)) {
    if (typeof entry === "number" && isFinite(entry)) {
      out[id] = { speed: clampSpeed(entry) || 1.5, name: id };
    } else if (entry && typeof entry === "object" && typeof entry.speed === "number") {
      out[id] = {
        speed: clampSpeed(entry.speed) || 1.5,
        name: typeof entry.name === "string" && entry.name ? entry.name : id,
      };
    }
  }
  return out;
}

function renderChannelSection() {
  if (!channelMemorySection) return;
  const { channel, savedSpeed, totalSavedChannels, currentSpeed } = channelState;
  const hasChannel = Boolean(channel);
  const hasAnySaved = totalSavedChannels > 0;

  if (!hasChannel && !hasAnySaved) {
    channelMemorySection.hidden = true;
    return;
  }
  channelMemorySection.hidden = false;

  channelMemoryName.textContent = hasChannel ? channel.name : "";
  channelMemoryName.hidden = !hasChannel;

  if (hasChannel && typeof savedSpeed === "number") {
    channelSavedBadge.hidden = false;
    channelSavedBadge.textContent = translate("channelSavedBadge", formatSpeed(savedSpeed));
  } else {
    channelSavedBadge.hidden = true;
  }

  channelMemoryHint.hidden = hasChannel;
  channelSaveButton.hidden = !hasChannel;
  channelSaveSpeedEl.textContent = formatSpeed(currentSpeed);
  channelForgetButton.hidden = !(hasChannel && typeof savedSpeed === "number");
  channelClearAllButton.hidden = !hasAnySaved;
  channelClearAllButton.textContent = translate("channelClearAll", totalSavedChannels);
}

function formatSpeedShort(speed) {
  return formatSpeed(speed);
}

function renderChannelsList() {
  if (!channelsListEl) return;
  const ids = Object.keys(channelsMap);
  if (ids.length === 0) {
    channelsListEl.replaceChildren();
    if (channelsEmptyEl) channelsEmptyEl.hidden = false;
    return;
  }
  if (channelsEmptyEl) channelsEmptyEl.hidden = true;

  const filter = channelsFilter.trim().toLowerCase();
  const visible = ids
    .filter((id) => {
      if (!filter) return true;
      const e = channelsMap[id];
      return `${e.name} ${id}`.toLowerCase().includes(filter);
    })
    .sort((a, b) => (channelsMap[a].name || a).toLowerCase().localeCompare((channelsMap[b].name || b).toLowerCase()));

  channelsListEl.replaceChildren();

  if (visible.length === 0) {
    const row = document.createElement("div");
    row.className = "channel-row";
    row.style.justifyContent = "center";
    row.style.color = "var(--text-dim)";
    row.textContent = translate("channelsNothingFound", filter);
    channelsListEl.append(row);
    return;
  }

  for (const id of visible) {
    const entry = channelsMap[id];
    const row = document.createElement("div");
    row.className = "channel-row";

    const nameWrap = document.createElement("div");
    nameWrap.style.flex = "1 1 auto";
    nameWrap.style.minWidth = "0";

    const nameEl = document.createElement("div");
    nameEl.className = "channel-row-name";
    nameEl.textContent = entry.name || id;
    nameWrap.append(nameEl);

    if (entry.name && entry.name !== id) {
      const idEl = document.createElement("div");
      idEl.className = "channel-row-id";
      idEl.textContent = id;
      nameWrap.append(idEl);
    }

    const speedEl = document.createElement("span");
    speedEl.className = "channel-row-speed";
    speedEl.textContent = formatSpeedShort(entry.speed);

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "channel-row-delete";
    delBtn.textContent = "✕";
    delBtn.title = translate("confirmDelete");
    delBtn.setAttribute("aria-label", `${translate("confirmDelete")}: ${entry.name || id}`);
    delBtn.addEventListener("click", () => deleteChannel(id));

    row.append(nameWrap, speedEl, delBtn);
    channelsListEl.append(row);
  }
}

async function deleteChannel(id) {
  if (!(id in channelsMap)) return;
  const next = { ...channelsMap };
  delete next[id];
  channelsMap = next;
  await chrome.storage.sync.set({ [CHANNEL_SPEEDS_STORAGE_KEY]: channelsMap });
  renderChannelsList();
  setCardStatus(channelsStatusEl, translate("channelsDeleted"));
}

async function readChannelMapFromStorage() {
  const data = await chrome.storage.sync.get({ [CHANNEL_SPEEDS_STORAGE_KEY]: {} });
  const map = data[CHANNEL_SPEEDS_STORAGE_KEY];
  return map && typeof map === "object" ? map : {};
}

async function refreshChannelInfo() {
  try {
    const response = await sendMessageToActiveTab({ type: "YT_CHANNEL_INFO_GET" });
    if (response && response.ok) {
      channelState = {
        channel: response.channel || null,
        savedSpeed: typeof response.savedSpeed === "number" ? response.savedSpeed : null,
        totalSavedChannels: Number(response.totalSavedChannels) || 0,
        currentSpeed: typeof response.currentSpeed === "number" ? response.currentSpeed : channelState.currentSpeed,
      };
      renderChannelSection();
      return;
    }
  } catch {
    // Активная вкладка не YouTube — content.js нет. Падаем в фолбэк.
  }
  const map = await readChannelMapFromStorage();
  channelState = {
    channel: null,
    savedSpeed: null,
    totalSavedChannels: Object.keys(map).length,
    currentSpeed: channelState.currentSpeed,
  };
  renderChannelSection();
}

if (channelSaveButton) {
  channelSaveButton.addEventListener("click", async () => {
    try {
      const response = await sendMessageToActiveTab({ type: "YT_CHANNEL_SAVE_CURRENT" });
      if (!response || !response.ok) {
        setStatus(translate("statusNoChannelDetected"), true);
        return;
      }
      channelState = {
        channel: response.channel,
        savedSpeed: response.savedSpeed,
        totalSavedChannels: response.totalSavedChannels,
        currentSpeed: channelState.currentSpeed,
      };
      renderChannelSection();
      setStatus(translate("statusChannelSaved", response.channel.name, formatSpeed(response.savedSpeed)));
    } catch {
      setStatus(translate("statusNoChannelDetected"), true);
    }
  });
}

if (channelForgetButton) {
  channelForgetButton.addEventListener("click", async () => {
    try {
      const response = await sendMessageToActiveTab({ type: "YT_CHANNEL_CLEAR" });
      if (!response || !response.ok) {
        setStatus(translate("statusNoChannelDetected"), true);
        return;
      }
      const forgottenName = response.channel ? response.channel.name : "";
      channelState = {
        channel: response.channel,
        savedSpeed: null,
        totalSavedChannels: response.totalSavedChannels,
        currentSpeed: channelState.currentSpeed,
      };
      renderChannelSection();
      setStatus(translate("statusChannelForgotten", forgottenName));
    } catch {
      setStatus(translate("statusNoChannelDetected"), true);
    }
  });
}

if (channelClearAllButton) {
  channelClearAllButton.addEventListener("click", async () => {
    const confirmed = await showConfirm(translate("channelClearAllConfirm"));
    if (!confirmed) return;
    try {
      await sendMessageToActiveTab({ type: "YT_CHANNEL_CLEAR_ALL" });
    } catch {
      await chrome.storage.sync.set({ [CHANNEL_SPEEDS_STORAGE_KEY]: {} });
    }
    channelState = { ...channelState, savedSpeed: null, totalSavedChannels: 0 };
    channelsMap = {};
    renderChannelSection();
    renderChannelsList();
    setStatus(translate("statusChannelsCleared"));
  });
}

if (channelsSearchInput) {
  channelsSearchInput.addEventListener("input", () => {
    channelsFilter = channelsSearchInput.value;
    renderChannelsList();
  });
}

const channelsToggleButton = document.getElementById("channelsToggleButton");
const channelsListWrap = document.getElementById("channelsListWrap");
if (channelsToggleButton && channelsListWrap) {
  channelsToggleButton.addEventListener("click", () => {
    const isHidden = channelsListWrap.hidden;
    channelsListWrap.hidden = !isHidden;
    channelsToggleButton.setAttribute("aria-expanded", String(isHidden));
  });
}

// --- Общее: данные (экспорт/импорт всех настроек) + заводской сброс -----------------

const exportButton = document.getElementById("exportButton");
const importButton = document.getElementById("importButton");
const importInput = document.getElementById("importInput");
const dataStatusEl = document.getElementById("dataStatus");

if (exportButton) {
  exportButton.addEventListener("click", async () => {
    const settings = await chrome.storage.sync.get(null);
    const payload = {
      extension: "WheelPilot for YouTube",
      version: 2,
      exportedAt: new Date().toISOString(),
      settings,
    };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16);
    a.href = url;
    a.download = `wheelpilot-settings-${stamp}.json`;
    document.body.append(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    setTemporaryStatus(translate("exportedStatus"));
  });
}

if (importButton && importInput) {
  importButton.addEventListener("click", () => importInput.click());
}

if (importInput) {
  importInput.addEventListener("change", async () => {
    const file = importInput.files && importInput.files[0];
    importInput.value = "";
    restorePopupViewport();
    if (!file) return;

    let payload;
    try {
      const text = await file.text();
      payload = JSON.parse(text);
    } catch {
      setCardStatus(dataStatusEl, translate("importInvalid"), true, 2500);
      return;
    }

    // Формат v2 — { extension, settings }. Формат v1 (старый экспорт только
    // каналов) — { extension, channels } — поддерживаем как частный случай.
    let toWrite = null;
    const supportedExportBrands = [
      "WheelPilot for YouTube",
      "YouTube Speed Booster", // Legacy exports created before the 0.2.3 rebrand.
    ];
    if (payload && supportedExportBrands.includes(payload.extension)) {
      if (payload.settings && typeof payload.settings === "object") {
        toWrite = payload.settings;
      } else if (payload.channels && typeof payload.channels === "object") {
        toWrite = { [CHANNEL_SPEEDS_STORAGE_KEY]: payload.channels };
      }
    }
    if (!toWrite) {
      setCardStatus(dataStatusEl, translate("importInvalid"), true, 2500);
      return;
    }

    // Пишем только наши ключи — чужие/устаревшие поля файла игнорируем.
    const filtered = {};
    for (const [key, value] of Object.entries(toWrite)) {
      if (key.startsWith("ytSpeedController")) filtered[key] = value;
    }

    const confirmed = await showConfirm(translate("importConfirm"), "confirmImport");
    if (!confirmed) return;

    await chrome.storage.sync.set(filtered);
    await initPopup();
    restorePopupViewport();
    setTemporaryStatus(translate("importedStatus", Object.keys(filtered).length));
  });
}

const factoryResetButton = document.getElementById("factoryResetButton");
if (factoryResetButton) {
  factoryResetButton.addEventListener("click", async () => {
    const confirmed = await showConfirm(translate("factoryResetConfirm"), "confirmReset");
    if (!confirmed) return;
    await chrome.storage.sync.clear();
    await chrome.storage.local.remove(ONBOARDING_STORAGE_KEY);
    location.reload();
  });
}

// --- Инициализация -------------------------------------------------------------------

async function initPopup() {
  const data = await chrome.storage.sync.get({
    [STORAGE_KEY]: DEFAULT_SPEED,
    [LANGUAGE_STORAGE_KEY]: getDefaultLanguage(),
    [AUTO_APPLY_STORAGE_KEY]: DEFAULT_AUTO_APPLY,
    [APPLY_TO_ADS_STORAGE_KEY]: DEFAULT_APPLY_TO_ADS,
    [PRESETS_STORAGE_KEY]: DEFAULT_PRESETS,
    [SPEED_MIN_STORAGE_KEY]: DEFAULT_SPEED_MIN,
    [SPEED_MAX_STORAGE_KEY]: DEFAULT_SPEED_MAX,
    [SPEED_STEP_STORAGE_KEY]: DEFAULT_SPEED_STEP,
    [THEME_STORAGE_KEY]: DEFAULT_THEME,

    [PLAYER_BUTTONS_STORAGE_KEY]: DEFAULT_PLAYER_BUTTONS,
    [PB_FRAME_BUTTONS_STORAGE_KEY]: DEFAULT_PB_FRAME_BUTTONS,
    [PB_LOOP_BUTTONS_STORAGE_KEY]: DEFAULT_PB_LOOP_BUTTONS,
    [SCREENSHOT_BUTTON_STORAGE_KEY]: DEFAULT_SCREENSHOT_BUTTON,
    [VIDEO_ZOOM_STORAGE_KEY]: DEFAULT_VIDEO_ZOOM,
    [PLAYER_TIME_LEFT_STORAGE_KEY]: DEFAULT_PLAYER_TIME_LEFT,
    [MINI_PROGRESS_STORAGE_KEY]: DEFAULT_MINI_PROGRESS,
    [MINI_PROGRESS_HEIGHT_STORAGE_KEY]: DEFAULT_MINI_PROGRESS_HEIGHT,
    [MINI_PROGRESS_COLOR_STORAGE_KEY]: DEFAULT_MINI_PROGRESS_COLOR,
    [WHEEL_ZONES_MODE_STORAGE_KEY]: DEFAULT_WHEEL_ZONES_MODE,
    [WHEEL_SEEK_STEP_STORAGE_KEY]: DEFAULT_WHEEL_SEEK_STEP,
    [WHEEL_VOLUME_STEP_STORAGE_KEY]: DEFAULT_WHEEL_VOLUME_STEP,
    [LMB_WHEEL_ACTION_STORAGE_KEY]: DEFAULT_LMB_WHEEL_ACTION,
    [RMB_WHEEL_ACTION_STORAGE_KEY]: DEFAULT_RMB_WHEEL_ACTION,
    [ZONE_LEFT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_LEFT_EDGE,
    [ZONE_RIGHT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_RIGHT_EDGE,
    [ZONE_LEFT_ACTION_STORAGE_KEY]: DEFAULT_ZONE_LEFT_ACTION,
    [ZONE_RIGHT_ACTION_STORAGE_KEY]: DEFAULT_ZONE_RIGHT_ACTION,
    [ZONE_LEFT_INVERT_STORAGE_KEY]: false,
    [ZONE_RIGHT_INVERT_STORAGE_KEY]: false,
    [LMB_WHEEL_INVERT_STORAGE_KEY]: false,
    [RMB_WHEEL_INVERT_STORAGE_KEY]: false,
    [VOLUME_BOOST_STORAGE_KEY]: DEFAULT_VOLUME_BOOST,
    [VOLUME_BOOST_MAX_STORAGE_KEY]: DEFAULT_VOLUME_BOOST_MAX,
    [FRAME_STEP_HOTKEYS_STORAGE_KEY]: DEFAULT_FRAME_STEP_HOTKEYS,
    [FRAME_STEP_LARGE_STORAGE_KEY]: null, // legacy, для миграции
    [FRAME_STEP_BACK_STORAGE_KEY]: null,
    [FRAME_STEP_FORWARD_STORAGE_KEY]: null,
    [LOOP_HOTKEYS_STORAGE_KEY]: DEFAULT_LOOP_HOTKEYS,

  });

  currentLanguage = normalizeLanguage(data[LANGUAGE_STORAGE_KEY]);
  applyTheme(data[THEME_STORAGE_KEY] || DEFAULT_THEME);
  applyTranslations();
  await initOnboardingPrompt();

  // Стартовая вкладка — из localStorage.
  let startTab = TAB_NAMES[0];
  try {
    startTab = localStorage.getItem(ACTIVE_TAB_STORAGE_KEY) || TAB_NAMES[0];
  } catch {
    // ignore
  }
  activateTab(startTab);

  // Границы скорости — до всего, что от них зависит (пинним-слайдер, пресеты).
  applySpeedBounds(data[SPEED_MIN_STORAGE_KEY], data[SPEED_MAX_STORAGE_KEY]);
  currentMin = MIN_SPEED;
  currentMax = MAX_SPEED;
  renderSpeedRangeTrack();

  renderPresets(data[PRESETS_STORAGE_KEY]);
  const safePresets = normalizePresets(data[PRESETS_STORAGE_KEY]);
  renderPresetInputs(safePresets);

  const savedSpeed = clampSpeed(data[STORAGE_KEY]);
  updateUi(savedSpeed);

  if (autoApplyCheckbox) autoApplyCheckbox.checked = Boolean(data[AUTO_APPLY_STORAGE_KEY]);
  const applyToAdsEl = document.getElementById("applyToAds");
  if (applyToAdsEl) applyToAdsEl.checked = Boolean(data[APPLY_TO_ADS_STORAGE_KEY]);
  const speedStepEl = document.getElementById("speedStepInput");
  if (speedStepEl) speedStepEl.value = String(clampSpeedStep(data[SPEED_STEP_STORAGE_KEY]));

  // Плеер: кнопки в панели
  setChecked("playerButtonsToggle", data[PLAYER_BUTTONS_STORAGE_KEY]);
  setChecked("pbFrameButtonsToggle", data[PB_FRAME_BUTTONS_STORAGE_KEY]);
  setChecked("pbLoopButtonsToggle", data[PB_LOOP_BUTTONS_STORAGE_KEY]);
  setChecked("screenshotButtonToggle", data[SCREENSHOT_BUTTON_STORAGE_KEY]);
  setChecked("videoZoomToggle", data[VIDEO_ZOOM_STORAGE_KEY]);

  // Плеер: время и прогресс
  setChecked("playerTimeLeftToggle", data[PLAYER_TIME_LEFT_STORAGE_KEY]);
  setValue("miniProgressMode", normalizeMiniProgressMode(data[MINI_PROGRESS_STORAGE_KEY]));
  setValue("miniProgressHeight", clampMiniProgressHeight(data[MINI_PROGRESS_HEIGHT_STORAGE_KEY]));
  setValue("miniProgressColor", normalizeHexColor(data[MINI_PROGRESS_COLOR_STORAGE_KEY]));

  // Плеер: колесо мыши
  const zonesMode = normalizeWheelZonesMode(data[WHEEL_ZONES_MODE_STORAGE_KEY]);
  document.querySelectorAll('input[name="wheelZonesMode"]').forEach((r) => { r.checked = r.value === zonesMode; });
  setValue("wheelSeekStepInput", clampWheelSeekStep(data[WHEEL_SEEK_STEP_STORAGE_KEY]));
  setValue("wheelVolumeStepInput", clampWheelVolumeStep(data[WHEEL_VOLUME_STEP_STORAGE_KEY]));
  setValue("zoneLeftActionSelect", normalizeWheelAction(data[ZONE_LEFT_ACTION_STORAGE_KEY], DEFAULT_ZONE_LEFT_ACTION));
  setValue("zoneRightActionSelect", normalizeWheelAction(data[ZONE_RIGHT_ACTION_STORAGE_KEY], DEFAULT_ZONE_RIGHT_ACTION));
  setValue("lmbWheelActionSelect", normalizeLmbWheelAction(data[LMB_WHEEL_ACTION_STORAGE_KEY]));
  setValue("rmbWheelActionSelect", normalizeWheelAction(data[RMB_WHEEL_ACTION_STORAGE_KEY], DEFAULT_RMB_WHEEL_ACTION));
  setChecked("zoneLeftInvertToggle", data[ZONE_LEFT_INVERT_STORAGE_KEY]);
  setChecked("zoneRightInvertToggle", data[ZONE_RIGHT_INVERT_STORAGE_KEY]);
  setChecked("lmbWheelInvertToggle", data[LMB_WHEEL_INVERT_STORAGE_KEY]);
  setChecked("rmbWheelInvertToggle", data[RMB_WHEEL_INVERT_STORAGE_KEY]);
  const [initLeftEdge, initRightEdge] = normalizeZoneEdges(
    data[ZONE_LEFT_EDGE_STORAGE_KEY],
    data[ZONE_RIGHT_EDGE_STORAGE_KEY],
  );
  renderZoneEdges(initLeftEdge, initRightEdge);

  // Плеер: звук
  setChecked("volumeBoostToggle", data[VOLUME_BOOST_STORAGE_KEY]);
  setValue("volumeBoostMaxInput", clampVolumeBoostMax(data[VOLUME_BOOST_MAX_STORAGE_KEY]));

  // Плеер: инструменты (миграция legacy FrameStepLarge → Back/Forward)
  setChecked("frameStepHotkeys", data[FRAME_STEP_HOTKEYS_STORAGE_KEY]);
  const legacyLarge = data[FRAME_STEP_LARGE_STORAGE_KEY];
  const rawBack = data[FRAME_STEP_BACK_STORAGE_KEY];
  const rawForward = data[FRAME_STEP_FORWARD_STORAGE_KEY];
  const back = clampFrameStep(rawBack != null ? rawBack : (legacyLarge != null ? legacyLarge : DEFAULT_FRAME_STEP_BACK));
  const forward = clampFrameStep(rawForward != null ? rawForward : (legacyLarge != null ? legacyLarge : DEFAULT_FRAME_STEP_FORWARD));
  setValue("frameStepBackInput", back);
  setValue("frameStepForwardInput", forward);
  if (rawBack == null || rawForward == null) {
    await chrome.storage.sync.set({
      [FRAME_STEP_BACK_STORAGE_KEY]: back,
      [FRAME_STEP_FORWARD_STORAGE_KEY]: forward,
    });
  }
  setChecked("loopHotkeys", data[LOOP_HOTKEYS_STORAGE_KEY]);

  // Каналы
  channelsMap = normalizeChannelsMap(data[CHANNEL_SPEEDS_STORAGE_KEY]);
  renderChannelsList();

  try {
    const response = await sendMessageToActiveTab({ type: "YT_SPEED_GET" });
    if (response && typeof response.speed === "number") {
      updateUi(response.speed);
      channelState.currentSpeed = response.speed;
      setStatus(translate("statusDefault"));
    }
  } catch {
    setStatus(translate("statusOpenYoutube"), true);
  }

  await refreshChannelInfo();
}

function setChecked(id, value) {
  const el = document.getElementById(id);
  if (el) el.checked = Boolean(value);
}
function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = String(value);
}

// --- Синхронизация между открытыми поверхностями (несколько popup/вкладок) ---------

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync") return;

  if (changes[PRESETS_STORAGE_KEY]) {
    renderPresets(changes[PRESETS_STORAGE_KEY].newValue);
    renderPresetInputs(normalizePresets(changes[PRESETS_STORAGE_KEY].newValue));
  }
  if (changes[SPEED_MIN_STORAGE_KEY] || changes[SPEED_MAX_STORAGE_KEY]) {
    chrome.storage.sync.get({
      [SPEED_MIN_STORAGE_KEY]: DEFAULT_SPEED_MIN,
      [SPEED_MAX_STORAGE_KEY]: DEFAULT_SPEED_MAX,
    }).then((d) => {
      applySpeedBounds(d[SPEED_MIN_STORAGE_KEY], d[SPEED_MAX_STORAGE_KEY]);
      currentMin = MIN_SPEED;
      currentMax = MAX_SPEED;
      renderSpeedRangeTrack();
      const safe = clampSpeed(speedRange.value);
      if (Math.abs(Number(speedRange.value) - safe) > 0.001) {
        applySpeed(safe);
      } else {
        updateUi(safe);
      }
    });
  }
  if (changes[LANGUAGE_STORAGE_KEY]) {
    const newLang = normalizeLanguage(changes[LANGUAGE_STORAGE_KEY].newValue);
    if (newLang !== currentLanguage) {
      currentLanguage = newLang;
      applyTranslations();
      renderPresetLabels();
      renderChannelSection();
    }
  }
  if (changes[STORAGE_KEY]) updateUi(changes[STORAGE_KEY].newValue);
  if (changes[AUTO_APPLY_STORAGE_KEY] && autoApplyCheckbox) {
    autoApplyCheckbox.checked = Boolean(changes[AUTO_APPLY_STORAGE_KEY].newValue);
  }
  if (changes[THEME_STORAGE_KEY]) applyTheme(changes[THEME_STORAGE_KEY].newValue || DEFAULT_THEME);
  if (changes[CHANNEL_SPEEDS_STORAGE_KEY]) {
    channelsMap = normalizeChannelsMap(changes[CHANNEL_SPEEDS_STORAGE_KEY].newValue);
    renderChannelsList();
  }
  if (changes[SPEED_STEP_STORAGE_KEY]) setValue("speedStepInput", clampSpeedStep(changes[SPEED_STEP_STORAGE_KEY].newValue));
  if (changes[APPLY_TO_ADS_STORAGE_KEY]) setChecked("applyToAds", changes[APPLY_TO_ADS_STORAGE_KEY].newValue);

  if (changes[PLAYER_BUTTONS_STORAGE_KEY]) setChecked("playerButtonsToggle", changes[PLAYER_BUTTONS_STORAGE_KEY].newValue);
  if (changes[PB_FRAME_BUTTONS_STORAGE_KEY]) setChecked("pbFrameButtonsToggle", changes[PB_FRAME_BUTTONS_STORAGE_KEY].newValue);
  if (changes[PB_LOOP_BUTTONS_STORAGE_KEY]) setChecked("pbLoopButtonsToggle", changes[PB_LOOP_BUTTONS_STORAGE_KEY].newValue);
  if (changes[SCREENSHOT_BUTTON_STORAGE_KEY]) setChecked("screenshotButtonToggle", changes[SCREENSHOT_BUTTON_STORAGE_KEY].newValue);
  if (changes[VIDEO_ZOOM_STORAGE_KEY]) setChecked("videoZoomToggle", changes[VIDEO_ZOOM_STORAGE_KEY].newValue);
  if (changes[PLAYER_TIME_LEFT_STORAGE_KEY]) setChecked("playerTimeLeftToggle", changes[PLAYER_TIME_LEFT_STORAGE_KEY].newValue);
  if (changes[MINI_PROGRESS_STORAGE_KEY]) setValue("miniProgressMode", normalizeMiniProgressMode(changes[MINI_PROGRESS_STORAGE_KEY].newValue));
  if (changes[MINI_PROGRESS_HEIGHT_STORAGE_KEY]) setValue("miniProgressHeight", clampMiniProgressHeight(changes[MINI_PROGRESS_HEIGHT_STORAGE_KEY].newValue));
  if (changes[MINI_PROGRESS_COLOR_STORAGE_KEY]) setValue("miniProgressColor", normalizeHexColor(changes[MINI_PROGRESS_COLOR_STORAGE_KEY].newValue));
  if (changes[WHEEL_ZONES_MODE_STORAGE_KEY]) {
    const mode = normalizeWheelZonesMode(changes[WHEEL_ZONES_MODE_STORAGE_KEY].newValue);
    document.querySelectorAll('input[name="wheelZonesMode"]').forEach((r) => { r.checked = r.value === mode; });
  }
  if (changes[WHEEL_SEEK_STEP_STORAGE_KEY]) setValue("wheelSeekStepInput", clampWheelSeekStep(changes[WHEEL_SEEK_STEP_STORAGE_KEY].newValue));
  if (changes[WHEEL_VOLUME_STEP_STORAGE_KEY]) setValue("wheelVolumeStepInput", clampWheelVolumeStep(changes[WHEEL_VOLUME_STEP_STORAGE_KEY].newValue));
  if (changes[LMB_WHEEL_ACTION_STORAGE_KEY]) setValue("lmbWheelActionSelect", normalizeLmbWheelAction(changes[LMB_WHEEL_ACTION_STORAGE_KEY].newValue));
  if (changes[RMB_WHEEL_ACTION_STORAGE_KEY]) setValue("rmbWheelActionSelect", normalizeWheelAction(changes[RMB_WHEEL_ACTION_STORAGE_KEY].newValue, DEFAULT_RMB_WHEEL_ACTION));
  if (changes[ZONE_LEFT_ACTION_STORAGE_KEY]) setValue("zoneLeftActionSelect", normalizeWheelAction(changes[ZONE_LEFT_ACTION_STORAGE_KEY].newValue, DEFAULT_ZONE_LEFT_ACTION));
  if (changes[ZONE_RIGHT_ACTION_STORAGE_KEY]) setValue("zoneRightActionSelect", normalizeWheelAction(changes[ZONE_RIGHT_ACTION_STORAGE_KEY].newValue, DEFAULT_ZONE_RIGHT_ACTION));
  if (changes[ZONE_LEFT_INVERT_STORAGE_KEY]) setChecked("zoneLeftInvertToggle", changes[ZONE_LEFT_INVERT_STORAGE_KEY].newValue);
  if (changes[ZONE_RIGHT_INVERT_STORAGE_KEY]) setChecked("zoneRightInvertToggle", changes[ZONE_RIGHT_INVERT_STORAGE_KEY].newValue);
  if (changes[LMB_WHEEL_INVERT_STORAGE_KEY]) setChecked("lmbWheelInvertToggle", changes[LMB_WHEEL_INVERT_STORAGE_KEY].newValue);
  if (changes[RMB_WHEEL_INVERT_STORAGE_KEY]) setChecked("rmbWheelInvertToggle", changes[RMB_WHEEL_INVERT_STORAGE_KEY].newValue);
  if (changes[ZONE_LEFT_EDGE_STORAGE_KEY] || changes[ZONE_RIGHT_EDGE_STORAGE_KEY]) {
    chrome.storage.sync.get({
      [ZONE_LEFT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_LEFT_EDGE,
      [ZONE_RIGHT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_RIGHT_EDGE,
    }).then((d) => {
      const [l, r] = normalizeZoneEdges(d[ZONE_LEFT_EDGE_STORAGE_KEY], d[ZONE_RIGHT_EDGE_STORAGE_KEY]);
      renderZoneEdges(l, r);
    });
  }
  if (changes[VOLUME_BOOST_STORAGE_KEY]) setChecked("volumeBoostToggle", changes[VOLUME_BOOST_STORAGE_KEY].newValue);
  if (changes[VOLUME_BOOST_MAX_STORAGE_KEY]) setValue("volumeBoostMaxInput", clampVolumeBoostMax(changes[VOLUME_BOOST_MAX_STORAGE_KEY].newValue));
  if (changes[FRAME_STEP_HOTKEYS_STORAGE_KEY]) setChecked("frameStepHotkeys", changes[FRAME_STEP_HOTKEYS_STORAGE_KEY].newValue);
  if (changes[FRAME_STEP_BACK_STORAGE_KEY]) setValue("frameStepBackInput", clampFrameStep(changes[FRAME_STEP_BACK_STORAGE_KEY].newValue));
  if (changes[FRAME_STEP_FORWARD_STORAGE_KEY]) setValue("frameStepForwardInput", clampFrameStep(changes[FRAME_STEP_FORWARD_STORAGE_KEY].newValue));
  if (changes[LOOP_HOTKEYS_STORAGE_KEY]) setChecked("loopHotkeys", changes[LOOP_HOTKEYS_STORAGE_KEY].newValue);

});

initPopup();
