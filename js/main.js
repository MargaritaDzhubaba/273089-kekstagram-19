'use strict';

var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_NAMES = ['Жерар', 'Иннокентий', 'Изольда', 'Клара', 'Регина', 'Йозеф'];
var PICTURE_COUNT = 25;
var AVATAR_NUMBER = 6;

// Переменные для поиска шаблона
var containerOfPictures = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция генерирующая случайное число из диапазона
var generateRandomDiapason = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция генерирующая случайное число
var getRundomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var generateComments = function (count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    var randomCommentMessage = COMMENT_MESSAGES[getRundomNumber(COMMENT_MESSAGES.length)];// Комментирии к фотографии
    var randomCommentNames = COMMENT_NAMES[getRundomNumber(COMMENT_NAMES.length)];
    comments.push({
      avatar: 'img/avatar-' + generateRandomDiapason(1, AVATAR_NUMBER) + '.svg',
      message: randomCommentMessage,
      name: randomCommentNames
    });
  }
  return comments;
};

var createPicturesData = function (pictureCount) {
  var result = [];
  for (var i = 0; i < pictureCount; i++) {
    var urlPicture = 'photos/' + generateRandomDiapason(1, pictureCount) + '.jpg';// Находим адрес фото
    var randomLikes = generateRandomDiapason(15, 200);// Генерируем рандомное количество лайков
    result.push({
      url: urlPicture,
      description: 'Описание фотографии ',
      likes: randomLikes,
      comments: generateComments(generateRandomDiapason(i, pictureCount))
    });
  }
  return result;
};

var pictures = createPicturesData(PICTURE_COUNT);

var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};

var createFragment = function (fragment) {
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  return containerOfPictures.appendChild(fragment);
};

var fragmentDocument = document.createDocumentFragment();

createFragment(fragmentDocument);

// Переменные для поиска блока загрузки фотографии
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var formEditImage = document.querySelector('.img-upload__overlay');
var fieldUploadImage = document.querySelector('#upload-file');
var buttonCloseForm = document.querySelector('#upload-cancel');
var body = document.querySelector('body');
var inputHashtag = document.querySelector('input[name=hashtags]');

var onPopupCloseByEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

fieldUploadImage.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

buttonCloseForm.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var openPopup = function () {
  formEditImage.classList.remove('hidden');
  document.addEventListener('keydown', onPopupCloseByEscPress);
};

var closePopup = function () {
  formEditImage.classList.add('hidden');
  document.removeEventListener('keydown', onPopupCloseByEscPress);
};

fieldUploadImage.addEventListener('change', function () {
  body.classList.add('modal-open');
  openPopup();
});

buttonCloseForm.addEventListener('click', function () {
  body.classList.remove('modal-open');
  closePopup();
});

inputHashtag.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupCloseByEscPress);
});

inputHashtag.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupCloseByEscPress);
});

fieldUploadImage.value = '';

// Ловим событие на mouseup
var effectDirectory = document.querySelector('.img-upload__effect-level');
var effectLevel = document.getElementsByTagName('input[name=effect-level]');
var effectLine = effectDirectory.querySelector('.effect-level__line');
var effectDepth = effectDirectory.querySelector('.effect-level__depth');
var effectPin = effectDirectory.querySelector('.effect-level__pin');
// var effectsList = document.querySelector('.effects__list');
// var selectedEffect = effectsList.querySelector('.effects__radio:checked').value;

effectPin.addEventListener('mouseup', function () {
  var x = effectPin.offsetLeft; // Вычисляем положение ползунка относительно начала шкалы
  var computedStyle = getComputedStyle(effectLine); // Получаем стили шкалы
  var scaleWidth = parseInt(computedStyle.width, 10); // Узнаем длину шкалы

  effectLevel.value = positionPinPercent;
  var positionPinPercent = (Math.floor((x * 100) / scaleWidth)); // Определяем положение ползунка в % b меняем value

  effectDepth.style.width = positionPinPercent + '%'; // Заполняем шкалу на нужное количество %
});

// Изменение масштаба
var STEP = 25;
var MIN = 25;
var MAX = 100;

var controlSmaller = document.querySelector('.scale__control--smaller');
var controlBigger = document.querySelector('.scale__control--bigger');
var controlValue = document.querySelector('.scale__control--value');
var uploadImage = document.querySelector('div.img-upload__preview img');

var zoomImage = function (zoomValue, direction) {
  if (direction === 'zoomOut' && zoomValue < MIN) {
    uploadImage.style.transform = 'scale(' + MIN / 100 + ')';
    controlValue.value = '25%';
    return;
  }
  if (direction === 'zoomIn' && zoomValue >= MAX) {
    uploadImage.style.transform = 'scale(' + 1 + ')';
    controlValue.value = MAX + '%';
    return;
  }
  uploadImage.style.transform = 'scale(' + zoomValue / 100 + ')';
  controlValue.value = zoomValue + '%';
};

zoomImage(100);

controlSmaller.addEventListener('click', function () {
  zoomImage((parseInt(controlValue.value, 10) - STEP), 'zoomOut');
});
controlBigger.addEventListener('click', function () {
  zoomImage((parseInt(controlValue.value, 10) + STEP), 'zoomIn');
});

// Наложение эффекта на изображение
var effectRadios = document.querySelectorAll('.effects__radio');
// var uploadPreview = document.querySelector('.img-upload__preview');
// var uploadImage = document.querySelector('div.img-upload__preview img');

// Расчитываем насыщенность применяемого фильтра
var getValue = function (maxValue, minValue, neededValue) {
  return (((maxValue - minValue) * neededValue) / 100) + minValue;
};

var setImageFilter = function (effect, value) {
  var currentFilter = filters[effect];
  var calculateValueDepth = getValue(currentFilter.max, currentFilter.min, value);
  var resultFilterValue = currentFilter.type + '(' + calculateValueDepth + currentFilter.unit + ')';

  uploadImage.style.filter = resultFilterValue;
};

var changeEffect = function (effectValue) {
  effectPin.style.left = '100%'; // - добавить ползунку стиль left 100%
  effectDepth.style.width = '100%'; // - добавить шкале 100% effect-levev__depth
  effectLevel.value = '100'; // - в скрытый инпут положить значение 100

  zoomImage(100);

  uploadImage.className = '';
  uploadImage.classList.add('effects__preview--' + effectValue);

  if (effectValue === 'none') {
    effectDirectory.classList.add('hidden');
    uploadImage.style.filter = '';
  } else {
    effectDirectory.classList.remove('hidden');
  }
  setImageFilter(effectValue, 100);
};

for (var i = 0; i < effectRadios.length; i++) {
  var radio = effectRadios[i];

  radio.addEventListener('change', function (evt) {
    changeEffect(evt.target.value);
  });
}

// Фильтры
var filters = {
  chrome: {
    type: 'grayscale',
    min: 0,
    max: 1,
    unit: ''
  },
  sepia: {
    type: 'sepia',
    min: 0,
    max: 1,
    unit: ''
  },
  marvin: {
    type: 'invert',
    min: 0,
    max: 100,
    unit: '%'
  },
  phobos: {
    type: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  },
  heat: {
    type: 'brightness',
    min: 1,
    max: 3,
    unit: ''
  }
};

// Валидация поля с хештегами
var MAX_SYMBOLS = 20;
var MAX_HASHTAGS = 5;

// var inputHashtag = document.querySelector('.text__hashtags');

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
