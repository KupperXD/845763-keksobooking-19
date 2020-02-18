'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  var remove = function (popup) {
    return function () {
      document.querySelector(popup).remove();
    };
  };


  var removeSuccess = remove('.success');
  var removeError = remove('.error');

  var escSuccessHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      removeSuccess();
      document.removeEventListener('keydown', escSuccessHandler);
    }
  };

  var escErrorHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      removeError();
      document.removeEventListener('keydown', escErrorHandler);
    }
  };

  var addSuccess = function () {
    var success = successTemplate.cloneNode(true);
    main.prepend(success);
    document.addEventListener('keydown', escSuccessHandler);
    success.addEventListener('click', removeSuccess);
  };

  var addError = function () {
    var error = errorTemplate.cloneNode(true);
    main.prepend(error);
    document.addEventListener('keydown', escErrorHandler);
    error.addEventListener('click', removeError);
  };

  window.popup = {
    addSuccess: addSuccess,
    addError: addError
  };

})();
