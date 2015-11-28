(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .controller('LotteryController', LotteryController);

  /* @ngInject */
  function LotteryController(LotteriesService, $stateParams) {
    var vm = this;

    vm.LoadLottery = LoadLottery;

    activate();

    function activate() {
      vm.LoadLottery();
    }

    function LoadLottery() {
      vm.loading = true;
      LotteriesService
        .GetLottery($stateParams.ID)
        .then(function(data) {
          vm.Lottery = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

  }
})();
