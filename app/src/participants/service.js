/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.participants')
    .factory('ParticipantsService', ParticipantsService);

  /* @ngInject */
  function ParticipantsService($resource) {

    var service = {
      GetPLists: GetPLists,
      GetPList: GetPList,
      SavePList: SavePList,
      DeletePList: DeletePList,
    }

    return service;

    function GetPLists(params) {
      return $resource(APP.Service + "_design/models/_view/plists")
        .get()
        .$promise
        .then(function(data) {
          return _.chain(data.rows)
            .map(function(item) {
              return item.value;
            })
            .sortBy(function(item) {
              return item.Name;
            })
            .reverse()
            .value();
        });
    }

    function GetPList(id) {
      return $resource(APP.Service + id)
        .get()
        .$promise
        .then(function(data) {
          return data;
        });
    }


    function SavePList(PList) {

      if (!PList._id) {
        PList.Type = "PList";
        PList.CreatedAt = new Date();
      }

      PList.Participants = _.filter(PList.Participants, function(item) {
        return (item.Name || item.Email);
      });

      return $resource(APP.Service)
        .save(PList)
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function DeletePList(PList) {

      PList._deleted = true;
      PList.DeletedAt = new Date();

      return $resource(APP.Service)
        .save(PList)
        .$promise;
    }

  }
}());
