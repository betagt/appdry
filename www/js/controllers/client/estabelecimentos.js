angular.module('starter.controllers')
    .controller('EstabelecimentosCtrl',[
        '$scope','$state','$ionicTabsDelegate','$ionicLoading','UserData','Estabelecimentos', '$ionicPopup',function ($scope,$state, $ionicTabsDelegate,$ionicLoading,UserData,Estabelecimentos, $ionicPopup) {

            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }

            $scope.estabelecimentos = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });
            Estabelecimentos.query({id:null,include:'endereco,entrega'},function(data){
                $scope.estabelecimentos = data.data;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });
            $scope.goView = function (item) {
                 if (item.power == 1) {
                    $state.go('client.estabelecimentos_view', {
                        id: item.id
                    });
                     return;
                 }

                $ionicPopup.alert({
                    title: 'Adivertência',
                    template: 'O estabelecimento está fechado no momento'
                }).then(function () {
                    $state.go('client.estabelecimentos_view',{
                        id:item.id
                    });
                });
            };


        }]);