angular.module('starter.controllers')
    .controller('DeliverymanMenuCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        'UserData',
        function($scope,$state,$ionicLoading,UserData){
            $scope.user = {
              name:''
            };
            $scope.user = UserData.get();
    }]);
