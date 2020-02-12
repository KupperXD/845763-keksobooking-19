'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

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

  window.pin = {
    renderAdvertListOnMap: renderAdvertListOnMap
  };
})();
