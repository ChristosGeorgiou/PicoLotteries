/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .run(PermissionsConfig);

  /* @ngInject */
  function PermissionsConfig(configHelper, Permission, User) {

    Permission.defineRole('Anonymous', function() {
      return !User.isAuthenticated();
    });

    configHelper.notifyConfig("Permissions", "Loaded");

  }

}());
