/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.auth')
    .config(AuthInterceptorConfig)
    .factory('AuthInterceptor', AuthInterceptor);

  /* @ngInject */
  function AuthInterceptor($q, $injector,$cookies) {

    return {
      responseError: function(rejection) {
        // console.log(rejection);
        if (rejection.status === 401 && !rejection.config.IsSignIn) {
          var User = $injector.get('User');
          User.logout();
          var $state = $injector.get('$state');
          $state.go('auth.login', {
            ref: "au"
          });
        }
        return $q.reject(rejection);
      }
    };

  }

  /* @ngInject */
  function AuthInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
  }

}());
