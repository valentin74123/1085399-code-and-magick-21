'use strict';
(function () {


  const FIREBALLS_COLORS = [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`
  ];

  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;


  let userDialog = document.querySelector(`.setup`);


  //  USERNAME

  let usernameInput = document.querySelector(`.setup-user-name`);

  usernameInput.addEventListener(`input`, function () {
    let valueLength = usernameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      usernameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      usernameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
    } else {
      usernameInput.setCustomValidity(``);
    }

    usernameInput.reportValidity();
  });


  //   let setupWizard = document.querySelector(`.setup-wizard`);
  //   let coatWizard = setupWizard.querySelector(`.wizard-coat`);
  //   let eyesWizard = setupWizard.querySelector(`.wizard-eyes`);
  //

  //   window.chengeColors(coatWizard, WIZARD_COATS, `fill`, `coat-color`);
  //   window.chengeColors(eyesWizard, WIZARD_EYES, `fill`, `eyes-color`);


  let fireball = document.querySelector(`.setup-fireball-wrap`);
  window.chengeFireballColors(fireball, FIREBALLS_COLORS);


  let form = userDialog.querySelector(`.setup-wizard-form`);
  let submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add(`hidden`);
    }, window.util.createErrorMessage);
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);
})();
