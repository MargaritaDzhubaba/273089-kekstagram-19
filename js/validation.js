'use strict';

// validation.js
(function () {
  var MAX_SYMBOLS = 20;
  var MAX_HASHTAGS = 5;
  var MAX_COMMENT_LENGTH = 140;

  var inputHashtag = document.querySelector('.text__hashtags');

  inputHashtag.addEventListener('input', function (evt) {
    var invalidMessage = [];
    var target = evt.target;

    var inputText = inputHashtag.value.toLowerCase().trim();

    var inputArray = inputText.split(' ');

    if (!inputText.length) {
      target.setCustomValidity('');
      return;
    }

    var isAllStartWithHash = inputArray.every(function (item) {
      return item.indexOf('#') === 0;
    });

    var isOnlyLaticeHash = inputArray.every(function (item) {
      return item === '#';
    });

    var isManySymbolsInHash = inputArray.some(function (item) {
      return item.length > MAX_SYMBOLS;
    });

    var isNoSpaceInHash = inputArray.every(function (item) {
      return item.indexOf('#', 1) >= 1;
    });

    var isSomeSpecialSymbols = inputArray.every(function (item) {
      return item.slice(1).match(/^\w+$/);
    });

    var isRepeatHashing = inputArray.some(function (item, i, arr) {
      return arr.indexOf(item, i + 1) >= i + 1;
    });

    if (isRepeatHashing) {
      invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды!');
    }

    if (inputArray.length === 0) {
      return;
    }

    if (!isAllStartWithHash) {
      invalidMessage.push('Хэштэг должен начинаться с символа #');
    }

    if (isOnlyLaticeHash) {
      invalidMessage.push('Хэштэг не должен состоять только из "#"!');
    }

    if (inputArray.length > MAX_HASHTAGS) {
      invalidMessage.push('Не более пяти хэштэгов!');
    }

    if (isManySymbolsInHash) {
      invalidMessage.push('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
    }

    if (isNoSpaceInHash) {
      invalidMessage.push('Хэштэги должны разделяться пробелами!');
    }

    if (!isSomeSpecialSymbols) {
      invalidMessage.push('Хэштэг не может содержать спецсимволы!');
    }

    target.setCustomValidity(invalidMessage.join('\n'));
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
