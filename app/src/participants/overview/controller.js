(function() {
  'use strict';

  angular
    .module('app.participants')
    .controller('ParticipantsController', ParticipantsController);

  /* @ngInject */
  function ParticipantsController(ParticipantsService, ParticipantsModals, toaster, $state) {
    var vm = this;

    vm.AddPList = AddPList;
    vm.ViewPList = ViewPList;
    vm.DeletePList = DeletePList;
    vm.LoadPLists = LoadPLists;

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

    function AddPList() {
      ParticipantsModals
        .PListForm()
        .then(function() {
          vm.LoadPLists();
        });
    }

    function ViewPList(PList) {
      ParticipantsModals
        .PListForm({
          ID: PList._id
        })
        .then(function() {
          vm.LoadPLists();
        });
    }

    function DeletePList(PList) {
      ParticipantsService
        .DeletePList(PList)
        .then(function() {
          vm.LoadPLists();
        });
    }

  }
})();
