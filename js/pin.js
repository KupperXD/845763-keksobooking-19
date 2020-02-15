'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (obj) {
    var advertElement = templatePin.cloneNode(true);
    var avatarImage = advertElement.querySelector('img');
    var widthPin = 50 / 2;
    var heightPin = 70;

    advertElement.style.left = (obj.location.x - widthPin) + 'px';
    advertElement.style.top = (obj.location.y - heightPin) + 'px';
    avatarImage.src = obj.author.avatar;
    avatarImage.alt = obj.offer.title;

    return advertElement;
  };

  var pinSucessHandler = function (data) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPin(data[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    pinSucessHandler: pinSucessHandler
  };
})();
