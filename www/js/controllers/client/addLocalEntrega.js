angular.module('starter.controllers')
    .controller('AddLocalEntregaCtrl',[
        '$scope',
        '$stateParams',
        'ClientOrder',
        '$ionicLoading',
        '$state',
        '$viaCep',
        function($scope, $stateParams, ClientOrder, $ionicLoading,$state,$viaCep){
        $scope.enderecos = {};
        $scope.buscaCep = false;
        $scope.data = {};
        /*$ionicLoading.show({
            template: 'Carregando...'
        });
        ClientOrder.query({id:$stateParams.id,include:'items,cupom'},function(data){
            $scope.order = data.data;
            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });*/
        $scope.getCep = function () {
            $viaCep.getCep($scope.data.zipcode).then(function (data) {
                    console.log(data);
            },function (responseError) {

            });
        };
        
        $scope.goAddEndereco = function () {
             $state.go('client.add_local_entrega');
        };
    }]);
