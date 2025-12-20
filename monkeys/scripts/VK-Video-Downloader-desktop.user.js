// ==UserScript==
// @name         VK-Video-Downloader-desktop
// @namespace    https://github.com/JustKappaMan
// @version      1.1.13
// @description  Скачивайте видео с сайта «ВКонтакте» в желаемом качестве
// @author       Kirill "JustKappaMan" Volozhanin
// @match        https://vk.com/*
// @match        https://vk.ru/*
// @match        https://*.vkvideo.ru/*
// @run-at       document-idle
// @icon         https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/icons/icon128.png
// @homepageURL  https://github.com/JustKappaMan/VK-Video-Downloader
// @downloadURL  https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/VK-Video-Downloader-desktop.user.js
// @updateURL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/VK-Video-Downloader-desktop.user.js
// @grant        none
// ==/UserScript==

(() => {
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
        aTag.target = "_blank";
        aTag.textContent = quality;
        aTag.style.margin = "0 2px";
        aTag.style.color = "#fff";
        panel.appendChild(aTag);
      }
    }

    document.body.appendChild(panel);
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
})();
