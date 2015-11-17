/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .run(PermissionsConfig);

  /* @ngInject */
  function PermissionsConfig(configHelper, Permission, AuthService) {

    Permission.defineRole('Anonymous', function() {
      return !AuthService.AuthObj;
    });

    configHelper.notifyConfig("Permissions", "Loaded");

  }

}());
