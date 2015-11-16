(function() {
  'use strict';

  angular
    .module('app._common', [
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
