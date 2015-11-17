(function() {
  'use strict';

  angular
    .module('app.participants')
    .controller("PListFormController", PListFormController);

  /* @ngInject */
  function PListFormController($modalInstance, ModalParams, ParticipantsService) {
    var vm = this;

    vm.PList = {
      Participants: [],
    };

    vm.AddParticipants = AddParticipants;
    vm.RemoveParticipant = RemoveParticipant;
    vm.Save = Save;

    activate();

    function activate() {
      if (ModalParams.ID) {
        vm.loading = true;
        ParticipantsService
          .GetPList(ModalParams.ID)
          .then(function(data) {
            vm.PList = data;
            if (vm.PList.Participants.length === 0) {
              vm.AddParticipants();
            }
          })
          .finally(function() {
            vm.loading = false;
          });
      } else {
        vm.AddParticipants();
      }
    }

    function AddParticipants() {
      for (var i = 0; i < 5; i++) {
        vm.PList.Participants.push({});
      }
    }

    function RemoveParticipant(index) {
      vm.PList.Participants.splice(index, 1);
    }

    function Save() {
      ParticipantsService
        .SavePList(vm.PList)
        .then(function() {
          $modalInstance.close();
        });
    }


  }

}());
