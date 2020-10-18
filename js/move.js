'use strict';

(function () {
  let userDialog = document.querySelector(`.setup`);
  let handleDialog = userDialog.querySelector(`.upload`);

  handleDialog.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.startCoordDefault = startCoords;

    let dragged = false;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + `px`;
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + `px`;
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          handleDialog.removeEventListener(`click`, onClickPreventDefault);
        };
        handleDialog.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
