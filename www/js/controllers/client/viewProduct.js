angular.module('starter.controllers')
    .controller('ClientViewProductCtrl',[
        '$scope',
        '$state',
        'Product',
        '$ionicLoading',
        '$cart',
        function($scope,$state,Product,$ionicLoading,$cart){
        $scope.products = [];
        $ionicLoading.show({
            template: 'Carregando...'
        });
        Product.query({},function(data){
            $scope.products = data.data;
            $ionicLoading.hide();
        },function (dataError) {
            $ionicLoading.hide();
        });

    }]);
