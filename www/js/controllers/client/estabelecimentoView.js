angular.module('starter.controllers')
    .controller('EstabelecimentosViewCtrl',[
        '$scope','$state','$ionicTabsDelegate','$stateParams','$ionicLoading','UserData','Estabelecimentos', '$ionicPopup','$cart',
        function ($scope,$state, $ionicTabsDelegate, $stateParams,$ionicLoading,UserData,Estabelecimentos, $ionicPopup, $cart) {

            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }

            $scope.estabelecimentos = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });
            Estabelecimentos.query({id:$stateParams.id,include:'endereco,entrega,produtos'},function(data){
                $scope.item = data.data;
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
                //item.qtd =1;
                //$cart.addItem(item);
                //$state.go('client.checkout');
                var myPopup = $ionicPopup.show({
                    template: '<input type="password" ng-model="data.wifi">',
                    title: 'Enter Wi-Fi Password',
                    subTitle: 'Please use normal things',
                    scope: $scope,
                    buttons: [
                        { text: 'Cancel' },
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if (!$scope.data.wifi) {
                                    //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    return $scope.data.wifi;
                                }
                            }
                        }
                    ]
                });

                myPopup.then(function(res) {
                    console.log('Tapped!', res);
                });
            };
        }]);