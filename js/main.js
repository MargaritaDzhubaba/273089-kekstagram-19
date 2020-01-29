'use strict';

var commentMessages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var commentNames = ['Жерар', 'Иннокентий', 'Изольда', 'Клара', 'Регина', 'Йозеф'];
var PICTURE_COUNT = 25;

// Функция генерирующая случайное число из диапазона
var generateRandomDiapason = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция генерирующая случайное число
var getRundomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var createPicture = function (pictureCount) {// Создание массива из 25 элементов
  var result = [];
  for (var i = 0; i < pictureCount; i++) {
    var urlPicture = 'photos/' + generateRandomDiapason(1, 25) + '.jpg';// Находим адрес фото
    var randomLikes = generateRandomDiapason(15, 200);// Генерируем рандомное количество лайков
    var randomCommentMessage = commentMessages[getRundomNumber(commentMessages.length)];// Комментирии к фотографии
    var randomCommentNames = commentNames[getRundomNumber(commentNames.length)];
    result.push({
      url: urlPicture,
      description: '', // не нашла данных и инструкций, что здесь должно быть
      likes: randomLikes,
      comments: {
        avatar: 'img/avatar-' + generateRandomDiapason(1, 6) + '.svg',
        message: randomCommentMessage,
        name: randomCommentNames
      }
    });
  }
  return result;
};

var pictures = createPicture(PICTURE_COUNT);
