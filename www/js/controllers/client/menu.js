angular.module('starter.controllers')
    .controller('ClientMenuCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        'UserData',
        '$ionicNavBarDelegate',
        function($scope,$state,$ionicLoading,UserData, $ionicNavBarDelegate){
            $scope.user = {
                name:''
            };
            $scope.user = UserData.get();
    }]);
