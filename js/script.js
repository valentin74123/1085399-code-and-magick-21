'use strict';

(function () {
  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;
  let wizards = [];

  const getRank = function (wizard) {
    let rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };


  window.wizard.setEyesChangeHandler(function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  });

  window.wizard.setCoatChangeHandler(function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  });

  // window.wizard.setEyesChangeHandler = window.debounce(function (color) {
  //   eyesColor = color;
  //   updateWizards();
  // });

  // window.wizard.setCoatChangeHandler = window.debounce(function (color) {
  //   coatColor = color;
  //   updateWizards();
  // });


  const successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  const errorHandler = function (errorMessage) {
    window.utils.createErrorMessage(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
