"use strict";

(() => {
  const playerContainer = document.querySelector("#video_player");
  const playerVars = window.mvcur?.player?.vars || window.cur?.videoInlinePlayer?.vars;

  if (!playerContainer || !playerVars) {
    return;
  }

  document.querySelector("#vkVideoDownloaderPanel")?.remove();

  const videoSources = {
    "144p": playerVars.url144,
    "240p": playerVars.url240,
    "360p": playerVars.url360,
    "480p": playerVars.url480,
    "720p": playerVars.url720,
    "1080p": playerVars.url1080,
    "1440p": playerVars.url1440,
    "2160p": playerVars.url2160,
  };

  const videoElement = getVideoElement(playerContainer);

  createDownloadButton(playerContainer, videoElement, videoSources);

  function getVideoElement(container) {
    return container.querySelector("video")
      || container.querySelector(".shadow-root-container")?.shadowRoot?.querySelector("video")
      || null;
  }

  function getCurrentQualityUrl(video, sources) {
    const qualityOrder = ["144p", "240p", "360p", "480p", "720p", "1080p", "1440p", "2160p"];
    const currentSrc = video?.currentSrc || video?.src;

    if (currentSrc) {
      const matchedQuality = qualityOrder.find((quality) => sources[quality] === currentSrc);
      if (matchedQuality) {
        return sources[matchedQuality];
      }
    }

    for (let i = qualityOrder.length - 1; i >= 0; i--) {
      const url = sources[qualityOrder[i]];
      if (url) {
        return url;
      }
    }

    return null;
  }

  function triggerDownload(url) {
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.style.display = "none";
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }

  function createDownloadButton(container, video, sources) {
    const button = document.createElement("button");
    button.id = "vkVideoDownloaderPanel";
    button.type = "button";
    button.title = "Скачать видео";
    button.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 19h14"/></svg>';

    Object.assign(button.style, {
      position: "absolute",
      top: "8px",
      right: "8px",
      zIndex: "2147483647",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0",
      border: "none",
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      cursor: "pointer",
      opacity: "0",
      pointerEvents: "none",
      transition: "opacity 0.2s ease",
    });

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const url = getCurrentQualityUrl(video, sources);
      if (url) {
        triggerDownload(url);
      }
    });

    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }

    container.appendChild(button);
    bindVisibilityControl(container, video, button);

    return button;
  }

  function bindVisibilityControl(container, video, button) {
    const HIDE_DELAY = 3000;
    let hideTimer = null;

    const show = () => {
      button.style.opacity = "1";
      button.style.pointerEvents = "auto";
    };

    const hide = () => {
      button.style.opacity = "0";
      button.style.pointerEvents = "none";
    };

    const scheduleHide = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (video && !video.paused) {
          hide();
        }
      }, HIDE_DELAY);
    };

    const handleActivity = () => {
      show();
      scheduleHide();
    };

    const handleLeave = () => {
      if (video && !video.paused) {
        hide();
      }
    };

    container._vkDownloaderCleanup?.();

    container.addEventListener("mousemove", handleActivity);
    container.addEventListener("mouseenter", handleActivity);
    container.addEventListener("touchstart", handleActivity, { passive: true });
    container.addEventListener("mouseleave", handleLeave);
    video?.addEventListener("pause", show);
    video?.addEventListener("play", scheduleHide);

    container._vkDownloaderCleanup = () => {
      clearTimeout(hideTimer);
      container.removeEventListener("mousemove", handleActivity);
      container.removeEventListener("mouseenter", handleActivity);
      container.removeEventListener("touchstart", handleActivity);
      container.removeEventListener("mouseleave", handleLeave);
      video?.removeEventListener("pause", show);
      video?.removeEventListener("play", scheduleHide);
    };

    handleActivity();
  }
})();
