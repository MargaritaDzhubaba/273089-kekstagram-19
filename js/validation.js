'use strict';

// validation.js
(function () {
  var MAX_SYMBOLS = 20;
  var MAX_HASHTAGS = 5;
  var MAX_COMMENT_LENGTH = 140;
  var DEFAULT_STYLE_VALIDATION_INPUT = 'border: none';
  var ERROR_STYLE_VALIDATION_INPUT = 'border: 3px solid tomato';
  var TEXT_REGEXP = /^[a-zA-Z0-9а-яА-Я]+$/;

  var inputHashtag = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  var showInputError = function (condition) {
    return condition ? (inputHashtag.style = (ERROR_STYLE_VALIDATION_INPUT)) : (inputHashtag.style = (DEFAULT_STYLE_VALIDATION_INPUT));
  };

  inputHashtag.addEventListener('input', function (evt) {
    var invalidMessages = [];
    var target = evt.target;

    var inputText = inputHashtag.value.toLowerCase().trim();
    var tags = inputText.split(' ');

    target.setCustomValidity('');
    inputHashtag.style = (DEFAULT_STYLE_VALIDATION_INPUT);

    if (tags.length === 0) {
      return;
    }

    if (tags.length > MAX_HASHTAGS) {
      target.setCustomValidity('Не более пяти хэштэгов!');
      inputHashtag.style = (ERROR_STYLE_VALIDATION_INPUT);
    } else {
      target.setCustomValidity('');
      inputHashtag.style = (DEFAULT_STYLE_VALIDATION_INPUT);
    }

    for (var i = 0; i < tags.length; i++) {
      var currentTag = tags[i];
      var isFirstNotHash = !(currentTag.indexOf('#') === 0);
      var isOnlyHash = currentTag === '#';
      var isManySymbolsInHash = currentTag.length > MAX_SYMBOLS;
      var isNoSpaceInHash = currentTag.indexOf('#', 1) >= 1;
      var isTextIncorrect = TEXT_REGEXP.test(currentTag);
      var isRepeatHashing = tags.indexOf(currentTag, (i + 1)) !== -1;
      var hasError = isFirstNotHash || isOnlyHash || isManySymbolsInHash || isNoSpaceInHash || isTextIncorrect || isRepeatHashing;

      if (hasError) {
        if (isRepeatHashing) {
          invalidMessages.push('Один и тот же хэш-тег не может быть использован дважды!');
        }

        if (isFirstNotHash) {
          invalidMessages.push('Хэштэг должен начинаться с символа #');
        }

        if (isOnlyHash) {
          invalidMessages.push('Хэштэг не должен состоять только из "#"!');
        }

        if (isManySymbolsInHash) {
          invalidMessages.push('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
        }

        if (isNoSpaceInHash) {
          invalidMessages.push('Хэштэги должны разделяться пробелами!');
        }

        if (isTextIncorrect) {
          invalidMessages.push('Хэштэг не может содержать спецсимволы!');
        }

        target.setCustomValidity(invalidMessages.join(',\n'));

        showInputError(invalidMessages.length > 0);
        break;
      }
    }
  });

  textDescription.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > MAX_COMMENT_LENGTH) {
      target.setCustomValidity('Комментарий не должен быть длиннее ' + MAX_COMMENT_LENGTH + '-х символов');
      textDescription.style = (ERROR_STYLE_VALIDATION_INPUT);
    } else {
      target.setCustomValidity('');
      textDescription.style = (DEFAULT_STYLE_VALIDATION_INPUT);
    }
  });
})();
