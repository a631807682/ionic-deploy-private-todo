angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicDeploy, $ionicLoading, versionUpdateService) {

    $scope.check = function() {

        versionUpdateService.checkUpdate();

    }

    

})
