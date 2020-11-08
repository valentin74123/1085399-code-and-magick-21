'use strict';

(function () {
  let MAX_SIMILAR_WIZARD_COUNT = 4;

  let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).
  content.querySelector(`.setup-similar-item`);

  let renderWizard = function (wizard) {
    let element = similarWizardTemplate.cloneNode(true);

    let wizardElement = element.querySelector(`.wizard`);

    element.querySelector(`.setup-similar-label`).innerText = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return element;
  };

  let similar = document.querySelector(`.setup-similar`);
  let similarList = document.querySelector(`.setup-similar-list`);

  window.render = function (wizards) {
    const takeNumber = wizards.length > MAX_SIMILAR_WIZARD_COUNT
      ? MAX_SIMILAR_WIZARD_COUNT
      : wizards.length;

    similarList.innerHTML = ``;

    for (let i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(wizards[i]));
    }

    similar.classList.remove(`hidden`);
  };
})();
