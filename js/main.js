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

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFiltres = document.querySelector('.map__filters-container');

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
  return document.querySelector(block).classList.remove(nameClassForRemove);
};

var renderAdvert = function (obj) {
  var advertElement = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
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

removeClass('.map', 'map--faded');
renderAdvertListOnMap(advertList, mapPins);

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
};

var getFeaturesPopup = function (block, array) {
  var fragment = document.createDocumentFragment();
  block.innerHTML = '';
  for ( var i = 0; i < array.length; i++ ) {
    var featuresElement = document.createElement('li');
    featuresElement.className = 'popup__feature popup__feature--' + array[i];
    fragment.appendChild(featuresElement);
  };
  block.appendChild(fragment);
};

var getPhotoPopup = function (block, array) {
  var fragment = document.createDocumentFragment();
  block.innerHTML = '';
  for ( var i = 0; i < array.length; i++) {
    var photoElement = document.createElement('img');
    photoElement.src = array[i];
    photoElement.setAttribute('width', '45');
    photoElement.setAttribute('height', '40');
    photoElement.setAttribute('alt', 'Фотография жилья');
    fragment.appendChild(photoElement);
  }
  block.appendChild(fragment);
};

var getPopup = function (obj) {
  var popupElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
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
  map.insertBefore(popupElement, mapFiltres);

  return popupElement;
};

getPopup(advertList[0]);


