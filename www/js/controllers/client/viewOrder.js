angular.module('starter.controllers')
    .controller('ClientViewOrderCtrl',[
        '$scope',
        '$stateParams',
        'ClientOrder',
        '$ionicLoading',
        function($scope, $stateParams, ClientOrder, $ionicLoading){
        $scope.order = {};
        $scope.item = {};
        $ionicLoading.show({
            template: 'Carregando...'
        });
        ClientOrder.query({id:$stateParams.id,include:'items,cupom,estabelecimento,estabelecimento.endereco,estabelecimento.entrega'},function(data){
            $scope.order = data.data;
            $scope.item = data.data.estabelecimento.data;
            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });
    }]);
