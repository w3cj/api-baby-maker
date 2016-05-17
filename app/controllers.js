(function () {
  'use strict';

  angular
    .module('apiBabyMaker')
    .controller('MainController', MainController);

  function MainController($http, $routeParams) {
    var vm = this;

    $http.get('./app/apis.json').then(function(result){
      vm.apis = result.data;

      if($routeParams.mom && $routeParams.dad) {
        vm.momApi = vm.apis[$routeParams.mom];
        vm.dadApi = vm.apis[$routeParams.dad];

        vm.babies.push({
          mom: vm.momApi,
          dad: vm.dadApi
        });

        vm.currentBaby = vm.babies.length - 1;
        vm.showResult = true;
      }

    })

    function getIndex() {
      return Math.floor(Math.random() * vm.apis.length);
    }

    vm.babies = [];
    vm.currentBaby = -1;

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
      vm.momIndex = getIndex();
      vm.dadIndex = getIndex();
      vm.momApi = vm.apis[vm.momIndex];
      vm.dadApi = vm.apis[vm.dadIndex];

      if(vm.momApi != vm.dadApi) {
        var baby = {
          mom: vm.momApi,
          dad: vm.dadApi
        };

        vm.babies.push(baby);

        vm.currentBaby = vm.babies.length - 1;
        console.log(vm.currentBaby)
      } else {
        vm.makeABaby();
      }
    }
  }
})();
