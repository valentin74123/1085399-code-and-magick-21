'use strict';

let WIZARD_NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

let WIZARD_SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

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

let WIZARDS_COUNT = 4;

//  SETUP OPEN/CLOSE

let userDialog = document.querySelector(`.setup`);
let setupOpen = document.querySelector(`.setup-open`);
let setupClose = document.querySelector(`.setup-close`);

let onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};
let openPopup = function () {
  userDialog.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};
let closePopup = function () {
  userDialog.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});
setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});
setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

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

//  CHANGE COLORS

let setupWizard = document.querySelector(`.setup-wizard`);
let coatWizard = setupWizard.querySelector(`.wizard-coat`);
let eyesWizard = setupWizard.querySelector(`.wizard-eyes`);
let fireball = document.querySelector(`.setup-fireball-wrap`);

//  RGB to HEX

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

let chengeColors = function (obj, arr, styleName, nameInput) {
  obj.addEventListener(`click`, function () {
    obj.style[styleName] = arr[Math.floor(Math.random() * arr.length)];
    document.getElementsByName(nameInput)[0].value = obj.style[styleName];
  });
};

chengeColors(coatWizard, WIZARD_COATS, `fill`, `coat-color`);
chengeColors(eyesWizard, WIZARD_EYES, `fill`, `eyes-color`);

fireball.addEventListener(`click`, function () {
  fireball.style.backgroundColor = WIZARD_FIREBALLS[Math.floor(Math.random() * WIZARD_FIREBALLS.length)];
  document.getElementsByName(`fireball-color`)[0].value = `#` + getHexRGBColor(fireball.style.backgroundColor);
});


let similarListElement = document.querySelector(`.setup-similar-list`);
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).
content.querySelector(`.setup-similar-item`);


let generateWizard = function (count) {
  let wizards = [];
  for (let i = 0; i < count; i++) {
    wizards.push({
      name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ` ` +
      WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)],
      coatColor: WIZARD_COATS[Math.floor(Math.random() * WIZARD_COATS.length)],
      eyesColor: WIZARD_EYES[Math.floor(Math.random() * WIZARD_EYES.length)]
    });
  }
  return wizards;
};

let renderWizard = function (wizard) {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

let wizards = generateWizard(WIZARDS_COUNT);

let fragment = document.createDocumentFragment();
for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
