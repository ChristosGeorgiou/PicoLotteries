(function() {
  'use strict';

  angular
    .module('app.plists')
    .controller("PlistFormController", PlistFormController);

  /* @ngInject */
  function PlistFormController($modalInstance, ModalParams, PlistsService) {
    var vm = this;

    vm.Plist = {
      Participants: [],
    };

    vm.AddParticipants = AddParticipants;
    vm.RemoveParticipant = RemoveParticipant;
    vm.Save = Save;

    activate();

    function activate() {
      if (ModalParams.ID) {
        vm.loading = true;
        PlistsService
          .GetPlist(ModalParams.ID)
          .then(function(data) {
            vm.Plist = data;
            if (vm.Plist.Participants.length === 0) {
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
        vm.Plist.Participants.push({});
      }
    }

    function RemoveParticipant(index) {
      vm.Plist.Participants.splice(index, 1);
    }

    function Save() {
      PlistsService
        .SavePlist(vm.Plist)
        .then(function() {
          $modalInstance.close();
        });
    }


  }

}());
