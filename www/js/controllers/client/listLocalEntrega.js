angular.module('starter.controllers')
    .controller('ListLocalEntregaCtrl',[
        '$scope',
        '$stateParams',
        'ClientOrder',
        '$ionicLoading',
        '$state',
        function($scope, $stateParams, ClientOrder, $ionicLoading,$state){
        $scope.enderecos = {};
        /*$ionicLoading.show({
            template: 'Carregando...'
        });
        ClientOrder.query({id:$stateParams.id,include:'items,cupom'},function(data){
            $scope.order = data.data;
            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });*/
        
        $scope.goAddEndereco = function () {
             $state.go('client.add_local_entrega');
        };
    }]);
