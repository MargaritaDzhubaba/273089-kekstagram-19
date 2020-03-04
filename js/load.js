'use strict';

// load.js

(function () {
  var STATUS = 200;
  var TIMEOUT = 10000;

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT;

  var createRequest = function (data, onSuccess, onError, method, url) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.upload = createRequest;
})();
