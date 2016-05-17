(function () {
  'use strict';

  angular
    .module('apiBabyMaker')
    .controller('MainController', MainController)
    .controller('ShareController', ShareController);

  function ShareController($http, $routeParams) {
    var vm = this;
    $http.get('./app/apis.json').then(function(result){
      vm.apis = result.data;
      vm.momApi = vm.apis[$routeParams.mom];
      vm.dadApi = vm.apis[$routeParams.dad];
    })
  }

  function MainController($http, $location) {
    var vm = this;

    $http.get('./app/apis.json').then(function(result){
      vm.apis = result.data;
    })

    function getIndex() {
      return Math.floor(Math.random() * vm.apis.length);
    }

    vm.babies = [];
    vm.currentBaby = 0;

    vm.next = function() {
      if(vm.currentBaby < vm.babies.length - 1) {
        vm.currentBaby++;
        vm.momApi = vm.babies[vm.currentBaby].mom;
        vm.dadApi = vm.babies[vm.currentBaby].dad;
      }
    }

    vm.previous = function () {
      if(vm.currentBaby >= 1) {
        vm.currentBaby--;
        vm.momApi = vm.babies[vm.currentBaby].mom;
        vm.dadApi = vm.babies[vm.currentBaby].dad;
      }
    }

    vm.makeABaby = function() {
      vm.showResult = true;
      var momApi = vm.apis[getIndex()];
      var dadApi = vm.apis[getIndex()];

      if(momApi != dadApi) {
        // GOOD
        vm.momApi = momApi;
        vm.dadApi = dadApi;
        vm.babies.push({
          mom: momApi,
          dad: dadApi
        });

        vm.currentBaby = vm.babies.length;
      } else {
        vm.makeABaby();
      }
    }

    vm.share = function() {
      var momIndex = vm.apis.indexOf(vm.momApi);
      var dadIndex = vm.apis.indexOf(vm.dadApi);
      $location.path('/share/' + momIndex + '/' + dadIndex);
    }
  }
})();
