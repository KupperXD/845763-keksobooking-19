'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200,
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    403: 'Доступ запрещен',
    404: 'Ничего не найдено',
    500: 'Внутренняя ошибка сервера'
  };

  var createRequest = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Код ошибки: ' + xhr.status + ' ' + StatusCode[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Ошибка сосединения! Проверь интэрнэт друг!');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Прошло' + xhr.timeout + 'мс. Попробуй позже');
    });

    return xhr;
  };

  var load = function (successHandler, errorHandler) {
    var xhr = createRequest(successHandler, errorHandler);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = createRequest(successHandler, errorHandler);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };
})();
