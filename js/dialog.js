'use strict';
(function () {
  let userDialog = document.querySelector(`.setup`);
  let setupClose = document.querySelector(`.setup-close`);
  let setupOpen = document.querySelector(`.setup-open`);

  let onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });
  setupOpen.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });
  setupClose.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  let openPopup = function () {
    userDialog.classList.remove(`hidden`);
    userDialog.style = window.startCoordDefault;
    document.addEventListener(`keydown`, onPopupEscPress);
  };
  let closePopup = function () {
    userDialog.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
  };
})();
