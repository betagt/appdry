angular.module('starter.controllers')
    .controller('AddLocalEntregaCtrl',[
        '$scope', '$stateParams', 'UserAddress', '$ionicLoading', '$state', '$viaCep','$ionicPopup','$ionicHistory',
        function($scope, $stateParams, UserAddress, $ionicLoading, $state, $viaCep, $ionicPopup,$ionicHistory){

        $scope.enderecos = {};

        $scope.buscaCep = false;

        $scope.client = {
                zipcode:null,
                address:'teste',
                city:null,
                state:null
        };

        $scope.addressSubmit = function () {
            $ionicLoading.show({
                template: 'Salvando...'
            });
            UserAddress.create({},$scope.client,function (data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title:'Adivertência',
                    template:'Endereço salvo com sucesso!'
                }).then(function (data) {
                    //$state.go('client.list_local_entrega');
                    $ionicHistory.goBack(-1);
                });
            },function (responseError) {
                $ionicLoading.hide();
            });
        }

        $scope.getCep = function () {
            $viaCep.getCep($scope.client.zipcode).then(function (data) {
                    //$scope.client.zipcode = parseInt(data.data.cep.replace('-',''));
                    $scope.client.address = data.data.logradouro;
                    $scope.client.city = data.data.localidade;
                    $scope.client.state = data.data.uf;
                    $scope.client.neighborhood = data.data.bairro;
                    $scope.buscaCep = true;
            },function (responseError) {
                    $scope.buscaCep = false;
            });
        };
    }]);