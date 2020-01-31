'use strict';

var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_NAMES = ['Жерар', 'Иннокентий', 'Изольда', 'Клара', 'Регина', 'Йозеф'];
var PICTURE_COUNT = 25;
var AVATAR_NUMBER = 6;

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

var generatrComments = function (count) {
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
      comments: generatrComments(generateRandomDiapason(i, pictureCount))
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
