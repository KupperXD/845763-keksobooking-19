'use strict';

(function () {
  var HEIGHTPIN = 70;
  var WIDTHPIN = 50;
  var ADVERT_MAX = 5;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var addPin = function (obj) {
    var advertElement = templatePin.cloneNode(true);
    var avatarImage = advertElement.querySelector('img');
    var widthIndent = WIDTHPIN / 2;
    var objLink = obj;

    advertElement.style.left = (obj.location.x - widthIndent) + 'px';
    advertElement.style.top = (obj.location.y - HEIGHTPIN) + 'px';
    avatarImage.src = obj.author.avatar;
    avatarImage.alt = obj.offer.title;

    advertElement.addEventListener('click', function () {
      window.card.render(objLink);
    });

    return advertElement;
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();

    data.length = (data.length > ADVERT_MAX) ? ADVERT_MAX : data.length;
    data.forEach(function (advert) {
      fragment.appendChild(addPin(advert));
    });

    mapPins.appendChild(fragment);
  };

  var removePin = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  window.pin = {
    render: render,
    delete: removePin
  };
})();
