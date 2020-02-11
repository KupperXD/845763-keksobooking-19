'use strict';

(function () {
  var renderAdvertListOnMap = function (elementList, blockForAdd) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < elementList.length; i++) {
      fragment.appendChild(window.pin.renderAdvert(elementList[i]));
    }
    blockForAdd.appendChild(fragment);
  };

  window.map = {
    renderAdvertListOnMap: renderAdvertListOnMap
  };
})();
