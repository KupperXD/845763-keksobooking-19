'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var removeClass = function (block, nameClass) {
    document.querySelector(block).classList.remove(nameClass);
  };

  var addClass = function (block, nameClass) {
    document.querySelector(block).classList.add(nameClass);
  };

  var debounce = function (fn) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fn.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    removeClass: removeClass,
    addClass: addClass,
    debounce: debounce,
  };
})();
