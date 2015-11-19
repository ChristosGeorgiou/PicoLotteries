(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginController', AuthLoginController);

  /* @ngInject */
  function AuthLoginController(AuthService, $stateParams, $state, LoginMessages, User) {
    var vm = this;

    vm.loading = false;
    vm.SignIn = SignIn;

    activate();

    function activate() {

      switch ($stateParams.ref) {
        case "au": //Unauthorized
          vm.Alert = LoginMessages.UNAUTHORIZED;
          break;
        case "so": //Sign Out
          vm.Alert = LoginMessages.SIGNOUT;
          break;
        case "re": //registered
          vm.Alert = LoginMessages.REGISTERED;
          break;
        default:
          break;
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
          console.log("rejection", rejection);
          vm.Alert = LoginMessages[rejection.error.toUpperCase()];
        })
        .finally(function() {
          vm.loading = false;
        });
      // AuthService
      //   .SignIn(vm.credentials)
      //   .then(function(response) {
      //     $state.go("app.lotteries.overview");
      //   }, function(rejection) {
      //     console.log(rejection);
      //     vm.Alert = LoginMessages[rejection.error.toUpperCase()];
      //   })
      //   .finally(function() {
      //     vm.loading = false;
      //   });
    }

  }

}());
