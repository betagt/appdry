
angular.module('starter.controllers')
    .controller('AvaliacoesCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        'ClientOrder',
        function($scope, $state, $ionicLoading, ClientOrder){

            $scope.items = [];
            $ionicLoading.show({
                template:'Carregando...'
            });
            $scope.doRefresh = function () {
                getOrders().then(function (data) {
                    $scope.items = data.data;
                    $scope.$broadcast('scroll.refreshComplete');
                },function (responseError) {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }
            function getOrders() {
                return ClientOrder.get({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'desc',
                    include:'estabelecimento,estabelecimento'
                }).$promise;
            }

            getOrders().then(function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            },function (responseError) {
                $ionicLoading.hide();
            });

            /*$scope.openOrderDetail = function (o) {
             $state.go('client.view_order',{id:o.id});
             }*/
            $scope.showActionSheet = function (order) {
                $state.go('client.add_avaliacao',{id:order.id});
            }

        }]);
