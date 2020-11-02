'use strict';
(function () {


  let WIZARD_COATS = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`
  ];

  let WIZARD_EYES = [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`
  ];

  let WIZARD_FIREBALLS = [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`
  ];

  let MIN_NAME_LENGTH = 2;
  let MAX_NAME_LENGTH = 25;


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


  (function () {
    let setupWizard = document.querySelector(`.setup-wizard`);
    let coatWizard = setupWizard.querySelector(`.wizard-coat`);
    let eyesWizard = setupWizard.querySelector(`.wizard-eyes`);
    let fireball = document.querySelector(`.setup-fireball-wrap`);

    window.chengeColors(coatWizard, WIZARD_COATS, `fill`, `coat-color`);
    window.chengeColors(eyesWizard, WIZARD_EYES, `fill`, `eyes-color`);
    window.chengeFireballColors(fireball, WIZARD_FIREBALLS);
  })();


  let similarListElement = document.querySelector(`.setup-similar-list`);
  let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).
  content.querySelector(`.setup-similar-item`);


  let renderWizard = function (wizard) {
    let wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };


  let MAX_SIMILAR_WIZARD_COUNT = 4;

  let successHandler = function (wizards) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  let errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorHandler);


  let form = userDialog.querySelector(`.setup-wizard-form`);
  let submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add(`hidden`);
    }, errorHandler);
    evt.preventDefault();
  };
  form.addEventListener(`submit`, submitHandler);
})();
