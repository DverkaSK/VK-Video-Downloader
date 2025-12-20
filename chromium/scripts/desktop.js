"use strict";

let lastUrl = location.href;
let checkerHasBeenCalled = false;
let showPanelHasBeenCalled = false;

new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    checkerHasBeenCalled = false;
    showPanelHasBeenCalled = false;

    document.querySelector("#vkVideoDownloaderPanel")?.remove();
  }

  const isVideoUrl = /z=(?:video|clip)/.test(location.search)
    || /^\/(?:video|clip)[^\/s]+$/.test(location.pathname)
    || /^\/playlist\/[\d-]+/.test(location.pathname);

  if (isVideoUrl && !checkerHasBeenCalled) {
    checkerHasBeenCalled = true;
    const checker = setInterval(() => {
      if (showPanelHasBeenCalled) {
        clearInterval(checker);
        return;
      }

      const player = document.querySelector("#video_player video")
        || document.querySelector("#video_player .shadow-root-container")?.shadowRoot?.querySelector("video");

      const iframe = player ? null : document.querySelector("#video_player iframe");

      if (!player && !iframe) {
        return;
      } else if (player) {
        showDownloadPanel();
      } else if (iframe) {
        showErrorPanel();
      }

      showPanelHasBeenCalled = true;
    }, 500);
  }
}).observe(document.body, { subtree: true, childList: true });

function showDownloadPanel() {
  const script = document.createElement("script");

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
