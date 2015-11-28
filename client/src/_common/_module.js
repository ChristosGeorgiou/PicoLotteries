(function() {
  'use strict';

  angular
    .module('app._common', [
      'lbServices',

      'ngResource',
      'ngSanitize',
      'ngCookies',
      
      'ui.bootstrap',
      'ui.router',
    ]);
})();
