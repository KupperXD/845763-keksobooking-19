'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_CLICK = 0;
  var INDENTATION_PIN = 54;
  var HALF_SIZE_PIN = 32;


  var mainMapPin = document.querySelector('.map__pin--main');
  var fieldSetsForm = document.querySelectorAll('fieldset');
  var filterMap = document.querySelectorAll('.map__filter');
  var adressInput = document.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');


  var getDisabledForm = function (fieldset) {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = true;
    }
  };

  var deletDisabledForm = function (fieldset) {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
  };

  var getCoordinate = function () {
    var x = parseInt(mainMapPin.style.left, 10);
    var y = parseInt(mainMapPin.style.top, 10);

    return {
      x: x,
      y: y
    };
  };

  var writeInputAdress = function (indentation) {
    var coordinate = getCoordinate();
    var coordinateX = coordinate.x + HALF_SIZE_PIN;
    var coordinateY = coordinate.y + HALF_SIZE_PIN + indentation;

    adressInput.value = coordinateX + ', ' + coordinateY;
  };

  getDisabledForm(fieldSetsForm);
  getDisabledForm(filterMap);
  writeInputAdress(0);

  var disabledPage = function () {
    window.utils.addClass('.map', 'map--faded');
    window.utils.addClass('.ad-form', 'ad-form--disabled');
    window.pin.delet();
    getDisabledForm(fieldSetsForm);
    getDisabledForm(filterMap);
    writeInputAdress(0);
    mainMapPin.addEventListener('mousedown', pinMouseDownHandler);
    mainMapPin.addEventListener('keydown', pinKeyDownHandler);
  };

  var activPage = function () {
    window.utils.removeClass('.map', 'map--faded');
    window.utils.removeClass('.ad-form', 'ad-form--disabled');
    deletDisabledForm(fieldSetsForm);
    deletDisabledForm(filterMap);
    window.data.defaultAdvert();
    writeInputAdress(INDENTATION_PIN);
    mainMapPin.removeEventListener('mousedown', pinMouseDownHandler);
    mainMapPin.removeEventListener('keydown', pinKeyDownHandler);
  };

  var pinMouseDownHandler = function (evt) {
    if (evt.button === LEFT_MOUSE_CLICK) {
      activPage();
    }
  };

  var pinKeyDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      activPage();
    }
  };


  mainMapPin.addEventListener('mousedown', pinMouseDownHandler);
  mainMapPin.addEventListener('keydown', pinKeyDownHandler);
  filterForm.addEventListener('change', window.data.updateAdverts);

  window.map = {
    disabledPage: disabledPage
  };
})();
