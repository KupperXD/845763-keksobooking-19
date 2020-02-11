'use strict';

(function () {
  var DATA_BASE = {
    amountAdvents: 8,
    title: ['Красивый домик', 'Просторная квартирка', 'Уютное жилище', 'Большие аппортаменты', 'Укромный уголог', 'Берлога любовников'],
    price: {
      min: 500,
      max: 250000
    },
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: {
      min: 1,
      max: 4
    },
    guests: {
      min: 1,
      max: 12
    },
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    location: {
      x: {
        min: 250,
        max: 980
      },
      y: {
        min: 130,
        max: 630
      }
    }
  };

  var renderArrayAvatarsLink = function () {
    var array = [];
    for (var i = 1; i <= DATA_BASE.amountAdvents; i++) {
      array.push('img/avatars/user0' + i + '.png');
    }

    return array;
  };

  var avatarsLinkArray = renderArrayAvatarsLink();

  var getAdvert = function () {
    var xAdress = window.utilits.getRandomValue(DATA_BASE.location.x.min, DATA_BASE.location.x.max);
    var yAdress = window.utilits.getRandomValue(DATA_BASE.location.y.min, DATA_BASE.location.y.max);

    return {
      author: {
        avatar: avatarsLinkArray.splice(window.utilits.getRandomValue(0, avatarsLinkArray.length - 1), 1).join(),
      },
      offer: {
        title: DATA_BASE.title[window.utilits.getRandomValue(0, DATA_BASE.title.length - 1)],
        adress: xAdress + ', ' + yAdress,
        price: window.utilits.getRandomValue(DATA_BASE.price.min, DATA_BASE.price.max),
        type: DATA_BASE.type[window.utilits.getRandomValue(0, DATA_BASE.type.length - 1)],
        rooms: window.utilits.getRandomValue(DATA_BASE.rooms.min, DATA_BASE.rooms.max),
        guests: window.utilits.getRandomValue(DATA_BASE.guests.min, DATA_BASE.guests.max),
        checkin: DATA_BASE.checkin[window.utilits.getRandomValue(0, DATA_BASE.checkin.length - 1)],
        checkout: DATA_BASE.checkout[window.utilits.getRandomValue(0, DATA_BASE.checkout.length - 1)],
        features: window.utilits.getRandomArray(DATA_BASE.features),
        description: '',
        photos: window.utilits.getRandomArray(DATA_BASE.photos),
      },
      location: {
        x: xAdress,
        y: yAdress,
      },
    };
  };

  window.data = {
    getAdvert: getAdvert,
    DATA_BASE: DATA_BASE
  };
})();
