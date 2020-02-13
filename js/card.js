'use strict';

(function () {
  /* var map = document.querySelector('.map');
  var mapFiltres = document.querySelector('.map__filters-container');

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

})();
