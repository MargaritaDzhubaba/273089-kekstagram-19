'use strict';

// util.js
(function () {
  // Функция генерирующая случайное число из диапазона
  var generateRandomDiapason = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Функция генерирующая случайное число
  var getRundomNumber = function (number) {
    return Math.floor(Math.random() * number);
  };

  window.util = {
    getRundomNumber: getRundomNumber,
    generateRandomDiapason: generateRandomDiapason
  };
})();
