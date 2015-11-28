(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('SettingsController', SettingsController);

  /* @ngInject */
  function SettingsController(SettingsService) {
    var vm = this;

    activate();

    function activate() {
    }


  }
})();
