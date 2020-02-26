'use strict';

(function () {
  var minPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  }
  var selectRoom = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var form = document.querySelector('.ad-form');
  var headingInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var typeHousing = form.querySelector('#type');
  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');
  var submitButton = form.querySelector('.ad-form__submit');

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

  var changeFormValue = function () {
    timeInField.addEventListener('change', getTimeValid);
    timeOutField.addEventListener('change', getTimeValid);
    typeHousing.addEventListener('change', getValidMinPrice);
    selectRoom.addEventListener('change', getValidQuantityRooms);
    selectGuests.addEventListener('change', getValidQuantityRooms);
  };

  changeFormValue();

  var successHandler = function () {
    window.map.disabledPage();
    window.popup.addSuccess();
    form.reset();
  };

  var errorHandler = function () {
    window.popup.addError();
  };

  submitButton.addEventListener('click', function () {
    getValidHeading();
    inputPriceHandler();
  });

  form.addEventListener('submit', function (evt) {
    getValidHeading();
    inputPriceHandler();
    window.server.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  form.addEventListener('reset', function () {
    window.map.disabledPage();
  });
})();
