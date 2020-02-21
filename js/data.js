'use strict';

(function () {

  var adverts = [];

  var successHandler = function (data) {
    adverts = data;
    window.pin.render(window.filter.getFilterData(adverts));
  };

  var errorHandler = function (message) {
    window.popup.addError();
    var errorMessage = document.querySelector('.error__message');
    errorMessage.textContent = message;
    window.map.disabledPage();
  };

  var defaultAdvert = function () {
    window.server.load(successHandler, errorHandler);
  };

  var updateAdverts = function () {
    window.pin.delet();
    window.pin.render(window.filter.getFilterData(adverts));
  };


  window.data = {
    defaultAdvert: defaultAdvert,
    updateAdverts: updateAdverts
  };

})();
