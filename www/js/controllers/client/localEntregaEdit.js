angular.module('starter.controllers')
    .controller('LocalEntregaEditCtrl',[
        '$scope', '$stateParams', 'UserAddress', '$ionicLoading', '$state', '$viaCep','$ionicPopup',
        function($scope, $stateParams, UserAddress, $ionicLoading, $state, $viaCep, $ionicPopup){

        $scope.enderecos = {};

        $scope.buscaCep = true;

        $scope.client = {
                zipcode:null,
                address:'teste',
                city:null,
                state:null
        };
        $ionicLoading.show({
            template: 'Carregando...'
        });
        UserAddress.first({id:$stateParams.id},function (data) {
            $scope.client = data.data;
            $ionicLoading.hide();
        },function (responseError) {
            $ionicLoading.hide();
        });

        $scope.addressSubmit = function () {
            $ionicLoading.show({
                template: 'Salvando...'
            });
            UserAddress.save({id:$stateParams.id},$scope.client,function (data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title:'Adivertência',
                    template:'Endereço salvo com sucesso!'
                }).then(function (data) {
                    $state.go('client.list_local_entrega');
                });
            },function (responseError) {
                $ionicLoading.hide();
            });
        }
    }]);