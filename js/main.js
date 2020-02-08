'use strict';

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

var ENTER_KEY = 'Enter';
var HEIGHT_IN_ACTIVE_PIN = 200;
var WIDTH_IN_ACTIVE_PIN = 200;
var HEIGHT_MAIN_PIN = 84;
var WIDTH_MAIN_PIN = 72;
var heightHalfInActivePin = HEIGHT_IN_ACTIVE_PIN / 2;
var widthHalfInActivePin = WIDTH_IN_ACTIVE_PIN / 2;
var widthHalfMainPin = WIDTH_MAIN_PIN / 2;

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFiltres = document.querySelector('.map__filters-container');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fieldSetsOnForm = document.querySelectorAll('fieldset');
var filterMap = document.querySelectorAll('.map__filter');
var mainMapPin = document.querySelector('.map__pin--main');
var adressInput = document.querySelector('#address');
var selectRoom = document.querySelector('#room_number');
var selectGuests = document.querySelector('#capacity');

var pinDownHandler = function () {
    removeClass('.map', 'map--faded');
    removeClass('.ad-form', 'ad-form--disabled');
    deletDisabledForm(fieldSetsOnForm);
    deletDisabledForm(filterMap);
    writeInputAdress(getCoordinate(widthHalfMainPin, HEIGHT_MAIN_PIN));
};

var getDisabledForm = function (form) {
  for (var i = 0; i < form.length; i++) {
    form[i].setAttribute('Disabled', 'Disabled');
  }
};

var deletDisabledForm = function (form) {
  for (var i = 0; i < form.length; i++) {
    form[i].removeAttribute('Disabled');
  }
};

mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.which == 1) {
    pinDownHandler();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
   pinDownHandler();
  }
});

var getCoordinate = function (width, height) {
  var coordinateX = parseInt(mainMapPin.style.left, 10);
  var coordinateY = parseInt(mainMapPin.style.top, 10);
  coordinateX += width;
  coordinateY += height;
  return coordinateX + ', ' + coordinateY;
};


var writeInputAdress = function (adress) {
  adressInput.value = adress;
};

getDisabledForm(fieldSetsOnForm);
getDisabledForm(filterMap);
writeInputAdress(getCoordinate(widthHalfInActivePin, heightHalfInActivePin));



var getRandomValue = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  var arrayRandom = array;

  return arrayRandom.slice(0, getRandomValue(1, arrayRandom.length));
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
  var xAdress = getRandomValue(DATA_BASE.location.x.min, DATA_BASE.location.x.max);
  var yAdress = getRandomValue(DATA_BASE.location.y.min, DATA_BASE.location.y.max);

  return {
    author: {
      avatar: avatarsLinkArray.splice(getRandomValue(0, avatarsLinkArray.length - 1), 1).join(),
    },
    offer: {
      title: DATA_BASE.title[getRandomValue(0, DATA_BASE.title.length - 1)],
      adress: xAdress + ', ' + yAdress,
      price: getRandomValue(DATA_BASE.price.min, DATA_BASE.price.max),
      type: DATA_BASE.type[getRandomValue(0, DATA_BASE.type.length - 1)],
      rooms: getRandomValue(DATA_BASE.rooms.min, DATA_BASE.rooms.max),
      guests: getRandomValue(DATA_BASE.guests.min, DATA_BASE.guests.max),
      checkin: DATA_BASE.checkin[getRandomValue(0, DATA_BASE.checkin.length - 1)],
      checkout: DATA_BASE.checkout[getRandomValue(0, DATA_BASE.checkout.length - 1)],
      features: getRandomArray(DATA_BASE.features),
      description: '',
      photos: getRandomArray(DATA_BASE.photos),
    },
    location: {
      x: xAdress,
      y: yAdress,
    },
  };
};

var getAdvertList = function () {
  var advertList = [];
  for (var i = 0; i < DATA_BASE.amountAdvents; i++) {
    advertList.push(getAdvert());
  }

  return advertList;
};

var advertList = getAdvertList();

var removeClass = function (block, nameClassForRemove) {
  document.querySelector(block).classList.remove(nameClassForRemove);
};

var renderAdvert = function (obj) {
  var advertElement = templatePin.cloneNode(true);
  var avatarImage = advertElement.querySelector('img');
  var widthPin = 50 / 2;
  var heightPin = 70 / 2;
  advertElement.style.left = (obj.location.x - widthPin) + 'px';
  advertElement.style.top = (obj.location.y - heightPin) + 'px';
  avatarImage.src = obj.author.avatar;
  avatarImage.alt = obj.offer.title;

  return advertElement;
};

var renderAdvertListOnMap = function (elementList, blockForAdd) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elementList.length; i++) {
    fragment.appendChild(renderAdvert(elementList[i]));
  }
  blockForAdd.appendChild(fragment);
};

// removeClass('.map', 'map--faded');
// renderAdvertListOnMap(advertList, mapPins);

var getTypeHousing = function (typeHouse) {
  switch (typeHouse) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
  return typeHouse;
};

/*var getFeaturesPopup = function (block, array) {
  var fragment = document.createDocumentFragment();
  block.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    var featuresElement = document.createElement('li');
    featuresElement.className = 'popup__feature popup__feature--' + array[i];
    fragment.appendChild(featuresElement);
  }
  block.appendChild(fragment);
};

var getPhotoPopup = function (block, array) {
  var fragment = document.createDocumentFragment();
  block.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    var photoElement = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode();
    photoElement.src = array[i];
    fragment.appendChild(photoElement);
  }
  block.appendChild(fragment);
};

var getPopup = function (obj) {
  var popupElement = templateCard.cloneNode(true);
  var popupTitle = popupElement.querySelector('.popup__title');
  var popupAdress = popupElement.querySelector('.popup__text--address');
  var popupPrice = popupElement.querySelector('.popup__text--price');
  var popupType = popupElement.querySelector('.popup__type');
  var popupCapacity = popupElement.querySelector('.popup__text--capacity');
  var popupCheck = popupElement.querySelector('.popup__text--time');
  var popupFeatures = popupElement.querySelector('.popup__features');
  var popupDescription = popupElement.querySelector('.popup__description');
  var popupPhotos = popupElement.querySelector('.popup__photos');
  var popupAvatar = popupElement.querySelector('.popup__avatar');
  popupTitle.textContent = obj.offer.title;
  popupAdress.textContent = obj.offer.adress;
  popupPrice.textContent = obj.offer.price + '₽/ночь';
  popupType.textContent = getTypeHousing(obj.offer.type);
  popupCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  popupCheck.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  getFeaturesPopup(popupFeatures, obj.offer.features);
  popupDescription.classList.add('hidden');
  getPhotoPopup(popupPhotos, obj.offer.photos);
  popupAvatar.src = obj.author.avatar;

  return popupElement;
};

var insertElement = function (element, block) {
  map.insertBefore(element, block);
};

insertElement(getPopup(advertList[0]), mapFiltres);*/

var roomsChangeHandler = function () {
  var roomsNumber = selectRoom.value;
  var guestsNumber = selectGuests.value;
  if (roomsNumber == 100) {
    selectGuests.selectedIndex = 3;
    selectRoom.setCustomValidity('');
  } else if (roomsNumber < guestsNumber) {
      selectRoom.setCustomValidity('Нужно больше комнат для ' + guestsNumber + ' гостей!');
  } else {
      selectRoom.setCustomValidity('');
  }
};

selectRoom.addEventListener('input', roomsChangeHandler);
