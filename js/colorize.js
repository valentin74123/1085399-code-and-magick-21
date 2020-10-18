'use strict';

(function () {
  window.chengeColors = function (obj, arr, styleName, nameInput) {
    obj.addEventListener(`click`, function () {
      obj.style[styleName] = arr[Math.floor(Math.random() * arr.length)];
      document.getElementsByName(nameInput)[0].value = obj.style[styleName];
    });
  };

  function getHexRGBColor(color) {
    color = color.replace(/\s/g, ``);
    let aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);

    if (aRGB) {
      color = ``;
      for (let i = 1; i <= 3; i++) {
        color += Math.round((aRGB[i][aRGB[i].length - 1] === `%` ? 2.55 : 1)
        * parseInt((aRGB[i]), 10)).toString(16).replace(/^(.)$/, `0$1`);
      }
    } else {
      color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, `$1$1$2$2$3$3`);
    }
    return color;
  }

  window.chengeFireballColors = function (obj, arr) {
    obj.addEventListener(`click`, function () {
      obj.style.backgroundColor = arr[Math.floor(Math.random() * arr.length)];
      document.getElementsByName(`fireball-color`)[0].value = `#` + getHexRGBColor(obj.style.backgroundColor);
    });
  };
})();
