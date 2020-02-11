'use strict';

(function () {
  var fieldSetsOnForm = document.querySelectorAll('fieldset');
  var filterMap = document.querySelectorAll('.map__filter');
  var selectRoom = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var adressInput = document.querySelector('#address');
  var mainMapPin = document.querySelector('.map__pin--main');

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
    var coordinateX = coordinate.x + window.const.HALF_SIZE_PIN;
    var coordinateY = coordinate.y + window.const.HALF_SIZE_PIN + indentation;


    adressInput.value = coordinateX + ', ' + coordinateY;
  };

  getDisabledForm(fieldSetsOnForm);
  getDisabledForm(filterMap);
  writeInputAdress(0);

  var getValidQuantityRooms = function () {
    var roomsNumber = Number(selectRoom.value);
    var guestsNumber = Number(selectGuests.value);

    if (roomsNumber === 100 && guestsNumber !== 0) {
      selectRoom.setCustomValidity('100 комнат не для гостей!');
    } else if (roomsNumber < guestsNumber) {
      selectRoom.setCustomValidity('Нужно больше комнат для ' + guestsNumber + ' гостей!');
    } else {
      selectRoom.setCustomValidity('');
    }
  };

  selectRoom.addEventListener('change', getValidQuantityRooms);
  selectGuests.addEventListener('change', getValidQuantityRooms);

  window.form = {
    getDisabledForm: getDisabledForm,
    deletDisabledForm: deletDisabledForm,
    writeInputAdress: writeInputAdress
  };
})();
