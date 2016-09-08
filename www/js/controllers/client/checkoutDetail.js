angular.module('starter.controllers')
    .controller('ClientCheckoutDetailCtrl',[
        '$scope',
        '$state',
        '$cart',
        '$stateParams',
        function($scope,$state,$cart,$stateParams){
            var idEstabelecimento = $stateParams.estabelecimento;
            $scope.product = $cart.setKey('cart_'+idEstabelecimento).getItem($stateParams.index);
            $scope.updateQtd = function () {
                $cart.updateQtd($stateParams.index,$scope.product.qtd);
                $state.go('client.checkout',{
                    id:idEstabelecimento
                });
            };
    }]);
