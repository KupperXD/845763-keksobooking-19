'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var removePopup = function () {
    var popupSuccess = document.querySelector('.success');
    var popupError = document.querySelector('.error');

    if (popupSuccess !== null) {
      popupSuccess.remove();
    } else if (popupError !== null) {
      popupError.remove();
    }
    document.removeEventListener('keydown', escPopupHandler);
  };

  var escPopupHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      removePopup();
    }
  };

  var clickPopupHandler = function () {
    removePopup();
    document.removeEventListener('click', clickPopupHandler);
  };

  var addSuccess = function () {
    var success = successTemplate.cloneNode(true);
    main.prepend(success);
    document.addEventListener('keydown', escPopupHandler);
    document.addEventListener('click', clickPopupHandler);
  };

  var addError = function () {
    var error = errorTemplate.cloneNode(true);
    main.prepend(error);
    document.addEventListener('keydown', escPopupHandler);
    document.addEventListener('click', clickPopupHandler);
  };

  window.popup = {
    addSuccess: addSuccess,
    addError: addError
  };

})();
