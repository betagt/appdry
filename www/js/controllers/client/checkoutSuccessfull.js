/**
 * Created by dsoft on 16/08/2016.
 */
angular.module('starter.controllers')
    .controller('ClientCheckoutSuccessfull', [
        '$scope',
        '$state',
        '$cart',
        function ($scope, $state, $cart) {
        var cart = $cart.get();
        $scope.cupom = cart.cupom;
        $scope.items = cart.items;
        $scope.total = $cart.getTotalFinal();
        $cart.clear();
        $scope.openListOrder = function () {
            $state.go('client.order');
        }
        $scope.openListProducts = function () {
            $state.go('client.view_products');
        }
    }]);