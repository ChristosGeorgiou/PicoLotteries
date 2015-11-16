/* jshint -W097, -W033 */
(function() {
  'use strict';

  var _domain = window.location.hostname.split(".").shift();
  window.APP = {
    Project: "PicoLotteries",
    Version: "0.1.0 PREV",
    Domain: _domain,
    CouchServer: "//localhost:5984/",
    Database: "picolottery_" + _domain,
  };
  window.APP.Service = window.APP.CouchServer + window.APP.Database + "/";

  angular.element(document).ready(function() {
    angular.bootstrap(document, ["app"]);
  });

})();
