'use strict';

(function () {
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
        for (var i = 0; i < array.length; i++) {
          var featuresElement = document.createElement('li');
          featuresElement.className = 'popup__feature popup__feature--' + array[i];
          fragment.appendChild(featuresElement);
        }
        block.appendChild(fragment);
    }
  };

  var getPhotoPopup = function (block, array) {
    var fragment = document.createDocumentFragment();
    block.innerHTML = '';
    if (array.length === 0) {
      block.classList.add('hidden');
    } else {
        for (var i = 0; i < array.length; i++) {
          var photoElement = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode();
          photoElement.src = array[i];
          fragment.appendChild(photoElement);
        }
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
    var closeButton = popupElement.querySelector('.popup__close');
    popupTitle.textContent = checkValue(obj.offer.title, popupTitle);
    popupAdress.textContent = checkValue(obj.offer.adress, popupAdress);
    popupPrice.textContent = checkValue(obj.offer.price + '₽/ночь', popupPrice);
    popupType.textContent = checkValue(getTypeHousing(obj.offer.type), popupType);
    popupCapacity.textContent = checkValue(obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей', popupCapacity);
    popupCheck.textContent = checkValue('Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout, popupCheck);
    getFeaturesPopup(popupFeatures, obj.offer.features);
    popupDescription = checkValue(obj.offer.description, popupDescription);
    getPhotoPopup(popupPhotos, obj.offer.photos);
    popupAvatar.src = checkValue(obj.author.avatar, popupAvatar);
    closeButton.addEventListener('click', removeCard);

    return popupElement;
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
