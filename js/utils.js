'use strict';

(function () {
  var getRandomValue = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (array) {
    var arrayRandom = array;

    return arrayRandom.slice(0, getRandomValue(1, arrayRandom.length));
  };

  var removeClass = function (block, nameClassForRemove) {
    document.querySelector(block).classList.remove(nameClassForRemove);
  };

  window.utils = {
    getRandomValue: getRandomValue,
    getRandomArray: getRandomArray,
    removeClass: removeClass
  };
})();
