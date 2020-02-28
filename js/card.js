'use strict';

(function () {
  var typeHouseMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var map = document.querySelector('.map');
  var mapFiltres = document.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

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

   var getFeaturesPopup = function (block, array) {
    var fragment = document.createDocumentFragment();
    block.innerHTML = '';
    if (array.length === 0) {
      block.classList.add('hidden');
    } else {
        array.forEach(function (item) {
          var featuresItem = document.createElement('li');
          featuresItem.className = 'popup__feature popup__feature--' + item;
          fragment.appendChild(featuresItem);
        });
        block.appendChild(fragment);
    }
  };

  var getPhotoPopup = function (block, array) {
    var fragment = document.createDocumentFragment();
    block.innerHTML = '';
    if (array.length === 0) {
      block.classList.add('hidden');
    } else {
        array.forEach(function (item) {
          var photoItem = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode();
          photoItem.src = item;
          fragment.appendChild(photoItem);
        });
        block.appendChild(fragment);
    }
  };

  var checkValue = function (value, block) {
    if (value === undefined) {
      block.classList.add('hidden');
      return '';
    } else {
      return value;
    };
  };

  var removeCard = function () {
    var cardMap = map.querySelector('.map__card');
    if (cardMap !== null) {
      cardMap.remove();
    }
  };

  var getPopup = function (obj) {
    var popupCard = templateCard.cloneNode(true);
    var popupTitle = popupCard.querySelector('.popup__title');
    var popupAdress = popupCard.querySelector('.popup__text--address');
    var popupPrice = popupCard.querySelector('.popup__text--price');
    var popupType = popupCard.querySelector('.popup__type');
    var popupCapacity = popupCard.querySelector('.popup__text--capacity');
    var popupCheck = popupCard.querySelector('.popup__text--time');
    var popupFeatures = popupCard.querySelector('.popup__features');
    var popupDescription = popupCard.querySelector('.popup__description');
    var popupPhotos = popupCard.querySelector('.popup__photos');
    var popupAvatar = popupCard.querySelector('.popup__avatar');
    var closeButton = popupCard.querySelector('.popup__close');
    popupTitle.textContent = checkValue(obj.offer.title, popupTitle);
    popupAdress.textContent = checkValue(obj.offer.adress, popupAdress);
    popupPrice.textContent = checkValue(obj.offer.price + '₽/ночь', popupPrice);
    popupType.textContent = checkValue(typeHouseMap[obj.offer.type], popupType);
    popupCapacity.textContent = checkValue(obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей', popupCapacity);
    popupCheck.textContent = checkValue('Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout, popupCheck);
    getFeaturesPopup(popupFeatures, obj.offer.features);
    popupDescription = checkValue(obj.offer.description, popupDescription);
    getPhotoPopup(popupPhotos, obj.offer.photos);
    popupAvatar.src = checkValue(obj.author.avatar, popupAvatar);
    closeButton.addEventListener('click', removeCard);

    return popupCard;
  };

  var escCardHandler = function (evt) {
    if (evt.key === window.constans.ESC_KEY) {
      removeCard();
      document.removeEventListener('keydown', escCardHandler);
    }
  };

  var insertElement = function (element) {
    map.insertBefore(element, mapFiltres);
    document.addEventListener('keydown', escCardHandler);
  };

  var renderCard = function (obj) {
    var pinCard = getPopup(obj);
    removeCard();
    insertElement(pinCard);
  };


  window.card = {
    render: renderCard,
    delete: removeCard
  };
})();
