/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app._common')
    .config(AnalyticsConfig);

  /* @ngInject */
  function AnalyticsConfig(configHelperProvider, AnalyticsProvider) {

    var GoogleTrackCode = "UA-4623228-21";

    AnalyticsProvider.setAccount(GoogleTrackCode);

    AnalyticsProvider.trackUrlParams(true);
    AnalyticsProvider.ignoreFirstPageLoad(true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

    configHelperProvider.$get().notifyConfig("Google Analytics", GoogleTrackCode);

  }

}());
