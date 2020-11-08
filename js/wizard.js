'use strict';

(function () {
  const COAT_COLORS = [
    `rgb(146, 100, 161)`,
    `rgb(215, 210, 55)`,
    `rgb(241, 43, 107)`,
    `rgb(101, 137, 164)`,
    `rgb(0, 0, 0)`,
    `rgb(215, 210, 55)`,
    `rgb(56, 159, 117)`,
    `rgb(241, 43, 107)`
  ];

  const EYES_COLORS = [
    `red`,
    `orange`,
    `yellow`,
    `green`,
    `lightblue`,
    `blue`,
    `purple`
  ];


  let wizard = {
    onEyesChange() {},
    onCoatChange() {}
  };

  let wizardElement = document.querySelector(`.setup-wizard`);

  let wizardCoatElement = wizardElement.querySelector(`.wizard-coat`);
  wizardCoatElement.addEventListener(`click`, function () {
    let newColor = window.util.getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = newColor;

    wizard.onCoatChange(newColor);
  });

  let wizardEyesElement = wizardElement.querySelector(`.wizard-eyes`);
  wizardEyesElement.addEventListener(`click`, function () {
    let newColor = window.util.getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = {
    setCoatChangeHandler(cb) {
      wizard.onCoatChange = cb;
    },

    setEyesChangeHandler(cb) {
      wizard.onEyesChange = cb;
    }
  };
})();
