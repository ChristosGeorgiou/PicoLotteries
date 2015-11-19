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
    }

    return service;

    function GetPlists(params) {
      return Plist
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

    function GetPlist(id) {
      return Plist
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


    function SavePlist(plist) {

      if (!plist.id) {
        plist.CreatedAt = new Date();
      }

      plist.participants = _.filter(plist.Participants, function(item) {
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

  }
}());
