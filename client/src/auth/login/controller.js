(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginController', AuthLoginController);

  /* @ngInject */
  function AuthLoginController($stateParams, $state, LoginMessages, User) {
    var vm = this;

    vm.loading = false;
    vm.SignIn = SignIn;

    activate();

    function activate() {

      if ($stateParams.ref) {
        SignMessage($stateParams.ref.toUpperCase());
      }
    }

    function SignIn() {

      vm.loading = true;
      vm.Alert = false;

      User
        .login(vm.credentials)
        .$promise
        .then(function(response) {
          $state.go("app.lotteries.overview");
        }, function(rejection) {
          SignMessage(rejection.error.toUpperCase());
          vm.loading = false;
        });
    }

    function SignMessage(CODE) {
      vm.Alert = LoginMessages[CODE];
    }

  }

}());
