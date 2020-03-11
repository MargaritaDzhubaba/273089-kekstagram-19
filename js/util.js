'use strict';

// util.js
(function () {
  var DEBOUNCE_INTERVAL = 500;

  // Функция генерирующая случайное число из диапазона
  var generateRandomDiapason = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Функция генерирующая случайное число
  var getRundomNumber = function (number) {
    return Math.floor(Math.random() * number);
  };

  // Функция устранение "дребезга"
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    getRundomNumber: getRundomNumber,
    generateRandomDiapason: generateRandomDiapason,
    debounce: debounce
  };
})();
