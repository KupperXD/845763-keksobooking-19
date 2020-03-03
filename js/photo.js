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
  var previewPhoto = document.querySelector('.ad-form__photo');
  var previewAvatar = document.querySelector('.ad-form-header__preview');
  var fileAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
  var filePhoto = document.querySelector('.ad-form__upload input[type=file]');

  var getImg = function (photo, preview, width, height) {
    var img = document.createElement('img');
    img.src = photo;
    img.width = width;
    img.height = height;
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

  var avatarChangeHandler = function () {
    getPhoto(fileAvatar, previewAvatar, imgSizeMap.avatar.width, imgSizeMap.avatar.height);
  };

  var photoChangeHandler = function () {
    getPhoto(filePhoto, previewPhoto, imgSizeMap.photo.width, imgSizeMap.photo.height);
  };

  fileAvatar.addEventListener('change', avatarChangeHandler);
  filePhoto.addEventListener('change', photoChangeHandler);
})();
