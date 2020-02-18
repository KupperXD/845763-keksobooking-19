'use strict';

(function () {
  var HEIGHTPIN = 70;
  var WIDTHPIN = 50;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');


  var addPin = function (obj) {
    var advertElement = templatePin.cloneNode(true);
    var avatarImage = advertElement.querySelector('img');
    var widthIndent = WIDTHPIN / 2;

    advertElement.style.left = (obj.location.x - widthIndent) + 'px';
    advertElement.style.top = (obj.location.y - HEIGHTPIN) + 'px';
    avatarImage.src = obj.author.avatar;
    avatarImage.alt = obj.offer.title;

    return advertElement;
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(addPin(data[i]));
    }
    mapPins.appendChild(fragment);
  };

  var delet = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  window.pin = {
    render: render,
    delet: delet
  };

})();
