# VK Video Downloader
![MIT License](https://img.shields.io/github/license/JustKappaMan/VK-Video-Downloader)
![Version 1.1.12](https://img.shields.io/badge/version-1.1.12-blue)
![Checked with ESLint](https://img.shields.io/badge/ESLint-checked-blueviolet)

Относительно недавно просмотр видео в VK на бюджетных устройствах (особенно в приложении) стал невозможен по ряду причин:
* Постоянные ошибки
* Низкая частота кадров при качестве 720p и выше
* Графические артефакты при качестве 480p и ниже

Я решил воспользоваться безотказным методом — скачивать видео и смотреть их локально. Каждый раз вытаскивать ссылки руками, путаясь в качестве видео, оказалось неудобно. Так и родилось это расширение.

## Как установить
* Браузеры на основе Chromium
  * Cкачайте [архив с исходным кодом](https://codeload.github.com/JustKappaMan/VK-Video-Downloader/zip/refs/heads/main), распакуйте скачанный архив
  * Откройте в браузере раздел __Расширения__
  * Активируйте __Режим разработчика__ (если такая функция имеется)
  * Нажмите __Загрузить распакованное__ (или нечто подобное)
  * Выберите папку __chromium__ из распакованного архива
* Любые браузеры с поддержкой Tampermonkey/Greasemonkey/Violentmonkey
  * [Установить desktop версию](https://github.com/JustKappaMan/VK-Video-Downloader/raw/refs/heads/main/monkeys/scripts/VK-Video-Downloader-desktop.user.js)
  * [Установить mobile версию](https://github.com/JustKappaMan/VK-Video-Downloader/raw/refs/heads/main/monkeys/scripts/VK-Video-Downloader-mobile.user.js)

## Как пользоваться
* Откройте любое видео на [vk.com](https://vk.com)/[vk.ru](https://vk.ru)/[m.vk.com](https://m.vk.com)/[vkvideo.ru](https://vkvideo.ru)
* Кликните по одной из появившихся в левом нижнем углу браузера ссылок для скачивания
* Наслаждайтесь локальным просмотром видео в желаемом качестве 🥳

## Благодарность
* [Rizki Ahmad Fauzi](https://www.flaticon.com/authors/rizki-ahmad-fauzi) за иконки
* [SpukiBugi](https://github.com/SpukiBugi) за помощь после очередного обновления VK
* [iamcringyfox](https://github.com/iamcringyfox) за добавление скачивания со страниц плейлистов
* [VerMishelb](https://github.com/VerMishelb) за напоминание о существовании домена [vk.ru](https://vk.ru)
* [Korb](https://github.com/Korb) за добавление установки по URL в TamperMonkey
* [garex](https://github.com/garex) за добавление поддержки VK Sport и плеера в ShadowDOM

## Информация о лицензии
Продукт распространяется под лицензией MIT.
