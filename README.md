# VK Video Downloader
![MIT License](https://img.shields.io/github/license/JustKappaMan/VK-Video-Downloader)
![Version 1.2.0](https://img.shields.io/badge/version-1.2.0-blue)
![Checked with ESLint](https://img.shields.io/badge/ESLint-checked-blueviolet)

В 2023 году у меня был смартфон Xiaomi Redmi 7. Смотря видео в VK, я сталкивался с:
* Постоянными багами воспроизведения и интерфейса
* Низкой частотой кадров при качестве 720p и выше
* Графическими артефактами при качестве 480p и ниже

Я решил воспользоваться безотказным методом — скачивать видео и смотреть их локально. Каждый раз вытаскивать ссылки руками оказалось неудобно. Так и родилось это расширение.

## Как установить
* Браузеры на основе Chromium
  * Cкачайте [архив с исходным кодом](https://codeload.github.com/JustKappaMan/VK-Video-Downloader/zip/refs/heads/main), распакуйте его
  * Откройте в браузере раздел __Расширения__
  * Активируйте __Режим разработчика__ (если такая функция имеется)
  * Нажмите __Загрузить распакованное__ (или нечто подобное)
  * Выберите папку __chromium__ из распакованного архива
* Любые браузеры с поддержкой Tampermonkey/Greasemonkey/Violentmonkey
  * [Установить desktop версию](https://github.com/DverkaSK/VK-Video-Downloader/raw/refs/heads/main/monkeys/scripts/VK-Video-Downloader-desktop.user.js)
  * [Установить mobile версию](https://github.com/DverkaSK/VK-Video-Downloader/raw/refs/heads/main/monkeys/scripts/VK-Video-Downloader-mobile.user.js)

## Как пользоваться
* Откройте страницу любого видео в VK
* Кликните по одной из появившихся в левом нижнем углу браузера ссылок для скачивания
* Наслаждайтесь локальным просмотром видео в желаемом качестве 🥳

## Благодарность
* [Rizki Ahmad Fauzi](https://www.flaticon.com/authors/rizki-ahmad-fauzi) за иконки
* [SpukiBugi](https://github.com/SpukiBugi) за помощь после очередного обновления VK
* [iamcringyfox](https://github.com/iamcringyfox) за добавление скачивания со страниц плейлистов
* [VerMishelb](https://github.com/VerMishelb) за напоминание о существовании домена [vk.ru](https://vk.ru)
* [Korb](https://github.com/Korb) за добавление установки по URL в Tampermonkey
* [garex](https://github.com/garex) за добавление поддержки VK Sport и плеера в ShadowDOM

## Информация о лицензии
Продукт распространяется под лицензией MIT.
