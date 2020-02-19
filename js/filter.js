'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var typeButton = mapFilter.querySelector('#housing-type');


  var filter = function (array) {
    var filterTypeHouse = array;
    var typeValue = typeButton.value;
    if (typeValue === 'any') {
      return filterTypeHouse;
    } else {
      filterTypeHouse = filterTypeHouse.filter(function (advert) {
        return advert.offer.type === typeValue;
      });
      return filterTypeHouse;
    }
  };

  window.filter = {
    filterType: filter
  };
})();
