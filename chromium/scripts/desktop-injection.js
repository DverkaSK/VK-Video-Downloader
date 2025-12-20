"use strict";

(() => {
  const playerVars = window.mvcur?.player?.vars || window.cur?.videoInlinePlayer?.vars;

  if (!playerVars) {
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

  const label = document.createElement("span");
  label.textContent = "Скачать:";
  label.style.marginRight = "2px";

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

  for (const [quality, url] of Object.entries(videoSources)) {
    if (url) {
      const aTag = document.createElement("a");
      aTag.href = url;
      aTag.textContent = quality;
      aTag.style.margin = "0 2px";
      aTag.style.color = "#fff";
      panel.appendChild(aTag);
    }
  }

  document.body.appendChild(panel);
})();
