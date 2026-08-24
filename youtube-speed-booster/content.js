const STORAGE_KEY = "ytSpeedControllerSpeed";
const LANGUAGE_STORAGE_KEY = "ytSpeedControllerLanguage";
const AUTO_APPLY_STORAGE_KEY = "ytSpeedControllerAutoApplyDefault";
const APPLY_TO_ADS_STORAGE_KEY = "ytSpeedControllerApplyToAds";
const CHANNEL_SPEEDS_STORAGE_KEY = "ytSpeedControllerChannelSpeeds";
const FRAME_STEP_HOTKEYS_STORAGE_KEY = "ytSpeedControllerFrameStepHotkeys";
const FRAME_STEP_LARGE_STORAGE_KEY = "ytSpeedControllerFrameStepLarge"; // legacy, для миграции
const FRAME_STEP_BACK_STORAGE_KEY = "ytSpeedControllerFrameStepLargeBack";
const FRAME_STEP_FORWARD_STORAGE_KEY = "ytSpeedControllerFrameStepLargeForward";
const SPEED_MIN_STORAGE_KEY = "ytSpeedControllerSpeedMin";
const SPEED_MAX_STORAGE_KEY = "ytSpeedControllerSpeedMax";
const LOOP_HOTKEYS_STORAGE_KEY = "ytSpeedControllerLoopHotkeys";
const SPEED_STEP_STORAGE_KEY = "ytSpeedControllerSpeedStep";
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
const PLAYER_BUTTONS_STORAGE_KEY = "ytSpeedControllerPlayerButtons";
const PB_FRAME_BUTTONS_STORAGE_KEY = "ytSpeedControllerPlayerFrameButtons";
const PB_LOOP_BUTTONS_STORAGE_KEY = "ytSpeedControllerPlayerLoopButtons";
const PLAYER_TIME_LEFT_STORAGE_KEY = "ytSpeedControllerPlayerTimeLeft";
const MINI_PROGRESS_STORAGE_KEY = "ytSpeedControllerMiniProgress";
const MINI_PROGRESS_HEIGHT_STORAGE_KEY = "ytSpeedControllerMiniProgressHeight";
const MINI_PROGRESS_COLOR_STORAGE_KEY = "ytSpeedControllerMiniProgressColor";
const VOLUME_BOOST_STORAGE_KEY = "ytSpeedControllerVolumeBoost";
const VOLUME_BOOST_MAX_STORAGE_KEY = "ytSpeedControllerVolumeBoostMax";
const SCREENSHOT_BUTTON_STORAGE_KEY = "ytSpeedControllerScreenshotButton";
const VIDEO_ZOOM_STORAGE_KEY = "ytSpeedControllerVideoZoom";
const ONBOARDING_STORAGE_KEY = "ytSpeedBoosterOnboardingState";
const ONBOARDING_VERSION = 1;
const DEFAULT_SPEED = 1.5;
const DEFAULT_LANGUAGE = "en";
const DEFAULT_AUTO_APPLY = true;
const DEFAULT_APPLY_TO_ADS = true; // прежнее поведение: рекламу тоже ускоряем
const DEFAULT_FRAME_STEP_HOTKEYS = false;
const DEFAULT_FRAME_STEP_LARGE = 5;
const DEFAULT_FRAME_STEP_BACK = 5;
const DEFAULT_FRAME_STEP_FORWARD = 5;
const DEFAULT_SPEED_MIN = 0.25;
const DEFAULT_SPEED_MAX = 5;
const DEFAULT_LOOP_HOTKEYS = false;
const DEFAULT_SPEED_STEP = 0.25; // совпадает с типичным YouTube-style шагом
const SPEED_STEP_MIN = 0.05;
const SPEED_STEP_MAX = 1.0;
// Колёсные зоны плеера: по умолчанию левая треть — перемотка, правая —
// громкость, центральная зона без функции (там колесо прокручивает
// страницу). Границы и действия настраиваются (см. popup, «Колёсные зоны»).
// "always" | "fullscreen" | "off"
const DEFAULT_WHEEL_ZONES_MODE = "always";
const DEFAULT_WHEEL_SEEK_STEP = 5;    // секунды, 1–60
const DEFAULT_WHEEL_VOLUME_STEP = 5;  // проценты, 1–20
// Границы зон в процентах от ширины плеера. Между ними всегда зазор
// ZONE_EDGE_GAP: иначе центральная зона схлопнется и над плеером перестанет
// работать обычная прокрутка страницы.
const DEFAULT_ZONE_LEFT_EDGE = 33;
const DEFAULT_ZONE_RIGHT_EDGE = 67;
const ZONE_EDGE_MIN = 5;
const ZONE_EDGE_MAX = 95;
const ZONE_EDGE_GAP = 10;
// Действия зон и жестов с зажатой кнопкой мыши:
// "speed" | "seek" | "volume" | "off"
const DEFAULT_ZONE_LEFT_ACTION = "seek";
const DEFAULT_ZONE_RIGHT_ACTION = "volume";
const DEFAULT_LMB_WHEEL_ACTION = "speed";
const DEFAULT_RMB_WHEEL_ACTION = "off"; // ПКМ+колесо по умолчанию выключено
const DEFAULT_WHEEL_INVERT = false;
const DEFAULT_PLAYER_BUTTONS = true;  // кнопки − N× + в панели плеера
const DEFAULT_PB_FRAME_BUTTONS = true; // покадровые кнопки в панели плеера
const DEFAULT_PB_LOOP_BUTTONS = true;  // кнопки A-B повтора в панели плеера
// Счётчик «сколько осталось при текущей скорости» встраивается прямо в
// нативный тайм-код плеера (…/ 25:00 · −8:20), а не рисуется рядом.
const DEFAULT_PLAYER_TIME_LEFT = true;
// Тонкая линия прогресса по нижней кромке плеера, когда панель
// управления скрыта: "off" | "fullscreen" | "always"
const DEFAULT_MINI_PROGRESS = "fullscreen";
const DEFAULT_MINI_PROGRESS_HEIGHT = 3; // px — как нативная полоса YouTube
const MINI_PROGRESS_HEIGHT_MIN = 1;
const MINI_PROGRESS_HEIGHT_MAX = 20;
const DEFAULT_MINI_PROGRESS_COLOR = "#ff0000"; // красный YouTube
// Усиление звука выше 100% через WebAudio (GainNode + лимитер). Шкала —
// воспринимаемая громкость, не амплитуда: см. boostPctToGain().
const DEFAULT_VOLUME_BOOST = true;
const DEFAULT_VOLUME_BOOST_MAX = 200; // проценты воспринимаемой громкости
const VOLUME_BOOST_MAX_MIN = 110;     // минимально осмысленный потолок
const VOLUME_BOOST_MAX_MAX = 200;     // 200% ≈ +10 дБ — предел без хрипа
const VOLUME_BOOST_STEP = 10;         // проценты за один щелчок колеса
const DEFAULT_SCREENSHOT_BUTTON = true; // кнопка скриншота кадра в панели плеера
// Видео-зум по умолчанию выключен: центральная треть плеера намеренно
// отдана прокрутке страницы (см. UX-ANALYSIS.md), включение — явный выбор.
const DEFAULT_VIDEO_ZOOM = false;
const LOOP_MIN_DURATION = 0.1; // секунды — короче не циклируем
const HARD_SPEED_MIN = 0.1; // абсолютные пределы, которые позволяет UI настроек
const HARD_SPEED_MAX = 16;
const MIN_SPEED = 0.25;
const MAX_SPEED = 5;
const TOAST_ID = "yt-speed-booster-toast";
const BEZEL_ID = "yt-speed-booster-bezel";
const PLAYERBAR_RIGHT_ID = "yt-speed-booster-playerbar-right";
const ONBOARDING_ROOT_ID = "ysb-onboarding-root";
// Общий класс-маркер наших контролов в панели плеера: его носят и группа
// скорости внутри нативного тайм-кода, и правая пилюля — стили общие.
const PLAYERBAR_CLASS = "ysb-pb";
const MINIPROGRESS_ID = "yt-speed-booster-progress";
const TIME_LEFT_CLASS = "ysb-time-left";
const LIVE_DELAY_CLASS = "ysb-live-delay";
const PLAYER_CMD_EVENT = "ysb-player-cmd";
const PLAYER_STATE_EVENT = "ysb-player-state";
const LIVE_HEAD_CONFIRM_MS = 500;
const SUPPORTED_LANGUAGES = ["ru", "en", "es", "ko"];
const SPEED_STEPS = [
  0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5,
];

const translations = {
  ru: {
    decreaseSpeed: "Уменьшить скорость\nWin: Ctrl+Shift+↓\nMac: ⌘+Shift+↓",
    increaseSpeed: "Увеличить скорость\nWin: Ctrl+Shift+↑\nMac: ⌘+Shift+↑",
    toggleBoost: "Переключить 1× / запомненную скорость\nWin: Ctrl+Shift+→\nMac: ⌘+Shift+→",
    frameBack1: "Назад на 1 кадр\nAlt+,",
    frameForward1: "Вперёд на 1 кадр\nAlt+.",
    frameBack5: (n) => `Назад на ${n} кадров\nShift+Alt+,`,
    frameForward5: (n) => `Вперёд на ${n} кадров\nShift+Alt+.`,
    loopSetA: "Поставить метку A в текущей позиции\nAlt+A",
    loopSetB: "Поставить метку B в текущей позиции\nAlt+B",
    loopToggle: "Включить / выключить повтор отрезка\nAlt+L",
    loopClear: "Сбросить метки A и B",
    loopTooShort: "Отрезок слишком короткий — нужен хотя бы 0.1 секунды.",
    zonesHint: (left, right) => `Колесо мыши: слева — ${left}, справа — ${right}`,
    wheelActSeek: "перемотка",
    wheelActVolume: "громкость",
    wheelActSpeed: "скорость",
    secShort: "с",
    timeLeftTitle: (speed) =>
      `Осталось смотреть при скорости ${speed} (реальное время)`,
    liveDelayTitle: (time) => `До прямого эфира: ${time}`,
    screenshotButton: "Сохранить кадр как изображение",
    screenshotSaved: "Кадр сохранён",
    screenshotFailed: "Не удалось сохранить кадр",
    videoZoomLabel: "Приблизить видео",
    tourBrand: "WheelPilot for YouTube · знакомство",
    tourOverviewTitle: "Карта возможностей",
    tourOverviewBody: "Все основные зоны видны сразу. Нажмите на любую область или пройдите короткое знакомство по шагам.",
    tourMapLeft: (action) => `Колесо слева: ${action}`,
    tourMapCenter: (action) => `ЛКМ + колесо: ${action}`,
    tourMapRight: (action) => `Колесо справа: ${action}`,
    tourMapZoom: "Колесо здесь: приближение",
    tourMapTimeSpeed: "Колесо над временем: скорость без −/+",
    tourMapControls: (items) => items,
    tourMapTime: "Остаток времени с учётом скорости",
    tourZonesTitle: "Колесо управляет плеером",
    tourZonesBody: (left, right) => `В левой зоне — ${left}, в правой — ${right}. Центральная зона сохраняет обычную прокрутку страницы. Перетаскивайте вертикальные границы курсором ↔ — изменения сохраняются сразу.`,
    tourZonesOff: "Колёсные зоны сейчас выключены. Их можно включить и переназначить в popup.",
    tourZonesFullscreen: "Колёсные зоны настроены только для полноэкранного режима. Перейдите в него, чтобы попробовать жесты.",
    tourSpeedTitle: "Скорость без поиска кнопок",
    tourSpeedBody: (action) => `Зажмите левую кнопку мыши на видео и прокрутите колесо: действие — ${action}.`,
    tourSpeedOff: "Жест ЛКМ + колесо сейчас выключен. Его можно назначить в разделе колёсных зон.",
    tourTimeSpeedTitle: "Скорость прямо над таймкодом",
    tourTimeSpeedBody: "Наведите указатель на любое место строки времени и крутите колесо — скорость изменится. Нажимать кнопки − и + не нужно.",
    tourTimeSpeedOff: "Управление скоростью над таймкодом сейчас выключено вместе с группой скорости. Включите её в popup на вкладке «Плеер».",
    tourZoomTitle: "Приближение деталей видео",
    tourZoomBody: "Наведите указатель на значок вверху по центру и крутите колесо для масштаба 1–4×. Увеличенный кадр можно перетаскивать мышью; прокрутка назад возвращает 1×.",
    tourZoomOff: "Приближение сейчас выключено. Включите его в popup: «Плеер» → «Кнопки в панели плеера».",
    tourControlsTitle: "Инструменты внутри YouTube",
    tourControlsBody: (items) => `В панели плеера сейчас доступны: ${items}.`,
    tourControlsOff: "Кнопки плеера сейчас скрыты. Их можно включить в popup на вкладке «Плеер».",
    tourControlSpeed: "скорость",
    tourControlFrames: "покадровый шаг",
    tourControlLoop: "повтор A–B",
    tourControlScreenshot: "скриншот",
    tourTimeTitle: "Реальное оставшееся время",
    tourTimeBody: "Таймкод показывает, сколько смотреть с учётом скорости. В полноэкранном режиме тонкая линия сохраняет видимый прогресс.",
    tourTimeOff: "Расчёт оставшегося времени сейчас выключен. Его можно включить в разделе «Время и прогресс».",
    tourStart: "Начать",
    tourBack: "Назад",
    tourNext: "Далее",
    tourFinish: "Готово",
    tourSkip: "Пропустить",
    tourClose: "Закрыть знакомство",
    tourOverviewProgress: "Обзор",
    tourProgress: (step, total) => `${step} из ${total}`,
    tourTryZones: "Попробуйте колесо или потяните любую границу. Точные значения также доступны в popup.",
    tourZoneLeftHandle: "Изменить ширину левой зоны",
    tourZoneRightHandle: "Изменить ширину правой зоны",
    tourZonesDragging: (left, right) => `Границы: ${left}% и ${right}%`,
    tourZonesSaved: (left, right) => `Границы сохранены: ${left}% и ${right}%.`,
    tourTrySpeed: "Попробуйте жест или сразу переходите дальше.",
    tourTryTimeSpeed: "Попробуйте колесо в любом месте выделенной строки времени.",
    tourTryZoom: "Попробуйте прокрутить колесо внутри выделенного квадрата.",
    tourTriedOne: "Получилось. Можно попробовать вторую зону или продолжить.",
    tourTriedAll: "Обе зоны проверены.",
    tourTriedSpeed: "Жест распознан — скорость изменилась.",
    tourTriedTimeSpeed: "Скорость изменилась без нажатия −/+.",
    tourTriedZoom: "Масштаб изменился. Теперь кадр можно перетаскивать мышью.",
    tourTriedControl: "Кнопка сработала.",
  },
  en: {
    decreaseSpeed: "Decrease speed\nWin: Ctrl+Shift+↓\nMac: ⌘+Shift+↓",
    increaseSpeed: "Increase speed\nWin: Ctrl+Shift+↑\nMac: ⌘+Shift+↑",
    toggleBoost: "Switch 1× / remembered speed\nWin: Ctrl+Shift+→\nMac: ⌘+Shift+→",
    frameBack1: "Back 1 frame\nAlt+,",
    frameForward1: "Forward 1 frame\nAlt+.",
    frameBack5: (n) => `Back ${n} frames\nShift+Alt+,`,
    frameForward5: (n) => `Forward ${n} frames\nShift+Alt+.`,
    loopSetA: "Set point A at current position\nAlt+A",
    loopSetB: "Set point B at current position\nAlt+B",
    loopToggle: "Toggle section loop\nAlt+L",
    loopClear: "Clear points A and B",
    loopTooShort: "Section is too short — at least 0.1 seconds is required.",
    zonesHint: (left, right) => `Mouse wheel: left — ${left}, right — ${right}`,
    wheelActSeek: "seek",
    wheelActVolume: "volume",
    wheelActSpeed: "speed",
    secShort: "s",
    timeLeftTitle: (speed) => `Time left at ${speed} speed (real time)`,
    liveDelayTitle: (time) => `Time to live: ${time}`,
    screenshotButton: "Save current frame as image",
    screenshotSaved: "Frame saved",
    screenshotFailed: "Failed to save frame",
    videoZoomLabel: "Zoom video",
    tourBrand: "WheelPilot for YouTube · tour",
    tourOverviewTitle: "Feature map",
    tourOverviewBody: "See every core area at once. Select any highlight or take the short guided tour.",
    tourMapLeft: (action) => `Wheel on left: ${action}`,
    tourMapCenter: (action) => `LMB + wheel: ${action}`,
    tourMapRight: (action) => `Wheel on right: ${action}`,
    tourMapZoom: "Wheel here: video zoom",
    tourMapTimeSpeed: "Wheel over time: speed without −/+",
    tourMapControls: (items) => items,
    tourMapTime: "Time left adjusted for speed",
    tourZonesTitle: "Control the player with the wheel",
    tourZonesBody: (left, right) => `The left zone controls ${left}; the right controls ${right}. The middle keeps normal page scrolling. Drag the vertical boundaries with the ↔ cursor — changes save immediately.`,
    tourZonesOff: "Wheel zones are currently disabled. You can enable and remap them in the popup.",
    tourZonesFullscreen: "Wheel zones are set to fullscreen only. Enter fullscreen to try them.",
    tourSpeedTitle: "Change speed without hunting for controls",
    tourSpeedBody: (action) => `Hold the left mouse button over the video and scroll: the assigned action is ${action}.`,
    tourSpeedOff: "LMB + wheel is currently disabled. Assign it in the wheel-zone settings.",
    tourTimeSpeedTitle: "Speed control over the time display",
    tourTimeSpeedBody: "Point anywhere on the time display and scroll to change speed. You do not need to click the − or + buttons.",
    tourTimeSpeedOff: "Time-display speed control is disabled with the speed group. Enable it on the Player tab in the popup.",
    tourZoomTitle: "Zoom into video details",
    tourZoomBody: "Point at the top-center icon and scroll to zoom from 1–4×. Drag the enlarged video to move it; scroll back to return to 1×.",
    tourZoomOff: "Video zoom is currently disabled. Enable it in the popup under Player → Player-bar buttons.",
    tourControlsTitle: "Tools built into YouTube",
    tourControlsBody: (items) => `The player bar currently includes: ${items}.`,
    tourControlsOff: "Player buttons are hidden. Enable them on the Player tab in the popup.",
    tourControlSpeed: "speed",
    tourControlFrames: "frame stepping",
    tourControlLoop: "A–B repeat",
    tourControlScreenshot: "screenshot",
    tourTimeTitle: "Real viewing time left",
    tourTimeBody: "The time display accounts for playback speed. In fullscreen, a thin line keeps progress visible.",
    tourTimeOff: "The adjusted time-left display is disabled. Enable it under Time and progress.",
    tourStart: "Start",
    tourBack: "Back",
    tourNext: "Next",
    tourFinish: "Done",
    tourSkip: "Skip",
    tourClose: "Close tour",
    tourOverviewProgress: "Overview",
    tourProgress: (step, total) => `${step} of ${total}`,
    tourTryZones: "Try the wheel or drag either boundary. Exact values are also available in the popup.",
    tourZoneLeftHandle: "Resize the left zone",
    tourZoneRightHandle: "Resize the right zone",
    tourZonesDragging: (left, right) => `Boundaries: ${left}% and ${right}%`,
    tourZonesSaved: (left, right) => `Boundaries saved: ${left}% and ${right}%.`,
    tourTrySpeed: "Try the gesture or continue right away.",
    tourTryTimeSpeed: "Try the wheel anywhere inside the highlighted time display.",
    tourTryZoom: "Try scrolling inside the highlighted square.",
    tourTriedOne: "It worked. Try the other zone or continue.",
    tourTriedAll: "Both zones tested.",
    tourTriedSpeed: "Gesture detected — speed changed.",
    tourTriedTimeSpeed: "Speed changed without clicking −/+.",
    tourTriedZoom: "Zoom changed. You can now drag the enlarged video.",
    tourTriedControl: "The control worked.",
  },
  es: {
    decreaseSpeed: "Disminuir velocidad\nWin: Ctrl+Shift+↓\nMac: ⌘+Shift+↓",
    increaseSpeed: "Aumentar velocidad\nWin: Ctrl+Shift+↑\nMac: ⌘+Shift+↑",
    toggleBoost: "Cambiar 1× / velocidad recordada\nWin: Ctrl+Shift+→\nMac: ⌘+Shift+→",
    frameBack1: "1 fotograma atrás\nAlt+,",
    frameForward1: "1 fotograma adelante\nAlt+.",
    frameBack5: (n) => `${n} fotogramas atrás\nShift+Alt+,`,
    frameForward5: (n) => `${n} fotogramas adelante\nShift+Alt+.`,
    loopSetA: "Marcar punto A en la posición actual\nAlt+A",
    loopSetB: "Marcar punto B en la posición actual\nAlt+B",
    loopToggle: "Activar / desactivar repetición de sección\nAlt+L",
    loopClear: "Borrar puntos A y B",
    loopTooShort: "El fragmento es demasiado corto — se requiere al menos 0.1 segundos.",
    zonesHint: (left, right) => `Rueda del ratón: izquierda — ${left}, derecha — ${right}`,
    wheelActSeek: "avance",
    wheelActVolume: "volumen",
    wheelActSpeed: "velocidad",
    secShort: "s",
    timeLeftTitle: (speed) =>
      `Tiempo restante a velocidad ${speed} (tiempo real)`,
    liveDelayTitle: (time) => `Hasta el directo: ${time}`,
    screenshotButton: "Guardar el fotograma actual como imagen",
    screenshotSaved: "Fotograma guardado",
    screenshotFailed: "No se pudo guardar el fotograma",
    videoZoomLabel: "Acercar video",
    tourBrand: "WheelPilot for YouTube · recorrido",
    tourOverviewTitle: "Mapa de funciones",
    tourOverviewBody: "Mira todas las zonas principales a la vez. Elige una o sigue el recorrido corto.",
    tourMapLeft: (action) => `Rueda a la izquierda: ${action}`,
    tourMapCenter: (action) => `Botón izquierdo + rueda: ${action}`,
    tourMapRight: (action) => `Rueda a la derecha: ${action}`,
    tourMapZoom: "Rueda aquí: zoom de vídeo",
    tourMapTimeSpeed: "Rueda sobre el tiempo: velocidad sin −/+",
    tourMapControls: (items) => items,
    tourMapTime: "Tiempo restante según la velocidad",
    tourZonesTitle: "Controla el reproductor con la rueda",
    tourZonesBody: (left, right) => `La zona izquierda controla ${left}; la derecha, ${right}. El centro conserva el desplazamiento normal. Arrastra los límites verticales con el cursor ↔; los cambios se guardan al instante.`,
    tourZonesOff: "Las zonas de rueda están desactivadas. Puedes activarlas y reasignarlas en el popup.",
    tourZonesFullscreen: "Las zonas están configuradas solo para pantalla completa. Entra en ese modo para probarlas.",
    tourSpeedTitle: "Cambia la velocidad sin buscar controles",
    tourSpeedBody: (action) => `Mantén pulsado el botón izquierdo sobre el vídeo y gira la rueda: la acción asignada es ${action}.`,
    tourSpeedOff: "El gesto botón izquierdo + rueda está desactivado. Asígnalo en los ajustes de zonas.",
    tourTimeSpeedTitle: "Velocidad sobre el indicador de tiempo",
    tourTimeSpeedBody: "Apunta a cualquier lugar del indicador de tiempo y gira la rueda para cambiar la velocidad. No hace falta pulsar − o +.",
    tourTimeSpeedOff: "El control de velocidad sobre el tiempo está desactivado con el grupo de velocidad. Actívalo en la pestaña Reproductor.",
    tourZoomTitle: "Acerca los detalles del vídeo",
    tourZoomBody: "Apunta al icono de la parte superior central y gira la rueda para ampliar de 1–4×. Arrastra el vídeo ampliado para moverlo; gira hacia atrás para volver a 1×.",
    tourZoomOff: "El zoom de vídeo está desactivado. Actívalo en el popup: Reproductor → Botones de la barra.",
    tourControlsTitle: "Herramientas dentro de YouTube",
    tourControlsBody: (items) => `La barra incluye actualmente: ${items}.`,
    tourControlsOff: "Los botones están ocultos. Actívalos en la pestaña Reproductor del popup.",
    tourControlSpeed: "velocidad",
    tourControlFrames: "avance por fotogramas",
    tourControlLoop: "repetición A–B",
    tourControlScreenshot: "captura",
    tourTimeTitle: "Tiempo real restante",
    tourTimeBody: "El tiempo restante considera la velocidad. En pantalla completa, una línea fina mantiene visible el progreso.",
    tourTimeOff: "El cálculo del tiempo restante está desactivado. Actívalo en Tiempo y progreso.",
    tourStart: "Empezar",
    tourBack: "Atrás",
    tourNext: "Siguiente",
    tourFinish: "Listo",
    tourSkip: "Omitir",
    tourClose: "Cerrar recorrido",
    tourOverviewProgress: "Resumen",
    tourProgress: (step, total) => `${step} de ${total}`,
    tourTryZones: "Prueba la rueda o arrastra cualquier límite. Los valores exactos también están en el popup.",
    tourZoneLeftHandle: "Cambiar el tamaño de la zona izquierda",
    tourZoneRightHandle: "Cambiar el tamaño de la zona derecha",
    tourZonesDragging: (left, right) => `Límites: ${left}% y ${right}%`,
    tourZonesSaved: (left, right) => `Límites guardados: ${left}% y ${right}%.`,
    tourTrySpeed: "Prueba el gesto o continúa directamente.",
    tourTryTimeSpeed: "Prueba la rueda en cualquier parte del indicador de tiempo resaltado.",
    tourTryZoom: "Prueba la rueda dentro del cuadrado resaltado.",
    tourTriedOne: "Funciona. Prueba la otra zona o continúa.",
    tourTriedAll: "Has probado ambas zonas.",
    tourTriedSpeed: "Gesto detectado: la velocidad cambió.",
    tourTriedTimeSpeed: "La velocidad cambió sin pulsar −/+.",
    tourTriedZoom: "El zoom cambió. Ahora puedes arrastrar el vídeo ampliado.",
    tourTriedControl: "El control funcionó.",
  },
  ko: {
    decreaseSpeed: "속도 낮추기\nWin: Ctrl+Shift+↓\nMac: ⌘+Shift+↓",
    increaseSpeed: "속도 높이기\nWin: Ctrl+Shift+↑\nMac: ⌘+Shift+↑",
    toggleBoost: "1× / 기억된 속도 전환\nWin: Ctrl+Shift+→\nMac: ⌘+Shift+→",
    frameBack1: "1프레임 뒤로\nAlt+,",
    frameForward1: "1프레임 앞으로\nAlt+.",
    frameBack5: (n) => `${n}프레임 뒤로\nShift+Alt+,`,
    frameForward5: (n) => `${n}프레임 앞으로\nShift+Alt+.`,
    loopSetA: "현재 위치에 A 지점 설정\nAlt+A",
    loopSetB: "현재 위치에 B 지점 설정\nAlt+B",
    loopToggle: "구간 반복 켜기/끄기\nAlt+L",
    loopClear: "A 및 B 지점 지우기",
    loopTooShort: "구간이 너무 짧습니다 — 최소 0.1초가 필요합니다.",
    zonesHint: (left, right) => `마우스 휠: 왼쪽 — ${left}, 오른쪽 — ${right}`,
    wheelActSeek: "탐색",
    wheelActVolume: "음량",
    wheelActSpeed: "속도",
    secShort: "초",
    timeLeftTitle: (speed) => `${speed} 속도로 남은 시간 (실제 시간)`,
    liveDelayTitle: (time) => `실시간까지: ${time}`,
    screenshotButton: "현재 프레임을 이미지로 저장",
    screenshotSaved: "프레임이 저장되었습니다",
    screenshotFailed: "프레임 저장 실패",
    videoZoomLabel: "동영상 확대",
    tourBrand: "WheelPilot for YouTube · 둘러보기",
    tourOverviewTitle: "기능 지도",
    tourOverviewBody: "핵심 영역을 한눈에 보고 원하는 영역을 선택하거나 짧은 안내를 따라가세요.",
    tourMapLeft: (action) => `왼쪽 휠: ${action}`,
    tourMapCenter: (action) => `왼쪽 버튼 + 휠: ${action}`,
    tourMapRight: (action) => `오른쪽 휠: ${action}`,
    tourMapZoom: "여기서 휠: 동영상 확대",
    tourMapTimeSpeed: "시간 위 휠: −/+ 없이 속도 변경",
    tourMapControls: (items) => items,
    tourMapTime: "속도를 반영한 남은 시간",
    tourZonesTitle: "휠로 플레이어 제어",
    tourZonesBody: (left, right) => `왼쪽 영역은 ${left}, 오른쪽 영역은 ${right}을 제어합니다. 가운데는 일반 페이지 스크롤입니다. ↔ 커서로 세로 경계를 끌면 변경 사항이 즉시 저장됩니다.`,
    tourZonesOff: "휠 영역이 꺼져 있습니다. popup에서 켜고 다시 지정할 수 있습니다.",
    tourZonesFullscreen: "휠 영역이 전체 화면에서만 작동하도록 설정되어 있습니다. 전체 화면에서 시도하세요.",
    tourSpeedTitle: "버튼을 찾지 않고 속도 변경",
    tourSpeedBody: (action) => `동영상에서 왼쪽 버튼을 누른 채 휠을 돌리세요. 지정된 동작은 ${action}입니다.`,
    tourSpeedOff: "왼쪽 버튼 + 휠이 꺼져 있습니다. 휠 영역 설정에서 지정하세요.",
    tourTimeSpeedTitle: "시간 표시에서 바로 속도 변경",
    tourTimeSpeedBody: "시간 표시의 아무 곳에나 포인터를 놓고 휠을 돌리면 속도가 바뀝니다. − 또는 + 버튼을 누를 필요가 없습니다.",
    tourTimeSpeedOff: "시간 표시의 속도 제어가 속도 그룹과 함께 꺼져 있습니다. popup의 플레이어 탭에서 켜세요.",
    tourZoomTitle: "동영상 세부 화면 확대",
    tourZoomBody: "상단 중앙 아이콘에 포인터를 놓고 휠을 돌려 1–4배로 확대하세요. 확대된 화면은 마우스로 끌어 이동하고, 반대로 돌리면 1배로 돌아갑니다.",
    tourZoomOff: "동영상 확대가 꺼져 있습니다. popup의 플레이어 → 플레이어 바 버튼에서 켜세요.",
    tourControlsTitle: "YouTube 안의 도구",
    tourControlsBody: (items) => `플레이어 바에서 현재 사용할 수 있는 기능: ${items}.`,
    tourControlsOff: "플레이어 버튼이 숨겨져 있습니다. popup의 플레이어 탭에서 켜세요.",
    tourControlSpeed: "속도",
    tourControlFrames: "프레임 이동",
    tourControlLoop: "A–B 반복",
    tourControlScreenshot: "스크린샷",
    tourTimeTitle: "실제 남은 시청 시간",
    tourTimeBody: "시간 표시는 재생 속도를 반영합니다. 전체 화면에서는 얇은 선으로 진행률을 계속 보여 줍니다.",
    tourTimeOff: "속도를 반영한 남은 시간 표시가 꺼져 있습니다. 시간 및 진행률에서 켜세요.",
    tourStart: "시작",
    tourBack: "이전",
    tourNext: "다음",
    tourFinish: "완료",
    tourSkip: "건너뛰기",
    tourClose: "둘러보기 닫기",
    tourOverviewProgress: "개요",
    tourProgress: (step, total) => `${step} / ${total}`,
    tourTryZones: "휠을 사용하거나 경계를 끌어 보세요. 정확한 값은 popup에서도 설정할 수 있습니다.",
    tourZoneLeftHandle: "왼쪽 영역 너비 변경",
    tourZoneRightHandle: "오른쪽 영역 너비 변경",
    tourZonesDragging: (left, right) => `경계: ${left}% 및 ${right}%`,
    tourZonesSaved: (left, right) => `경계 저장됨: ${left}% 및 ${right}%.`,
    tourTrySpeed: "제스처를 사용해 보거나 바로 계속하세요.",
    tourTryTimeSpeed: "강조된 시간 표시 안의 아무 곳에서나 휠을 돌려 보세요.",
    tourTryZoom: "강조된 사각형 안에서 휠을 돌려 보세요.",
    tourTriedOne: "작동했습니다. 다른 영역도 시도하거나 계속하세요.",
    tourTriedAll: "두 영역을 모두 확인했습니다.",
    tourTriedSpeed: "제스처가 감지되어 속도가 변경되었습니다.",
    tourTriedTimeSpeed: "−/+ 버튼 없이 속도가 변경되었습니다.",
    tourTriedZoom: "확대 배율이 변경되었습니다. 이제 확대된 화면을 끌 수 있습니다.",
    tourTriedControl: "컨트롤이 작동했습니다.",
  },
};

let currentSpeed = DEFAULT_SPEED;
let rememberedToggleSpeed = DEFAULT_SPEED;
let currentLanguage = DEFAULT_LANGUAGE;
let autoApplyDefault = DEFAULT_AUTO_APPLY;
let applyToAds = DEFAULT_APPLY_TO_ADS;
let frameStepHotkeysEnabled = DEFAULT_FRAME_STEP_HOTKEYS;
let frameStepBack = DEFAULT_FRAME_STEP_BACK;
let frameStepForward = DEFAULT_FRAME_STEP_FORWARD;
let speedMin = DEFAULT_SPEED_MIN;
let speedMax = DEFAULT_SPEED_MAX;
let lastFrameStepAt = 0; // для throttle при зажатой клавише

let loopHotkeysEnabled = DEFAULT_LOOP_HOTKEYS;
let speedStep = DEFAULT_SPEED_STEP;
// Колёсные зоны и жесты с зажатой кнопкой мыши
let wheelZonesMode = DEFAULT_WHEEL_ZONES_MODE;
let wheelSeekStep = DEFAULT_WHEEL_SEEK_STEP;
let wheelVolumeStep = DEFAULT_WHEEL_VOLUME_STEP;
let zoneLeftEdge = DEFAULT_ZONE_LEFT_EDGE;
let zoneRightEdge = DEFAULT_ZONE_RIGHT_EDGE;
let zoneLeftAction = DEFAULT_ZONE_LEFT_ACTION;
let zoneRightAction = DEFAULT_ZONE_RIGHT_ACTION;
let lmbWheelAction = DEFAULT_LMB_WHEEL_ACTION;
let rmbWheelAction = DEFAULT_RMB_WHEEL_ACTION;
let zoneLeftInvert = DEFAULT_WHEEL_INVERT;
let zoneRightInvert = DEFAULT_WHEEL_INVERT;
let lmbWheelInvert = DEFAULT_WHEEL_INVERT;
let rmbWheelInvert = DEFAULT_WHEEL_INVERT;
let playerButtonsEnabled = DEFAULT_PLAYER_BUTTONS;
let pbFrameButtonsEnabled = DEFAULT_PB_FRAME_BUTTONS;
let pbLoopButtonsEnabled = DEFAULT_PB_LOOP_BUTTONS;
let playerTimeLeftEnabled = DEFAULT_PLAYER_TIME_LEFT;
let miniProgressMode = DEFAULT_MINI_PROGRESS;
let miniProgressHeight = DEFAULT_MINI_PROGRESS_HEIGHT;
let miniProgressColor = DEFAULT_MINI_PROGRESS_COLOR;
let volumeBoostEnabled = DEFAULT_VOLUME_BOOST;
let volumeBoostMaxPct = DEFAULT_VOLUME_BOOST_MAX;
let screenshotButtonEnabled = DEFAULT_SCREENSHOT_BUTTON;
let videoZoomEnabled = DEFAULT_VIDEO_ZOOM;
// Текущее усиление в процентах: 100 — выключено. Живёт только в памяти
// вкладки: возвращать пользователя после перезагрузки сразу в 250% —
// неожиданная громкость, поэтому усиление каждый раз начинается с нуля.
let volumeBoostPct = 100;
let audioChain = null;        // { ctx, source, gain, limiter, video, boosting }
let audioResumeBound = false;
let bezelHideTimer = null;
let uiTickTimer = null;
let lmbDownOnPlayer = false;  // ЛКМ зажата над областью видео
let lmbWheelUsed = false;     // во время удержания крутили колесо →
                              // подавить click, чтобы YouTube не поставил паузу
let rmbWheelUsedAt = 0;       // timestamp жеста ПКМ+колесо → подавить
                              // contextmenu, которое всплывёт по отпусканию

// Видео-зум (заимствовано у YouTubeTweak, player-videoZoom.ts — см.
// КОНКУРЕНТ-ФИЧИ.md). Отличие: зона-триггер вверху по центру плеера,
// а не в геометрическом центре — центр отдан колёсным зонам перемотки/
// громкости и жесту ЛКМ+колесо=скорость.
const VIDEO_ZOOM_MIN = 1;
const VIDEO_ZOOM_MAX = 4;
const VIDEO_ZOOM_STEP = 0.125;
const VIDEO_ZOOM_DRAG_THRESHOLD = 3;
const VIDEO_ZOOM_TRIGGER_WIDTH = 200;
const VIDEO_ZOOM_TRIGGER_HEIGHT = 140;
let videoZoom = VIDEO_ZOOM_MIN;
let videoZoomOffsetX = 0;
let videoZoomOffsetY = 0;
let videoZoomDragging = false;
let videoZoomHasDragged = false;
let videoZoomSuppressClick = false;
let videoZoomDragStartX = 0;
let videoZoomDragStartY = 0;
let videoZoomDragStartOffsetX = 0;
let videoZoomDragStartOffsetY = 0;
let videoZoomListenersBound = false;
let videoZoomTriggerEl = null;

let toastHideTimer = null;
let zonesHintShown = false;   // легенда зон — один раз за сессию
let loopA = null;                              // секунды или null
let loopB = null;
let loopActive = false;                        // циклирование сейчас работает
let loopVfcHandle = null;                      // requestVideoFrameCallback id
let loopVideoListener = null;                  // { v, onTimeUpdate }
let loopAttachedTo = null;                     // на каком video мы сейчас сидим
// Map: { "@handle" | "UC...channelId": speed }. Источник правды — chrome.storage.sync.
// На запись пишем при явных действиях пользователя ("Сохранить для канала"),
// чтобы случайные настройки скорости в одном видео не «прилипали» к каналу.
let channelSpeeds = {};
let applyTimer = null;
let videoCheckTimer = null;
// Последняя скорость, реально применённая к видео — для дедупликации
let lastAppliedSpeed = null;
let adObserver = null;
let mainWorldPlayerState = null;
let liveHeadDetectedAt = 0;
let liveHeadVideo = null;

function clampSpeed(value) {
  const speed = Number(value);

  if (Number.isNaN(speed)) {
    return DEFAULT_SPEED;
  }

  // Используем пользовательские границы, не хардкод. Это даёт расширению
  // полный диапазон возможностей HTMLMediaElement (0.1–16×).
  return Math.min(
    speedMax,
    Math.max(speedMin, Math.round(speed * 100) / 100),
  );
}

// Применяется к границам speedMin/speedMax — не к самой скорости.
// Гарантирует что значение в [HARD_SPEED_MIN..HARD_SPEED_MAX].
function clampHardSpeed(value, fallback) {
  const n = Number(value);
  if (!isFinite(n)) return fallback;
  return Math.min(HARD_SPEED_MAX, Math.max(HARD_SPEED_MIN, Math.round(n * 100) / 100));
}

// Шаг изменения скорости — 0.05..1.0, кратен 0.05.
function clampSpeedStep(value) {
  const n = Number(value);
  if (!isFinite(n)) return DEFAULT_SPEED_STEP;
  return Math.min(SPEED_STEP_MAX, Math.max(SPEED_STEP_MIN, Math.round(n * 20) / 20));
}

// Шаг кадров — целое число от 1 до 60. Слишком большие значения могут
// дать ощущение «скачка», слишком маленькие — бессмысленны (есть ◀ ▶).
function clampFrameStep(value) {
  const n = Math.round(Number(value));
  if (!isFinite(n) || n < 1) return DEFAULT_FRAME_STEP_LARGE;
  return Math.min(60, Math.max(1, n));
}

function normalizeWheelZonesMode(value) {
  return ["off", "fullscreen", "always"].includes(value)
    ? value
    : DEFAULT_WHEEL_ZONES_MODE;
}

// Единый набор действий на колесо для всех слотов (зоны, ЛКМ, ПКМ).
function normalizeWheelAction(value, fallback) {
  return ["off", "seek", "speed", "volume"].includes(value) ? value : fallback;
}

function normalizeLmbWheelAction(value) {
  return normalizeWheelAction(value, DEFAULT_LMB_WHEEL_ACTION);
}

// Границы зон валидны только в паре: левая ∈ [ZONE_EDGE_MIN, правая − GAP],
// правая ∈ [левая + GAP, ZONE_EDGE_MAX]. Возвращаем скорректированную пару —
// защита от чужих/битых данных в storage.
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

function normalizeMiniProgressMode(value) {
  return ["off", "fullscreen", "always"].includes(value)
    ? value
    : DEFAULT_MINI_PROGRESS;
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

// Потолок усиления — 110..200%, кратен 10. Верхняя граница отражает то,
// что шкала теперь в дБ (см. boostPctToGain): 200% — это уже +10 дБ,
// дальше лимитер сжимает звук так сильно, что усиление теряет смысл.
function clampVolumeBoostMax(value) {
  const n = Math.round(Number(value) / 10) * 10;
  if (!isFinite(n)) return DEFAULT_VOLUME_BOOST_MAX;
  return Math.min(VOLUME_BOOST_MAX_MAX, Math.max(VOLUME_BOOST_MAX_MIN, n));
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

// WCAG 2.3.3: уважаем системную настройку сокращённой анимации.
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

// WCAG 4.1.2: у кнопки-иконки должно быть имя. Первая строка title —
// краткое действие (без хоткеев) — становится aria-label.
function setButtonLabel(button, title) {
  if (!button) return;
  button.title = title;
  button.setAttribute("aria-label", String(title).split("\n")[0]);
}

function formatSpeed(speed) {
  return `${clampSpeed(speed)
    .toFixed(2)
    .replace(/\.?0+$/, "")}×`;
}

function normalizeLanguage(language) {
  const normalizedLanguage = String(language || "")
    .slice(0, 2)
    .toLowerCase();

  return SUPPORTED_LANGUAGES.includes(normalizedLanguage)
    ? normalizedLanguage
    : DEFAULT_LANGUAGE;
}

function translate(key, ...args) {
  const dictionary =
    translations[currentLanguage] || translations[DEFAULT_LANGUAGE];

  const value = dictionary[key] || translations[DEFAULT_LANGUAGE][key] || key;
  return typeof value === "function" ? value(...args) : value;
}

function findVideo() {
  return (
    document.querySelector("video.html5-main-video") ||
    document.querySelector("video")
  );
}

function getYouTubePlayer() {
  return document.querySelector(".html5-video-player");
}

// MAIN-world мост отвечает синхронно на CustomEvent, поэтому результат уже
// доступен после dispatchEvent(). Если API плеера ещё не поднялся, вернётся
// null и live-логика использует DOM/seekable fallback.
document.addEventListener(PLAYER_STATE_EVENT, (event) => {
  const detail = event && event.detail;
  if (
    !detail ||
    typeof detail.isLive !== "boolean" ||
    typeof detail.hasLiveHead !== "boolean" ||
    typeof detail.isAtLiveHead !== "boolean"
  ) {
    return;
  }
  const progress = detail.progress;
  const current =
    progress &&
    typeof progress.current === "number" &&
    Number.isFinite(progress.current)
      ? progress.current
      : null;
  const seekableEnd =
    progress &&
    typeof progress.seekableEnd === "number" &&
    Number.isFinite(progress.seekableEnd)
      ? progress.seekableEnd
      : null;
  mainWorldPlayerState = {
    isLive: detail.isLive,
    hasLiveHead: detail.hasLiveHead,
    isAtLiveHead: detail.isAtLiveHead,
    progress: current != null && seekableEnd != null
      ? { current, seekableEnd }
      : null,
  };
});

function requestMainWorldPlayerState() {
  mainWorldPlayerState = null;
  try {
    document.dispatchEvent(
      new CustomEvent(PLAYER_CMD_EVENT, {
        detail: { cmd: "getPlayerState" },
      }),
    );
  } catch {
    return null;
  }
  return mainWorldPlayerState;
}

// Достаёт ссылку на канал из DOM. YouTube переименовывает классы, поэтому
// перебираем несколько устойчивых селекторов и берём первый, у которого
// есть href с /@... или /channel/...
function findChannelLink() {
  const path = location.pathname;

  let selectors = [];
  if (path.startsWith("/watch")) {
    selectors = [
      "ytd-watch-flexy ytd-channel-name#channel-name a",
      "ytd-watch-flexy ytd-video-owner-renderer ytd-channel-name a",
      "ytd-watch-flexy #upload-info ytd-channel-name a",
      "ytd-watch-flexy #owner a.yt-simple-endpoint",
      "ytd-watch-flexy a.ytd-video-owner-renderer",
    ];
  } else if (path.startsWith("/shorts/")) {
    selectors = [
      'ytd-reel-video-renderer[is-active] a.yt-simple-endpoint[href^="/@"]',
      'ytd-reel-video-renderer[is-active] a.yt-simple-endpoint[href^="/channel/"]',
      "ytd-reel-video-renderer[is-active] ytd-channel-name a",
    ];
  } else {
    return null;
  }

  for (const sel of selectors) {
    const link = document.querySelector(sel);
    if (link && link.getAttribute("href")) {
      return link;
    }
  }
  return null;
}

// Возвращает { id, name } для текущего канала или null. id нормализован
// к виду "@handle" (если есть) или "UCxxxx" (channelId без префикса).
// Имя — текст ссылки, обрезанный.
function getCurrentChannel() {
  const link = findChannelLink();
  if (!link) return null;

  const href = link.getAttribute("href") || "";

  const handleMatch = href.match(/^\/(@[^/?#]+)/);
  const idMatch = href.match(/^\/channel\/([^/?#]+)/);

  let id = null;
  if (handleMatch) {
    id = handleMatch[1]; // включает префикс "@"
  } else if (idMatch) {
    id = idMatch[1]; // "UC..." без префикса
  }

  if (!id) return null;

  const name = (link.textContent || "").replace(/\s+/g, " ").trim() || id;
  return { id, name };
}

// Возвращает число (скорость) из записи карты каналов.
// Поддерживает старый формат (просто число) и новый ({ speed, name }).
// Возвращает null, если запись отсутствует или повреждена.
function getEntrySpeed(entry) {
  if (entry == null) return null;
  if (typeof entry === "number") return clampSpeed(entry);
  if (typeof entry === "object" && typeof entry.speed === "number") {
    return clampSpeed(entry.speed);
  }
  return null;
}

// Приводит карту каналов к новому формату { id: { speed, name } }.
// Старые записи (просто числа) превращаются в объекты с name=id.
// Применяется к storedChannels из storage и при storage.onChanged.
function migrateChannelMap(raw) {
  if (!raw || typeof raw !== "object") return {};
  const out = {};
  let changed = false;
  for (const [id, entry] of Object.entries(raw)) {
    if (typeof entry === "number") {
      out[id] = { speed: clampSpeed(entry), name: id };
      changed = true;
    } else if (entry && typeof entry === "object" && typeof entry.speed === "number") {
      out[id] = {
        speed: clampSpeed(entry.speed),
        name: typeof entry.name === "string" && entry.name ? entry.name : id,
      };
    }
    // Любые другие битые значения игнорируем.
  }
  // Если структура изменилась — пишем обратно в storage, чтобы не
  // мигрировать на каждом запуске.
  if (changed) {
    chrome.storage.sync.set({ [CHANNEL_SPEEDS_STORAGE_KEY]: out });
  }
  return out;
}

function getSavedChannelSpeed() {
  const channel = getCurrentChannel();
  if (!channel) return null;
  return getEntrySpeed(channelSpeeds[channel.id]);
}

// YouTube вешает класс .ad-showing на .html5-video-player пока проигрывается
// рекламный ролик. По нему отличаем рекламу от основного видео — точнее,
// чем проверять URL или продолжительность.
function isAdShowing() {
  const player = getYouTubePlayer();
  return Boolean(player && player.classList.contains("ad-showing"));
}

// Какую скорость реально ставить видео сейчас. Если пользователь выключил
// «Ускорять также рекламу» и идёт реклама — отдаём 1×; в остальных случаях
// — выбранную скорость.
function getEffectiveSpeedForVideo() {
  if (!applyToAds && isAdShowing()) {
    return 1;
  }
  return currentSpeed;
}

function getOverlayContainer() {
  return document.fullscreenElement || document.documentElement;
}

function saveSpeed(speed) {
  chrome.storage.sync.set({
    [STORAGE_KEY]: clampSpeed(speed),
  });
}

function applySpeed(speed, shouldSave = true) {
  currentSpeed = clampSpeed(speed);

  if (Math.abs(currentSpeed - 1) > 0.01) {
    rememberedToggleSpeed = currentSpeed;
  }

  const video = findVideo();

  if (video) {
    const effective = getEffectiveSpeedForVideo();
    video.playbackRate = effective;
    lastAppliedSpeed = effective;
  }

  updatePlayerBar();

  if (shouldSave) {
    saveSpeed(currentSpeed);
  }

  return currentSpeed;
}

function applyDefaultSpeedIfEnabled() {
  if (!autoApplyDefault) {
    updatePlayerBar();
    return;
  }

  const video = findVideo();

  if (!video) {
    updatePlayerBar();
    return;
  }

  // Прямой эфир у живого края: YouTube сбросил скорость до 1× — принимаем,
  // а не возвращаем канальную (иначе цикл «пауза–ускорение»).
  if (adoptLiveCatchUpReset(video)) return;

  // Применяем только если видео реально играет с другой скоростью.
  // Это предотвращает перезапись скорости, установленной из popup.
  const videoRate = Math.round(video.playbackRate * 100) / 100;
  const effective = getEffectiveSpeedForVideo();

  if (Math.abs(videoRate - effective) > 0.01) {
    video.playbackRate = effective;
    lastAppliedSpeed = effective;
  }

  updatePlayerBar();
}

// Применяет либо сохранённую скорость для канала текущего видео, либо
// глобальное автоприменение, если канал не привязан. Делает несколько
// попыток с задержкой: канал в DOM появляется не моментально после
// yt-navigate-finish (особенно при медленной сети).
function applyChannelOrDefaultSpeedWithRetry(attempt = 0) {
  const maxAttempts = 8; // ~3.6 секунды максимум при задержках ниже
  const channel = getCurrentChannel();

  if (channel) {
    const savedSpeed = getEntrySpeed(channelSpeeds[channel.id]);
    if (savedSpeed != null) {
      // Канал найден и для него есть сохранённая скорость — применяем её,
      // но НЕ перезаписываем глобальный default (передаём shouldSave=false).
      applySpeed(savedSpeed, false);
      return;
    }

    // Канал найден, но привязки нет — используем глобальный default.
    applyDefaultSpeedIfEnabled();
    return;
  }

  // Канал ещё не появился в DOM. Пробуем дальше с растущим back-off.
  if (attempt >= maxAttempts) {
    // Сдались — применяем глобальный default, чтобы видео не осталось
    // на чужой скорости.
    applyDefaultSpeedIfEnabled();
    return;
  }

  const delay = 200 + attempt * 250; // 200, 450, 700, ...
  window.setTimeout(() => applyChannelOrDefaultSpeedWithRetry(attempt + 1), delay);
}

// Реагирует на смену состояния рекламы. Если идёт реклама и пользователь
// её ускорять не хочет — выставляем 1×; когда реклама заканчивается —
// возвращаем выбранную скорость.
function reapplyForAdTransition() {
  const video = findVideo();
  if (!video) return;

  // Прямой эфир у живого края: не возвращаем скорость после сброса YouTube.
  // Важно именно здесь: наблюдатель классов плеера вызывает нас на каждый
  // чих (autohide и т.п.), и именно этот путь крутил цикл «пауза–ускорение».
  if (adoptLiveCatchUpReset(video)) return;

  const effective = getEffectiveSpeedForVideo();
  const videoRate = Math.round(video.playbackRate * 100) / 100;

  if (Math.abs(videoRate - effective) > 0.01) {
    video.playbackRate = effective;
    lastAppliedSpeed = effective;
  }
}

// Подписываемся на изменение класса плеера. По нему ловим:
//   — переход «реклама ↔ основное видео» (класс ad-showing)
//   — autohide-цикл в fullscreen (класс ytp-autohide), чтобы вовремя
//     синхронизировать видимость нашей панели.
function watchAdState() {
  const player = getYouTubePlayer();
  if (!player) return;

  if (adObserver) {
    adObserver.disconnect();
  }

  let lastAutohide = player.classList.contains("ytp-autohide");

  adObserver = new MutationObserver(() => {
    // Скорость для рекламы — отдельная логика
    reapplyForAdTransition();

    // Autohide влияет на столкновения и видимость встроенной панели.
    const isAutohide = player.classList.contains("ytp-autohide");
    if (isAutohide !== lastAutohide) {
      lastAutohide = isAutohide;
      updatePlayerBar();
    }
  });

  adObserver.observe(player, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function getSteppedSpeed(direction) {
  const speed = clampSpeed(currentSpeed);
  // Шаг задаётся пользователем в options. Округляем до 2 знаков, чтобы
  // не накапливать ошибки floating-point при многократных нажатиях.
  const next = Math.round((speed + direction * speedStep) * 100) / 100;
  return clampSpeed(next);
}

function increaseSpeed() {
  return applySpeed(getSteppedSpeed(1));
}

function decreaseSpeed() {
  return applySpeed(getSteppedSpeed(-1));
}

function toggleBoost() {
  if (Math.abs(currentSpeed - 1) > 0.01) {
    rememberedToggleSpeed = currentSpeed;
    return applySpeed(1);
  }

  return applySpeed(rememberedToggleSpeed || DEFAULT_SPEED);
}

// ---------------------------------------------------------------------------
// Форматирование времени для счётчика, безелей и A-B повтора
// ---------------------------------------------------------------------------

function formatSeconds(totalSeconds) {
  if (!isFinite(totalSeconds) || totalSeconds < 0) return "--:--";
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const ss = String(sec).padStart(2, "0");
  // Ведущий ноль у минут — только когда есть часы (обязателен в "1:04:46").
  // Без часов минуты не дополняются, как в нативном тайм-коде YouTube ("4:46").
  if (h > 0) {
    const mm = String(m).padStart(2, "0");
    return `${h}:${mm}:${ss}`;
  }
  return `${m}:${ss}`;
}

// ---------------------------------------------------------------------------
// Покадровый режим для аниматоров
// ---------------------------------------------------------------------------

// Эмулирует одно нажатие клавиши на странице YouTube. YouTube слушает
// keydown с key="," / "." на document и делает покадровый шаг сам —
// нам не нужно знать FPS видео.
function dispatchKeyToYouTube(key) {
  // Ставим на паузу, если ещё играем — иначе YouTube проигнорирует шаг.
  const video = findVideo();
  if (video && !video.paused) {
    try { video.pause(); } catch { /* ignore */ }
  }

  const target = getYouTubePlayer() || document.body;
  const opts = {
    key,
    code: key === "," ? "Comma" : "Period",
    keyCode: key === "," ? 188 : 190,
    which:   key === "," ? 188 : 190,
    bubbles: true,
    cancelable: true,
  };

  target.dispatchEvent(new KeyboardEvent("keydown", opts));
  target.dispatchEvent(new KeyboardEvent("keyup",   opts));
}

// Делает N последовательных шагов с микропаузой, чтобы YouTube успел
// обработать каждое событие. 16мс = примерно один кадр.
function stepFrames(direction, count = 1) {
  const key = direction < 0 ? "," : ".";
  let i = 0;
  const step = () => {
    if (i >= count) return;
    dispatchKeyToYouTube(key);
    i++;
    if (i < count) window.setTimeout(step, 16);
  };
  step();
}

// Глобальный слушатель Alt+, / Alt+. с throttle. Capture = true чтобы
// не зависеть от того, перехватывает ли YouTube событие позже.
function onFrameStepHotkey(event) {
  if (!frameStepHotkeysEnabled) return;
  if (!event.altKey) return;
  if (event.ctrlKey || event.metaKey) return;
  if (event.key !== "," && event.key !== ".") return;

  // Не трогаем ввод в полях
  const t = event.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
    return;
  }

  // Throttle 60мс, чтобы зажатая клавиша не залагала
  const now = Date.now();
  if (now - lastFrameStepAt < 60) {
    event.preventDefault();
    return;
  }
  lastFrameStepAt = now;

  event.preventDefault();
  event.stopPropagation();

  const direction = event.key === "," ? -1 : +1;
  const count = event.shiftKey
    ? (direction < 0 ? frameStepBack : frameStepForward)
    : 1;
  stepFrames(direction, count);
}

// ---------------------------------------------------------------------------
// A-B Loop: повтор отрезка между точками
// ---------------------------------------------------------------------------

// Форматирует секунды в "m:ss" или "h:mm:ss". Используем тот же стиль, что
// у YouTube в его UI — пользователь видит знакомый формат.
function formatLoopTime(s) {
  if (!isFinite(s) || s < 0) return "—:—";
  const total = Math.max(0, Math.floor(s));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function setLoopA() {
  const video = findVideo();
  if (!video) return;
  loopA = Math.max(0, video.currentTime);
  // Если B уже стоит и стал меньше A — поменяем местами
  if (loopB != null && loopB < loopA) {
    const tmp = loopA; loopA = loopB; loopB = tmp;
  }
  updatePlayerBar();
}

function setLoopB() {
  const video = findVideo();
  if (!video) return;
  loopB = Math.max(0, video.currentTime);
  if (loopA != null && loopA > loopB) {
    const tmp = loopA; loopA = loopB; loopB = tmp;
  }
  updatePlayerBar();
}

function clearLoop() {
  loopA = null;
  loopB = null;
  loopActive = false;
  detachLoopWatcher();
  updatePlayerBar();
}

function toggleLoop() {
  if (loopA == null || loopB == null) {
    return;
  }
  if (loopB - loopA < LOOP_MIN_DURATION) {
    showLoopStatus(translate("loopTooShort"));
    return;
  }
  loopActive = !loopActive;
  if (loopActive) {
    attachLoopWatcher();
  } else {
    detachLoopWatcher();
  }
  updatePlayerBar();
}

// Главная проверка: не пора ли вернуться на A. Вызывается из rVFC или
// timeupdate — в зависимости от того, что доступно у видеоэлемента.
function loopCheck(video) {
  if (!loopActive || loopA == null || loopB == null) return;
  if (isAdShowing()) return; // не циклируем рекламу

  const t = video.currentTime;
  // Маленький запас (0.05с) предотвращает "выход за B" на медленных
  // tick'ах. Если t < A — возможно, пользователь сам перемотал назад
  // мимо A; возвращаем его внутрь лупа.
  if (t >= loopB - 0.02 || t < loopA - 0.05) {
    try { video.currentTime = loopA; } catch { /* ignore */ }
  }
}

function loopTickVfc(now, metadata) {
  const video = loopAttachedTo;
  if (!video) return;
  loopCheck(video);
  if (loopActive && typeof video.requestVideoFrameCallback === "function") {
    loopVfcHandle = video.requestVideoFrameCallback(loopTickVfc);
  }
}

function attachLoopWatcher() {
  detachLoopWatcher();
  const video = findVideo();
  if (!video) return;
  loopAttachedTo = video;

  // Предпочитаем requestVideoFrameCallback (точно по кадрам), иначе
  // fallback на событие timeupdate (~4Гц).
  if (typeof video.requestVideoFrameCallback === "function") {
    loopVfcHandle = video.requestVideoFrameCallback(loopTickVfc);
  } else {
    const onTimeUpdate = () => loopCheck(video);
    video.addEventListener("timeupdate", onTimeUpdate);
    loopVideoListener = { v: video, onTimeUpdate };
  }
}

function detachLoopWatcher() {
  if (loopVfcHandle != null && loopAttachedTo &&
      typeof loopAttachedTo.cancelVideoFrameCallback === "function") {
    try { loopAttachedTo.cancelVideoFrameCallback(loopVfcHandle); } catch { /* ignore */ }
  }
  loopVfcHandle = null;

  if (loopVideoListener) {
    const { v, onTimeUpdate } = loopVideoListener;
    if (v) v.removeEventListener("timeupdate", onTimeUpdate);
    loopVideoListener = null;
  }
  loopAttachedTo = null;
}

function showLoopStatus(text) {
  showActionToast(text, 2000);
}

// Глобальный слушатель Alt+A/B/L. Capture=true — ловим до того, как
// YouTube обработает свои хоткеи на тех же клавишах (если такие есть).
function onLoopHotkey(event) {
  if (!loopHotkeysEnabled) return;
  if (!event.altKey) return;
  if (event.ctrlKey || event.metaKey) return;

  // Не трогаем ввод в полях
  const t = event.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) {
    return;
  }

  const key = (event.key || "").toLowerCase();
  if (key !== "a" && key !== "b" && key !== "l") return;

  event.preventDefault();
  event.stopPropagation();

  if (key === "a") setLoopA();
  else if (key === "b") setLoopB();
  else if (key === "l") toggleLoop();
}

// При смене видео сбрасываем луп — он привязан к конкретному видео.
function resetLoopOnNavigation() {
  detachLoopWatcher();
  loopA = null;
  loopB = null;
  loopActive = false;
  updatePlayerBar();
}

// ---------------------------------------------------------------------------
// Фидбэк действий в стилистике плеера YouTube.
//
// YouTube на свои горячие клавиши показывает «безель» — тёмный круг по
// центру плеера с белой векторной иконкой и подписью под ним. Раньше мы
// рисовали эмодзи (🔊 ⏪ ⚡): в шрифте системы они цветные, выбиваются из
// монохромного плеера и на разных ОС выглядят по-разному. Теперь — тот же
// безель и собственные SVG в сетке 36×36 (родная сетка иконок ytp-*),
// чистый белый fill, без обводок и градиентов.
//
// Закон Якоба: пользователь уже знает этот безель по нативным Up/Down и
// «,»/«.», поэтому фидбэк расширения читается как часть плеера.
// ---------------------------------------------------------------------------

// Динамик — та же геометрия, что у нативной ytp-volume-button:
// корпус + рупор, дуги звуковых волн отдельными путями.
const YSB_SPEAKER_PATH =
  "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z";
const YSB_WAVE_INNER_PATH =
  "M19,14 C20.48,14.74 21.5,16.26 21.5,18 C21.5,19.77 20.48,21.32 19,22 L19,14 Z";
const YSB_WAVE_OUTER_PATH =
  "M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 " +
  "L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z";

// Иконки описаны данными, а не HTML-строкой: YouTube включает Trusted
// Types, и присваивание innerHTML на его страницах падает с ошибкой.
// Формат узла: [тег, атрибуты, вложенные узлы].
const YSB_ICONS = {
  volume: [
    ["path", { d: YSB_SPEAKER_PATH }],
    ["path", { d: YSB_WAVE_INNER_PATH }],
    ["path", { d: YSB_WAVE_OUTER_PATH }],
  ],
  // Звук выключен: корпус динамика без волн + перекрестие.
  volumeMute: [
    ["path", { d: YSB_SPEAKER_PATH }],
    [
      "path",
      {
        d: "M20,14 L27,22 M27,14 L20,22",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2.2",
        "stroke-linecap": "round",
      },
    ],
  ],
  // Усиление: внешняя волна красная — «выше нормы». Красный уже означает
  // «скорость ≠ 1×» на кнопке панели, смысл акцента общий.
  volumeBoost: [
    ["path", { d: YSB_SPEAKER_PATH }],
    ["path", { d: YSB_WAVE_INNER_PATH }],
    ["path", { d: YSB_WAVE_OUTER_PATH, fill: "#ff4e45" }],
  ],
  seekForward: [
    ["path", { d: "M6,10 L15,18 L6,26 Z" }],
    ["path", { d: "M17,10 L26,18 L17,26 Z" }],
  ],
  seekBack: [
    ["path", { d: "M30,10 L21,18 L30,26 Z" }],
    ["path", { d: "M19,10 L10,18 L19,26 Z" }],
  ],
  // Спидометр: полукольцо шкалы + стрелка в верхне-правом секторе.
  speed: [
    ["path", { d: "M6,22 A12,12 0 0 1 30,22 L26.4,22 A8.4,8.4 0 0 0 9.6,22 Z" }],
    ["path", { d: "M16.7,22.7 L24.5,14.8 L19.3,24.5 Z" }],
    ["circle", { cx: "18", cy: "23.6", r: "2.2" }],
  ],
  frameBack1: [
    ["path", { d: "M25,10 L15,18 L25,26 Z" }],
    ["path", { d: "M10,10 L13,10 L13,26 L10,26 Z" }],
  ],
  frameForward1: [
    ["path", { d: "M11,10 L21,18 L11,26 Z" }],
    ["path", { d: "M23,10 L26,10 L26,26 L23,26 Z" }],
  ],
  frameBackMany: [
    ["path", { d: "M20,10 L12,18 L20,26 Z" }],
    ["path", { d: "M29,10 L21,18 L29,26 Z" }],
    ["path", { d: "M7,10 L10,10 L10,26 L7,26 Z" }],
  ],
  frameForwardMany: [
    ["path", { d: "M16,10 L24,18 L16,26 Z" }],
    ["path", { d: "M7,10 L15,18 L7,26 Z" }],
    ["path", { d: "M26,10 L29,10 L29,26 L26,26 Z" }],
  ],
  // Repeat из материальной сетки 24×24, отмасштабированный в 36×36.
  loop: [
    [
      "g",
      { transform: "scale(1.5)" },
      [
        [
          "path",
          {
            d:
              "M7 7h10v3l4-4-4-4v3H5v6h2V7z" +
              "m10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z",
          },
        ],
      ],
    ],
  ],
  close: [
    [
      "path",
      {
        d:
          "M25.4,12.6 L23.4,10.6 L18,16 L12.6,10.6 L10.6,12.6 L16,18 " +
          "L10.6,23.4 L12.6,25.4 L18,20 L23.4,25.4 L25.4,23.4 L20,18 Z",
      },
    ],
  ],
  // Фотоаппарат: корпус + объектив — для кнопки скриншота кадра.
  camera: [
    [
      "path",
      {
        d:
          "M13,9 L15,6 L21,6 L23,9 L29,9 A2,2 0 0 1 31,11 L31,27 " +
          "A2,2 0 0 1 29,29 L7,29 A2,2 0 0 1 5,27 L5,11 A2,2 0 0 1 7,9 Z",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2.2",
        "stroke-linejoin": "round",
      },
    ],
    ["circle", { cx: "18", cy: "19", r: "5.5", fill: "none", stroke: "currentColor", "stroke-width": "2.2" }],
  ],
  // Лупа — иконка зоны-триггера видео-зума.
  zoomIn: [
    ["circle", { cx: "16", cy: "16", r: "8", fill: "none", stroke: "currentColor", "stroke-width": "2.4" }],
    ["path", { d: "M22,22 L29,29", stroke: "currentColor", "stroke-width": "2.6", "stroke-linecap": "round" }],
    ["path", { d: "M16,12 L16,20 M12,16 L20,16", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" }],
  ],
};

const YSB_SVG_NS = "http://www.w3.org/2000/svg";

function appendSvgNodes(nodes, parent) {
  nodes.forEach(([tag, attrs, children]) => {
    const el = document.createElementNS(YSB_SVG_NS, tag);
    Object.keys(attrs || {}).forEach((name) => {
      el.setAttribute(name, attrs[name]);
    });
    if (children) appendSvgNodes(children, el);
    parent.appendChild(el);
  });
}

// Собирает <svg> в сетке плеера (36×36 — родная сетка иконок ytp-*).
// Заливка — currentColor, чтобы активные состояния красились одним CSS.
function ysbSvg(iconKey, size = "100%") {
  const svg = document.createElementNS(YSB_SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 36 36");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("aria-hidden", "true");
  appendSvgNodes(YSB_ICONS[iconKey] || [], svg);
  return svg;
}

function ensureBezel() {
  let bezel = document.getElementById(BEZEL_ID);

  if (!bezel) {
    bezel = document.createElement("div");
    bezel.id = BEZEL_ID;
    bezel.setAttribute("role", "status");
    bezel.setAttribute("aria-live", "polite");
    Object.assign(bezel.style, {
      position:       "fixed",
      zIndex:         "999999",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      gap:            "10px",
      pointerEvents:  "none",
      opacity:        "0",
      transition:     prefersReducedMotion()
        ? "none"
        : "opacity 100ms linear, transform 100ms ease-out",
    });

    const round = document.createElement("div");
    round.dataset.role = "bezel-round";
    Object.assign(round.style, {
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      borderRadius:   "50%",
      // Тот же тон, что у нативного ytp-bezel.
      background:     "rgba(0, 0, 0, 0.5)",
      color:          "#ffffff",
    });

    const label = document.createElement("div");
    label.dataset.role = "bezel-label";
    Object.assign(label.style, {
      color:      "#ffffff",
      fontFamily: '"YouTube Sans", "Roboto", Arial, sans-serif',
      fontWeight: "500",
      whiteSpace: "nowrap",
      textShadow: "0 0 4px rgba(0, 0, 0, 0.75)",
    });

    bezel.append(round, label);
  }

  const container = getOverlayContainer();
  if (bezel.parentElement !== container) {
    container.appendChild(bezel);
  }
  return bezel;
}

// Показывает безель: иконка + подпись. iconKey — ключ YSB_ICONS,
// text — уже отформатированное значение («85%», «1.75×», «−5 с · 12:34»).
function showActionBezel(iconKey, text, ms = 900) {
  const player = getYouTubePlayer();
  const bezel = ensureBezel();
  const round = bezel.querySelector("[data-role='bezel-round']");
  const label = bezel.querySelector("[data-role='bezel-label']");

  // В полноэкранном режиме плеер крупнее — безель тоже, как у YouTube.
  const big = Boolean(document.fullscreenElement);
  const diameter = big ? 88 : 72;
  round.style.width = `${diameter}px`;
  round.style.height = `${diameter}px`;
  round.replaceChildren(ysbSvg(iconKey, `${Math.round(diameter * 0.5)}px`));
  label.style.fontSize = big ? "18px" : "15px";
  label.textContent = text || "";
  label.style.display = text ? "block" : "none";

  const rect = player
    ? player.getBoundingClientRect()
    : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  bezel.style.left = `${Math.round(rect.left + rect.width / 2)}px`;
  bezel.style.top = `${Math.round(rect.top + rect.height / 2)}px`;
  bezel.style.transform = "translate(-50%, -50%)";

  // Мгновенное появление, плавное затухание — как у нативного безеля.
  bezel.style.transition = "none";
  bezel.style.opacity = "1";
  window.clearTimeout(bezelHideTimer);
  bezelHideTimer = window.setTimeout(() => {
    const b = document.getElementById(BEZEL_ID);
    if (!b) return;
    b.style.transition = prefersReducedMotion()
      ? "none"
      : "opacity 260ms ease-out";
    b.style.opacity = "0";
  }, ms);
}

// Текстовый тост — для подсказок без иконки (легенда колёсных зон).
function showActionToast(text, ms = 900) {
  const player = getYouTubePlayer();
  let toast = document.getElementById(TOAST_ID);

  if (!toast) {
    toast = document.createElement("div");
    toast.id = TOAST_ID;
    Object.assign(toast.style, {
      position:      "fixed",
      zIndex:        "999999",
      padding:       "9px 14px",
      // Плашка как у нативных подсказок плеера: небольшой радиус,
      // шрифт YouTube Sans, обычная насыщенность.
      borderRadius:  "4px",
      background:    "rgba(0, 0, 0, 0.75)",
      color:         "#ffffff",
      fontFamily:    '"YouTube Sans", "Roboto", Arial, sans-serif',
      fontSize:      "14px",
      fontWeight:    "500",
      whiteSpace:    "nowrap",
      pointerEvents: "none",
      opacity:       "0",
      transition:    prefersReducedMotion() ? "none" : "opacity 120ms ease",
    });
    getOverlayContainer().appendChild(toast);
  } else if (toast.parentElement !== getOverlayContainer()) {
    // При входе/выходе из fullscreen контейнер меняется
    getOverlayContainer().appendChild(toast);
  }

  toast.textContent = text;

  // Верхняя часть плеера по центру — не перекрывает субтитры и нижние
  // кнопки, при этом в поле зрения (пользователь смотрит в видео).
  const rect = player
    ? player.getBoundingClientRect()
    : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  toast.style.left = `${Math.round(rect.left + rect.width / 2)}px`;
  toast.style.top = `${Math.round(rect.top + rect.height * 0.12)}px`;
  toast.style.transform = "translateX(-50%)";

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  window.clearTimeout(toastHideTimer);
  toastHideTimer = window.setTimeout(() => {
    const t = document.getElementById(TOAST_ID);
    if (t) t.style.opacity = "0";
  }, ms);
}

// ---------------------------------------------------------------------------
// Колёсные зоны плеера: левая треть — перемотка, правая — громкость,
// центр без функции (страница скроллится как обычно). Зажатая ЛКМ +
// колесо — скорость (или перемотка, настраивается).
// Обоснование раскладки — см. UX-ANALYSIS.md в корне проекта.
// ---------------------------------------------------------------------------

// Над этими элементами колесо не перехватываем: нативные панели YouTube,
// наши панели и любые интерактивные элементы.
const WHEEL_IGNORE_SELECTOR = [
  ".ytp-chrome-bottom",
  ".ytp-chrome-top",
  // Меню шестерёнки и другие всплывающие панели плеера. В полноэкранном
  // режиме список качества не помещается целиком и прокручивается колесом —
  // раньше мы перехватывали это событие и вместо прокрутки меняли громкость.
  ".ytp-popup",
  ".ytp-settings-menu",
  ".ytp-contextmenu",
  ".ytp-panel",
  ".ytp-panel-menu",
  ".ytp-tooltip",
  "[role='menu']",
  "[role='menuitem']",
  "[role='dialog']",
  "[role='listbox']",
  "[role='option']",
  `#${PLAYERBAR_RIGHT_ID}`,
  "button",
  "input",
  "select",
  "textarea",
  "a",
  "[role='button']",
  "[contenteditable='true']",
].join(",");

// Страховка на будущее: YouTube регулярно добавляет новые всплывающие
// списки со своей прокруткой. Если под курсором есть элемент, который
// реально может прокручиваться, колесо — его, а не наше.
function hasScrollableAncestor(target, stopAt) {
  let el = target instanceof Element ? target : null;
  while (el && el !== stopAt && el !== document.body) {
    if (el.scrollHeight > el.clientHeight + 1) {
      const overflowY = getComputedStyle(el).overflowY;
      if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
        return true;
      }
    }
    el = el.parentElement;
  }
  return false;
}

function doWheelSeek(direction) {
  const video = findVideo();
  if (!video) return;
  // Перемотку рекламы не делаем — плеер её всё равно блокирует.
  if (isAdShowing()) return;

  const step = wheelSeekStep;
  const max = isFinite(video.duration) ? video.duration : Infinity;
  const next = Math.min(Math.max(0, (video.currentTime || 0) + direction * step), max);
  try {
    video.currentTime = next;
  } catch {
    /* ignore */
  }
  showActionBezel(
    direction > 0 ? "seekForward" : "seekBack",
    `${direction > 0 ? "+" : "−"}${step} ${translate("secShort")} · ${formatSeconds(next)}`,
  );
}

// --- Громкость -------------------------------------------------------------
//
// Раньше колесо писало прямо в `video.volume`, и нативный ползунок в панели
// плеера оставался на прежнем месте: YouTube держит уровень в собственном
// состоянии. Теперь значение уходит двумя путями:
//   1) `video.volume` — гарантированный эффект на звук здесь и сейчас;
//   2) команда в MAIN-world (main-world.js) → `player.setVolume()`, чтобы
//      YouTube обновил ползунок, иконку и своё сохранённое значение.
// Если API плеера ещё не готов, второй путь просто ничего не делает.

function sendPlayerCommand(cmd, value) {
  try {
    document.dispatchEvent(
      new CustomEvent(PLAYER_CMD_EVENT, { detail: { cmd, value } }),
    );
  } catch {
    /* ignore */
  }
}

function getNativeVolumePct() {
  const video = findVideo();
  if (!video) return 0;
  if (video.muted) return 0;
  return Math.round(Math.min(1, Math.max(0, video.volume || 0)) * 100);
}

function setNativeVolumePct(pct) {
  const video = findVideo();
  const v = Math.min(100, Math.max(0, Math.round(pct)));

  if (video) {
    try {
      if (v > 0 && video.muted) video.muted = false;
      video.volume = v / 100;
    } catch {
      /* ignore */
    }
  }
  sendPlayerCommand("setVolume", v);
  return v;
}

// --- Усиление звука выше 100% ---------------------------------------------
//
// WebAudio-цепочка: video → gain → лимитер → выход. Лимитер включается
// только при усилении: без него на 2× и выше громкие места клиппируют в
// хрип. Цепочку создаём лениво — пока пользователь не попросил усиление,
// звук идёт нативным путём и мы вообще не вмешиваемся.

function resumeAudioContext() {
  if (!audioChain) return;
  if (audioChain.ctx.state !== "suspended") return;
  audioChain.ctx.resume().catch(() => {
    /* ignore */
  });
}

// Политика автозапуска может подвесить контекст — тогда звук пропадёт
// совсем. Любой жест пользователя возвращает его к жизни.
function bindAudioResumeListeners() {
  if (audioResumeBound) return;
  audioResumeBound = true;
  const resume = () => resumeAudioContext();
  window.addEventListener("pointerdown", resume, true);
  window.addEventListener("keydown", resume, true);
  window.addEventListener("touchstart", resume, true);
}

// Подключает лимитер только на время усиления, иначе — прямой выход,
// чтобы на 100% тракт оставался прозрачным.
function routeAudioChain(chain, boosting) {
  if (chain.boosting === boosting) return;
  try {
    chain.gain.disconnect();
    chain.limiter.disconnect();
  } catch {
    /* ignore */
  }
  try {
    if (boosting) {
      chain.gain.connect(chain.limiter);
      chain.limiter.connect(chain.ctx.destination);
    } else {
      chain.gain.connect(chain.ctx.destination);
    }
    chain.boosting = boosting;
  } catch {
    /* ignore */
  }
}

function disposeAudioChain() {
  if (!audioChain) return;
  const chain = audioChain;
  audioChain = null;
  try {
    chain.gain.gain.value = 1;
    chain.source.disconnect();
    chain.gain.disconnect();
    chain.limiter.disconnect();
  } catch {
    /* ignore */
  }
  if (chain.ctx.state !== "closed") {
    chain.ctx.close().catch(() => {
      /* ignore */
    });
  }
}

function ensureAudioChain(video) {
  if (audioChain && audioChain.video === video) {
    resumeAudioContext();
    return audioChain;
  }
  // Видеоэлемент пересоздан (переход между видео, fullscreen) — старая
  // цепочка держит мёртвый источник, её надо закрыть.
  if (audioChain) disposeAudioChain();

  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;

  try {
    const ctx = new Ctor();
    const source = ctx.createMediaElementSource(video);
    const gain = ctx.createGain();
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -3;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.25;

    source.connect(gain);
    gain.connect(ctx.destination);

    audioChain = { ctx, source, gain, limiter, video, boosting: false };
    resumeAudioContext();
    bindAudioResumeListeners();
    return audioChain;
  } catch {
    // DRM-поток или уже занятый элемент — усиление недоступно.
    return null;
  }
}

// Шкала усиления — проценты воспринимаемой громкости, а не амплитуды.
// Удвоение громкости на слух ≈ +10 дБ ≈ ×3.16 по амплитуде, поэтому
// 100%→1.00 (0 дБ), 150%→1.78 (+5 дБ), 200%→3.16 (+10 дБ). Так владелец
// получает вдвое громче звук на честных «200%», а не на «300%», как было
// при прежней линейной шкале (100% шага = 100% амплитуды).
function boostPctToGain(pct) {
  return Math.pow(10, (pct - 100) / 200);
}

function applyVolumeBoost(pct) {
  const target = Math.min(volumeBoostMaxPct, Math.max(100, Math.round(pct)));

  if (target <= 100) {
    volumeBoostPct = 100;
    if (audioChain) {
      try {
        audioChain.gain.gain.value = 1;
      } catch {
        /* ignore */
      }
      routeAudioChain(audioChain, false);
    }
    return 100;
  }

  const video = findVideo();
  if (!video) return volumeBoostPct;

  const chain = ensureAudioChain(video);
  if (!chain) {
    volumeBoostPct = 100;
    return 100;
  }

  volumeBoostPct = target;
  routeAudioChain(chain, true);
  try {
    chain.gain.gain.value = boostPctToGain(target);
  } catch {
    /* ignore */
  }
  return volumeBoostPct;
}

// Пере-привязка усиления, если YouTube подменил видеоэлемент, и подстраховка
// от подвисшего контекста. Вызывается из общего тикера UI.
function syncVolumeBoost() {
  if (audioChain) resumeAudioContext();
  if (volumeBoostPct <= 100) return;
  const video = findVideo();
  if (!video) return;
  if (!audioChain || audioChain.video !== video) {
    applyVolumeBoost(volumeBoostPct);
  }
}

function showVolumeBezel(nativePct, boostPct) {
  if (boostPct > 100) {
    showActionBezel("volumeBoost", `${boostPct}%`);
    return;
  }
  showActionBezel(
    nativePct <= 0 ? "volumeMute" : "volume",
    `${nativePct}%`,
  );
}

function doWheelVolume(direction) {
  const video = findVideo();
  if (!video) return;

  let nativePct = getNativeVolumePct();

  if (volumeBoostPct > 100) {
    // Уже в зоне усиления: колесо меняет только множитель, вниз — до 100%,
    // где усиление выключается и дальше идёт обычная громкость.
    const next = volumeBoostPct + direction * VOLUME_BOOST_STEP;
    applyVolumeBoost(next);
  } else if (
    direction > 0 &&
    nativePct >= 100 &&
    volumeBoostEnabled &&
    volumeBoostMaxPct > 100
  ) {
    // Дошли до нативного максимума и продолжаем крутить вверх — включаем
    // усиление (запрос владельца: «после 100% если продолжить крутить»).
    applyVolumeBoost(100 + VOLUME_BOOST_STEP);
  } else {
    nativePct = setNativeVolumePct(nativePct + direction * wheelVolumeStep);
  }

  showVolumeBezel(nativePct, volumeBoostPct);
}

function doWheelSpeed(direction) {
  const speed = direction > 0 ? increaseSpeed() : decreaseSpeed();
  showActionBezel("speed", `${formatSpeed(speed)}`);
}

// ---------------------------------------------------------------------------
// Видео-зум: колесо в маленькой зоне вверху по центру плеера приближает
// кадр (1–4×, шаг 0.125), при увеличении кадр можно таскать мышью.
// Заимствовано у YouTubeTweak (player-videoZoom.ts, см. КОНКУРЕНТ-ФИЧИ.md),
// но зона-триггер перенесена вверх: геометрический центр плеера занят
// колёсными зонами перемотки/громкости и жестом ЛКМ+колесо=скорость —
// отбирать его нельзя. Выключено по умолчанию (см. DEFAULT_VIDEO_ZOOM).
// ---------------------------------------------------------------------------

function getVideoZoomContainer() {
  const player = getYouTubePlayer();
  return player ? player.querySelector(".html5-video-container") : null;
}

function getVideoZoomMetrics() {
  const player = getYouTubePlayer();
  const container = getVideoZoomContainer();
  if (!player || !container) return null;
  const playerRect = player.getBoundingClientRect();
  return {
    playerRect,
    containerWidth: container.offsetWidth || playerRect.width,
    containerHeight: container.offsetHeight || playerRect.height,
  };
}

// Центр по горизонтали (не мешает левой/правой колёсным зонам), верхняя
// часть кадра по вертикали (внизу — панель управления и наши кнопки).
function getVideoZoomTriggerRect() {
  const player = getYouTubePlayer();
  if (!player) return null;
  const rect = player.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const top = rect.top + Math.max(48, rect.height * 0.1);
  return {
    left: centerX - VIDEO_ZOOM_TRIGGER_WIDTH / 2,
    right: centerX + VIDEO_ZOOM_TRIGGER_WIDTH / 2,
    top,
    bottom: top + VIDEO_ZOOM_TRIGGER_HEIGHT,
    width: VIDEO_ZOOM_TRIGGER_WIDTH,
    height: VIDEO_ZOOM_TRIGGER_HEIGHT,
  };
}

function isEventInVideoZoomTrigger(event) {
  const rect = getVideoZoomTriggerRect();
  if (!rect) return false;
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
}

function clampVideoZoom(value) {
  if (!isFinite(value)) return VIDEO_ZOOM_MIN;
  return Math.min(
    Math.max(Number(value.toFixed(3)), VIDEO_ZOOM_MIN),
    VIDEO_ZOOM_MAX,
  );
}

function clampVideoZoomOffsets() {
  const metrics = getVideoZoomMetrics();
  if (!metrics || videoZoom <= VIDEO_ZOOM_MIN) {
    videoZoomOffsetX = 0;
    videoZoomOffsetY = 0;
    return;
  }
  const maxOffsetX = Math.max(
    0,
    (metrics.containerWidth * videoZoom - metrics.playerRect.width) / 2,
  );
  const maxOffsetY = Math.max(
    0,
    (metrics.containerHeight * videoZoom - metrics.playerRect.height) / 2,
  );
  videoZoomOffsetX = Math.min(Math.max(videoZoomOffsetX, -maxOffsetX), maxOffsetX);
  videoZoomOffsetY = Math.min(Math.max(videoZoomOffsetY, -maxOffsetY), maxOffsetY);
}

function ensureVideoZoomTrigger() {
  if (videoZoomTriggerEl) return videoZoomTriggerEl;
  const el = document.createElement("div");
  el.className = "ysb-video-zoom-trigger";
  el.setAttribute("aria-hidden", "true");
  el.appendChild(ysbSvg("zoomIn", "28px"));
  videoZoomTriggerEl = el;
  return el;
}

// Квадрат-подсказка виден только пока не зумировано — после увеличения
// таскать можно за любую точку плеера, отдельная зона больше не нужна.
function updateVideoZoomTriggerVisual(event) {
  const player = getYouTubePlayer();
  if (!player) return;

  const visible = videoZoomEnabled && videoZoom <= VIDEO_ZOOM_MIN;
  if (!visible) {
    if (videoZoomTriggerEl) videoZoomTriggerEl.style.display = "none";
    return;
  }

  const el = ensureVideoZoomTrigger();
  if (el.parentElement !== player) player.appendChild(el);

  const rect = getVideoZoomTriggerRect();
  if (!rect) return;
  const playerRect = player.getBoundingClientRect();

  el.style.display = "flex";
  el.style.left = `${(rect.left - playerRect.left).toFixed(1)}px`;
  el.style.top = `${(rect.top - playerRect.top).toFixed(1)}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
  el.classList.toggle(
    "ysb-video-zoom-trigger-hover",
    Boolean(event) && isEventInVideoZoomTrigger(event),
  );
}

function applyVideoZoomTransform() {
  const player = getYouTubePlayer();
  const container = getVideoZoomContainer();
  if (!player) return;

  const zoomed = videoZoomEnabled && videoZoom > VIDEO_ZOOM_MIN;
  player.classList.toggle("ysb-video-zoom-zoomed", zoomed);
  player.classList.toggle(
    "ysb-video-zoom-dragging",
    videoZoomEnabled && videoZoomDragging,
  );
  updateVideoZoomTriggerVisual();

  if (!container) return;
  if (!videoZoomEnabled || videoZoom <= VIDEO_ZOOM_MIN) {
    container.style.removeProperty("transform");
    container.style.removeProperty("transform-origin");
    return;
  }

  const metrics = getVideoZoomMetrics();
  if (!metrics) return;
  const baseX = (metrics.playerRect.width - metrics.containerWidth * videoZoom) / 2;
  const baseY = (metrics.playerRect.height - metrics.containerHeight * videoZoom) / 2;
  container.style.transform =
    `translate3d(${(baseX + videoZoomOffsetX).toFixed(1)}px, ` +
    `${(baseY + videoZoomOffsetY).toFixed(1)}px, 0) scale(${videoZoom.toFixed(3)})`;
  container.style.transformOrigin = "0 0";
}

function resetVideoZoom() {
  if (videoZoomDragging) stopVideoZoomDrag();
  videoZoom = VIDEO_ZOOM_MIN;
  videoZoomOffsetX = 0;
  videoZoomOffsetY = 0;
  videoZoomDragging = false;
  videoZoomHasDragged = false;
  videoZoomSuppressClick = false;
  applyVideoZoomTransform();
}

function shouldIgnoreVideoZoomTarget(event) {
  const target = event.target;
  return Boolean(target instanceof Element && target.closest(WHEEL_IGNORE_SELECTOR));
}

// Вызывается первым делом из onZonesWheel — возвращает true, если событие
// обработано зумом, чтобы зоны перемотки/громкости его не увидели.
function handleVideoZoomWheel(event) {
  if (!videoZoomEnabled) return false;
  if (shouldIgnoreVideoZoomTarget(event)) return false;
  if (!isEventInVideoZoomTrigger(event)) return false;
  if (!event.deltaY) return false;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  updateVideoZoomTriggerVisual(event);

  const next = clampVideoZoom(
    videoZoom + (event.deltaY < 0 ? VIDEO_ZOOM_STEP : -VIDEO_ZOOM_STEP),
  );
  if (next === videoZoom) return true;

  if (next <= VIDEO_ZOOM_MIN) {
    videoZoom = VIDEO_ZOOM_MIN;
    videoZoomOffsetX = 0;
    videoZoomOffsetY = 0;
  } else {
    const metrics = getVideoZoomMetrics();
    if (metrics) {
      const focalX =
        event.clientX - metrics.playerRect.left - metrics.playerRect.width / 2;
      const focalY =
        event.clientY - metrics.playerRect.top - metrics.playerRect.height / 2;
      const ratio = next / videoZoom;
      videoZoomOffsetX = videoZoomOffsetX * ratio + focalX * (1 - ratio);
      videoZoomOffsetY = videoZoomOffsetY * ratio + focalY * (1 - ratio);
    }
    videoZoom = next;
    clampVideoZoomOffsets();
  }

  applyVideoZoomTransform();
  noteOnboardingAction("video-zoom");
  return true;
}

function handleVideoZoomMouseMove(event) {
  if (!videoZoomEnabled) return;
  updateVideoZoomTriggerVisual(event);
}

function stopVideoZoomDrag() {
  videoZoomDragging = false;
  window.removeEventListener("pointermove", handleVideoZoomPointerMove, true);
  window.removeEventListener("pointerup", handleVideoZoomPointerUp, true);
  window.removeEventListener("pointercancel", handleVideoZoomPointerUp, true);
  applyVideoZoomTransform();
}

// Перетаскивание кадра работает над всем плеером (не только зоной-
// триггером) — но только когда уже зумировано, иначе это обычный клик.
function handleVideoZoomPointerDown(event) {
  if (!videoZoomEnabled || event.button !== 0) return;
  if (videoZoom <= VIDEO_ZOOM_MIN) return;

  const player = getYouTubePlayer();
  if (!player) return;
  const rect = player.getBoundingClientRect();
  const inPlayer =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;
  if (!inPlayer || shouldIgnoreVideoZoomTarget(event)) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  videoZoomDragging = true;
  videoZoomHasDragged = false;
  videoZoomDragStartX = event.clientX;
  videoZoomDragStartY = event.clientY;
  videoZoomDragStartOffsetX = videoZoomOffsetX;
  videoZoomDragStartOffsetY = videoZoomOffsetY;
  window.addEventListener("pointermove", handleVideoZoomPointerMove, true);
  window.addEventListener("pointerup", handleVideoZoomPointerUp, true);
  window.addEventListener("pointercancel", handleVideoZoomPointerUp, true);
  applyVideoZoomTransform();
}

function handleVideoZoomPointerMove(event) {
  if (!videoZoomDragging) return;
  const nextX = videoZoomDragStartOffsetX + event.clientX - videoZoomDragStartX;
  const nextY = videoZoomDragStartOffsetY + event.clientY - videoZoomDragStartY;
  if (
    !videoZoomHasDragged &&
    Math.hypot(nextX - videoZoomDragStartOffsetX, nextY - videoZoomDragStartOffsetY) <
      VIDEO_ZOOM_DRAG_THRESHOLD
  ) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  videoZoomHasDragged = true;
  videoZoomOffsetX = nextX;
  videoZoomOffsetY = nextY;
  clampVideoZoomOffsets();
  applyVideoZoomTransform();
}

function handleVideoZoomPointerUp(event) {
  if (!videoZoomDragging) return;
  if (videoZoomHasDragged) {
    event.preventDefault();
    event.stopPropagation();
    videoZoomSuppressClick = true;
    window.setTimeout(() => {
      videoZoomSuppressClick = false;
    }, 0);
  }
  stopVideoZoomDrag();
}

// После перетаскивания YouTube получил бы click и поставил видео на паузу —
// гасим его, как и для жеста ЛКМ+колесо (см. onGlobalClickCapture).
function handleVideoZoomClickCapture(event) {
  if (!videoZoomSuppressClick) return;
  videoZoomSuppressClick = false;
  event.preventDefault();
  event.stopPropagation();
}

function injectVideoZoomStyles() {
  if (document.getElementById("ysb-video-zoom-style")) return;
  const style = document.createElement("style");
  style.id = "ysb-video-zoom-style";
  style.textContent = `
    .ysb-video-zoom-trigger {
      position: absolute;
      z-index: 60;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      color: #ffffff;
      opacity: 0;
      pointer-events: none;
      transition: opacity 160ms ease;
    }
    .ysb-video-zoom-trigger.ysb-video-zoom-trigger-hover {
      opacity: 1;
    }
    .html5-video-player.ysb-video-zoom-zoomed {
      overflow: hidden;
    }
    .html5-video-player.ysb-video-zoom-zoomed .html5-main-video {
      cursor: grab;
    }
    .html5-video-player.ysb-video-zoom-dragging .html5-main-video {
      cursor: grabbing;
    }
    @media (prefers-reduced-motion: reduce) {
      .ysb-video-zoom-trigger { transition: none; }
    }
  `;
  document.head.appendChild(style);
}

function bindVideoZoomListeners() {
  injectVideoZoomStyles();
  if (videoZoomListenersBound) return;
  videoZoomListenersBound = true;
  // Регистрируется до onGlobalPointerDown в основной инициализации —
  // при активном зуме stopImmediatePropagation() не даёт жесту ЛКМ+колесо
  // перехватить это же нажатие (см. onGlobalPointerDown).
  window.addEventListener("pointerdown", handleVideoZoomPointerDown, true);
  window.addEventListener("mousemove", handleVideoZoomMouseMove, true);
  window.addEventListener("click", handleVideoZoomClickCapture, true);
}

// Диспетчер действий колеса: слоты (левая/правая зона, ЛКМ, ПКМ) хранят
// только имя действия, исполнение общее.
function runWheelAction(action, direction, source = "wheel") {
  if (action === "seek") doWheelSeek(direction);
  else if (action === "volume") doWheelVolume(direction);
  else if (action === "speed") doWheelSpeed(direction);
  noteOnboardingAction(source);
}

function onZonesWheel(event) {
  // Ctrl+колесо — жест масштабирования браузера, не трогаем.
  if (event.ctrlKey) return;

  // Видео-зум проверяем первым и независимо от режима колёсных зон —
  // зона-триггер работает даже если зоны перемотки/громкости выключены.
  if (videoZoomEnabled && handleVideoZoomWheel(event)) return;

  const zonesActive =
    wheelZonesMode === "always" ||
    (wheelZonesMode === "fullscreen" && document.fullscreenElement);
  const lmbActive = lmbDownOnPlayer && lmbWheelAction !== "off";
  // ПКМ отдельно не трекаем: в событии wheel зажатые кнопки доступны
  // через event.buttons (бит 2 — ПКМ).
  const rmbActive = (event.buttons & 2) !== 0 && rmbWheelAction !== "off";
  if (!zonesActive && !lmbActive && !rmbActive) return;

  const player = getYouTubePlayer();
  const video = findVideo();
  if (!player || !video) return;

  const rect = player.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  ) {
    return;
  }

  const target = event.target;
  if (target instanceof Element && target.closest(WHEEL_IGNORE_SELECTOR)) {
    return;
  }
  if (hasScrollableAncestor(target, player)) {
    return;
  }

  if (!event.deltaY) return;
  const baseDirection = event.deltaY < 0 ? 1 : -1;
  // У каждого слота свой флаг «наоборот».
  const dir = (invert) => (invert ? -baseDirection : baseDirection);

  // Зажатые кнопки мыши + колесо — приоритетнее зон.
  if (lmbActive) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    // После отпускания ЛКМ YouTube получит click и поставит паузу —
    // подавляем его (см. onGlobalClickCapture).
    lmbWheelUsed = true;
    runWheelAction(lmbWheelAction, dir(lmbWheelInvert), "lmb");
    return;
  }

  if (rmbActive) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    // По отпусканию ПКМ браузер откроет контекстное меню — подавляем его
    // (см. onGlobalContextMenuCapture): это был жест, а не вызов меню.
    rmbWheelUsedAt = Date.now();
    runWheelAction(rmbWheelAction, dir(rmbWheelInvert), "rmb");
    return;
  }

  if (!zonesActive) return;

  const relPct = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100;
  if (relPct <= zoneLeftEdge && zoneLeftAction !== "off") {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    runWheelAction(zoneLeftAction, dir(zoneLeftInvert), "zone-left");
  } else if (relPct >= zoneRightEdge && zoneRightAction !== "off") {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    runWheelAction(zoneRightAction, dir(zoneRightInvert), "zone-right");
  }
  // Центральная зона — намеренно ничего: в оконном режиме страница
  // прокручивается как обычно (закон Якоба).
}

function onGlobalPointerDown(event) {
  if (event.button !== 0) return;
  const player = getYouTubePlayer();
  if (!player) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!player.contains(target)) return;
  // Кнопки/панели — не считаем «зажатием на видео».
  if (target.closest(WHEEL_IGNORE_SELECTOR)) return;
  lmbDownOnPlayer = true;
  lmbWheelUsed = false;
}

function onGlobalPointerUp(event) {
  if (event.button !== 0) return;
  lmbDownOnPlayer = false;
  // lmbWheelUsed сбросит onGlobalClickCapture — click приходит после pointerup.
}

function onGlobalClickCapture(event) {
  if (!lmbWheelUsed) return;
  lmbWheelUsed = false;
  // Пользователь крутил колесо с зажатой ЛКМ — это был жест, а не клик.
  // Гасим click, чтобы YouTube не переключил play/pause.
  event.preventDefault();
  event.stopPropagation();
}

// Образец — onGlobalClickCapture выше: тот же паттерн для ПКМ+колесо.
// Меню открывается по отпусканию ПКМ, уже после wheel-событий, поэтому
// гасим только первое меню и только вскоре после жеста.
function onGlobalContextMenuCapture(event) {
  if (!rmbWheelUsedAt) return;
  const fresh = Date.now() - rmbWheelUsedAt < 1200;
  rmbWheelUsedAt = 0;
  if (!fresh) return;
  event.preventDefault();
  event.stopPropagation();
}

// Мини-легенда зон — один раз за сессию при первом входе в fullscreen.
// Норман: сигнификатор для невидимой функциональности. Текст собирается из
// текущих назначений зон (этап D), а не зашит — иначе после перенастройки
// легенда врёт.
function maybeShowZonesHint() {
  if (zonesHintShown) return;
  if (wheelZonesMode === "off") return;
  if (!document.fullscreenElement) return;
  if (!findVideo()) return;
  if (zoneLeftAction === "off" && zoneRightAction === "off") return;
  zonesHintShown = true;
  const ACTION_WORD_KEY = {
    seek: "wheelActSeek",
    volume: "wheelActVolume",
    speed: "wheelActSpeed",
  };
  const word = (action) =>
    ACTION_WORD_KEY[action] ? translate(ACTION_WORD_KEY[action]) : "—";
  showActionToast(
    translate("zonesHint", word(zoneLeftAction), word(zoneRightAction)),
    2600,
  );
}

// ---------------------------------------------------------------------------
// Первое знакомство. Тур запускается только из popup и сначала показывает
// общую карту, поэтому невидимые жесты становятся понятны до первого действия.
// ---------------------------------------------------------------------------

const ONBOARDING_TOTAL_STEPS = 6;
let onboardingTour = null;

function onboardingActionName(action) {
  const keys = {
    seek: "wheelActSeek",
    volume: "wheelActVolume",
    speed: "wheelActSpeed",
  };
  return keys[action] ? translate(keys[action]) : "—";
}

function onboardingRect(left, top, width, height) {
  return {
    left,
    top,
    width: Math.max(1, width),
    height: Math.max(1, height),
    right: left + Math.max(1, width),
    bottom: top + Math.max(1, height),
  };
}

function onboardingElementRect(element) {
  if (!element || !element.isConnected) return null;
  const rect = element.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return null;
  return onboardingRect(rect.left, rect.top, rect.width, rect.height);
}

function onboardingUnionRect(rects) {
  const visible = rects.filter(Boolean);
  if (!visible.length) return null;
  const left = Math.min(...visible.map((rect) => rect.left));
  const top = Math.min(...visible.map((rect) => rect.top));
  const right = Math.max(...visible.map((rect) => rect.right));
  const bottom = Math.max(...visible.map((rect) => rect.bottom));
  return onboardingRect(left, top, right - left, bottom - top);
}

function getOnboardingControlNames() {
  const names = [];
  if (pbFrameButtonsEnabled) names.push(translate("tourControlFrames"));
  if (pbLoopButtonsEnabled) names.push(translate("tourControlLoop"));
  if (screenshotButtonEnabled) names.push(translate("tourControlScreenshot"));
  return names;
}

function getOnboardingTargets() {
  const player = getYouTubePlayer();
  const playerRect = onboardingElementRect(player);
  if (!player || !playerRect) return null;
  const zoomRect = getVideoZoomTriggerRect();

  const leftWidth = playerRect.width * (zoneLeftEdge / 100);
  const rightStart = playerRect.left + playerRect.width * (zoneRightEdge / 100);
  const left = onboardingRect(playerRect.left, playerRect.top, leftWidth, playerRect.height);
  const center = onboardingRect(
    playerRect.left + leftWidth,
    playerRect.top,
    rightStart - playerRect.left - leftWidth,
    playerRect.height,
  );
  const right = onboardingRect(
    rightStart,
    playerRect.top,
    playerRect.right - rightStart,
    playerRect.height,
  );

  const timeSpeed = onboardingElementRect(
    player.querySelector(".ytp-time-display"),
  );
  const controls = onboardingElementRect(document.getElementById(PLAYERBAR_RIGHT_ID));
  const controlNames = getOnboardingControlNames();
  const time = playerTimeLeftEnabled
    ? onboardingElementRect(document.querySelector(`.${TIME_LEFT_CLASS}`))
    : null;
  const bottomFallback = onboardingRect(
    playerRect.left + 12,
    playerRect.bottom - Math.min(62, playerRect.height * 0.18),
    Math.max(80, playerRect.width - 24),
    Math.min(50, playerRect.height * 0.14),
  );

  return {
    player,
    playerRect,
    left,
    center,
    right,
    zoom: zoomRect
      ? onboardingRect(zoomRect.left, zoomRect.top, zoomRect.width, zoomRect.height)
      : null,
    timeSpeed,
    timeSpeedTarget: timeSpeed || bottomFallback,
    controls,
    controlNames,
    controlsTarget: controls || bottomFallback,
    time,
    timeTarget: time || bottomFallback,
  };
}

function createOnboardingRoot() {
  const root = document.createElement("div");
  root.id = ONBOARDING_ROOT_ID;
  root.innerHTML = `
    <style>
      #${ONBOARDING_ROOT_ID} {
        position: fixed;
        inset: 0;
        z-index: 2147483646;
        pointer-events: none;
        color: #fff;
        font-family: "Segoe UI", Arial, sans-serif;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-regions {
        position: fixed;
        inset: 0;
        pointer-events: none;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-region {
        position: fixed;
        display: block;
        margin: 0;
        padding: 0;
        border: 2px solid #ff4747;
        border-radius: 12px;
        color: #fff;
        background: rgba(255, 35, 35, 0.12);
        box-shadow: 0 0 0 1px rgba(255,255,255,.36), 0 8px 28px rgba(0,0,0,.28);
        pointer-events: none;
        transition: opacity 160ms ease, box-shadow 160ms ease;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-region.is-clickable {
        pointer-events: auto;
        cursor: pointer;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-region.is-clickable:hover {
        background: rgba(255, 35, 35, 0.22);
        box-shadow: 0 0 0 3px rgba(255,255,255,.55), 0 10px 34px rgba(0,0,0,.4);
      }
      #${ONBOARDING_ROOT_ID}.is-focused .ysb-onboarding-region {
        box-shadow: 0 0 0 2px rgba(255,255,255,.7), 0 0 0 9999px rgba(0,0,0,.58);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-label,
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-label {
        position: absolute;
        left: 50%;
        top: 12px;
        max-width: calc(100% - 16px);
        padding: 7px 10px;
        border-radius: 999px;
        color: #fff;
        background: rgba(17, 17, 20, .92);
        box-shadow: 0 4px 18px rgba(0,0,0,.35);
        font-size: 12px;
        font-weight: 700;
        line-height: 1.25;
        text-align: center;
        white-space: normal;
        transform: translateX(-50%);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-region--compact .ysb-onboarding-label {
        top: auto;
        bottom: calc(100% + 7px);
        min-width: 180px;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-label {
        top: 14px;
        width: 30%;
        max-width: 220px;
        border-radius: 10px;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-label[data-zone="left"] { left: 17%; }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-label[data-zone="center"] { left: 50%; }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-label[data-zone="right"] { left: 83%; }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-editor {
        position: fixed;
        overflow: visible;
        border: 2px solid #ff4747;
        border-radius: 12px;
        box-shadow: 0 0 0 2px rgba(255,255,255,.7), 0 0 0 9999px rgba(0,0,0,.58);
        pointer-events: none;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-area {
        position: absolute;
        top: 0;
        bottom: 0;
        overflow: visible;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-area--left {
        left: 0;
        width: var(--ysb-zone-left);
        background: rgba(255, 142, 43, .18);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-area--center {
        left: var(--ysb-zone-left);
        width: calc(var(--ysb-zone-right) - var(--ysb-zone-left));
        background: rgba(255, 255, 255, .07);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-area--right {
        left: var(--ysb-zone-right);
        right: 0;
        background: rgba(49, 190, 142, .18);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-handle {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 2;
        width: 28px;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: col-resize;
        pointer-events: auto;
        touch-action: none;
        transform: translateX(-50%);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-handle::before {
        content: "";
        position: absolute;
        left: 13px;
        top: 0;
        bottom: 0;
        width: 3px;
        border-radius: 999px;
        background: #fff;
        box-shadow: 0 0 0 2px rgba(215,25,32,.82), 0 0 16px rgba(0,0,0,.7);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-handle::after {
        content: "↔";
        position: absolute;
        left: 50%;
        top: 50%;
        display: grid;
        place-items: center;
        width: 34px;
        height: 28px;
        border: 2px solid #fff;
        border-radius: 9px;
        color: #fff;
        background: #d71920;
        box-shadow: 0 5px 18px rgba(0,0,0,.5);
        font-size: 18px;
        font-weight: 900;
        transform: translate(-50%, -50%);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-handle:hover::after,
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-handle:focus-visible::after,
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-handle.is-dragging::after {
        background: #ff343b;
        transform: translate(-50%, -50%) scale(1.08);
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-panel {
        position: fixed;
        width: min(360px, calc(100vw - 32px));
        padding: 18px;
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 16px;
        color: #f8f8fa;
        background: linear-gradient(145deg, rgba(32,32,36,.98), rgba(12,12,14,.98));
        box-shadow: 0 22px 70px rgba(0,0,0,.54);
        pointer-events: auto;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-close {
        position: absolute;
        top: 9px;
        right: 9px;
        width: 34px;
        height: 34px;
        padding: 0;
        border: 0;
        border-radius: 50%;
        color: #d5d5db;
        background: rgba(255,255,255,.08);
        cursor: pointer;
        font-size: 21px;
        line-height: 1;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-brand {
        margin: 0 38px 6px 0;
        color: #ff6b6b;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .06em;
        text-transform: uppercase;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-title {
        margin: 0 32px 8px 0;
        color: #fff;
        font-size: 21px;
        line-height: 1.15;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-body {
        margin: 0;
        color: #d1d1d7;
        font-size: 13px;
        line-height: 1.5;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-live {
        min-height: 19px;
        margin: 10px 0 0;
        color: #ffb0b0;
        font-size: 12px;
        line-height: 1.4;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 14px;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-progress {
        margin-right: auto;
        color: #a7a7af;
        font-size: 11px;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-button {
        min-height: 36px;
        padding: 8px 13px;
        border: 0;
        border-radius: 9px;
        color: #eeeef2;
        background: rgba(255,255,255,.1);
        cursor: pointer;
        font-size: 12px;
        font-weight: 750;
      }
      #${ONBOARDING_ROOT_ID} .ysb-onboarding-button--next {
        color: #fff;
        background: #d71920;
      }
      #${ONBOARDING_ROOT_ID} button:focus-visible {
        outline: 3px solid #fff;
        outline-offset: 2px;
      }
      .html5-video-player.ysb-onboarding-player .ytp-chrome-bottom,
      .html5-video-player.ysb-onboarding-player .ytp-gradient-bottom {
        opacity: 1 !important;
      }
      @media (max-width: 700px) {
        #${ONBOARDING_ROOT_ID} .ysb-onboarding-label,
        #${ONBOARDING_ROOT_ID} .ysb-onboarding-zone-label { font-size: 10px; padding: 5px 7px; }
        #${ONBOARDING_ROOT_ID} .ysb-onboarding-panel { padding: 15px; }
        #${ONBOARDING_ROOT_ID} .ysb-onboarding-title { font-size: 18px; }
      }
      @media (prefers-reduced-motion: reduce) {
        #${ONBOARDING_ROOT_ID} * { transition: none !important; animation: none !important; }
      }
    </style>
    <div class="ysb-onboarding-regions"></div>
    <section class="ysb-onboarding-panel" role="dialog" aria-modal="false" aria-labelledby="ysb-onboarding-title">
      <button class="ysb-onboarding-close" type="button">×</button>
      <p class="ysb-onboarding-brand"></p>
      <h2 id="ysb-onboarding-title" class="ysb-onboarding-title"></h2>
      <p class="ysb-onboarding-body"></p>
      <p class="ysb-onboarding-live" role="status" aria-live="polite"></p>
      <div class="ysb-onboarding-footer">
        <span class="ysb-onboarding-progress"></span>
        <button class="ysb-onboarding-button ysb-onboarding-button--skip" type="button"></button>
        <button class="ysb-onboarding-button ysb-onboarding-button--back" type="button"></button>
        <button class="ysb-onboarding-button ysb-onboarding-button--next" type="button"></button>
      </div>
    </section>
  `;

  const close = root.querySelector(".ysb-onboarding-close");
  close.setAttribute("aria-label", translate("tourClose"));
  close.title = translate("tourClose");
  root.querySelector(".ysb-onboarding-brand").textContent = translate("tourBrand");
  root.querySelector(".ysb-onboarding-button--skip").textContent = translate("tourSkip");
  root.querySelector(".ysb-onboarding-button--back").textContent = translate("tourBack");

  close.addEventListener("click", () => stopOnboardingTour(false));
  root.querySelector(".ysb-onboarding-button--skip").addEventListener("click", () =>
    stopOnboardingTour(false),
  );
  root.querySelector(".ysb-onboarding-button--back").addEventListener("click", () => {
    if (!onboardingTour) return;
    onboardingTour.step = Math.max(0, onboardingTour.step - 1);
    renderOnboardingTour();
  });
  root.querySelector(".ysb-onboarding-button--next").addEventListener("click", () => {
    if (!onboardingTour) return;
    if (onboardingTour.step >= ONBOARDING_TOTAL_STEPS) {
      stopOnboardingTour(true);
      return;
    }
    onboardingTour.step += 1;
    renderOnboardingTour();
  });

  return root;
}

function addOnboardingRegion(rect, label, options = {}) {
  if (!onboardingTour || !rect) return null;
  const clickable = Number.isInteger(options.step);
  const region = document.createElement(clickable ? "button" : "div");
  if (clickable) region.type = "button";
  region.className = `ysb-onboarding-region${clickable ? " is-clickable" : ""}${
    options.compact ? " ysb-onboarding-region--compact" : ""
  }`;
  region.style.left = `${Math.round(rect.left)}px`;
  region.style.top = `${Math.round(rect.top)}px`;
  region.style.width = `${Math.round(rect.width)}px`;
  region.style.height = `${Math.round(rect.height)}px`;

  if (label) {
    const labelElement = document.createElement("span");
    labelElement.className = "ysb-onboarding-label";
    labelElement.textContent = label;
    region.appendChild(labelElement);
    if (clickable) region.setAttribute("aria-label", label);
  }

  if (clickable) {
    region.addEventListener("click", () => {
      if (!onboardingTour) return;
      onboardingTour.step = options.step;
      renderOnboardingTour();
    });
  }

  onboardingTour.regions.appendChild(region);
  return region;
}

function addOnboardingZoneLabels(region) {
  const labels = [
    ["left", translate("tourMapLeft", onboardingActionName(zoneLeftAction))],
    ["center", translate("tourMapCenter", onboardingActionName(lmbWheelAction))],
    ["right", translate("tourMapRight", onboardingActionName(zoneRightAction))],
  ];
  labels.forEach(([zone, text]) => {
    const label = document.createElement("span");
    label.className = "ysb-onboarding-zone-label";
    label.dataset.zone = zone;
    label.textContent = text;
    region.appendChild(label);
  });
}

function updateOnboardingZoneEditor(editor) {
  if (!editor) return;
  editor.style.setProperty("--ysb-zone-left", `${zoneLeftEdge}%`);
  editor.style.setProperty("--ysb-zone-right", `${zoneRightEdge}%`);

  const leftHandle = editor.querySelector('[data-edge="left"]');
  const rightHandle = editor.querySelector('[data-edge="right"]');
  if (leftHandle) {
    leftHandle.style.left = `${zoneLeftEdge}%`;
    leftHandle.setAttribute("aria-valuemax", String(zoneRightEdge - ZONE_EDGE_GAP));
    leftHandle.setAttribute("aria-valuenow", String(zoneLeftEdge));
    leftHandle.setAttribute("aria-valuetext", `${zoneLeftEdge}%`);
  }
  if (rightHandle) {
    rightHandle.style.left = `${zoneRightEdge}%`;
    rightHandle.setAttribute("aria-valuemin", String(zoneLeftEdge + ZONE_EDGE_GAP));
    rightHandle.setAttribute("aria-valuenow", String(zoneRightEdge));
    rightHandle.setAttribute("aria-valuetext", `${zoneRightEdge}%`);
  }
}

function setOnboardingZoneEdge(editor, side, value) {
  const next = Math.round(Number(value));
  if (!isFinite(next)) return;
  if (side === "left") {
    zoneLeftEdge = Math.min(
      zoneRightEdge - ZONE_EDGE_GAP,
      Math.max(ZONE_EDGE_MIN, next),
    );
  } else {
    zoneRightEdge = Math.min(
      ZONE_EDGE_MAX,
      Math.max(zoneLeftEdge + ZONE_EDGE_GAP, next),
    );
  }
  updateOnboardingZoneEditor(editor);

  const live = onboardingTour?.root.querySelector(".ysb-onboarding-live");
  if (live) {
    live.textContent = translate("tourZonesDragging", zoneLeftEdge, zoneRightEdge);
  }
}

function saveOnboardingZoneEdges() {
  const live = onboardingTour?.root.querySelector(".ysb-onboarding-live");
  if (live) {
    live.textContent = translate("tourZonesSaved", zoneLeftEdge, zoneRightEdge);
  }
  chrome.storage.sync
    .set({
      [ZONE_LEFT_EDGE_STORAGE_KEY]: zoneLeftEdge,
      [ZONE_RIGHT_EDGE_STORAGE_KEY]: zoneRightEdge,
    })
    .catch(() => {});
}

function addOnboardingZoneEditor(rect) {
  if (!onboardingTour || !rect) return null;
  const editor = document.createElement("div");
  editor.className = "ysb-onboarding-zone-editor";
  editor.style.left = `${Math.round(rect.left)}px`;
  editor.style.top = `${Math.round(rect.top)}px`;
  editor.style.width = `${Math.round(rect.width)}px`;
  editor.style.height = `${Math.round(rect.height)}px`;

  const areas = [
    ["left", translate("tourMapLeft", onboardingActionName(zoneLeftAction))],
    ["center", translate("tourMapCenter", onboardingActionName(lmbWheelAction))],
    ["right", translate("tourMapRight", onboardingActionName(zoneRightAction))],
  ];
  areas.forEach(([zone, text]) => {
    const area = document.createElement("div");
    area.className = `ysb-onboarding-zone-area ysb-onboarding-zone-area--${zone}`;
    const label = document.createElement("span");
    label.className = "ysb-onboarding-label";
    label.textContent = text;
    area.appendChild(label);
    editor.appendChild(area);
  });

  [
    ["left", "tourZoneLeftHandle"],
    ["right", "tourZoneRightHandle"],
  ].forEach(([side, labelKey]) => {
    const handle = document.createElement("div");
    handle.className = "ysb-onboarding-zone-handle";
    handle.dataset.edge = side;
    handle.tabIndex = 0;
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", translate(labelKey));
    handle.setAttribute("aria-orientation", "horizontal");
    handle.setAttribute("aria-valuemin", String(ZONE_EDGE_MIN));
    handle.setAttribute("aria-valuemax", String(ZONE_EDGE_MAX));

    let activePointer = null;
    const updateFromPointer = (event) => {
      const percent = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100;
      setOnboardingZoneEdge(editor, side, percent);
    };
    const finishDrag = (event, applyFinalPosition = true) => {
      if (activePointer !== event.pointerId) return;
      if (applyFinalPosition) updateFromPointer(event);
      activePointer = null;
      handle.classList.remove("is-dragging");
      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
      saveOnboardingZoneEdges();
    };

    handle.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      activePointer = event.pointerId;
      handle.setPointerCapture(event.pointerId);
      handle.classList.add("is-dragging");
      updateFromPointer(event);
    });
    handle.addEventListener("pointermove", (event) => {
      if (activePointer !== event.pointerId) return;
      event.preventDefault();
      updateFromPointer(event);
    });
    handle.addEventListener("pointerup", finishDrag);
    handle.addEventListener("pointercancel", (event) => finishDrag(event, false));
    handle.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const current = side === "left" ? zoneLeftEdge : zoneRightEdge;
      setOnboardingZoneEdge(editor, side, current + direction);
      saveOnboardingZoneEdges();
    });
    editor.appendChild(handle);
  });

  updateOnboardingZoneEditor(editor);
  onboardingTour.regions.appendChild(editor);
  return editor;
}

function positionOnboardingPanel(targetRect) {
  if (!onboardingTour || !targetRect) return;
  const panel = onboardingTour.panel;
  panel.style.left = "16px";
  panel.style.top = "16px";
  const panelRect = panel.getBoundingClientRect();
  const gap = 16;
  const edge = 14;
  let left;
  let top;

  if (targetRect.right + gap + panelRect.width <= window.innerWidth - edge) {
    left = targetRect.right + gap;
    top = Math.max(edge, Math.min(targetRect.top, window.innerHeight - panelRect.height - edge));
  } else if (targetRect.bottom + gap + panelRect.height <= window.innerHeight - edge) {
    left = Math.max(edge, Math.min(targetRect.left, window.innerWidth - panelRect.width - edge));
    top = targetRect.bottom + gap;
  } else if (targetRect.top - gap - panelRect.height >= edge) {
    left = Math.max(edge, Math.min(targetRect.left, window.innerWidth - panelRect.width - edge));
    top = targetRect.top - gap - panelRect.height;
  } else {
    left = window.innerWidth - panelRect.width - edge;
    top = edge;
  }

  panel.style.left = `${Math.round(Math.max(edge, left))}px`;
  panel.style.top = `${Math.round(Math.max(edge, top))}px`;
}

function renderOnboardingOverview(targets) {
  addOnboardingRegion(
    targets.left,
    translate("tourMapLeft", onboardingActionName(zoneLeftAction)),
    { step: 1 },
  );
  addOnboardingRegion(
    targets.center,
    translate("tourMapCenter", onboardingActionName(lmbWheelAction)),
    { step: 3 },
  );
  addOnboardingRegion(targets.timeSpeed, translate("tourMapTimeSpeed"), {
    step: 2,
    compact: true,
  });
  addOnboardingRegion(targets.zoom, translate("tourMapZoom"), {
    step: 4,
    compact: true,
  });
  addOnboardingRegion(
    targets.right,
    translate("tourMapRight", onboardingActionName(zoneRightAction)),
    { step: 1 },
  );
  if (targets.controls) {
    addOnboardingRegion(
      targets.controls,
      translate("tourMapControls", targets.controlNames.join(" · ")),
      {
      step: 5,
      compact: true,
      },
    );
  }
  if (targets.time) {
    addOnboardingRegion(targets.time, translate("tourMapTime"), {
      step: 6,
      compact: true,
    });
  }
}

function renderOnboardingTour() {
  if (!onboardingTour) return;
  const targets = getOnboardingTargets();
  if (!targets) {
    stopOnboardingTour(false);
    return;
  }

  const container = getOverlayContainer();
  if (onboardingTour.root.parentElement !== container) {
    container.appendChild(onboardingTour.root);
  }
  targets.player.classList.add("ysb-onboarding-player");
  onboardingTour.player = targets.player;
  onboardingTour.regions.replaceChildren();
  onboardingTour.root.classList.toggle("is-focused", onboardingTour.step > 0);

  const title = onboardingTour.root.querySelector(".ysb-onboarding-title");
  const body = onboardingTour.root.querySelector(".ysb-onboarding-body");
  const live = onboardingTour.root.querySelector(".ysb-onboarding-live");
  const progress = onboardingTour.root.querySelector(".ysb-onboarding-progress");
  const back = onboardingTour.root.querySelector(".ysb-onboarding-button--back");
  const next = onboardingTour.root.querySelector(".ysb-onboarding-button--next");
  let activeTarget = targets.playerRect;

  back.hidden = onboardingTour.step === 0;
  live.textContent = "";

  if (onboardingTour.step === 0) {
    title.textContent = translate("tourOverviewTitle");
    body.textContent = translate("tourOverviewBody");
    progress.textContent = translate("tourOverviewProgress");
    next.textContent = translate("tourStart");
    renderOnboardingOverview(targets);
  } else if (onboardingTour.step === 1) {
    const zonesActive =
      wheelZonesMode === "always" ||
      (wheelZonesMode === "fullscreen" && Boolean(document.fullscreenElement));
    title.textContent = translate("tourZonesTitle");
    if (wheelZonesMode === "off") {
      body.textContent = translate("tourZonesOff");
    } else if (!zonesActive) {
      body.textContent = translate("tourZonesFullscreen");
    } else {
      body.textContent = translate(
            "tourZonesBody",
            onboardingActionName(zoneLeftAction),
            onboardingActionName(zoneRightAction),
          );
    }
    live.textContent = zonesActive ? translate("tourTryZones") : "";
    addOnboardingZoneEditor(targets.playerRect);
  } else if (onboardingTour.step === 2) {
    title.textContent = translate("tourTimeSpeedTitle");
    body.textContent = playerButtonsEnabled
      ? translate("tourTimeSpeedBody")
      : translate("tourTimeSpeedOff");
    live.textContent = playerButtonsEnabled ? translate("tourTryTimeSpeed") : "";
    activeTarget = targets.timeSpeedTarget;
    addOnboardingRegion(
      activeTarget,
      targets.timeSpeed ? translate("tourMapTimeSpeed") : "",
      { compact: true },
    );
  } else if (onboardingTour.step === 3) {
    title.textContent = translate("tourSpeedTitle");
    body.textContent =
      lmbWheelAction === "off"
        ? translate("tourSpeedOff")
        : translate("tourSpeedBody", onboardingActionName(lmbWheelAction));
    live.textContent = lmbWheelAction === "off" ? "" : translate("tourTrySpeed");
    addOnboardingRegion(
      targets.playerRect,
      translate("tourMapCenter", onboardingActionName(lmbWheelAction)),
    );
  } else if (onboardingTour.step === 4) {
    title.textContent = translate("tourZoomTitle");
    body.textContent = videoZoomEnabled
      ? translate("tourZoomBody")
      : translate("tourZoomOff");
    live.textContent = videoZoomEnabled ? translate("tourTryZoom") : "";
    activeTarget = targets.zoom;
    addOnboardingRegion(activeTarget, translate("tourMapZoom"), {
      compact: true,
    });
  } else if (onboardingTour.step === 5) {
    title.textContent = translate("tourControlsTitle");
    body.textContent = targets.controls
      ? translate("tourControlsBody", targets.controlNames.join(", "))
      : translate("tourControlsOff");
    activeTarget = targets.controlsTarget;
    addOnboardingRegion(
      activeTarget,
      targets.controls
        ? translate("tourMapControls", targets.controlNames.join(" · "))
        : "",
      { compact: true },
    );
  } else {
    title.textContent = translate("tourTimeTitle");
    body.textContent = playerTimeLeftEnabled
      ? translate("tourTimeBody")
      : translate("tourTimeOff");
    activeTarget = targets.timeTarget;
    addOnboardingRegion(activeTarget, targets.time ? translate("tourMapTime") : "", {
      compact: true,
    });
  }

  if (onboardingTour.step > 0) {
    progress.textContent = translate(
      "tourProgress",
      onboardingTour.step,
      ONBOARDING_TOTAL_STEPS,
    );
    next.textContent =
      onboardingTour.step === ONBOARDING_TOTAL_STEPS
        ? translate("tourFinish")
        : translate("tourNext");
  }

  positionOnboardingPanel(activeTarget);
}

function scheduleOnboardingRender() {
  if (!onboardingTour || onboardingTour.renderFrame != null) return;
  onboardingTour.renderFrame = window.requestAnimationFrame(() => {
    if (!onboardingTour) return;
    onboardingTour.renderFrame = null;
    renderOnboardingTour();
  });
}

function noteOnboardingAction(source) {
  if (!onboardingTour) return;
  const live = onboardingTour.root.querySelector(".ysb-onboarding-live");
  if (!live) return;

  if (onboardingTour.step === 1 && ["zone-left", "zone-right"].includes(source)) {
    onboardingTour.tried.add(source);
    live.textContent =
      onboardingTour.tried.has("zone-left") && onboardingTour.tried.has("zone-right")
        ? translate("tourTriedAll")
        : translate("tourTriedOne");
  } else if (onboardingTour.step === 2 && source === "time-speed") {
    onboardingTour.tried.add(source);
    live.textContent = translate("tourTriedTimeSpeed");
  } else if (onboardingTour.step === 3 && source === "lmb") {
    onboardingTour.tried.add(source);
    live.textContent = translate("tourTriedSpeed");
  } else if (onboardingTour.step === 4 && source === "video-zoom") {
    onboardingTour.tried.add(source);
    live.textContent = translate("tourTriedZoom");
  } else if (onboardingTour.step === 5 && source === "player-control") {
    onboardingTour.tried.add(source);
    live.textContent = translate("tourTriedControl");
  }
}

function onOnboardingKeyDown(event) {
  if (!onboardingTour) return;
  if (
    event.target instanceof Element &&
    event.target.closest(".ysb-onboarding-zone-handle")
  ) {
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    stopOnboardingTour(false);
    return;
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    if (onboardingTour.step >= ONBOARDING_TOTAL_STEPS) stopOnboardingTour(true);
    else {
      onboardingTour.step += 1;
      renderOnboardingTour();
    }
  } else if (event.key === "ArrowLeft" && onboardingTour.step > 0) {
    event.preventDefault();
    onboardingTour.step -= 1;
    renderOnboardingTour();
  }
}

function startOnboardingTour() {
  const player = getYouTubePlayer();
  const video = findVideo();
  if (!player || !video || !onboardingElementRect(player)) return false;

  stopOnboardingTour(false);
  mountPlayerButtons();
  updatePlayerTimeLeft();

  const root = createOnboardingRoot();
  const onViewportChange = () => scheduleOnboardingRender();
  onboardingTour = {
    root,
    panel: root.querySelector(".ysb-onboarding-panel"),
    regions: root.querySelector(".ysb-onboarding-regions"),
    player,
    step: 0,
    tried: new Set(),
    renderFrame: null,
    onViewportChange,
    resizeObserver: null,
  };

  getOverlayContainer().appendChild(root);
  window.addEventListener("resize", onViewportChange);
  window.addEventListener("scroll", onViewportChange, true);
  document.addEventListener("fullscreenchange", onViewportChange);
  document.addEventListener("keydown", onOnboardingKeyDown, true);

  if (typeof ResizeObserver === "function") {
    onboardingTour.resizeObserver = new ResizeObserver(onViewportChange);
    onboardingTour.resizeObserver.observe(player);
  }

  renderOnboardingTour();
  window.requestAnimationFrame(() => {
    if (!onboardingTour) return;
    onboardingTour.root.querySelector(".ysb-onboarding-button--next").focus({
      preventScroll: true,
    });
  });
  return true;
}

function stopOnboardingTour(completed) {
  if (!onboardingTour) return;
  const tour = onboardingTour;
  onboardingTour = null;

  if (tour.renderFrame != null) window.cancelAnimationFrame(tour.renderFrame);
  window.removeEventListener("resize", tour.onViewportChange);
  window.removeEventListener("scroll", tour.onViewportChange, true);
  document.removeEventListener("fullscreenchange", tour.onViewportChange);
  document.removeEventListener("keydown", onOnboardingKeyDown, true);
  if (tour.resizeObserver) tour.resizeObserver.disconnect();
  if (tour.player) tour.player.classList.remove("ysb-onboarding-player");
  tour.root.remove();

  if (completed) {
    chrome.storage.local.set({
      [ONBOARDING_STORAGE_KEY]: {
        version: ONBOARDING_VERSION,
        promptSeen: true,
        completed: true,
      },
    });
  }
}

// ---------------------------------------------------------------------------
// Встроенный счётчик остатка и тонкая линия прогресса плеера.
//
// Счётчик: YouTube показывает «12:34 / 25:00» и не знает про нашу скорость.
// Вместо отдельной плашки рядом мы дописываем третий сегмент прямо в
// нативный .ytp-time-display: «12:34 / 25:00 / −8:20», где 8:20 — сколько
// реально осталось смотреть при текущей скорости. Разделитель тот же, что и
// у YouTube между текущим временем и длительностью — одна визуальная система
// вместо двух конкурирующих (закон близости + меньше когнитивной нагрузки).
//
// Линия прогресса: 3px по нижней кромке плеера, видна только когда панель
// управления спрятана (ytp-autohide) — понимаешь, сколько осталось, не
// вызывая панель движением мыши.
// ---------------------------------------------------------------------------

function injectPlayerUiStyles() {
  if (document.getElementById("ysb-player-ui-style")) return;
  const style = document.createElement("style");
  style.id = "ysb-player-ui-style";
  style.textContent = `
    .${TIME_LEFT_CLASS} {
      /* Наследуем шрифт и цвет нативного тайм-кода — свой сегмент не должен
         выглядеть вставкой из другого интерфейса. */
      color: inherit;
      opacity: 0.75;
      white-space: nowrap;
    }
    .${TIME_LEFT_CLASS}.ysb-time-left-active {
      /* Скорость ≠ 1× — тот же красный акцент, что у кнопки скорости. */
      color: #ff8a80;
      opacity: 1;
    }
    .${LIVE_DELAY_CLASS} {
      display: none;
      color: inherit;
      opacity: 0.75;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .html5-video-player.ysb-live .${LIVE_DELAY_CLASS} {
      display: inline-block;
      margin-left: 8px;
    }
    #${MINIPROGRESS_ID} {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--ysb-mp-h, ${DEFAULT_MINI_PROGRESS_HEIGHT}px);
      background: rgba(255, 255, 255, 0.16);
      z-index: 99;
      opacity: 0;
      pointer-events: none;
      transition: opacity 200ms ease;
    }
    #${MINIPROGRESS_ID} .ysb-mp-fill {
      display: block;
      height: 100%;
      width: 0%;
      background: var(--ysb-mp-color, ${DEFAULT_MINI_PROGRESS_COLOR});
    }
    .html5-video-player.ytp-autohide #${MINIPROGRESS_ID}.ysb-mp-armed {
      opacity: 1;
    }
    @media (prefers-reduced-motion: reduce) {
      #${MINIPROGRESS_ID} { transition: none; }
    }
  `;
  document.head.appendChild(style);
}

function getTimeLeftElement() {
  const player = getYouTubePlayer();
  if (!player) return null;

  const display = player.querySelector(".ytp-time-display");
  if (!display) return null;

  let el = display.querySelector(`.${TIME_LEFT_CLASS}`);
  if (!el) {
    el = document.createElement("span");
    el.className = TIME_LEFT_CLASS;

    // Строго в ту же строку, сразу за длительностью: «12:34 / 25:00 / −8:20».
    // Проверено на живом плеере — только это размещение попадает в общую
    // строку; вставка после .ytp-time-wrapper уезжает на 16px вниз, потому
    // что .ytp-time-contents внутри неё блочный.
    // Следом за остатком встаёт группа скорости (см. mountPlayerButtons).
    // Имя для скринридера у .ytp-time-contents задано атрибутом aria-label,
    // поэтому наш текст его не искажает.
    const duration = display.querySelector(".ytp-time-duration");
    if (duration) {
      duration.insertAdjacentElement("afterend", el);
    } else {
      const contents = display.querySelector(".ytp-time-contents");
      (contents || display).appendChild(el);
    }
  }
  return el;
}

function removeTimeLeftElement() {
  document
    .querySelectorAll(`.${TIME_LEFT_CLASS}`)
    .forEach((el) => el.remove());
}

function getLiveDelayElement() {
  const player = getYouTubePlayer();
  const display = player && player.querySelector(".ytp-time-display");
  if (!display) return null;

  let el = display.querySelector(`.${LIVE_DELAY_CLASS}`);
  if (el) return el;

  el = document.createElement("span");
  el.className = LIVE_DELAY_CLASS;

  const speedGroup = display.querySelector("[data-role='pb-speed-group']");
  if (speedGroup) {
    speedGroup.insertAdjacentElement("beforebegin", el);
  } else {
    const anchor =
      display.querySelector(`.${TIME_LEFT_CLASS}`) ||
      display.querySelector(".ytp-time-duration");
    if (anchor) {
      anchor.insertAdjacentElement("afterend", el);
    } else {
      const contents = display.querySelector(".ytp-time-contents");
      (contents || display).appendChild(el);
    }
  }
  return el;
}

function removeLiveDelayElement() {
  document
    .querySelectorAll(`.${LIVE_DELAY_CLASS}`)
    .forEach((el) => el.remove());
}

function getLiveDelaySeconds(video, playerState = null) {
  const progress = playerState && playerState.progress;
  if (
    progress &&
    Number.isFinite(progress.current) &&
    Number.isFinite(progress.seekableEnd)
  ) {
    return Math.max(0, progress.seekableEnd - progress.current);
  }

  if (playerState && playerState.hasLiveHead && playerState.isAtLiveHead) {
    return 0;
  }

  try {
    const ranges = video && video.seekable;
    if (!ranges || ranges.length === 0 || !Number.isFinite(video.currentTime)) {
      return null;
    }
    return Math.max(0, ranges.end(ranges.length - 1) - video.currentTime);
  } catch {
    return null;
  }
}

function formatLiveDelay(seconds) {
  if (!Number.isFinite(seconds)) return "";
  return `−${formatSeconds(Math.max(0, Math.round(seconds)))}`;
}

function updateLiveDelay(video, playerState = null) {
  if (!isLiveStream(playerState) || isAdShowing()) {
    removeLiveDelayElement();
    return;
  }

  const delay = getLiveDelaySeconds(video, playerState);
  if (delay == null) {
    removeLiveDelayElement();
    return;
  }

  const el = getLiveDelayElement();
  if (!el) return;

  const rounded = Math.max(0, Math.round(delay));
  const text = formatLiveDelay(rounded);
  if (el.textContent !== text) el.textContent = text;

  const label = translate("liveDelayTitle", formatSeconds(rounded));
  if (el.title !== label) el.title = label;
  if (el.getAttribute("aria-label") !== label) {
    el.setAttribute("aria-label", label);
  }
}

function isLiveStream(playerState = null) {
  if (playerState && typeof playerState.isLive === "boolean") {
    return playerState.isLive;
  }
  const player = getYouTubePlayer();
  if (!player) return false;
  // Разметка отличается между версиями плеера: класс бывает и на самом
  // плеере, и на внутреннем элементе-индикаторе.
  return (
    player.classList.contains("ytp-live") ||
    Boolean(player.querySelector(".ytp-live"))
  );
}

// «Живой край» эфира: у DVR-трансляций это конец seekable-диапазона. У чистого
// эфира без окна перемотки догонять нечего — там всегда «у края».
function isAtLiveEdge(video) {
  try {
    const ranges = video.seekable;
    if (!ranges || ranges.length === 0) return true;
    return ranges.end(ranges.length - 1) - video.currentTime <= 3;
  } catch {
    return true;
  }
}

// Скорость > 1× у живого края физически невозможна: буфер пустеет мгновенно.
// YouTube это знает и сам хочет вернуть 1×, когда DVR-просмотр догоняет
// трансляцию. Раньше мы с этим воевали — reapplyForAdTransition и
// двухсекундный интервал видели расхождение с канальными, скажем, 2× и
// возвращали их обратно: получался цикл «стоп-кадр → ускорение → стоп-кадр».
//
// Детекция «догнали» — по нативному флагу плеера, который читается в
// MAIN-world через мост (в изолированном content.js getProgressState не виден).
// Косвенные признаки вроде rate === 1 или readyState < 3 ненадёжны — часть
// версий плеера у края просто ставит видео на паузу. Сброс принимаем как
// нативный плеер: текущей ставится 1×, но карта скорости канала не меняется.
function adoptLiveCatchUpReset(video, playerState = null) {
  const state = playerState || requestMainWorldPlayerState();
  if (!isLiveStream(state) || Math.abs(currentSpeed - 1) < 0.01) {
    liveHeadDetectedAt = 0;
    liveHeadVideo = null;
    return false;
  }

  if (video !== liveHeadVideo) {
    liveHeadVideo = video;
    liveHeadDetectedAt = 0;
  }

  const rate = Math.round(video.playbackRate * 100) / 100;
  const youtubeReset = Math.abs(rate - 1) < 0.01;
  const atHead = state && state.hasLiveHead
    ? state.isAtLiveHead
    : isAtLiveEdge(video) && (youtubeReset || video.readyState < 3);

  if (!atHead) {
    liveHeadDetectedAt = 0;
    return false;
  }

  // Уже у края: сразу блокируем все пути, которые навязывают 2× обратно.
  // Само переключение на 1× делаем только после устойчивых 500 мс, чтобы
  // короткое мерцание isAtLiveHead на границе сегментов не срезало скорость.
  if (!liveHeadDetectedAt) liveHeadDetectedAt = Date.now();
  if (Date.now() - liveHeadDetectedAt < LIVE_HEAD_CONFIRM_MS) return true;

  liveHeadDetectedAt = 0;
  applySpeed(1, false);
  showActionBezel("speed", "1×");
  return true;
}

function updatePlayerTimeLeft(playerState = null) {
  if (!playerTimeLeftEnabled) {
    removeTimeLeftElement();
    return;
  }

  const video = findVideo();
  const el = getTimeLeftElement();
  if (!el) return;

  // Прямой эфир и реклама: «сколько осталось» смысла не имеет.
  if (
    !video ||
    !isFinite(video.duration) ||
    video.duration <= 0 ||
    isLiveStream(playerState) ||
    isAdShowing()
  ) {
    if (el.textContent) el.textContent = "";
    return;
  }

  const speed = Math.max(0.01, video.playbackRate || currentSpeed);
  const remaining = Math.max(0, video.duration - video.currentTime);
  const realLeft = remaining / speed;
  const text = ` / −${formatSeconds(realLeft)}`;

  if (el.textContent !== text) el.textContent = text;

  const active = Math.abs(speed - 1) > 0.01;
  el.classList.toggle("ysb-time-left-active", active);

  const title = translate("timeLeftTitle", formatSpeed(speed));
  if (el.title !== title) el.title = title;
}

function updateMiniProgress(playerState = null) {
  const existing = document.getElementById(MINIPROGRESS_ID);

  if (miniProgressMode === "off") {
    if (existing) existing.remove();
    return;
  }

  const player = getYouTubePlayer();
  const video = findVideo();
  if (!player || !video) return;

  injectPlayerUiStyles();

  let bar = existing;
  if (!bar) {
    bar = document.createElement("div");
    bar.id = MINIPROGRESS_ID;
    const fill = document.createElement("span");
    fill.className = "ysb-mp-fill";
    bar.appendChild(fill);
  }
  if (bar.parentElement !== player) player.appendChild(bar);

  bar.style.setProperty("--ysb-mp-h", `${miniProgressHeight}px`);
  bar.style.setProperty("--ysb-mp-color", miniProgressColor);

  const armed =
    (miniProgressMode === "always" || Boolean(document.fullscreenElement)) &&
    isFinite(video.duration) &&
    video.duration > 0 &&
    !isLiveStream(playerState);

  bar.classList.toggle("ysb-mp-armed", armed);
  if (!armed) return;

  const percent = Math.min(
    100,
    Math.max(0, (video.currentTime / video.duration) * 100),
  );
  const fill = bar.firstElementChild;
  if (fill) fill.style.width = `${percent.toFixed(2)}%`;
}

// Общий тикер лёгких обновлений: счётчик остатка, линия прогресса,
// страховка монтирования кнопок и живучести WebAudio-цепочки.
// Один интервал вместо трёх — меньше пробуждений главного потока.
function startUiTicker() {
  if (uiTickTimer) return;
  uiTickTimer = window.setInterval(() => {
    // Прямой эфир: метка на плеере для CSS (видимость группы скорости в
    // тайм-коде, см. injectPlayerBarStyles).
    const playerState = requestMainWorldPlayerState();
    const player = getYouTubePlayer();
    if (player) player.classList.toggle("ysb-live", isLiveStream(playerState));

    const video = findVideo();
    updateLiveDelay(video, playerState);
    if (!video) return;
    // Если эфир догнали и YouTube сбросил скорость до 1× — принимаем, а не
    // воюем. Строка выше остальных проверок тикера: они должны видеть уже
    // принятое значение.
    adoptLiveCatchUpReset(video, playerState);
    updatePlayerTimeLeft(playerState);
    updateMiniProgress(playerState);
    ensurePlayerBarMounted();
    syncVolumeBoost();
  }, 250);
}

// ---------------------------------------------------------------------------
// Скриншот текущего кадра (заимствовано у YouTubeTweak, см.
// КОНКУРЕНТ-ФИЧИ.md → player-function-buttons.ts). У нас без окна-превью:
// сразу canvas → PNG → скачивание, паттерн уже опробован на экспорте
// настроек в options.js.
// ---------------------------------------------------------------------------

function sanitizeFileName(value) {
  const cleaned = String(value || "")
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  return cleaned || "youtube-video";
}

// ":" недопустим в именах файлов Windows — свой формат времени вместо
// formatSeconds().
function formatTimestampForFilename(seconds) {
  const safe = isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}-${pad(m)}-${pad(s)}` : `${pad(m)}-${pad(s)}`;
}

function getScreenshotFileName(video) {
  const title = document.title.replace(/\s+-\s+YouTube$/, "");
  return `${sanitizeFileName(title)}-${formatTimestampForFilename(video.currentTime)}.png`;
}

function captureVideoFrame() {
  const video = findVideo();
  if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
    showActionBezel("camera", translate("screenshotFailed"), 1600);
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  try {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        showActionBezel("camera", translate("screenshotFailed"), 1600);
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getScreenshotFileName(video);
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      showActionBezel("camera", translate("screenshotSaved"));
    }, "image/png");
  } catch {
    // Canvas "tainted" — DRM-контент (фильмы в аренду) блокирует чтение
    // пикселей кросс-доменного видео-потока. Это ограничение браузера,
    // не баг: обойти его без снятия DRM нельзя.
    showActionBezel("camera", translate("screenshotFailed"), 1600);
  }
}

// ---------------------------------------------------------------------------
// Кнопки в нативной панели управления плеера (как у YouTubeTweak).
// Группа скорости «− N× +» живёт внутри нативного .ytp-time-display —
// тайм-код и скорость читаются одним объектом. Покадровый просмотр,
// A-B повтор и скриншот монтируются (prepend) в .ytp-right-controls.
// ---------------------------------------------------------------------------

// Нужна ли панель вообще: хотя бы одна из групп включена.
function playerBarWanted() {
  return (
    playerButtonsEnabled ||
    pbFrameButtonsEnabled ||
    pbLoopButtonsEnabled ||
    screenshotButtonEnabled
  );
}

// Новый («delhi») плеер YouTube кладёт нативные группы кнопок в тёмные
// «пилюли» с размытием — там наш прозрачный блок выглядел чужим (жалоба
// владельца: «не на тёмном фоне, как все другие кнопки»). Признак нового
// layout — заданные YouTube CSS-переменные пилюли. В старом плеере
// переменных нет, и мы рисуем компактный чип по высоте панели.
function isDelhiPlayerUi(player) {
  const read = (el) => {
    try {
      return getComputedStyle(el)
        .getPropertyValue("--yt-delhi-pill-height")
        .trim();
    } catch {
      return "";
    }
  };
  return Boolean(
    (player && read(player)) || read(document.documentElement),
  );
}

function injectPlayerBarStyles() {
  if (document.getElementById("ysb-playerbar-style")) return;
  const style = document.createElement("style");
  style.id = "ysb-playerbar-style";
  // Два носителя класса .ysb-pb: группа скорости внутри нативного
  // .ytp-time-display и правая пилюля #PLAYERBAR_RIGHT_ID. Правила кнопок
  // общие, отличия описаны отдельно.
  const PB = `.${PLAYERBAR_CLASS}`;
  style.textContent = `
    /* Группа скорости — продолжение нативного тайм-кода: один объект
       «0:11 / 8:32 / −4:46  − 1.75× +», как просил владелец. */
    .ytp-time-display ${PB}[data-role='pb-speed-group'] {
      display: inline-flex;
      align-items: center;
      /* .ytp-time-display — контрол высотой во всю нижнюю панель. Baseline
         привязывал 22px-кнопки к строке текста и опускал их ниже центра. */
      vertical-align: middle;
      margin-left: 8px;
      font: inherit;
      line-height: inherit;
      pointer-events: auto;
    }
    /* Колесо над объединённым блоком крутит скорость — без сигнификатора
       (cursor: ns-resize) функция невидима. Курсор меняем только когда
       группа скорости реально видима. */
    .ytp-time-display:has(${PB}[data-role='pb-speed-group']:not([hidden])) {
      cursor: ns-resize;
    }
    /* Прямой эфир: YouTube прячет контейнер тайм-кода (цифры на эфире
       бессмысленны), а вместе с ним пропадает и наша группа «− 1× +».
       Тикер вешает на плеер класс ysb-live (isLiveStream), и мы возвращаем
       контейнер: бейдж «ЭФИР» — отдельный элемент и не затрагивается, а
       пустые цифры тайм-кода и наш сегмент остатка прячем сами. */
    .html5-video-player.ysb-live .ytp-time-display,
    .html5-video-player.ysb-live .ytp-time-wrapper,
    .html5-video-player.ysb-live .ytp-time-contents {
      display: inline-flex !important;
      align-items: center;
    }
    .html5-video-player.ysb-live .ytp-time-current,
    .html5-video-player.ysb-live .ytp-time-separator,
    .html5-video-player.ysb-live .ytp-time-duration,
    .html5-video-player.ysb-live .${TIME_LEFT_CLASS} {
      display: none !important;
    }
    /* Бейдж «Прямой эфир» — первым, левее группы «− 1× +» (контейнеры выше
       уже стали flex — order переставляет без пересадки DOM). */
    .html5-video-player.ysb-live .ytp-live-badge {
      order: -1;
    }
    .ytp-time-display ${PB} .ysb-pb-btn {
      cursor: pointer;
      /* Шрифт — как у нативного тайм-кода, иначе блок читается вставкой
         из другого интерфейса (эталон A3). */
      font: inherit;
    }
    .ytp-time-display ${PB} .ysb-pb-speed {
      /* font: inherit выше сбрасывает и variant-numeric — возвращаем. */
      font-variant-numeric: tabular-nums;
      font-weight: inherit;
    }
    .ytp-time-display ${PB} .ysb-pb-step {
      font-size: inherit;
      line-height: inherit;
    }
    #${PLAYERBAR_RIGHT_ID} {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      height: 100%;
      pointer-events: auto;
    }
    /* Замеры нативных пилюль delhi-плеера: height 40, margin-top 8,
       border-radius 28, фон rgba(0,0,0,.3). В delhi .ytp-right-controls
       сама — нативная пилюля: высота и margin-top заданы уже ей, поэтому
       контейнер просто тянется на всю её высоту (базовое height: 100%).
       Повторять замеры пилюли здесь нельзя — лишний margin-top опускал
       наши кнопки на 8px ниже нативных. Своя подложка не рисуется. */
    #${PLAYERBAR_RIGHT_ID}.ysb-pb-delhi {
      flex: 0 0 auto;
      align-items: stretch;
    }
    #${PLAYERBAR_RIGHT_ID} .ysb-pb-pill {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 28px;
      padding: 0 4px;
      border-radius: 999px;
      color: #ffffff;
      /* Тот же токен фона и то же размытие, что у нативных пилюль. */
      background: var(--yt-spec-overlay-background-medium-light, rgba(0, 0, 0, 0.3));
      backdrop-filter: var(--yt-frosted-glass-backdrop-filter-override, blur(12px));
    }
    #${PLAYERBAR_RIGHT_ID}.ysb-pb-delhi .ysb-pb-pill {
      height: 100%;
      padding: 0 5px;
      border-radius: 28px;
      background: none;
      backdrop-filter: none;
      /* Замер с нативной шестерёнки delhi: color rgb(238,238,238), не чистый
         #fff. Цвет задан на пилюле, а не на кнопке: кнопки наследуют, и
         state-правила (.ysb-pb-set зелёный, .ysb-pb-on красный) по-прежнему
         перекрывают его обычной специфичностью классов. */
      color: #eeeeee;
    }
    ${PB} .ysb-pb-group,
    ${PB}.ysb-pb-group {
      display: flex;
      align-items: center;
    }
    .ytp-time-display ${PB}.ysb-pb-group {
      display: inline-flex;
    }
    ${PB} .ysb-pb-group[hidden],
    ${PB}.ysb-pb-group[hidden],
    ${PB} .ysb-pb-sep[hidden] {
      display: none;
    }
    ${PB} .ysb-pb-sep {
      flex: 0 0 auto;
      width: 1px;
      height: 14px;
      margin: 0 4px;
      background: rgba(255, 255, 255, 0.25);
    }
    ${PB} .ysb-pb-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      height: 22px;
      min-width: 22px;
      padding: 0 4px;
      border: 0;
      border-radius: 999px;
      background: none;
      color: inherit;
      cursor: pointer;
      font: 400 12px/normal "YouTube Sans", "Roboto", Arial, sans-serif;
      opacity: 0.92;
    }
    #${PLAYERBAR_RIGHT_ID} .ysb-pb-btn {
      height: 28px;
      min-width: 28px;
      padding: 0 5px;
      font: 400 13px/normal "YouTube Sans", "Roboto", Arial, sans-serif;
    }
    #${PLAYERBAR_RIGHT_ID}.ysb-pb-delhi .ysb-pb-btn {
      height: 40px;
      min-width: 40px;
      padding: 0 8px;
      /* У нативных кнопок delhi нет приглушения — снимаем наше. */
      opacity: 1;
    }
    /* ID в селекторе выше сильнее общего правила [aria-disabled] — без этой
       строки неактивные ↻ и ✕ в delhi горели бы на полной яркости. */
    #${PLAYERBAR_RIGHT_ID}.ysb-pb-delhi .ysb-pb-btn[aria-disabled="true"] {
      opacity: 0.35;
    }
    /* Узкий плеер: место в строке управления заканчивается раньше, чем
       нужные кнопки. Правая пилюля прячется целиком, скорость остаётся
       в тайм-коде — она главная. */
    .ytp-small-mode #${PLAYERBAR_RIGHT_ID} {
      display: none;
    }
    ${PB} .ysb-pb-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      opacity: 1;
    }
    ${PB} .ysb-pb-btn:focus-visible {
      outline: 2px solid #ffffff;
      outline-offset: -2px;
    }
    ${PB} .ysb-pb-btn[aria-disabled="true"] {
      opacity: 0.35;
      cursor: default;
      background: none;
    }
    ${PB} .ysb-pb-icon {
      display: block;
      width: 15px;
      height: 15px;
    }
    #${PLAYERBAR_RIGHT_ID}.ysb-pb-delhi .ysb-pb-icon {
      width: 16px;
      height: 16px;
    }
    ${PB} .ysb-pb-num {
      margin-left: 2px;
      font-size: 10px;
      font-weight: 700;
    }
    ${PB} .ysb-pb-speed {
      /* Компактная стабильная ширина без визуального разрыва тайм-кода. */
      min-width: 44px;
      justify-content: center;
      font-size: inherit;
      font-weight: inherit;
      font-variant-numeric: tabular-nums;
    }
    /* Ступени используют те же метрики строки; flex сам центрирует символы. */
    ${PB} .ysb-pb-step {
      font-size: inherit;
      line-height: inherit;
    }
    ${PB} .ysb-pb-speed.ysb-pb-active {
      color: #ff8a80;
    }
    ${PB} .ysb-pb-mark {
      font-size: 12px;
      font-weight: 700;
    }
    ${PB} .ysb-pb-mark.ysb-pb-set {
      color: #5ddb6e;
    }
    ${PB} .ysb-pb-btn.ysb-pb-on {
      color: #ff4e45;
    }
  `;
  document.head.appendChild(style);
}

// Покадровый шаг из панели плеера. Кадры листаются только на паузе —
// если видео играет, сначала ставим паузу, иначе кнопка выглядела бы
// «мёртвой» (Нильсен: система должна отвечать на каждое нажатие).
function playerBarStepFrames(direction, count) {
  const video = findVideo();
  if (video && !video.paused) {
    try {
      video.pause();
    } catch {
      /* ignore */
    }
    window.setTimeout(() => stepFrames(direction, count), 60);
    return;
  }
  stepFrames(direction, count);
}

function makePbButton(options) {
  const { iconKey, text, titleKey, role, extraClass, onClick } = options;
  const b = document.createElement("button");
  b.type = "button";
  b.className = `ysb-pb-btn${extraClass ? ` ${extraClass}` : ""}`;
  b.dataset.titleKey = titleKey;
  if (role) b.dataset.role = role;

  if (iconKey) {
    const icon = document.createElement("span");
    icon.className = "ysb-pb-icon";
    icon.appendChild(ysbSvg(iconKey));
    b.appendChild(icon);
    if (text != null) {
      const num = document.createElement("span");
      num.className = "ysb-pb-num";
      num.dataset.role = `${role}-num`;
      num.textContent = text;
      b.appendChild(num);
    }
  } else if (text != null) {
    b.textContent = text;
  }

  b.addEventListener("click", (e) => {
    // Клик по панели плеера иначе доходит до видео и ставит паузу.
    e.stopPropagation();
    e.preventDefault();
    if (b.getAttribute("aria-disabled") === "true") return;
    onClick();
    noteOnboardingAction("player-control");
  });
  return b;
}

function buildSpeedGroup() {
  // --- Скорость: − 1.5× + ---------------------------------------------------
  // Живёт внутри нативного .ytp-time-display, следом за сегментом остатка
  // (см. mountPlayerButtons) — тайм-код и скорость читаются одним объектом.
  const speedGroup = document.createElement("div");
  speedGroup.className = `${PLAYERBAR_CLASS} ysb-pb-group`;
  speedGroup.dataset.role = "pb-speed-group";
  speedGroup.append(
    makePbButton({
      text: "−",
      titleKey: "decreaseSpeed",
      extraClass: "ysb-pb-step",
      onClick: decreaseSpeed,
    }),
    makePbButton({
      text: formatSpeed(currentSpeed),
      titleKey: "toggleBoost",
      role: "pb-speed",
      extraClass: "ysb-pb-speed",
      onClick: toggleBoost,
    }),
    makePbButton({
      text: "+",
      titleKey: "increaseSpeed",
      extraClass: "ysb-pb-step",
      onClick: increaseSpeed,
    }),
  );
  return speedGroup;
}

function buildPlayerBarRight() {
  const bar = document.createElement("div");
  bar.id = PLAYERBAR_RIGHT_ID;
  bar.className = PLAYERBAR_CLASS;

  const pill = document.createElement("div");
  pill.className = "ysb-pb-pill";

  // --- Покадровый просмотр --------------------------------------------------
  const frameGroup = document.createElement("div");
  frameGroup.className = "ysb-pb-group";
  frameGroup.dataset.role = "pb-frame-group";
  frameGroup.append(
    makePbButton({
      iconKey: "frameBackMany",
      text: String(frameStepBack),
      titleKey: "frameBack5",
      role: "pb-frame-back-many",
      onClick: () => playerBarStepFrames(-1, frameStepBack),
    }),
    makePbButton({
      iconKey: "frameBack1",
      titleKey: "frameBack1",
      role: "pb-frame-back",
      onClick: () => playerBarStepFrames(-1, 1),
    }),
    makePbButton({
      iconKey: "frameForward1",
      titleKey: "frameForward1",
      role: "pb-frame-forward",
      onClick: () => playerBarStepFrames(+1, 1),
    }),
    makePbButton({
      iconKey: "frameForwardMany",
      text: String(frameStepForward),
      titleKey: "frameForward5",
      role: "pb-frame-forward-many",
      onClick: () => playerBarStepFrames(+1, frameStepForward),
    }),
  );

  // --- Повтор участка A-B ---------------------------------------------------
  const loopGroup = document.createElement("div");
  loopGroup.className = "ysb-pb-group";
  loopGroup.dataset.role = "pb-loop-group";
  loopGroup.append(
    makePbButton({
      text: "A",
      titleKey: "loopSetA",
      role: "pb-loop-a",
      extraClass: "ysb-pb-mark",
      onClick: setLoopA,
    }),
    makePbButton({
      text: "B",
      titleKey: "loopSetB",
      role: "pb-loop-b",
      extraClass: "ysb-pb-mark",
      onClick: setLoopB,
    }),
    makePbButton({
      iconKey: "loop",
      titleKey: "loopToggle",
      role: "pb-loop-toggle",
      onClick: toggleLoop,
    }),
    makePbButton({
      iconKey: "close",
      titleKey: "loopClear",
      role: "pb-loop-clear",
      onClick: clearLoop,
    }),
  );

  // --- Инструменты: скриншот кадра ------------------------------------------
  const toolsGroup = document.createElement("div");
  toolsGroup.className = "ysb-pb-group";
  toolsGroup.dataset.role = "pb-tools-group";
  toolsGroup.append(
    makePbButton({
      iconKey: "camera",
      titleKey: "screenshotButton",
      role: "pb-screenshot",
      onClick: captureVideoFrame,
    }),
  );

  // Два разделителя на три группы.
  const sep1 = document.createElement("div");
  sep1.className = "ysb-pb-sep";
  sep1.dataset.role = "pb-sep-1";
  const sep2 = document.createElement("div");
  sep2.className = "ysb-pb-sep";
  sep2.dataset.role = "pb-sep-2";

  pill.append(frameGroup, sep1, loopGroup, sep2, toolsGroup);
  bar.appendChild(pill);
  return bar;
}

function updatePlayerBar() {
  // Контролы живут в двух местах: группа скорости — внутри нативного
  // тайм-кода, остальные группы — в правой пилюле. data-role уникальны,
  // поэтому ищем по всему документу.
  const pick = (role) => document.querySelector(`[data-role='${role}']`);

  // Видимость групп и разделителей между ними. На правые группы влияет
  // ещё и компактный режим огибания кнопки «Показать другие видео»
  // (см. updateRightBarCollision).
  const speedGroup = pick("pb-speed-group");
  const frameGroup = pick("pb-frame-group");
  const loopGroup = pick("pb-loop-group");
  const toolsGroup = pick("pb-tools-group");

  const frameVisible = pbFrameButtonsEnabled && !rightBarHiddenGroups.frame;
  const loopVisible = pbLoopButtonsEnabled && !rightBarHiddenGroups.loop;
  const toolsVisible = screenshotButtonEnabled && !rightBarHiddenGroups.tools;

  if (speedGroup) speedGroup.hidden = !playerButtonsEnabled;
  if (frameGroup) frameGroup.hidden = !frameVisible;
  if (loopGroup) loopGroup.hidden = !loopVisible;
  if (toolsGroup) toolsGroup.hidden = !toolsVisible;

  const sep1 = pick("pb-sep-1");
  const sep2 = pick("pb-sep-2");
  if (sep1) sep1.hidden = !(frameVisible && (loopVisible || toolsVisible));
  if (sep2) sep2.hidden = !((frameVisible || loopVisible) && toolsVisible);

  // Подписи и подсказки. frameBack5/frameForward5 — функции от числа кадров.
  document
    .querySelectorAll(`.${PLAYERBAR_CLASS} button[data-title-key]`)
    .forEach((b) => {
    const key = b.dataset.titleKey;
    if (key === "frameBack5") {
      setButtonLabel(b, translate(key, frameStepBack));
    } else if (key === "frameForward5") {
      setButtonLabel(b, translate(key, frameStepForward));
    } else {
      setButtonLabel(b, translate(key));
    }
  });

  const speedLabel = pick("pb-speed");
  if (speedLabel) {
    speedLabel.textContent = formatSpeed(currentSpeed);
    // Красный акцент показывает, что скорость отличается от обычной 1×.
    speedLabel.classList.toggle(
      "ysb-pb-active",
      Math.abs(currentSpeed - 1) > 0.01,
    );
  }

  const backNum = pick("pb-frame-back-many-num");
  if (backNum) backNum.textContent = String(frameStepBack);
  const forwardNum = pick("pb-frame-forward-many-num");
  if (forwardNum) forwardNum.textContent = String(frameStepForward);

  // Состояние повтора: зелёный — метка стоит, красный — цикл работает.
  const aBtn = pick("pb-loop-a");
  const bBtn = pick("pb-loop-b");
  const toggleBtn = pick("pb-loop-toggle");
  const clearBtn = pick("pb-loop-clear");

  if (aBtn) {
    aBtn.classList.toggle("ysb-pb-set", loopA != null);
    if (loopA != null) {
      aBtn.title = `${translate("loopSetA")}\nA = ${formatLoopTime(loopA)}`;
    }
  }
  if (bBtn) {
    bBtn.classList.toggle("ysb-pb-set", loopB != null);
    if (loopB != null) {
      bBtn.title = `${translate("loopSetB")}\nB = ${formatLoopTime(loopB)}`;
    }
  }
  if (toggleBtn) {
    const ready = loopA != null && loopB != null;
    toggleBtn.setAttribute("aria-disabled", ready ? "false" : "true");
    toggleBtn.setAttribute("aria-pressed", loopActive ? "true" : "false");
    toggleBtn.classList.toggle("ysb-pb-on", loopActive);
  }
  if (clearBtn) {
    const hasAny = loopA != null || loopB != null;
    clearBtn.setAttribute("aria-disabled", hasAny ? "false" : "true");
  }
}

// Колесо над объединённым блоком «тайм-код + скорость» крутит скорость:
// объект один, значит и зона наведения одна. preventDefault обязателен,
// иначе прокрутится страница.
function attachTimeDisplayWheel(display) {
  if (!display || display.dataset.ysbSpeedWheel) return;
  display.dataset.ysbSpeedWheel = "1";
  display.addEventListener(
    "wheel",
    (e) => {
      if (!playerButtonsEnabled) return;
      e.preventDefault();
      e.stopPropagation();
      const base = e.deltaY < 0 ? 1 : -1;
      doWheelSpeed(speedWheelInvert() ? -base : base);
      noteOnboardingAction("time-speed");
    },
    { passive: false },
  );
}

// Блок скорости всегда выполняет действие "speed". Инверсию берём у слота,
// которому назначена скорость (ЛКМ — в приоритете как основной жест
// скорости), иначе направления разъедутся между блоком и зонами (план, D3).
function speedWheelInvert() {
  if (lmbWheelAction === "speed") return lmbWheelInvert;
  if (zoneLeftAction === "speed") return zoneLeftInvert;
  if (zoneRightAction === "speed") return zoneRightInvert;
  if (rmbWheelAction === "speed") return rmbWheelInvert;
  return DEFAULT_WHEEL_INVERT;
}

function mountPlayerButtons() {
  const player = getYouTubePlayer();
  if (!player) return;

  injectPlayerBarStyles();

  // --- Скорость — внутрь нативного тайм-кода, следом за live-отставанием
  // или сегментом остатка обычного видео.
  // Правило размещения то же, что в getTimeLeftElement: строго в общую
  // строку после .ytp-time-duration, иначе блок уезжает на 16px вниз.
  const display = player.querySelector(".ytp-time-display");
  if (display) {
    attachTimeDisplayWheel(display);
    if (playerButtonsEnabled) {
      let speedGroup = display.querySelector("[data-role='pb-speed-group']");
      if (!speedGroup) {
        speedGroup = buildSpeedGroup();
        const anchor =
          display.querySelector(`.${LIVE_DELAY_CLASS}`) ||
          display.querySelector(`.${TIME_LEFT_CLASS}`) ||
          display.querySelector(".ytp-time-duration");
        if (anchor) {
          anchor.insertAdjacentElement("afterend", speedGroup);
        } else {
          const contents = display.querySelector(".ytp-time-contents");
          (contents || display).appendChild(speedGroup);
        }
      }
    }
  }

  // --- Покадровый, A-B и скриншот — в правую группу контролов.
  const rightControls = player.querySelector(".ytp-right-controls");
  const existing = document.getElementById(PLAYERBAR_RIGHT_ID);
  const rightWanted =
    pbFrameButtonsEnabled || pbLoopButtonsEnabled || screenshotButtonEnabled;

  if (!rightWanted) {
    // Выключены все три группы — правый контейнер не создаём вовсе,
    // невидимая пустышка в разметке не нужна.
    if (existing) existing.remove();
  } else if (rightControls) {
    const bar = existing || buildPlayerBarRight();
    // Новый плеер рисует .ytp-right-controls одной тёмной пилюлей — наши
    // кнопки лежат прямо в ней, без своей подложки. В классическом плеере
    // рисуем свой чип, как раньше.
    bar.classList.toggle("ysb-pb-delhi", isDelhiPlayerUi(player));

    if (bar.parentElement !== rightControls) {
      // prepend, а не append: нативные кнопки (настройки, миниплеер, театр,
      // полноэкранный) остаются у самого края, наши — левее их.
      rightControls.prepend(bar);
    }
  }

  updatePlayerBar();
}

// В полноэкранном режиме справа появляется кнопка «Показать другие видео (V)»
// — наши группы переезжают ровно туда же. При пересечении прячем группы по
// приоритету: сначала A-B повтор, затем скриншот, затем покадровый.
// Прячем, а не сдвигаем: контейнер лежит во flex-потоке нативной строки,
// transform порвёт выравнивание соседних кнопок.
//
// Селектор кнопки снят с живого плеера по open-source источникам
// (PlayerTube, control-panel-for-youtube): .ytp-fullscreen-grid-expand-button
// внутри .ytp-fullscreen-grid-buttons-container. YouTube классы меняет —
// при подозрении на поломку проверять первым делом.
const FULLSCREEN_MORE_VIDEOS_SELECTOR = [
  ".ytp-fullscreen-grid-expand-button",
  ".ytp-fullscreen-grid-buttons-container",
  // Предшественник кнопки (~2021–2023), вдруг вернётся.
  ".ytp-fullerscreen-edu-button",
].join(",");

let rightBarHiddenGroups = { frame: false, loop: false, tools: false };

function setRightBarHiddenGroups(next) {
  const changed =
    next.frame !== rightBarHiddenGroups.frame ||
    next.loop !== rightBarHiddenGroups.loop ||
    next.tools !== rightBarHiddenGroups.tools;
  if (!changed) return;
  rightBarHiddenGroups = next;
  updatePlayerBar();
}

function updateRightBarCollision(player) {
  const next = { frame: false, loop: false, tools: false };
  const bar = document.getElementById(PLAYERBAR_RIGHT_ID);

  if (bar && player && document.fullscreenElement) {
    const moreBtn = player.querySelector(FULLSCREEN_MORE_VIDEOS_SELECTOR);
    if (moreBtn) {
      const overlaps = () => {
        const a = bar.getBoundingClientRect();
        const b = moreBtn.getBoundingClientRect();
        return a.left < b.right && a.right > b.left;
      };
      if (overlaps()) {
        // Эскалация по приоритету: прячем по одной группе и перемеряем,
        // пока пересечение не исчезнет.
        for (const key of ["loop", "tools", "frame"]) {
          next[key] = true;
          setRightBarHiddenGroups({ ...next });
          if (!overlaps()) return;
        }
        return;
      }
    }
  }
  // Не fullscreen или кнопки нет — компактный режим снят, группы на месте.
  setRightBarHiddenGroups(next);
}

// YouTube пересобирает панель управления при смене видео, размера и
// fullscreen: пропадает и тайм-код с группой скорости, и правая пилюля.
// Дешёвая проверка из общего тикера возвращает всё на место.
function ensurePlayerBarMounted() {
  if (!playerBarWanted()) return;
  const player = getYouTubePlayer();
  if (!player) return;

  const display = player.querySelector(".ytp-time-display");
  const speedMissing =
    playerButtonsEnabled &&
    (!display || !display.querySelector("[data-role='pb-speed-group']"));

  const rightWanted =
    pbFrameButtonsEnabled || pbLoopButtonsEnabled || screenshotButtonEnabled;
  const rightBar = document.getElementById(PLAYERBAR_RIGHT_ID);
  const rightMissing =
    rightWanted &&
    (!rightBar || !rightBar.isConnected || !player.contains(rightBar));

  if (speedMissing || rightMissing) mountPlayerButtons();

  updateRightBarCollision(player);
}

// ---------------------------------------------------------------------------

function scheduleVideoCheck() {
  window.clearTimeout(videoCheckTimer);

  videoCheckTimer = window.setTimeout(() => {
    // Применяем скорость только если появилось новое видео
    // (lastAppliedSpeed не совпадает с тем, что сейчас у видео)
    const video = findVideo();
    const effective = getEffectiveSpeedForVideo();

    if (video && Math.abs((Math.round(video.playbackRate * 100) / 100) - effective) > 0.01) {
      applyDefaultSpeedIfEnabled();
    } else {
      updatePlayerBar();
    }
  }, 300);
}

function watchYouTubePageChanges() {
  // Раньше наблюдатель висел на documentElement с subtree+childList — это
  // слишком шумно: на YouTube DOM меняется по сотне раз в секунду. Теперь
  // следим только за атрибутами, которые реально влияют на нашу логику.
  const layoutObserver = new MutationObserver((records) => {
    const hasLayoutChange = records.some(
      (record) =>
        record.type === "attributes" &&
        ["class", "theater"].includes(record.attributeName),
    );

    if (hasLayoutChange) {
      updatePlayerBar();
    }
  });

  layoutObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "theater"],
  });

  // Отдельный наблюдатель ловит появление flexy-обёртки YouTube и
  // переключение theater-режима.
  const flexy = document.querySelector("ytd-watch-flexy");
  if (flexy) {
    layoutObserver.observe(flexy, {
      attributes: true,
      attributeFilter: ["theater", "fullscreen"],
    });
  }

  document.addEventListener("yt-navigate-finish", () => {
    // Тур привязан к геометрии конкретного плеера; после SPA-перехода его
    // безопаснее закрыть и оставить повторный запуск в popup.
    stopOnboardingTour(false);
    window.setTimeout(() => {
      watchAdState();
      // YouTube мог пересоздать панель управления плеера — перемонтируем.
      mountPlayerButtons();
      // При смене видео сбрасываем активный луп — он привязан к конкретному
      // видео и точки A/B с прошлого видео не имеют смысла.
      resetLoopOnNavigation();
      // При переходе на новое видео сбрасываем lastAppliedSpeed,
      // чтобы скорость точно применилась к новому видео
      lastAppliedSpeed = null;
      applyChannelOrDefaultSpeedWithRetry();
      // Новое видео — старые смещения зума к нему не относятся.
      resetVideoZoom();
    }, 500);
  });

  window.addEventListener("resize", () => {
    updatePlayerBar();
    if (videoZoomEnabled) applyVideoZoomTransform();
  });

  document.addEventListener("fullscreenchange", () => {
    // При входе/выходе из fullscreen YouTube часто пересоздаёт плеер,
    // и старый MutationObserver на player перестаёт ловить ytp-autohide.
    // Перевешиваем его заново.
    watchAdState();
    // Кнопки в панели плеера — перемонтируем на новую панель.
    mountPlayerButtons();
    // Легенда колёсных зон — один раз за сессию при первом fullscreen.
    maybeShowZonesHint();
    // Если был активен луп — переподпишемся на новое видео.
    if (loopActive) {
      attachLoopWatcher();
    }
    // YouTube часто пересоздаёт .html5-video-container при входе/выходе
    // из fullscreen — старый transform на нём уже ни на что не влияет.
    if (videoZoomEnabled) applyVideoZoomTransform();

    updatePlayerBar();
  });

  // Подстраховка: если YouTube сам сбросил скорость, поправляем.
  // Проверяем не чаще раза в 2 секунды и только когда видео играет.
  window.setInterval(() => {
    const video = findVideo();
    if (!video || video.paused) return;

    const effective = getEffectiveSpeedForVideo();
    if (Math.abs((Math.round(video.playbackRate * 100) / 100) - effective) > 0.01) {
      applyDefaultSpeedIfEnabled();
    }
  }, 2000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || typeof message.type !== "string") {
    return false;
  }

  if (message.type === "YSB_ONBOARDING_START") {
    currentLanguage = normalizeLanguage(message.language || currentLanguage);
    const started = startOnboardingTour();
    sendResponse({
      ok: started,
      ...(started ? {} : { reason: "not-watch-page" }),
    });
    return true;
  }

  if (message.type === "YT_SPEED_SET") {
    const speed = applySpeed(message.speed);
    sendResponse({ ok: true, speed });
    return true;
  }

  if (message.type === "YT_SPEED_GET") {
    sendResponse({ ok: true, speed: currentSpeed });
    return true;
  }

  if (message.type === "YT_SPEED_UP") {
    const speed = increaseSpeed();
    sendResponse({ ok: true, speed });
    return true;
  }

  if (message.type === "YT_SPEED_DOWN") {
    const speed = decreaseSpeed();
    sendResponse({ ok: true, speed });
    return true;
  }

  if (message.type === "YT_SPEED_TOGGLE_BOOST") {
    const speed = toggleBoost();
    sendResponse({ ok: true, speed });
    return true;
  }

  if (message.type === "YT_LANGUAGE_SET") {
    currentLanguage = normalizeLanguage(message.language);
    updatePlayerBar();
    if (onboardingTour) renderOnboardingTour();
    sendResponse({ ok: true, language: currentLanguage });
    return true;
  }

  if (message.type === "YT_AUTO_APPLY_SET") {
    autoApplyDefault = Boolean(message.enabled);
    applyDefaultSpeedIfEnabled();
    sendResponse({ ok: true, enabled: autoApplyDefault });
    return true;
  }

  if (message.type === "YT_APPLY_TO_ADS_SET") {
    applyToAds = Boolean(message.enabled);
    reapplyForAdTransition();
    sendResponse({ ok: true, enabled: applyToAds });
    return true;
  }

  if (message.type === "YT_CHANNEL_INFO_GET") {
    // Popup просит инфо о канале текущей вкладки + сохранённую скорость и
    // общее число сохранённых каналов (для подписи на кнопке «Очистить все»).
    const channel = getCurrentChannel();
    const savedSpeed = channel ? getEntrySpeed(channelSpeeds[channel.id]) : null;

    sendResponse({
      ok: true,
      channel, // { id, name } или null
      savedSpeed,
      totalSavedChannels: Object.keys(channelSpeeds).length,
      currentSpeed,
    });
    return true;
  }

  if (message.type === "YT_CHANNEL_SAVE_CURRENT") {
    // «Сохранить текущую скорость для канала»: фиксируем currentSpeed
    // в карте под id текущего канала. Если канала нет — отвечаем ошибкой,
    // чтобы popup мог показать пользователю причину.
    const channel = getCurrentChannel();
    if (!channel) {
      sendResponse({ ok: false, reason: "no-channel" });
      return true;
    }

    channelSpeeds = {
      ...channelSpeeds,
      [channel.id]: { speed: clampSpeed(currentSpeed), name: channel.name },
    };
    chrome.storage.sync.set({ [CHANNEL_SPEEDS_STORAGE_KEY]: channelSpeeds });

    sendResponse({
      ok: true,
      channel,
      savedSpeed: clampSpeed(currentSpeed),
      totalSavedChannels: Object.keys(channelSpeeds).length,
    });
    return true;
  }

  if (message.type === "YT_CHANNEL_CLEAR") {
    // «Забыть скорость для этого канала».
    const channel = getCurrentChannel();
    if (!channel) {
      sendResponse({ ok: false, reason: "no-channel" });
      return true;
    }

    if (channel.id in channelSpeeds) {
      const next = { ...channelSpeeds };
      delete next[channel.id];
      channelSpeeds = next;
      chrome.storage.sync.set({ [CHANNEL_SPEEDS_STORAGE_KEY]: channelSpeeds });
    }

    sendResponse({
      ok: true,
      channel,
      savedSpeed: null,
      totalSavedChannels: Object.keys(channelSpeeds).length,
    });
    return true;
  }

  if (message.type === "YT_CHANNEL_CLEAR_ALL") {
    channelSpeeds = {};
    chrome.storage.sync.set({ [CHANNEL_SPEEDS_STORAGE_KEY]: channelSpeeds });
    sendResponse({ ok: true, totalSavedChannels: 0 });
    return true;
  }

  return false;
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") {
    return;
  }

  if (changes[STORAGE_KEY]) {
    const newSpeed = clampSpeed(changes[STORAGE_KEY].newValue);

    // Обновляем внутреннее состояние, но не применяем к видео —
    // popup уже послал YT_SPEED_SET напрямую.
    // Применяем только если скорость изменилась из другого источника
    // (например, другая вкладка или background.js).
    if (Math.abs(newSpeed - currentSpeed) > 0.01) {
      currentSpeed = newSpeed;

      if (Math.abs(currentSpeed - 1) > 0.01) {
        rememberedToggleSpeed = currentSpeed;
      }

      if (autoApplyDefault) {
        const video = findVideo();
        if (video) {
          video.playbackRate = currentSpeed;
          lastAppliedSpeed = currentSpeed;
        }
      }

      updatePlayerBar();
    }
  }

  if (changes[LANGUAGE_STORAGE_KEY]) {
    currentLanguage = normalizeLanguage(changes[LANGUAGE_STORAGE_KEY].newValue);
    updatePlayerBar();
    if (onboardingTour) renderOnboardingTour();
  }

  if (changes[AUTO_APPLY_STORAGE_KEY]) {
    autoApplyDefault = Boolean(changes[AUTO_APPLY_STORAGE_KEY].newValue);
    applyDefaultSpeedIfEnabled();
  }

  if (changes[APPLY_TO_ADS_STORAGE_KEY]) {
    applyToAds = Boolean(changes[APPLY_TO_ADS_STORAGE_KEY].newValue);
    reapplyForAdTransition();
  }

  if (changes[CHANNEL_SPEEDS_STORAGE_KEY]) {
    const next = changes[CHANNEL_SPEEDS_STORAGE_KEY].newValue;
    // Применяем миграцию и здесь — если другая вкладка/устройство
    // прислала старый формат, нормализуем.
    channelSpeeds = migrateChannelMap(next);
    // Не перезаписываем текущую скорость автоматически: пользователь
    // мог только что отредактировать карту из popup, и менять
    // воспроизводящееся видео без его действия — неожиданно.
  }

  if (changes[FRAME_STEP_HOTKEYS_STORAGE_KEY]) {
    frameStepHotkeysEnabled = Boolean(changes[FRAME_STEP_HOTKEYS_STORAGE_KEY].newValue);
  }

  if (changes[FRAME_STEP_LARGE_STORAGE_KEY]) {
    // Legacy-ключ — больше не пишется, но если кто-то его установит
    // (например, при синхронизации с устройства со старой версией) —
    // обновим оба новых поля на его значение.
    const legacy = clampFrameStep(changes[FRAME_STEP_LARGE_STORAGE_KEY].newValue);
    frameStepBack = legacy;
    frameStepForward = legacy;
    updatePlayerBar();
  }

  if (changes[FRAME_STEP_BACK_STORAGE_KEY]) {
    frameStepBack = clampFrameStep(changes[FRAME_STEP_BACK_STORAGE_KEY].newValue);
    updatePlayerBar();
  }

  if (changes[FRAME_STEP_FORWARD_STORAGE_KEY]) {
    frameStepForward = clampFrameStep(changes[FRAME_STEP_FORWARD_STORAGE_KEY].newValue);
    updatePlayerBar();
  }

  if (changes[SPEED_MIN_STORAGE_KEY] || changes[SPEED_MAX_STORAGE_KEY]) {
    if (changes[SPEED_MIN_STORAGE_KEY]) {
      speedMin = clampHardSpeed(changes[SPEED_MIN_STORAGE_KEY].newValue, DEFAULT_SPEED_MIN);
    }
    if (changes[SPEED_MAX_STORAGE_KEY]) {
      speedMax = clampHardSpeed(changes[SPEED_MAX_STORAGE_KEY].newValue, DEFAULT_SPEED_MAX);
    }
    if (speedMax < speedMin) speedMax = speedMin;
    // Если текущая скорость вышла за новые границы — подтянем её внутрь.
    const safe = clampSpeed(currentSpeed);
    if (Math.abs(safe - currentSpeed) > 0.001) {
      applySpeed(safe);
    } else {
      updatePlayerBar();
    }
  }

  if (changes[LOOP_HOTKEYS_STORAGE_KEY]) {
    loopHotkeysEnabled = Boolean(changes[LOOP_HOTKEYS_STORAGE_KEY].newValue);
  }

  if (changes[SPEED_STEP_STORAGE_KEY]) {
    speedStep = clampSpeedStep(changes[SPEED_STEP_STORAGE_KEY].newValue);
  }

  if (changes[WHEEL_ZONES_MODE_STORAGE_KEY]) {
    wheelZonesMode = normalizeWheelZonesMode(
      changes[WHEEL_ZONES_MODE_STORAGE_KEY].newValue,
    );
  }

  if (changes[WHEEL_SEEK_STEP_STORAGE_KEY]) {
    wheelSeekStep = clampWheelSeekStep(changes[WHEEL_SEEK_STEP_STORAGE_KEY].newValue);
  }

  if (changes[WHEEL_VOLUME_STEP_STORAGE_KEY]) {
    wheelVolumeStep = clampWheelVolumeStep(
      changes[WHEEL_VOLUME_STEP_STORAGE_KEY].newValue,
    );
  }

  if (changes[LMB_WHEEL_ACTION_STORAGE_KEY]) {
    lmbWheelAction = normalizeLmbWheelAction(
      changes[LMB_WHEEL_ACTION_STORAGE_KEY].newValue,
    );
  }

  if (changes[RMB_WHEEL_ACTION_STORAGE_KEY]) {
    rmbWheelAction = normalizeWheelAction(
      changes[RMB_WHEEL_ACTION_STORAGE_KEY].newValue,
      DEFAULT_RMB_WHEEL_ACTION,
    );
  }

  if (changes[ZONE_LEFT_ACTION_STORAGE_KEY]) {
    zoneLeftAction = normalizeWheelAction(
      changes[ZONE_LEFT_ACTION_STORAGE_KEY].newValue,
      DEFAULT_ZONE_LEFT_ACTION,
    );
  }

  if (changes[ZONE_RIGHT_ACTION_STORAGE_KEY]) {
    zoneRightAction = normalizeWheelAction(
      changes[ZONE_RIGHT_ACTION_STORAGE_KEY].newValue,
      DEFAULT_ZONE_RIGHT_ACTION,
    );
  }

  // Границы зон валидны только в паре — при смене любой перечитываем обе.
  if (
    changes[ZONE_LEFT_EDGE_STORAGE_KEY] ||
    changes[ZONE_RIGHT_EDGE_STORAGE_KEY]
  ) {
    [zoneLeftEdge, zoneRightEdge] = normalizeZoneEdges(
      changes[ZONE_LEFT_EDGE_STORAGE_KEY]
        ? changes[ZONE_LEFT_EDGE_STORAGE_KEY].newValue
        : zoneLeftEdge,
      changes[ZONE_RIGHT_EDGE_STORAGE_KEY]
        ? changes[ZONE_RIGHT_EDGE_STORAGE_KEY].newValue
        : zoneRightEdge,
    );
  }

  if (changes[ZONE_LEFT_INVERT_STORAGE_KEY]) {
    zoneLeftInvert = Boolean(changes[ZONE_LEFT_INVERT_STORAGE_KEY].newValue);
  }
  if (changes[ZONE_RIGHT_INVERT_STORAGE_KEY]) {
    zoneRightInvert = Boolean(changes[ZONE_RIGHT_INVERT_STORAGE_KEY].newValue);
  }
  if (changes[LMB_WHEEL_INVERT_STORAGE_KEY]) {
    lmbWheelInvert = Boolean(changes[LMB_WHEEL_INVERT_STORAGE_KEY].newValue);
  }
  if (changes[RMB_WHEEL_INVERT_STORAGE_KEY]) {
    rmbWheelInvert = Boolean(changes[RMB_WHEEL_INVERT_STORAGE_KEY].newValue);
  }

  if (changes[PLAYER_BUTTONS_STORAGE_KEY]) {
    playerButtonsEnabled = Boolean(changes[PLAYER_BUTTONS_STORAGE_KEY].newValue);
    mountPlayerButtons();
  }

  if (changes[PB_FRAME_BUTTONS_STORAGE_KEY]) {
    pbFrameButtonsEnabled = Boolean(
      changes[PB_FRAME_BUTTONS_STORAGE_KEY].newValue,
    );
    mountPlayerButtons();
  }

  if (changes[PB_LOOP_BUTTONS_STORAGE_KEY]) {
    pbLoopButtonsEnabled = Boolean(
      changes[PB_LOOP_BUTTONS_STORAGE_KEY].newValue,
    );
    mountPlayerButtons();
  }

  if (changes[SCREENSHOT_BUTTON_STORAGE_KEY]) {
    screenshotButtonEnabled = Boolean(
      changes[SCREENSHOT_BUTTON_STORAGE_KEY].newValue,
    );
    mountPlayerButtons();
  }

  if (changes[VIDEO_ZOOM_STORAGE_KEY]) {
    videoZoomEnabled = Boolean(changes[VIDEO_ZOOM_STORAGE_KEY].newValue);
    // Слушатели уже висят с самого старта (см. init) — сами проверяют
    // videoZoomEnabled. Регистрировать их здесь заново нельзя: порядок
    // относительно onGlobalPointerDown важен (см. bindVideoZoomListeners).
    if (!videoZoomEnabled) resetVideoZoom();
  }

  if (changes[PLAYER_TIME_LEFT_STORAGE_KEY]) {
    playerTimeLeftEnabled = Boolean(
      changes[PLAYER_TIME_LEFT_STORAGE_KEY].newValue,
    );
    updatePlayerTimeLeft();
  }

  if (changes[MINI_PROGRESS_STORAGE_KEY]) {
    miniProgressMode = normalizeMiniProgressMode(
      changes[MINI_PROGRESS_STORAGE_KEY].newValue,
    );
    updateMiniProgress();
  }

  if (changes[MINI_PROGRESS_HEIGHT_STORAGE_KEY]) {
    miniProgressHeight = clampMiniProgressHeight(
      changes[MINI_PROGRESS_HEIGHT_STORAGE_KEY].newValue,
    );
    updateMiniProgress();
  }

  if (changes[MINI_PROGRESS_COLOR_STORAGE_KEY]) {
    miniProgressColor = normalizeHexColor(
      changes[MINI_PROGRESS_COLOR_STORAGE_KEY].newValue,
    );
    updateMiniProgress();
  }

  if (changes[VOLUME_BOOST_STORAGE_KEY]) {
    volumeBoostEnabled = Boolean(changes[VOLUME_BOOST_STORAGE_KEY].newValue);
    // Выключили фичу — снимаем текущее усиление, иначе звук остался бы
    // задранным без возможности убрать его колесом.
    if (!volumeBoostEnabled && volumeBoostPct > 100) {
      applyVolumeBoost(100);
    }
  }

  if (changes[VOLUME_BOOST_MAX_STORAGE_KEY]) {
    volumeBoostMaxPct = clampVolumeBoostMax(
      changes[VOLUME_BOOST_MAX_STORAGE_KEY].newValue,
    );
    if (volumeBoostPct > volumeBoostMaxPct) {
      applyVolumeBoost(volumeBoostMaxPct);
    }
  }
});

chrome.storage.sync
  .get({
    [STORAGE_KEY]: DEFAULT_SPEED,
    [LANGUAGE_STORAGE_KEY]: DEFAULT_LANGUAGE,
    [AUTO_APPLY_STORAGE_KEY]: DEFAULT_AUTO_APPLY,
    [APPLY_TO_ADS_STORAGE_KEY]: DEFAULT_APPLY_TO_ADS,
    [CHANNEL_SPEEDS_STORAGE_KEY]: {},
    [FRAME_STEP_HOTKEYS_STORAGE_KEY]: DEFAULT_FRAME_STEP_HOTKEYS,
    [FRAME_STEP_LARGE_STORAGE_KEY]: null, // legacy, для миграции
    [FRAME_STEP_BACK_STORAGE_KEY]: null,
    [FRAME_STEP_FORWARD_STORAGE_KEY]: null,
    [SPEED_MIN_STORAGE_KEY]: DEFAULT_SPEED_MIN,
    [SPEED_MAX_STORAGE_KEY]: DEFAULT_SPEED_MAX,
    [LOOP_HOTKEYS_STORAGE_KEY]: DEFAULT_LOOP_HOTKEYS,
    [SPEED_STEP_STORAGE_KEY]: DEFAULT_SPEED_STEP,
    [WHEEL_ZONES_MODE_STORAGE_KEY]: DEFAULT_WHEEL_ZONES_MODE,
    [WHEEL_SEEK_STEP_STORAGE_KEY]: DEFAULT_WHEEL_SEEK_STEP,
    [WHEEL_VOLUME_STEP_STORAGE_KEY]: DEFAULT_WHEEL_VOLUME_STEP,
    [LMB_WHEEL_ACTION_STORAGE_KEY]: DEFAULT_LMB_WHEEL_ACTION,
    [RMB_WHEEL_ACTION_STORAGE_KEY]: DEFAULT_RMB_WHEEL_ACTION,
    [ZONE_LEFT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_LEFT_EDGE,
    [ZONE_RIGHT_EDGE_STORAGE_KEY]: DEFAULT_ZONE_RIGHT_EDGE,
    [ZONE_LEFT_ACTION_STORAGE_KEY]: DEFAULT_ZONE_LEFT_ACTION,
    [ZONE_RIGHT_ACTION_STORAGE_KEY]: DEFAULT_ZONE_RIGHT_ACTION,
    [ZONE_LEFT_INVERT_STORAGE_KEY]: DEFAULT_WHEEL_INVERT,
    [ZONE_RIGHT_INVERT_STORAGE_KEY]: DEFAULT_WHEEL_INVERT,
    [LMB_WHEEL_INVERT_STORAGE_KEY]: DEFAULT_WHEEL_INVERT,
    [RMB_WHEEL_INVERT_STORAGE_KEY]: DEFAULT_WHEEL_INVERT,
    [PLAYER_BUTTONS_STORAGE_KEY]: DEFAULT_PLAYER_BUTTONS,
    [PB_FRAME_BUTTONS_STORAGE_KEY]: DEFAULT_PB_FRAME_BUTTONS,
    [PB_LOOP_BUTTONS_STORAGE_KEY]: DEFAULT_PB_LOOP_BUTTONS,
    [PLAYER_TIME_LEFT_STORAGE_KEY]: DEFAULT_PLAYER_TIME_LEFT,
    [MINI_PROGRESS_STORAGE_KEY]: DEFAULT_MINI_PROGRESS,
    [MINI_PROGRESS_HEIGHT_STORAGE_KEY]: DEFAULT_MINI_PROGRESS_HEIGHT,
    [MINI_PROGRESS_COLOR_STORAGE_KEY]: DEFAULT_MINI_PROGRESS_COLOR,
    [VOLUME_BOOST_STORAGE_KEY]: DEFAULT_VOLUME_BOOST,
    [VOLUME_BOOST_MAX_STORAGE_KEY]: DEFAULT_VOLUME_BOOST_MAX,
    [SCREENSHOT_BUTTON_STORAGE_KEY]: DEFAULT_SCREENSHOT_BUTTON,
    [VIDEO_ZOOM_STORAGE_KEY]: DEFAULT_VIDEO_ZOOM,
  })
  .then((data) => {
    currentSpeed = clampSpeed(data[STORAGE_KEY]);

    if (Math.abs(currentSpeed - 1) > 0.01) {
      rememberedToggleSpeed = currentSpeed;
    }

    currentLanguage = normalizeLanguage(data[LANGUAGE_STORAGE_KEY]);
    autoApplyDefault = Boolean(data[AUTO_APPLY_STORAGE_KEY]);
    applyToAds = Boolean(data[APPLY_TO_ADS_STORAGE_KEY]);
    const storedChannels = data[CHANNEL_SPEEDS_STORAGE_KEY];
    channelSpeeds = migrateChannelMap(storedChannels);
    frameStepHotkeysEnabled = Boolean(data[FRAME_STEP_HOTKEYS_STORAGE_KEY]);

    // Миграция: если у пользователя сохранён только старый ключ Large,
    // используем его значение для обоих новых полей. Иначе — раздельные.
    const legacyLarge = data[FRAME_STEP_LARGE_STORAGE_KEY];
    const rawBack = data[FRAME_STEP_BACK_STORAGE_KEY];
    const rawForward = data[FRAME_STEP_FORWARD_STORAGE_KEY];
    frameStepBack = clampFrameStep(
      rawBack != null ? rawBack : (legacyLarge != null ? legacyLarge : DEFAULT_FRAME_STEP_BACK)
    );
    frameStepForward = clampFrameStep(
      rawForward != null ? rawForward : (legacyLarge != null ? legacyLarge : DEFAULT_FRAME_STEP_FORWARD)
    );

    // Сначала устанавливаем границы — clampSpeed будет использовать их.
    speedMin = clampHardSpeed(data[SPEED_MIN_STORAGE_KEY], DEFAULT_SPEED_MIN);
    speedMax = clampHardSpeed(data[SPEED_MAX_STORAGE_KEY], DEFAULT_SPEED_MAX);
    if (speedMax < speedMin) speedMax = speedMin;
    loopHotkeysEnabled = Boolean(data[LOOP_HOTKEYS_STORAGE_KEY]);
    speedStep = clampSpeedStep(data[SPEED_STEP_STORAGE_KEY]);
    wheelZonesMode = normalizeWheelZonesMode(data[WHEEL_ZONES_MODE_STORAGE_KEY]);
    wheelSeekStep = clampWheelSeekStep(data[WHEEL_SEEK_STEP_STORAGE_KEY]);
    wheelVolumeStep = clampWheelVolumeStep(data[WHEEL_VOLUME_STEP_STORAGE_KEY]);
    lmbWheelAction = normalizeLmbWheelAction(data[LMB_WHEEL_ACTION_STORAGE_KEY]);
    rmbWheelAction = normalizeWheelAction(
      data[RMB_WHEEL_ACTION_STORAGE_KEY],
      DEFAULT_RMB_WHEEL_ACTION,
    );
    [zoneLeftEdge, zoneRightEdge] = normalizeZoneEdges(
      data[ZONE_LEFT_EDGE_STORAGE_KEY],
      data[ZONE_RIGHT_EDGE_STORAGE_KEY],
    );
    zoneLeftAction = normalizeWheelAction(
      data[ZONE_LEFT_ACTION_STORAGE_KEY],
      DEFAULT_ZONE_LEFT_ACTION,
    );
    zoneRightAction = normalizeWheelAction(
      data[ZONE_RIGHT_ACTION_STORAGE_KEY],
      DEFAULT_ZONE_RIGHT_ACTION,
    );
    zoneLeftInvert = Boolean(data[ZONE_LEFT_INVERT_STORAGE_KEY]);
    zoneRightInvert = Boolean(data[ZONE_RIGHT_INVERT_STORAGE_KEY]);
    lmbWheelInvert = Boolean(data[LMB_WHEEL_INVERT_STORAGE_KEY]);
    rmbWheelInvert = Boolean(data[RMB_WHEEL_INVERT_STORAGE_KEY]);
    playerButtonsEnabled = Boolean(data[PLAYER_BUTTONS_STORAGE_KEY]);
    pbFrameButtonsEnabled = Boolean(data[PB_FRAME_BUTTONS_STORAGE_KEY]);
    pbLoopButtonsEnabled = Boolean(data[PB_LOOP_BUTTONS_STORAGE_KEY]);
    playerTimeLeftEnabled = Boolean(data[PLAYER_TIME_LEFT_STORAGE_KEY]);
    miniProgressMode = normalizeMiniProgressMode(data[MINI_PROGRESS_STORAGE_KEY]);
    miniProgressHeight = clampMiniProgressHeight(data[MINI_PROGRESS_HEIGHT_STORAGE_KEY]);
    miniProgressColor = normalizeHexColor(data[MINI_PROGRESS_COLOR_STORAGE_KEY]);
    volumeBoostEnabled = Boolean(data[VOLUME_BOOST_STORAGE_KEY]);
    volumeBoostMaxPct = clampVolumeBoostMax(data[VOLUME_BOOST_MAX_STORAGE_KEY]);
    screenshotButtonEnabled = Boolean(data[SCREENSHOT_BUTTON_STORAGE_KEY]);
    videoZoomEnabled = Boolean(data[VIDEO_ZOOM_STORAGE_KEY]);
    lastAppliedSpeed = null;

    watchAdState();
    mountPlayerButtons();
    injectPlayerUiStyles();
    // Слушатели зума регистрируются всегда (не только когда фича включена
    // сейчас), чтобы порядок относительно onGlobalPointerDown ниже был
    // предсказуем, даже если владелец включит зум позже через popup —
    // внутри обработчиков есть проверка videoZoomEnabled.
    bindVideoZoomListeners();
    // Общий тикер: счётчик остатка в тайм-коде, линия прогресса, страховка
    // монтирования кнопок и живучести WebAudio.
    startUiTicker();
    // Глобальный слушатель кадровых хоткеев. Capture=true, чтобы поймать
    // событие до того, как YouTube его перехватит и обработает по-своему.
    document.addEventListener("keydown", onFrameStepHotkey, true);
    // То же для A-B Loop хоткеев Alt+A / Alt+B / Alt+L.
    document.addEventListener("keydown", onLoopHotkey, true);
    // Колёсные зоны + ЛКМ+колесо. Capture и passive:false — нам нужен
    // preventDefault, чтобы страница не скроллилась при перехвате.
    window.addEventListener("wheel", onZonesWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("pointerdown", onGlobalPointerDown, true);
    window.addEventListener("pointerup", onGlobalPointerUp, true);
    window.addEventListener("click", onGlobalClickCapture, true);
    // ПКМ+колесо — жест: подавляем контекстное меню после него.
    window.addEventListener("contextmenu", onGlobalContextMenuCapture, true);
    // На первом заходе DOM может ещё не содержать ссылку на канал, поэтому
    // используем retry-обёртку: либо применит сохранённую для канала
    // скорость, либо откатится на глобальный default.
    applyChannelOrDefaultSpeedWithRetry();
    watchYouTubePageChanges();
  });
