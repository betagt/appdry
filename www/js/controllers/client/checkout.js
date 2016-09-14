angular.module('starter.controllers')
    .controller('ClientCheckoutCtrl', [
        '$scope', '$state', '$cart', 'ClientOrder', '$ionicLoading', '$ionicPopup', 'Cupom',
        '$cordovaBarcodeScanner', 'User', '$stateParams', 'Estabelecimentos','UserAddress','UserData','User','$ionicActionSheet',
        function ($scope, $state, $cart, ClientOrder, $ionicLoading, $ionicPopup, Cupom, $cordovaBarcodeScanner, User, $stateParams, Estabelecimentos, UserAddress,UserData,User,$ionicActionSheet) {
            User.authenticated({include:'address'},function (data) {},function (responseError) {});
            var idEstabelecimento = $stateParams.id;
            var cart = $cart.setKey('cart_'+idEstabelecimento).get();
            $scope.cupom = cart.cupom;
            $scope.items = cart.items;
            $scope.enderecos = {};
            $scope.cart = cart;
            $scope.total = $cart.getTotalFinal();
            $scope.subtotal = $cart.getSubTotal();
            $scope.client = {
                telefone : UserData.get().telefone_celular
            };
            $ionicLoading.show({
                template: 'Carregando...'
            });

            var estabelecimentos = Estabelecimentos.query({id:idEstabelecimento,include:'endereco,entrega,produtos,funcionamentos'}).$promise;
            estabelecimentos.then(function(data){
                $scope.estabelecimento = data.data;
                return UserAddress.query(null).$promise;
            }).then(function (data) {
                $scope.enderecos = data.data;
                $ionicLoading.hide();
            },function (responseErro) {
                $ionicLoading.hide();
            });
            $scope.openListProducts = function () {
                $state.go('client.view_products');
            };

            $scope.goAddEndereco = function () {
                $state.go('client.add_local_entrega');
            };
            $scope.addEndereco = function (endereco) {
                $cart.setAddressDelivery(endereco);
            }
            $scope.showActionSheet = function (item) {
                $ionicActionSheet.show({
                    buttons:[
                        {text:'<i class="icon ion-edit balanced"></i> Alterar Quantidade'},
                        {text:'<i class="icon ion-ios-trash assertive"></i> Remover Item'}
                    ],
                    titleText:'O que fazer?',
                    cancelText:'<i class="icon ion-close-circled assertive"></i> Cancelar',
                    cancel:function () { },
                    buttonClicked:function (index) {
                        switch (index){
                            case 0:
                                openProductDetail(item);
                                break;
                            case 1:
                                removeItem(item);
                                return true;
                                break;
                        }
                    }
                });
            }

            $scope.goPaymentForm = function () {

                if(!$scope.client.endereco){
                    $ionicPopup.alert({
                        title: 'Adivertência',
                        template: 'Por Favor selecione um endereço de entrega!'
                    });
                    return false;
                }

                var popup = $ionicPopup.show({
                    template: '<input type="text" ng-model="client.telefone" />',
                    title: 'Confirmação',
                    subTitle: 'Informe o seu telefone para contato caso ele não esteja atualizado',
                    scope: $scope,
                    buttons: [
                        { text: 'Cancelar' },
                        {
                            text: '<b>Confirmar</b>',
                            type: 'button-assertive',
                            onTap: function(e) {
                                //console.log(e);
                                return $scope.client.telefone;
                            }
                        }
                    ]
                });
                popup.then(function (res) {
                    if(res) {
                        $ionicLoading.show({
                            template: 'Finalizando...'
                        });
                        var userUpdate = User.updateFone(null,{telefone_celular:res}).$promise;
                        userUpdate.then(
                            function (data) {
                                var o = {items:angular.copy($scope.items)};
                                angular.forEach(o.items, function (item) {
                                    item.product_id = item.id;
                                });
                                if($scope.cupom.value){
                                    o.cupom_code = $scope.cupom.code;
                                }
                                o.user_delivery_id = $scope.client.endereco;
                                o.estabelecimento_id = idEstabelecimento;
                                return ClientOrder.save({id:null},o).$promise;
                            }).then(function (data) {
                                $ionicLoading.hide();
                                $cart.clear();
                                $state.go('client.checkout_review',{id:data.data.id});
                            },function () {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title:'Adivertência',
                                    template:'Erro ao salvar Pedido!'
                                });
                            }
                        );
                    }
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

            function openProductDetail(i){
                $state.go('client.checkout_item_detail',{
                    index:i,
                    estabelecimento:idEstabelecimento
                });
            };

            function removeItem(i) {
                $cart.removeItem(i);
                $scope.items.splice(i,1);
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
