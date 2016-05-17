(function() {
  'use strict';

  angular
    .module('apiBabyMaker')
    .controller('MainController', MainController);

  function MainController($http, $routeParams) {
    var vm = this;

    $http.get('./app/apis.json').then(function(result) {
      vm.apis = result.data;

      if ($routeParams.mom && $routeParams.dad) {
        vm.setMomAndDadAPI($routeParams.mom, $routeParams.dad);
      }

    })

    function getIndex() {
      return Math.floor(Math.random() * vm.apis.length);
    }

    vm.babies = [];
    vm.currentBaby = -1;

    vm.updateCurrentBaby = function(amount) {
      vm.currentBaby += amount;
      vm.momApi = vm.babies[vm.currentBaby].mom;
      vm.dadApi = vm.babies[vm.currentBaby].dad;
      vm.updateShareURL();
    }

    vm.next = function() {
      if (vm.currentBaby < vm.babies.length - 1) {
        vm.updateCurrentBaby(1);
      }
    }

    vm.previous = function() {
      if (vm.currentBaby >= 1) {
        vm.updateCurrentBaby(-1);
      }
    }

    vm.updateShareURL = function(momIndex, dadIndex) {
      vm.momIndex = momIndex || vm.apis.indexOf(vm.momApi);
      vm.dadIndex = dadIndex || vm.apis.indexOf(vm.dadApi);
      vm.shareURL = 'https://api-baby-maker.firebaseapp.com/#/share/' + vm.momIndex + '/' + vm.dadIndex;
    }

    vm.makeABaby = function() {
      vm.momIndex = getIndex();
      vm.dadIndex = getIndex();

      if (vm.momIndex != vm.dadIndex) {
        vm.setMomAndDadAPI(vm.momIndex, vm.dadIndex);
      } else {
        vm.makeABaby();
      }
    }

    vm.setMomAndDadAPI = function(momIndex, dadIndex) {
      vm.showResult = true;
      vm.momIndex = momIndex;
      vm.dadIndex = dadIndex;
      vm.momApi = vm.apis[momIndex];
      vm.dadApi = vm.apis[dadIndex];

      vm.babies.push({
        mom: vm.momApi,
        dad: vm.dadApi
      });

      vm.currentBaby = vm.babies.length - 1;
      vm.updateShareURL(vm.momIndex, vm.dadIndex);
    }
  }
})();
