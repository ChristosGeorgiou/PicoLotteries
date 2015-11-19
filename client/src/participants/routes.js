(function() {
  'use strict';

  angular
    .module('app.participants')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'app.participants',
      config: {
        abstract: true,
        template: '<ui-view/>',
        data: {
          permissions: {
            except: ['Anonymous'],
            redirectTo: "auth.login"
          }
        }
      }
    }, {
      state: 'app.participants.overview',
      config: {
        url: '/participants',
        controller: "ParticipantsController",
        templateUrl: 'src/participants/overview/view.html',
      }
    }, {
      state: 'app.participants.item',
      config: {
        url: '/participant/:ID',
        controller: "ParticipantController",
        templateUrl: 'src/participants/item/view.html',
      }
    }];
  }

}());
