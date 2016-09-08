angular.module('starter.controllers')
    .controller('EstabelecimentosCtrl',[
        '$scope','$state','$ionicTabsDelegate','$ionicLoading','UserData','Estabelecimentos', '$ionicPopup','$ionicNavBarDelegate',
        function ($scope,$state, $ionicTabsDelegate,$ionicLoading,UserData,Estabelecimentos, $ionicPopup, $ionicNavBarDelegate) {
            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }

            $scope.estabelecimentos = [];
            $ionicLoading.show({
                template: 'Carregando...'
            });

            loadEstabelecimentos().then(function (data) {
                $scope.estabelecimentos = data.data;
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            },function (responseError) {
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
            $scope.doRefresh = function () {
                loadEstabelecimentos().then(function (data) {
                    $scope.estabelecimentos = data.data;
                    $scope.$broadcast('scroll.refreshComplete');
                },function (responseError) {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            function loadEstabelecimentos(){
                return Estabelecimentos.query({id:null,include:'endereco,entrega'}).$promise;
            }

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