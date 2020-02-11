'use strict';

(function () {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var getAdvertList = function () {
    var advertList = [];

    for (var i = 0; i < window.data.DATA_BASE.amountAdvents; i++) {
      advertList.push(window.data.getAdvert());
    }

    return advertList;
  };

  var advertList = getAdvertList();

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

  window.pin = {
    advertList: advertList,
    renderAdvert: renderAdvert
  };
})();
