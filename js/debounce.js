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

// (function () {
//   var DEBOUNCE_INTERVAL = 300; // ms

//   window.debounce = function (cb) {
//     var lastTimeout = null;

//     return function(...parameters) {
//       if (lastTimeout) {
//         window.clearTimeout(lastTimeout);
//       }
//       lastTimeout = window.setTimeout(function() {
//         cb(...parameters);
//       }, DEBOUNCE_INTERVAL);
//     };
//   };
// })();
