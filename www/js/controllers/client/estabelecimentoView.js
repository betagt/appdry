angular.module('starter.controllers')
    .controller('EstabelecimentosViewCtrl',[
        '$scope','$state','$ionicTabsDelegate','$stateParams','$ionicLoading','UserData','Estabelecimentos', '$ionicPopup','$cart','Product',
        function ($scope,$state, $ionicTabsDelegate, $stateParams,$ionicLoading,UserData,Estabelecimentos, $ionicPopup, $cart, Product) {

            var idEstabelecimento = $stateParams.id;
            var cart = $cart.setKey('cart_'+idEstabelecimento);
            $scope.showCartButton = cart.get().items.length >0;
            $scope.productExtras = null;

            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }

            $scope.readOnly = true;
            defaultQtd();
            $scope.estabelecimentos = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });

            var estabelecimento = Estabelecimentos.query({id:idEstabelecimento,include:'endereco,entrega,produtos,funcionamentos'}).$promise;
            estabelecimento.then(function(data){
                $scope.item = data.data;
                return Estabelecimentos.estabelecimentobycategory({id:idEstabelecimento}).$promise;
            }).then(function (data) {
                $scope.categories = data.data;
                return Estabelecimentos.estabelecimentoAvaliacao({id:idEstabelecimento}).$promise
            }).then(function (data) {
                $scope.avaliacoes = data.data;
                return Estabelecimentos.estabelecimentoAvaliacaoItems({id:idEstabelecimento}).$promise
            }).then(function (data) {
                $scope.avaliacoesItens = data.data;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });

            $scope.addItem = function (item) {
                item.qtd =1;
                $cart.addItem(item);
                $state.go('client.checkout');
            };
            
            $scope.addItem = function (item) {
                if(!(parseInt(item.power )== 2)){
                    $ionicPopup.alert({
                        title: 'Adivertência',
                        template: 'Estabelecimento fechado no momento!'
                    });
                    return false;
                }
                Product.first({id:item.id},function (data) {
                    $scope.productExtras = data.data.extras.data
                    var myPopup = $ionicPopup.show({
                        templateUrl: 'templates/client/includeEstabelecimentos/formEstabelecimento.html',
                        title: item.name,
                        subTitle: item.description+' <b class="balanced">R$'+item.price+'</b>',
                        scope: $scope,
                        buttons: [
                            { text: 'Cancelar' },
                            {
                                text: '<b>Adicionar</b>',
                                type: 'button-assertive',
                                onTap: function(e) {
                                    //console.log(e);
                                    return parseInt($scope.data.qtd);
                                }
                            }
                        ]
                    });

                    myPopup.then(function(res) {
                        if(res) {
                            if (parseInt(res) < 1) {
                                $ionicPopup.alert({
                                    title: 'Adivertência',
                                    template: 'Quantidade invalida!'
                                });
                                defaultQtd();
                                return;
                            }

                            item.qtd = parseInt(res);
                            item.observacoes = $scope.data.observacoes;
                            cart.addItem(item);
                            $scope.showCartButton = cart.get().items.length >0;
                            $ionicPopup.alert({
                                title: 'Adivertência',
                                template: 'Item adcionado ao carrinho'
                            });
                        }
                        defaultQtd();
                    });
                },function(responseError){});


            };
            $scope.goCheckout = function () {
                $state.go('client.checkout',{id:idEstabelecimento});
            }
            function defaultQtd() {
                $scope.data = {
                    qtd:1,
                    observacoes:null
                };
            }
        }]);