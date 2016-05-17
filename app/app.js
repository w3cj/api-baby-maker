(function () {
  'use strict';

  angular
    .module('apiBabyMaker', ['ngRoute'])
    .config(config);

  function config($routeProvider) {
    $routeProvider.when('/', {
      controller: 'MainController as Main',
      templateUrl: 'app/main.html'

    }).when('/share/:mom/:dad', {
      controller: 'ShareController as Share',
      templateUrl: 'app/share.html'
    }).otherwise({
      redirectTo: "/"
    })
  }

})();
