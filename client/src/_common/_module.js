(function() {
  'use strict';

  angular
    .module('app._common', [
      'lbServices',
      'angular-google-analytics',
      'ngResource',
      'ngSanitize',
      'ngCookies',
      'permission',
      'toaster',
      'ui.bootstrap',
      'ui.router',
    ]);
})();
