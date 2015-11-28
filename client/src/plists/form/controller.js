(function() {
  'use strict';

  angular
    .module('app.plists')
    .controller("PlistFormController", PlistFormController);

  /* @ngInject */
  function PlistFormController($modalInstance, ModalParams, PlistsService) {
    var vm = this;

    vm.Plist = {
      id: ModalParams.ID || null,
      Participants: [],
    };

    vm.AddParticipants = AddParticipants;
    vm.AddParticipants = AddParticipants;
    vm.RemoveParticipant = RemoveParticipant;
    vm.Save = Save;
    vm.Delete = Delete;

    activate();

    function activate() {
      if (vm.Plist.id) {
        vm.loading = true;
        PlistsService
          .GetPlist(vm.Plist.id)
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
      vm.loading = true;
      PlistsService
        .SavePlist(angular.copy(vm.Plist))
        .then(function() {
          vm.loading = false;
          $modalInstance.close();
        });
    }


    function Delete() {
      vm.loading = true;
      PlistsService
        .DeletePlist(vm.Plist.id)
        .then(function() {
          vm.loading = false;
          $modalInstance.close();
        });
    }


  }

}());
