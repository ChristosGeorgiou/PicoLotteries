/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .factory('LotteriesService', LotteriesService);

  /* @ngInject */
  function LotteriesService($resource) {

    var service = {
      _total: null,
      _limit: 10,
      _offset: 0,
      GetLotteries: GetLotteries,
      GetLottery: GetLottery,
      SaveLottery: SaveLottery,
      DeleteLottery: DeleteLottery,
      NextPage: NextPage,
      PreviousPage: PreviousPage,
      HasPages: HasPages,
    }

    return service;

    function NextPage() {
      service._offset = ((service._offset / service._limit) + 1) * service._limit;
    }

    function PreviousPage() {
      service._offset = ((service._offset / service._limit) - 1) * service._limit;
    }

    function HasPages() {
      return {
        Previous: (service._offset !== 0),
        Next: (service._total - service._offset > service._limit),
      }
    }

    function GetLotteries() {

      return $resource(APP.Service + "_design/models/_view/lotteries")
        .get({
          limit: service._limit,
          skip: service._offset,
        })
        .$promise
        .then(function(data) {
          service._total = data.total_rows;
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
      lottery.DrewAt = new Date();
      lottery.Participants = _.shuffle(lottery.Participants);

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
