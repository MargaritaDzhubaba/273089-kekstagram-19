'use strict';

// validation.js
(function () {
  var MAX_SYMBOLS = 20;
  var MAX_HASHTAGS = 5;
  var MAX_COMMENT_LENGTH = 140;

  var inputHashtag = document.querySelector('.text__hashtags');

  var showInputError = function (condition) {
    return condition ? (inputHashtag.style = 'border: 3px solid tomato') : (inputHashtag.style = 'border: none');
  };

  inputHashtag.addEventListener('input', function (evt) {
    var invalidMessages = [];
    var target = evt.target;

    var inputText = inputHashtag.value.toLowerCase().trim();
    var inputArrays = inputText.split(' ');

    if (!inputText.length) {
      target.setCustomValidity('');
      inputHashtag.style = 'border: none';
      return;
    }

    if (inputArrays.length === 0) {
      return;
    }

    for (var i = 0; i < inputArrays.length; i++) {
      var isAllStartWithHash = inputArrays[i].indexOf('#') === 0;
      var isOnlyLaticeHash = inputArrays[i] === '#';
      var isManySymbolsInHash = inputArrays[i].length > MAX_SYMBOLS;
      var isNoSpaceInHash = inputArrays[i].indexOf('#', 1) >= 1;
      var isSomeSpecialSymbols = inputArrays[i].slice(1).match(/^[a-zA-Z0-9а-яА-Я]+$/);
      var isRepeatHashing = inputArrays.indexOf(inputArrays[i], inputArrays[1]) >= inputArrays[1]; // У меня не получается указать индекс, с которого надо начинать поиск идентичного хештега
      // console.log(inputArrays); массив, который перебираем
      // console.log(inputArrays[i]); элемент, который ищем
      // console.log(inputArrays[i + 1]); элемент, с которого начинаем поиски
    }

    if (isRepeatHashing) {
      invalidMessages.push('Один и тот же хэш-тег не может быть использован дважды!');
    }

    if (!isAllStartWithHash) {
      invalidMessages.push('Хэштэг должен начинаться с символа #');
    }

    if (isOnlyLaticeHash) {
      invalidMessages.push('Хэштэг не должен состоять только из "#"!');
    }

    if (inputArrays.length > MAX_HASHTAGS) {
      invalidMessages.push('Не более пяти хэштэгов!');
    }

    if (isManySymbolsInHash) {
      invalidMessages.push('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
    }

    if (isNoSpaceInHash) {
      invalidMessages.push('Хэштэги должны разделяться пробелами!');
    }

    if (!isSomeSpecialSymbols) {
      invalidMessages.push('Хэштэг не может содержать спецсимволы!');
    }

    target.setCustomValidity(invalidMessages.join('\n'));

    showInputError(invalidMessages.length > 0);
  });

  var textDescription = document.querySelector('.text__description');

  textDescription.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > MAX_COMMENT_LENGTH) {
      target.setCustomValidity('Комментарий не должен быть длиннее ' + MAX_COMMENT_LENGTH + '-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
})();
