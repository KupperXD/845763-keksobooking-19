'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_CLICK = 0;
  var INDENTATION_PIN = 52;
  var HALF_SIZE_PIN = 32;
  var MIN_Y = 46;
  var MAX_Y = 546;
  var MIN_X = -32;
  var MAX_X = 1167;
  var defaultCoords = {
    x: 570,
    y: 375
  };
  var mainMapPin = document.querySelector('.map__pin--main');
  var fieldSetsForm = document.querySelectorAll('fieldset');
  var filterMap = document.querySelectorAll('.map__filter');
  var adressInput = document.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');
  var active = false;

  var getDefaultCoords = function () {
    mainMapPin.style.left = defaultCoords.x + 'px';
    mainMapPin.style.top = defaultCoords.y + 'px';
  };

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
    mainMapPin.addEventListener('keydown', pinKeyDownHandler);
    getDefaultCoords();
    active = false;
  };

  var activePage = function () {
    window.utils.removeClass('.map', 'map--faded');
    window.utils.removeClass('.ad-form', 'ad-form--disabled');
    getDisabled(fieldSetsForm, false);
    getDisabled(filterMap, false);
    window.data.defaultAdvert();
    writeInputAdress(INDENTATION_PIN);
    mainMapPin.removeEventListener('keydown', pinKeyDownHandler);
    active = true;
  };

  var pinKeyDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      activePage();
    }
  };

  mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_CLICK) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var pinMoveMouseHandler = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var startCoordsPin = {
          x: mainMapPin.offsetLeft,
          y: mainMapPin.offsetTop
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        if (MIN_Y > startCoordsPin.y) {
          mainMapPin.style.top = MIN_Y + 'px';
        } else if (MAX_Y < startCoordsPin.y) {
          mainMapPin.style.top = MAX_Y + 'px';
        } else {
          mainMapPin.style.top = (startCoordsPin.y - shift.y) + 'px';
        }

        if (MIN_X > startCoordsPin.x) {
          mainMapPin.style.left = MIN_X + 'px';
        } else if (MAX_X < startCoordsPin.x) {
          mainMapPin.style.left = MAX_X + 'px';
        } else {
          mainMapPin.style.left = (startCoordsPin.x - shift.x) + 'px';
        }

        writeInputAdress(INDENTATION_PIN);
      };

      var pinUpMouseHandler = function (upEvt) {
        upEvt.preventDefault();
        if (!active) {
          activePage();
        }
        document.removeEventListener('mousemove', pinMoveMouseHandler);
        document.removeEventListener('mouseup', pinUpMouseHandler);
      };

      document.addEventListener('mousemove', pinMoveMouseHandler);
      document.addEventListener('mouseup', pinUpMouseHandler);
    }
  });

  mainMapPin.addEventListener('keydown', pinKeyDownHandler);
  filterForm.addEventListener('change', window.data.updateAdverts);

  window.map = {
    disabledPage: disabledPage
  };
})();
