angular.module('starter.controllers')
    .controller('ClientCheckoutReviewCtrl',[
        '$scope', '$state', '$ionicLoading', '$cart', '$stateParams','ClientOrder','cardDb', '$ionicPopup','$ionicHistory','backButtonOverride',
        function($scope,$state,$ionicLoading, $cart, $stateParams, ClientOrder,cardDb,$ionicPopup,$ionicHistory,backButtonOverride){
            var idOrder = $stateParams.id;
            $scope.cards = []
            $scope.order = {};
            $ionicLoading.show({
                template: 'Carregando...'
            });
            //$scope.cards = cardDb.findAll();
            ClientOrder.query({id:idOrder,include:'cupom,items,client,estabelecimento,endereco'},function (data) {
                $scope.order = data.data;
                $ionicLoading.hide();
            },function (responseError) {
                $ionicLoading.hide();
            });
            backButtonOverride.setup($scope, function() {
                $ionicPopup.show({
                    title : '',
                    template : 'Tem certeza que deseja sair?',
                    buttons : [{
                        text : 'Vou Ficar :)',
                        type : 'button-assertive button-outline',
                    }, {
                        text : 'Vou Sair :/',
                        type : 'button-assertive',
                        onTap : function() {
                            $state.go('client.estabelecimentos');
                        }
                    }]
                });
            });

            $scope.goAddCard = function () {
                $state.go('client.card_add');
            };

            $scope.payOrder = function () {
                //implementar...
                $state.go('client.checkout_successfull');
            }


    }]);
