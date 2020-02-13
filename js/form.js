'use strict';

(function () {
  var selectRoom = document.querySelector('#room_number');
  var selectGuests = document.querySelector('#capacity');

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
})();
