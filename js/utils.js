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

  var removeClass = function (block, nameClass) {
    document.querySelector(block).classList.remove(nameClass);
  };

  var addClass = function (block, nameClass) {
    document.querySelector(block).classList.add(nameClass);
  };

  var debounce = function (fn, interval) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fn.apply(null, parameters);
      }, interval);
    };
  };

  window.utils = {
    getRandomValue: getRandomValue,
    getRandomArray: getRandomArray,
    removeClass: removeClass,
    addClass: addClass,
    debounce: debounce
  };
})();
