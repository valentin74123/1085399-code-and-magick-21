'use strict';

(function () {
  let StatusCode = {
    OK: 200
  };
  let TIMEOUT_IN_MS = 10000;

  window.backend = {
    load(onLoad, onError) {
      let URL = `https://21.javascript.pages.academy/code-and-magick/data`;
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(`GET`, URL);
      xhr.send();
    },


    save(data, onLoad, onError) {
      let URL = `https://21.javascript.pages.academy/code-and-magick`;
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });

      xhr.open(`POST`, URL);
      xhr.send(data);
    }
  };
})();
