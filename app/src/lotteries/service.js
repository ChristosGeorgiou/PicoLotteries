/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .factory('LotteriesService', LotteriesService);

  /* @ngInject */
  function LotteriesService($resource) {

    var service = {
      GetLotteries: GetLotteries,
      GetLottery: GetLottery,
      SaveLottery: SaveLottery,
      DeleteLottery: DeleteLottery,
    }

    return service;

    function GetLotteries(params) {
      return $resource(APP.Service + "_design/lotteries/_view/all")
        .get()
        .$promise
        .then(function(data) {
          return _.chain(data.rows)
            .map(function(item) {
              return item.value;
            })
            .sortBy(function(item) {
              return item.DrewAt || 0;
            })
            .reverse()
            .value();
        });
    }

    function GetLottery(id) {
      return $resource(APP.Service + id)
        .get()
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function SaveLottery(lottery) {
      lottery.Type = "Lottery";
      return $resource(APP.Service)
        .save(lottery)
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function DeleteLottery(lottery) {

      lottery._deleted = true;
      lottery.DeletedAt = new Date();

      return $resource(APP.Service)
        .save(lottery)
        .$promise;
    }

  }
}());
