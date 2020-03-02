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
  var flag = false;

  var getDisabled = function (fieldset, value) {
    fieldset.forEach(function (item) {
      item.disabled = value;
    });
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

  getDisabled(fieldSetsForm, true);
  getDisabled(filterMap, true);
  writeInputAdress(0);

  var disabledPage = function () {
    window.utils.addClass('.map', 'map--faded');
    window.utils.addClass('.ad-form', 'ad-form--disabled');
    window.pin.delete();
    getDisabled(fieldSetsForm, true);
    getDisabled(filterMap, true);
    writeInputAdress(0);
    mainMapPin.addEventListener('mousedown', pinMouseDownHandler);
    mainMapPin.addEventListener('keydown', pinKeyDownHandler);
    flag = false;
  };

  var activePage = function () {
    window.utils.removeClass('.map', 'map--faded');
    window.utils.removeClass('.ad-form', 'ad-form--disabled');
    getDisabled(fieldSetsForm, false);
    getDisabled(filterMap, false);
    window.data.defaultAdvert();
    writeInputAdress(INDENTATION_PIN);
    mainMapPin.removeEventListener('keydown', pinKeyDownHandler);
    flag = true;
  };

  var pinMouseDownHandler = function (evt) {
    if (evt.button === LEFT_MOUSE_CLICK) {
      activePage();
    }
  };

  var pinKeyDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      activePage();
    }
  };

//  mainMapPin.addEventListener('mousedown', pinMouseDownHandler);
  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMoveMouseHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
    };

    var pinUpMouseHandler = function (upEvt) {
      upEvt.preventDefault();

      if (!flag) {
        activePage()
      };

      document.removeEventListener('mousemove', pinMoveMouseHandler);
      document.removeEventListener('mouseup', pinUpMouseHandler);
    };

    document.addEventListener('mousemove', pinMoveMouseHandler);
    document.addEventListener('mouseup', pinUpMouseHandler);

  });

  mainMapPin.addEventListener('keydown', pinKeyDownHandler);
  filterForm.addEventListener('change', window.data.updateAdverts);

  window.map = {
    disabledPage: disabledPage
  };
})();
