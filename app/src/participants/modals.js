/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.participants')
    .factory('ParticipantsModals', ParticipantsModals);

  ParticipantsModals.$inject = ['modalHelper'];

  function ParticipantsModals(modalHelper) {
    return modalHelper.configureModals(getModals());

    function getModals() {
      return [{
        modal: "PListForm",
        config: {
          templateUrl: 'src/participants/form/view.html',
          controller: "PListFormController",
          size: "md",
          backdrop: 'static',
        }
      }];
    }
  }

}());
