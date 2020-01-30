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

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

//Определяет рандомный заголовок.
var getTitle = function (titles) {
  var title = titles;
  return title[getRandom(0, title.length)]
};

//Возвращает рандомную цену в заданных значениях.
var getPrice = function (minPrice, maxPrice) {
  return getRandom(minPrice, maxPrice);
};

//Возвращает рандомное значение типа жилья
var getType = function () {
  var type = DATA_BASE.type;
  return type[getRandom(0, type.length)];
};

//Возвращает рандомное количество комнат
var getRooms = function (minRooms, maxRooms) {
  return getRandom(minRooms, maxRooms);
};

var getGuest = function () {
  var minGuest = DATA_BASE.guests.min;
  var maxGuest = DATA_BASE.guests.max;
  var totalGuest = getRandom(minGuest, maxGuest);
  return totalGuest;
};

var getCheckIn = function (time) {
  var timeIn = time;
  return timeIn[getRandom(0, time.length)];
};

var getCheckOut = function (time) {
  var timeOut = time;
  return timeOut[getRandom(0, time.length)]
};

var getFeatures = function (array) {
  var features = array;
  var featuresAmount = features.length;
  features.length = getRandom(1, featuresAmount);
  return features;
};

var getAdressX = function () {
  var xMin = DATA_BASE.location.x.min;
  var xMax = DATA_BASE.location.x.max;
  var adressX = getRandom(xMin, xMax);
  return adressX;
};

var getAdressY = function () {
  var yMin = DATA_BASE.location.y.min;
  var yMax = DATA_BASE.location.y.max;
  var adressY = getRandom(yMin, yMax);
  return adressY;
};

var avatarArray = [];

var getAvatarArray = function (amount) {
  for (var i = 0; i < amount; i++) {
    avatarArray[i] = '0' + (i + 1);
  }
  return avatarArray;
};

var getAvatarItem = function (array) {
  var randomItem = getRandom(0, array.length);
  var avatarItem = array.splice(randomItem, 1);
  return avatarItem[0];
};

var getAvatarLink = function (number) {
  return 'img/avatars/user' + number + '.png';
};

getAvatarArray(8);

console.log(getAvatarLink(getAvatarItem(avatarArray)));
