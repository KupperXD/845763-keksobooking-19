'use strict';

(function () {
  var minPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  }
  var form = document.querySelector('.ad-form');
  var selectRoom = form.querySelector('#room_number');
  var selectGuests = form.querySelector('#capacity');
  var headingInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var typeHousing = form.querySelector('#type');
  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');
  var buttonSumbit = form.querySelector('.ad-form__submit');

  var getValidQuantityRooms = function () {
    var roomsNumber = Number(selectRoom.value);
    var guestsNumber = Number(selectGuests.value);

    if (roomsNumber === 100 && guestsNumber !== 0) {
      selectRoom.setCustomValidity('100 комнат не для гостей!');
    } else if (roomsNumber !== 100 && guestsNumber === 0) {
      selectRoom.setCustomValidity('Для 0 гостей подходит только 100 комнат');
    } else if (roomsNumber < guestsNumber) {
      selectRoom.setCustomValidity('Нужно больше комнат для ' + guestsNumber + ' гостей!');
    } else {
      selectRoom.setCustomValidity('');
    }
  };

  var getValidHeading = function (evt) {
    if (headingInput.validity.tooShort) {
      headingInput.setCustomValidity('Заголовок должен быть минимум из 30 символов');
    } else if (headingInput.validity.tooLong) {
        headingInput.setCustomValidity('Слишком длинный заголовок! Значение должно быть не более 100 символов!');
    } else if (headingInput.validity.valueMissing) {
        headingInput.setCustomValidity('Друг нужно бы заполнить заголовок!');
    }
     else {
      headingInput.setCustomValidity('');
    }
  };

  var getValidMinPrice = function () {
    var value = typeHousing.value;
    priceInput.min = minPriceMap[value].toString();
    priceInput.placeholder = minPriceMap[value].toString();
  };

  var inputPriceHandler = function () {
    var price = Number(priceInput.value);
    if (price < minPriceMap[typeHousing.value]) {
      priceInput.setCustomValidity('Цена должна быть не меньше чем ' + minPriceMap[typeHousing.value]);
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var getTimeValid = function (evt) {
    var target = evt.target;
    var timeIn = timeInField.value;
    var timeOut = timeOutField.value;
    switch (target.id) {
      case 'timein':
        timeOutField.value = timeIn;
        break;
      case 'timeout':
        timeInField.value = timeOut;
        break;
    }
  };

  priceInput.addEventListener('input', inputPriceHandler);
  headingInput.addEventListener('input', getValidHeading);
  timeInField.addEventListener('change', getTimeValid);
  timeOutField.addEventListener('change', getTimeValid);
  typeHousing.addEventListener('change', getValidMinPrice);
  selectRoom.addEventListener('change', getValidQuantityRooms);
  selectGuests.addEventListener('change', getValidQuantityRooms);

  var successHandler = function () {
    window.popup.addSuccess();
    window.map.disabledPage();
    form.reset();
  };

  var errorHandler = function (message) {
    window.popup.addError(message);
    form.reset();
  };

  buttonSumbit.addEventListener('click', getValidQuantityRooms);

  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  form.addEventListener('reset', function () {
    window.map.disabledPage();
  });
})();
