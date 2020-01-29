'use strict';

var commentMessages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var commentNames = ['Жерар', 'Иннокентий', 'Изольда', 'Клара', 'Регина', 'Йозеф'];

// Функция генерирующая случайное число из диапазона
var generateRandomDiapason = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция генерирующая случайное число
var getRundomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

// Находим адрес фото
for (var i = 1; i <= 25; i++) {
  var urlPicture = 'photos/' + i + '.jpg';
}

// Формируем массив, список комментариев
var randomCommentMessage = commentMessages[getRundomNumber(commentMessages.length)];
var randomCommentNames = commentNames[getRundomNumber(commentNames.length)];
var comments = [
  {
    avatar: 'img/avatar-' + generateRandomDiapason(1, 6) + '.svg',
    message: randomCommentMessage,
    name: randomCommentNames
  }
];
