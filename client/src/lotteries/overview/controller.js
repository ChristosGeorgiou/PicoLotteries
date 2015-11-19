(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .controller('LotteriesController', LotteriesController);

  /* @ngInject */
  function LotteriesController(LotteriesService, LotteriesModals, toaster, $state) {
    var vm = this;

    vm.AddLottery = AddLottery;
    vm.DeleteLottery = DeleteLottery;
    vm.LoadLotteries = LoadLotteries;
    vm.FetchPrevious = FetchPrevious;
    vm.FetchNext = FetchNext;

    activate();

    function activate() {
      vm.LoadLotteries()
        .then(function() {
          vm.HasPages = LotteriesService.HasPages();
        });
    }

    function FetchPrevious() {
      if (vm.HasPages.Previous) {
        LotteriesService.PreviousPage();
        vm.HasPages = LotteriesService.HasPages();
        vm.LoadLotteries();
      }
    }

    function FetchNext() {
      if (vm.HasPages.Next) {
        LotteriesService.NextPage();
        vm.HasPages = LotteriesService.HasPages();
        vm.LoadLotteries();
      }
    }

    function LoadLotteries() {
      vm.loading = true;
      return LotteriesService
        .GetLotteries()
        .then(function(data) {
          vm.Lotteries = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function AddLottery() {
      LotteriesModals
        .LotteryInit()
        .then(function(id) {
          if (id) {
            $state.go("app.lotteries.lottery", {
              ID: id
            });
          }
        });
    }

    function DeleteLottery(lottery) {
      LotteriesService
        .DeleteLottery(lottery)
        .then(function() {
          vm.LoadLotteries();
        });
    }

  }
})();
