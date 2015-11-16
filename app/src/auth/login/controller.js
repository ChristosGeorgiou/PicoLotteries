(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginController', AuthLoginController);

  /* @ngInject */
  function AuthLoginController(AuthService, $stateParams, $state, LoginMessages) {
    var vm = this;

    vm.loading = false;
    vm.SignIn = SignIn;

    activate();

    function activate() {

      switch ($stateParams.ref) {
        case "au": //Anauthorized
          vm.Alert = LoginMessages.ANAUTHORIZED;
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

      AuthService
        .SignIn(vm.credentials)
        .then(function(response) {
          $state.go("app.lotteries.overview");
        }, function(error) {
          if (error) {
            vm.Alert = LoginMessages.AUTHERROR;
            vm.Alert.Details = error.data.error_description;
          } else {
            vm.Alert = LoginMessages.UNAVAILABLE;
          }
        })
        .finally(function() {
          vm.loading = false;
        });
    }

  }

}());
