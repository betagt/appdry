angular.module('starter.controllers')
    .controller(
        'LoginCtrl', ['$scope', 'OAuth','OAuthToken', '$ionicPopup', '$state','$localStorage', 'UserData','User',
        function ($scope, OAuth, OAuthToken, $ionicPopup, $state, $localStorage,UserData, User) {
        $scope.user = {
            username: '',
            password: ''
        };
        /*function adiarExecucao() {
            setTimeout(function () {
                "use strict";

            });
        }*/

        $scope.login = function () {
            var promise = OAuth.getAccessToken($scope.user);
            promise
                .then(function (data) {
                    var token =$localStorage.get('device_token')
                    return User.updateDeviceToken({device_token:token}).$promise;
                })
                .then(function (data) {
                    return User.authenticated({include: 'client'}).$promise;
                })
                .then(function (data) {
                    UserData.set( data.data);
                    switch (UserData.get().role){
                        case 'client':
                            $state.go('client.estabelecimentos');
                            break;
                        case 'deliveryman':
                            $state.go('deliveryman.order');
                            break;
                        default:
                            $state.go('guestHome');
                            break;
                    }
                }, function (responseError) {
                    "use strict";
                    UserData.set( null);
                    OAuthToken.removeToken();
                    $ionicPopup.alert({
                        title: 'Adivertência',
                        template: 'Login e/ou senha inválidos'
                    });
                });
        }
    }]);