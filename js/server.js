'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var statusCode = {
    OK: 200
  };

  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler('Ошибка из за' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        successHandler(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };
})();
