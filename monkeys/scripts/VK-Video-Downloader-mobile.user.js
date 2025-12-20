// ==UserScript==
// @name         VK-Video-Downloader-mobile
// @namespace    https://github.com/JustKappaMan
// @version      1.1.13
// @description  Скачивайте видео с сайта «ВКонтакте» в желаемом качестве
// @author       Kirill "JustKappaMan" Volozhanin
// @match        https://m.vk.com/*
// @match        https://m.vk.ru/*
// @run-at       document-idle
// @icon         https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/icons/icon128.png
// @homepageURL  https://github.com/JustKappaMan/VK-Video-Downloader
// @downloadURL  https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/VK-Video-Downloader-mobile.user.js
// @updateURL    https://raw.githubusercontent.com/JustKappaMan/VK-Video-Downloader/main/monkeys/scripts/VK-Video-Downloader-mobile.user.js
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

    const isVideoUrl = /^\/(?:video|clip)[^\/]+$/.test(location.pathname);

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

      const player = document.querySelector("div.VideoPage__playerContainer vk-video-player")
        || document.querySelector("div.VideoPage__video video");

      const iframe = player ? null : document.querySelector("div.VideoPage__playerContainer iframe");

      if (!player && !iframe) {
        return;
      }

      clearInterval(searchTimer);

      if (player) {
        showDownloadPanel();
      } else {
        showErrorPanel();
      }
    }, 500);
  }

  function showDownloadPanel() {
    let videoSources = {};
    const isClip = /^\/clip[^\/]+$/.test(location.pathname);

    if (!isClip) {
      videoSources = window.videoMvkSdk?.config?.videos?.[0]?.sources?.MPEG;
    } else {
      const sourceTags = Array.from(document.querySelectorAll('video source[type="video/mp4"]')).reverse();

      for (const tag of sourceTags) {
        if (tag.src.includes("&type=4")) videoSources["144p"] = tag.src;
        else if (tag.src.includes("&type=0")) videoSources["240p"] = tag.src;
        else if (tag.src.includes("&type=1")) videoSources["360p"] = tag.src;
        else if (tag.src.includes("&type=2")) videoSources["480p"] = tag.src;
        else if (tag.src.includes("&type=3")) videoSources["720p"] = tag.src;
        else if (tag.src.includes("&type=5")) videoSources["1080p"] = tag.src;
        else if (tag.src.includes("&type=6")) videoSources["1440p"] = tag.src;
        else if (tag.src.includes("&type=7")) videoSources["2160p"] = tag.src;
      }
    }

    if (!videoSources || Object.keys(videoSources).length === 0) {
      return;
    }

    document.querySelector("#vkVideoDownloaderPanel")?.remove();

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
