'use strict';

(function () {
  window.upload = function (sucessHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      sucessHandler(xhr.response);
    });
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };
})();
