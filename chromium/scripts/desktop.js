"use strict";

let currentUrl = location.href;
let searchTimer = null;

setInterval(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    handleUrlChange();
  }
}, 500);

handleUrlChange();

function handleUrlChange() {
  document.querySelector("#vkVideoDownloaderPanel")?.remove();

  if (searchTimer) {
    clearInterval(searchTimer);
    searchTimer = null;
  }

  const isVideoUrl = /z=(?:video|clip)/.test(location.search)
    || /^\/(?:video|clip)[^\/s]+$/.test(location.pathname)
    || /^\/playlist\/[\d-]+/.test(location.pathname);

  if (isVideoUrl) {
    startPlayerSearch();
  }
}

function startPlayerSearch() {
  searchTimer = setInterval(() => {
    if (location.href !== currentUrl) {
      clearInterval(searchTimer);
      return;
    }

    const player = document.querySelector("#video_player video")
      || document.querySelector("#video_player .shadow-root-container")?.shadowRoot?.querySelector("video");

    const iframe = player ? null : document.querySelector("#video_player iframe");

    if (!player && !iframe) {
      return
    };

    clearInterval(searchTimer);

    if (player) {
      showDownloadPanel();
    } else {
      showErrorPanel();
    }
  }, 500);
}

function showDownloadPanel() {
  const script = document.createElement("script");
  script.charset = "utf-8";
  script.src = chrome.runtime.getURL("scripts/desktop-injection.js");
  script.onload = () => script.remove();

  document.body.appendChild(script);
}

function showErrorPanel() {
  const label = document.createElement("span");
  label.textContent = "Видео со стороннего сайта. Воспользуйтесь инструментами для скачивания с него.";

  const panel = document.createElement("div");
  panel.id = "vkVideoDownloaderPanel";
  Object.assign(panel.style, {
    position: "fixed",
    left: "16px",
    bottom: "16px",
    zIndex: "2147483647",
    padding: "4px",
    color: "#fff",
    backgroundColor: "#07f",
    border: "1px solid #fff",
  });
  panel.appendChild(label);

  document.body.appendChild(panel);
}
