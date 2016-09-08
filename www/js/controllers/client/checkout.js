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
        '$stateParams',
        'Estabelecimentos',
        function ($scope, $state, $cart, ClientOrder, $ionicLoading, $ionicPopup, Cupom, $cordovaBarcodeScanner, User, $stateParams, Estabelecimentos) {
            User.authenticated({include:'client'},function (data) {},function (responseError) {});
            var idEstabelecimento = $stateParams.id;
            var cart = $cart.setKey('cart_'+idEstabelecimento).get();
            $scope.cupom = cart.cupom;
            $scope.items = cart.items;
            $scope.cart = cart;
            $scope.total = $cart.getTotalFinal();
            $scope.subtotal = $cart.getSubTotal();

            $ionicLoading.show({
                template: 'Carregando...'
            });

            Estabelecimentos.query({id:idEstabelecimento,include:'endereco,entrega,produtos,funcionamentos'},function(data){
                $scope.estabelecimento = data.data;
                $ionicLoading.hide();
            },function (responseErro) {
                $ionicLoading.hide();
            });

            $scope.removeItem = function (i) {
                $cart.removeItem(i);
                $scope.items.splice(i,1);
                $scope.total = $cart.getTotalFinal();
            };
            $scope.openListProducts = function () {
                $state.go('client.view_products');
            };
            $scope.openProductDetail = function(i){
                $state.go('client.checkout_item_detail',{
                    index:i,
                    estabelecimento:idEstabelecimento
                });
            };
            $scope.goEntrega = function () {
                $state.go('client.list_local_entrega');
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
