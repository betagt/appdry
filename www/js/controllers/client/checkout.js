angular.module('starter.controllers')
    .controller('ClientCheckoutCtrl', [
        '$scope',
        '$state',
        '$cart',
        'ClientOrder',
        '$ionicLoading',
        '$ionicPopup',
        'Cupom',
        '$cordovaBarcodeScanner',
        'User',
        function ($scope, $state, $cart, ClientOrder, $ionicLoading, $ionicPopup, Cupom, $cordovaBarcodeScanner, User) {
            User.authenticated({include:'client'},function (data) {

            },function (responseError) {

            });
            var cart = $cart.get();
            $scope.cupom = cart.cupom;
            $scope.items = cart.items;
            $scope.total = $cart.getTotalFinal();

            $scope.removeItem = function (i) {
                $cart.removeItem(i);
                $scope.items.splice(i,1);
                $scope.total = $cart.getTotalFinal();
            };
            $scope.openListProducts = function () {
                $state.go('client.view_products');
            }
            $scope.openProductDetail = function(i){
                $state.go('client.checkout_item_detail',{
                    index:i
                });
            };

            $scope.save = function () {
                $ionicLoading.show({
                    template: 'Salvando...'
                });
                var o = {items:angular.copy($scope.items)};
                angular.forEach(o.items, function (item) {
                    item.product_id = item.id;
                });
                if($scope.cupom.value){
                    o.cupom_code = $scope.cupom.code;
                }
                ClientOrder.save({id:null},o,function (data) {
                    $ionicLoading.hide();
                    $state.go('client.checkout_successfull');
                },function (responseError) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title:'Adivertência',
                        template:'Erro ao salvar Pedido!'
                    });
                });

            };
            $scope.readBarCode = function () {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(barcodeData) {
                        if(barcodeData.text)
                        getValueCupom(barcodeData.text);
                    }, function(error) {
                        $ionicPopup.alert({
                            title:'Adivertência',
                            template:'Não foi possivel reconhecer o código - tente novamente!'
                        });
                    });
            };
            $scope.removeCupom = function () {
                $cart.removeCupom();
                $scope.cupom = $cart.get().cupom;
                $scope.total = $cart.getTotalFinal();
            };

            function getValueCupom(code){
                $ionicLoading.show({
                    template: 'Carregando...'
                });
                Cupom.get({code:code},function (data) {
                    $cart.setCupom(data.data.code,data.data.value);
                    $scope.cupom = $cart.get().cupom;
                    $scope.total = $cart.getTotalFinal();
                    $ionicLoading.hide();
                },function (responseError) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title:'Adivertência',
                        template:'Não foi possivel reconhecer o código - tente novamente!'
                    });
                });
            };
        }]);