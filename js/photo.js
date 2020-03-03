'use strict';

(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var imgSizeMap = {
    avatar: {
      width: 40,
      height: 44
    },
    photo: {
      width: 70,
      height: 70
    }
  };
  var defaultAvatar = {
    img: 'img/muffin-grey.svg',
    alt: 'Аватар пользователя'
  };
  var previewPhoto = document.querySelector('.ad-form__photo');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var fileAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
  var filePhoto = document.querySelector('.ad-form__upload input[type=file]');

  var getImg = function (photo, preview, width, height, alt) {
    var img = document.createElement('img');
    img.src = photo;
    img.width = width;
    img.height = height;
    img.alt = alt;
    preview.textContent = '';
    preview.appendChild(img);
  };

  var getPhoto = function (input, preview, width, height) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPE.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        getImg(reader.result, preview, width, height);
      });
      reader.readAsDataURL(file);
    }
  };

  var getReset = function () {
    getImg(defaultAvatar.img, previewAvatar, imgSizeMap.avatar.width, imgSizeMap.avatar.height, defaultAvatar.alt);
    previewPhoto.textContent = '';
  };

  var avatarChangeHandler = function () {
    var alternative = 'Аватар Пользователя';
    getPhoto(fileAvatar, previewAvatar, imgSizeMap.avatar.width, imgSizeMap.avatar.height, alternative);
  };

  var photoChangeHandler = function () {
    var alternative = 'Фотография жилья';
    getPhoto(filePhoto, previewPhoto, imgSizeMap.photo.width, imgSizeMap.photo.height, alternative);
  };

  fileAvatar.addEventListener('change', avatarChangeHandler);
  filePhoto.addEventListener('change', photoChangeHandler);

  window.photo = {
    reset: getReset
  }
})();
