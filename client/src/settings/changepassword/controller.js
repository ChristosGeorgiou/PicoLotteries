(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller("ChangePasswordController", ChangePasswordController);

  /* @ngInject */
  function ChangePasswordController($modalInstance, ModalParams, User) {
    var vm = this;

    vm.Save = Save;

    activate();

    function activate() {}

    function Save() {
      vm.loading = true;
      User.prototype$updateAttributes({
          id: User.getCurrentId(),
          password: vm.Password
        })
        .$promise
        .then(function(user) {
          vm.loading = false;
          $modalInstance.close();
        });
    }

  }

}());
