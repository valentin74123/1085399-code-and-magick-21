'use strict';

(function () {
  window.util = {
    isEscEvent(evt, action) {
      if (evt.key === `Escape`) {
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.key === `Enter`) {
        action();
      }
    }
  };
})();
