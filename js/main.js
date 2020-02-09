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
      description: 'Описание фотографии ' + i,
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

fieldUploadImage.value = '';

// Изменение масштаба
var STAP = 25;
var MIN = 25;
var MAX = 100;

var controlSmaller = document.querySelector('.scale__control--smaller');
var controlBigger = document.querySelector('.scale__control--bigger');
var controlValue = document.querySelector('.scale__control--value');
var uploadImage = document.querySelector('div.img-upload__preview img');

controlValue.value = '100%';
uploadImage.style.transform = 'scale(1)';

controlSmaller.addEventListener('click', function () {
  if ((parseInt(controlValue.value, 10) - STAP) < MIN) {
    uploadImage.style.transform = 'scale(' + MIN / 100 + ')';
    controlValue.value = '25%';
  } else {
    uploadImage.style.transform = 'scale(' + ((parseInt(controlValue.value, 10) - STAP) / 100) + ')';
    controlValue.value = (parseInt(controlValue.value, 10) - STAP) + '%';
  }
});

controlBigger.addEventListener('click', function () {
  if ((parseInt(controlValue.value, 10) + STAP) >= MAX) {
    uploadImage.style.transform = 'scale(' + 1 + ')';
    controlValue.value = MAX + '%';
  } else {
    uploadImage.style.transform = 'scale(' + ((parseInt(controlValue.value, 10) + STAP) / 100) + ')';
    controlValue.value = (parseInt(controlValue.value, 10) + STAP) + '%';
  }
});

// Наложение эффекта на изображение
var effect = document.querySelector('.img-upload__effect-level');
var effectLevel = document.getElementsByTagName('input[name=effect-level]');
var effectLine = effect.querySelector('.effect-level__line');
var effectPin = effect.querySelector('.effect-level__pin');
var effectDepth = effect.querySelector('.effect-level__depth');
var effectRadios = document.querySelectorAll('.effects__radio');
var uploadPreview = document.querySelector('.img-upload__preview');
// var uploadImage = document.querySelector('div.img-upload__preview img');

for (var i = 0; i < effectRadios.length; i++) {
  var radio = effectRadios[i];

  radio.addEventListener('change', function (evt) {
    // Сбрасываем ползунок в 100%
    effectPin.style.left = '100%'; // - добавить ползунку стиль left 100%
    effectDepth.style.width = '100%'; // - добавить шкале 100% effect-levev__depth
    effectLevel.value = '100%'; // - в скрытый инпут положить значение 100
    console.log(effectLevel);

    controlValue.value = '100%'; // - cбрасываем масштаб
    uploadImage.style.transform = 'scale(1)'; // - сбрасываем масштаб


    // добавление эффекта
    var effectValue = evt.target.value; // - получаем value из event (marvin)
    uploadImage.classList.remove('effects__preview--' + effectValue); // !НЕ ЗНАЮ КАК СБРОСИТЬ КЛАССЫ!
    uploadImage.classList.add('effects__preview--' + effectValue); // - добавить класс 'effect__preview--' + 'effect-value'
    console.log(uploadPreview);

    if (uploadImage.classList.contains('effects__preview--none')) {
      effectPin.classList.add('hidden'); // скрываем пин
      effectDepth.classList.add('hidden'); // - скрываем шкалу
    } else {
      effectPin.classList.remove('hidden'); // скрываем пин
      effectDepth.classList.remove('hidden');// - скрываем шкалу
    }
  });
}

// Ловим событие на mouseup,
effectPin.addEventListener('mouseup', function () {
  var x = effectPin.offsetLeft; // Вычисляем положение ползунка относительно начала шкалы
  console.log('Положение пина ' + x);

  var computedStyle = getComputedStyle(effectLine); // Получаем стили шкалы
  var scaleWidth = parseInt(computedStyle.width, 10); // Узнаем длину шкалы
  console.log('Длина шкалы ' + scaleWidth);

  var positionPinPercent = (Math.floor((x * 100) / scaleWidth)); // Определяем положение ползунка в %
  console.log('Положение пина в % ' + positionPinPercent);

  effectLevel.value = positionPinPercent; // Меняем value
  console.log('В инпут меняем value на ' + effectLevel.value);

  effectDepth.style.width = positionPinPercent + '%'; // Заполняем шкалу на нужное количество %
  console.log('Шкала заполнена(ширина желтой шкалы) на ' + effectDepth.style.width);

  // Расчитываем насыщенность применяемого фильтра
  var getValue = function (maxValue, minValue, neededValue) {
    return (((maxValue - minValue) * neededValue) / 100) + minValue;
  };
  var currentFilter = Object.values(filters); // !Вот тут у меня появляется доступ к массиву объектов, но не к самим объектам. Как до них добраться, чтобы работал current.Filter.min и т.д.!
  var calculateValueDepth = getValue(currentFilter.max, currentFilter.marvin, positionPinPercent);
  console.log('значение глубины эффекты ' + calculateValueDepth);
  var resultFilterValue = currentFilter.type + '(' + calculateValueDepth + currentFilter.unit + ')';

  uploadImage.style.filter = resultFilterValue;
});

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
