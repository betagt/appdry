angular.module('starter.controllers')
    .controller('EstabelecimentosCtrl',[
        '$scope','$state','$ionicTabsDelegate','$ionicLoading','UserData','Estabelecimentos',function ($scope,$state, $ionicTabsDelegate,$ionicLoading,UserData,Estabelecimentos) {

            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }

            $scope.estabelecimentos = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });
            Estabelecimentos.query({include:'endereco,entrega'},function(data){
                $scope.estabelecimentos = data.data;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });
            $scope.goView = function (item) {
                $state.go('client.estabelecimentos_view',{
                    id:item.id
                });
            };

        }]);