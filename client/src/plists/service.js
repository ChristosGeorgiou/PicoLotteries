/* jshint -W097, -W033 */
(function() {
  'use strict';

  angular
    .module('app.plists')
    .factory('PlistsService', PlistsService);

  /* @ngInject */
  function PlistsService($resource, Plist) {

    var service = {
      GetPlists: GetPlists,
      GetPlist: GetPlist,
      SavePlist: SavePlist,
      DeletePlist: DeletePlist,
      GetParticipants: GetParticipants,
      GetParticipant: GetParticipant,
      SaveParticipant: SaveParticipant,
      DeleteParticipant: DeleteParticipant,
    }

    return service;

    function GetPlists(params) {
      var params = params || {};
      return Plist
        .find({
          filter: {
            order: params.order || "CreatedAt DESC",
          },
        })
        .$promise
        .then(function(data) {
          return data;
        });
    }

    function GetPlist(id) {
      return Plist
        .findById({
          id: id
        })
        .$promise
        .then(function(item) {
          return item;
        });
    }

    function SavePlist(plist) {

      if (!plist.id) {
        plist.CreatedAt = new Date();
      }

      plist.Participants = _.filter(plist.Participants, function(item) {
        return (item.Name || item.Email);
      });

      return Plist
        .updateOrCreate(plist)
        .$promise
        .then(function(item) {
          return item;
        });

    }

    function DeletePlist(id) {

      return Plist
        .deleteById({
          id: id
        })
        .$promise
        .then(function(item) {
          return item;
        });

    }


    function GetParticipants(params) {
      return Participant
        .find({
          filter: {
            include: "participants"
          }
        })
        .$promise
        .then(function(data) {
          return _.sortBy(data, function(item) {
            return item.Name;
          });
        });
    }

    function GetParticipant(id) {
      return Participant
        .findById({
          id: id,
          filter: {
            include: "participants"
          }
        })
        .$promise
        .then(function(item) {
          return item;
        });
    }

    function SaveParticipant(Participant) {

      if (!Participant.id) {
        Participant.CreatedAt = new Date();
      }

      Participant.participants = _.filter(Participant.Participants, function(item) {
        return (item.Name || item.Email);
      });

      return Participant
        .updateOrCreate(Participant)
        .$promise
        .then(function(item) {
          return item;
        });

    }

    function DeleteParticipant(id) {

      return Participant
        .deleteById({
          id: id
        })
        .$promise
        .then(function(item) {
          return item;
        });

    }

  }
}());
