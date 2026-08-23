// ---------------------------------------------------------------------------
// Мост в MAIN-world страницы YouTube.
//
// Зачем: content.js работает в изолированном мире и физически не видит
// JS-API плеера (`#movie_player.setVolume()` и т.п.) — свойства, которые
// YouTube навешивает на DOM-узел из своего мира. Из-за этого, когда мы
// меняли громкость напрямую через `video.volume`, нативный ползунок
// громкости в панели плеера оставался на старом значении: YouTube хранит
// уровень в собственном состоянии и не слушает наши изменения.
//
// Этот файл объявлен в манифесте с "world": "MAIN" — он исполняется в
// контексте страницы, поэтому API плеера ему доступен. Общение —
// CustomEvent'ами: команды идут от content.js, состояние плеера — обратно.
//
// Никакой логики здесь намеренно нет: только тонкий вызов API плеера,
// чтобы не дублировать состояние в двух мирах.
// ---------------------------------------------------------------------------

(() => {
  "use strict";

  const CMD_EVENT = "ysb-player-cmd";
  const STATE_EVENT = "ysb-player-state";

  function getPlayer() {
    const el = document.getElementById("movie_player");
    if (!el) return null;
    return el;
  }

  function clampVolume(value) {
    const n = Math.round(Number(value));
    if (!Number.isFinite(n)) return null;
    return Math.min(100, Math.max(0, n));
  }

  function finiteNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  // Внутренние методы плеера видны только в MAIN-world. В content.js тот же
  // DOM-узел не раскрывает getProgressState() из-за изоляции миров Chrome.
  function reportPlayerState(player) {
    let progress = null;
    let videoData = null;
    let playerResponse = null;
    let stats = null;

    try {
      if (typeof player.getProgressState === "function") {
        progress = player.getProgressState();
      }
    } catch {
      /* плеер мог пересоздаться между поиском и вызовом */
    }
    try {
      if (typeof player.getVideoData === "function") {
        videoData = player.getVideoData();
      }
    } catch {
      /* ignore */
    }
    try {
      if (typeof player.getPlayerResponse === "function") {
        playerResponse = player.getPlayerResponse();
      }
    } catch {
      /* ignore */
    }
    try {
      if (typeof player.getStatsForNerds === "function") {
        stats = player.getStatsForNerds();
      }
    } catch {
      /* ignore */
    }

    const responseDetails = playerResponse && playerResponse.videoDetails;
    const latency = Number.parseFloat(stats && stats.live_latency_secs);
    const hasLiveHead = Boolean(
      progress && typeof progress.isAtLiveHead === "boolean"
    );
    // `isLiveContent` остаётся true и у законченных трансляций. Активным
    // эфиром считаем только текущее live-состояние, live-head или latency.
    const isLive = Boolean(
      (videoData && (videoData.isLive || videoData.is_live)) ||
      (responseDetails && responseDetails.isLive) ||
      (hasLiveHead && progress.isAtLiveHead === true) ||
      Number.isFinite(latency)
    );
    const progressPosition = progress
      ? {
          current: finiteNumber(progress.current),
          seekableEnd: finiteNumber(progress.seekableEnd),
        }
      : null;

    document.dispatchEvent(
      new CustomEvent(STATE_EVENT, {
        detail: {
          isLive,
          hasLiveHead,
          isAtLiveHead: hasLiveHead ? progress.isAtLiveHead : false,
          progress: progressPosition,
        },
      }),
    );
  }

  document.addEventListener(CMD_EVENT, (event) => {
    const detail = event && event.detail ? event.detail : null;
    if (!detail || typeof detail.cmd !== "string") return;

    const player = getPlayer();
    if (!player) return;

    try {
      switch (detail.cmd) {
        case "getPlayerState": {
          reportPlayerState(player);
          break;
        }
        case "setVolume": {
          if (typeof player.setVolume !== "function") return;
          const volume = clampVolume(detail.value);
          if (volume == null) return;
          // Прибавка громкости снимает mute — так же ведёт себя сам YouTube,
          // когда тянешь ползунок вверх из выключенного звука.
          if (volume > 0 && typeof player.isMuted === "function" && player.isMuted()) {
            if (typeof player.unMute === "function") player.unMute();
          }
          player.setVolume(volume);
          break;
        }
        case "mute": {
          if (typeof player.mute === "function") player.mute();
          break;
        }
        case "unMute": {
          if (typeof player.unMute === "function") player.unMute();
          break;
        }
        default:
          break;
      }
    } catch {
      /* плеер мог смениться прямо во время вызова — молча игнорируем */
    }
  });
})();
