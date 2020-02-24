'use strict';

(function () {
  var selectRoom = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');
  var form = document.querySelector('.ad-form');

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

  var successHandler = function () {
    window.map.disabledPage();
    window.popup.addSuccess();
    form.reset();
  };

  var errorHandler = function () {
    window.popup.addError();
  };

  form.addEventListener('submit', function (evt) {
    getValidQuantityRooms();
    window.server.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  form.addEventListener('reset', function () {
    window.map.disabledPage();
  });
})();
