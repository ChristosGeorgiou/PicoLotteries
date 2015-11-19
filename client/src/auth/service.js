/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  /* @ngInject */
  function AuthService($http, $q, $cookies) {
    var service = {
      AuthObj: false,

      Init: Init,
      SignIn: SignIn,
      SignOut: SignOut,
    }

    return service;

    function Init() {

      var AuthObj = $cookies.getObject('AuthObj');
      if (AuthObj) {
        service.isAuth = true;
        service.AuthObj = AuthObj;
      }

    }

    function SignIn(credentials) {

      var deferred = $q.defer();

      $http
        .post(APP.CouchServer + '_session', {
          name: credentials.username,
          password: credentials.password,
        }, {
          IsSignIn: true
        })
        .then(function(response) {
          var AuthObj = {
            username: credentials.username
          }
          $cookies.putObject('AuthObj', AuthObj);
          service.AuthObj = AuthObj;
          deferred.resolve();
        }, function(rejection) {
          deferred.reject(rejection.data);
        });

      return deferred.promise;
    }

    function SignOut() {
      $cookies.remove('AuthObj');
      $http.delete(APP.CouchServer + '_session');
      service.AuthObj = false;
    }

  }

}());
