angular.module('starter.controllers')
    .controller(
        'RememberPassCtrl', ['$scope', '$ionicPopup', '$state', 'User',
        function ($scope, $ionicPopup, $state, User) {
        $scope.user = {};
        $scope.rememberPass = function (formItem) {
            User.rememberMe(null,{email:$scope.user.email},function (data) {
                $ionicPopup.alert({
                    title:'Recuperar Senha:',
                    template:'Sua senha foi enviado para o seu email'
                });
            },function (responseError) {
                $ionicPopup.alert({
                    title:'Advertência',
                    template:'Problema ao enviar tente novamente mais tarde!'
                });
            });
        }

    }]);