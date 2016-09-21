angular.module('starter.controllers')
    .controller('GuestHomeCtrl',[
        '$scope', 'OAuth','OAuthToken', '$ionicPopup', '$state','$localStorage', 'UserData','User',
        function ($scope, OAuth, OAuthToken, $ionicPopup, $state, $localStorage,UserData, User) {
            $scope.user = {
                username: 'guest@betagt.com.br',
                password: 'guest'
            };
            var promise = OAuth.getAccessToken($scope.user);
            promise
                .then(function (data) {
                    var token =$localStorage.get('device_token')
                    return User.updateDeviceToken({device_token:token}).$promise;
                })
                .then(function (data) {
                    return User.authenticated({include: 'address'}).$promise;
                })
                .then(function (data) {
                    UserData.set( data.data);
                }, function (responseError) {
                    "use strict";
                    UserData.set( null);
                    OAuthToken.removeToken();
                    $ionicPopup.alert({
                        title: 'Adivertência',
                        template: 'Login e/ou senha inválidos'
                    });
                });
    }]);