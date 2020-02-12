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

  var renderPin = function (data, block) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderAdvert(data[i]));
    }
    block.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin
  };
})();
