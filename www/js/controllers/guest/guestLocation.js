angular.module('starter.controllers')
    .controller('GuestLocationCtrl',[
        '$scope','$state','$ionicTabsDelegate','UserData',function ($scope,$state, $ionicTabsDelegate,UserData) {

            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }

        }]);