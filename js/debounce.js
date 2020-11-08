'use strict';

(function () {
  let DEBOUNCE_INTERVAL = 500;


  window.debounce = function (cb) {
    let lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
