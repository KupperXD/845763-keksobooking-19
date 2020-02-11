'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = document.querySelector('.map__pin--main');
  var fieldSetsOnForm = document.querySelectorAll('fieldset');
  var filterMap = document.querySelectorAll('.map__filter');

  var activPage = function () {
    window.utilits.removeClass('.map', 'map--faded');
    window.utilits.removeClass('.ad-form', 'ad-form--disabled');
    window.form.deletDisabledForm(fieldSetsOnForm);
    window.form.deletDisabledForm(filterMap);
    window.map.renderAdvertListOnMap(window.pin.advertList, mapPins);
    window.form.writeInputAdress(window.const.INDENTATION_PIN);
    mainMapPin.removeEventListener('mousedown', pinMouseDownHandler);
    mainMapPin.removeEventListener('keydown', pinKeyDownHandler);
  };
  var pinMouseDownHandler = function (evt) {
    if (evt.button === window.const.LEFT_MOUSE_CLICK) {
      activPage();
    }
  };

  var pinKeyDownHandler = function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      activPage();
    }
  };

  mainMapPin.addEventListener('mousedown', pinMouseDownHandler);
  mainMapPin.addEventListener('keydown', pinKeyDownHandler);
})();
