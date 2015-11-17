(function() {
  'use strict';

  angular
    .module('app.lotteries')
    .controller("LotteryInitController", LotteryInitController);

  /* @ngInject */
  function LotteryInitController($modalInstance, ModalParams, LotteriesService,ParticipantsService) {
    var vm = this;

    vm.Lottery = {
      Name: "Lottery #" + Math.floor((Math.random() * 99999) + 10000),
    };

    vm.LoadPLists = LoadPLists;
    vm.Save = Save;

    activate();

    function activate() {
      vm.LoadPLists();
    }

    function LoadPLists() {
      vm.loading = true;
      ParticipantsService
        .GetPLists()
        .then(function(data) {
          vm.PLists = data;
        })
        .finally(function() {
          vm.loading = false;
        });
    }

    function Save() {
      LotteriesService
        .SaveLottery(vm.Lottery)
        .then(function(resp) {
          $modalInstance.close(resp.id);
        });
    }


  }

}());
