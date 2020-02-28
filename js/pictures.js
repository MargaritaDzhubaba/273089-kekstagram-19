'use strict';

// pictures.js
(function () {
  var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var COMMENT_NAMES = ['Жерар', 'Иннокентий', 'Изольда', 'Клара', 'Регина', 'Йозеф'];
  var PICTURE_COUNT = 25;
  var AVATAR_NUMBER = 6;

  var containerOfPictures = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var generateComments = function (count) {
    var comments = [];
    for (var i = 0; i < count; i++) {
      var randomCommentMessage = COMMENT_MESSAGES[window.util.getRundomNumber(COMMENT_MESSAGES.length)];// Комментирии к фотографии
      var randomCommentNames = COMMENT_NAMES[window.util.getRundomNumber(COMMENT_NAMES.length)];
      var randomCommentAvatar = 'img/avatar-' + window.util.generateRandomDiapason(1, AVATAR_NUMBER) + '.svg';
      comments.push({
        avatar: randomCommentAvatar,
        message: randomCommentMessage,
        name: randomCommentNames
      });
    }
    return comments;
  };

  var createPicturesData = function (pictureCount) {
    var result = [];
    for (var i = 0; i < pictureCount; i++) {
      var urlPicture = 'photos/' + window.util.generateRandomDiapason(1, pictureCount) + '.jpg';// Находим адрес фото
      var randomLikes = window.util.generateRandomDiapason(15, 200);// Генерируем рандомное количество лайков
      result.push({
        id: i,
        url: urlPicture,
        description: 'Описание фотографии ',
        likes: randomLikes,
        comments: generateComments(window.util.generateRandomDiapason(i, pictureCount))
      });
    }
    return result;
  };

  var pictures = createPicturesData(PICTURE_COUNT);

  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');
    var pictureComments = pictureElement.querySelector('.picture__comments');
    var pictureLikes = pictureElement.querySelector('.picture__likes');

    pictureImg.src = picture.url;
    pictureLikes.textContent = picture.likes;
    pictureComments.textContent = picture.comments.length;
    pictureImg.dataset.id = picture.id;

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

  var newComments = document.querySelector('.social__comments');
  var newComment = newComments.querySelector('.social__comment');

  var renderComment = function (picture) {
    var commentElement = newComment.cloneNode(true);

    var socialCommentImg = newComments.querySelector('.social__picture');
    var socialText = newComments.querySelector('.social__text');

    socialCommentImg.src = picture.avatar;
    socialCommentImg.alt = picture.name;
    socialText.textContent = picture.message;

    return commentElement;
  };

  window.pictures = {
    createPicturesData: createPicturesData,
    renderComment: renderComment,
    pictures: pictures
  };
})();
