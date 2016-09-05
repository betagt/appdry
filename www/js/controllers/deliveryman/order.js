angular.module('starter.controllers')
    .controller('DeliverymanOrderCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        'DeliverymanOrder',
        function($scope, $state, $ionicLoading, DeliverymanOrder){

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
                });;
            }
            function getOrders() {
               return DeliverymanOrder.get({
                    id:null,
                    orderBy:'created_at',
                    sortedBy:'desc'
                }).$promise;
            }

            getOrders().then(function (data) {
                $scope.items = data.data;
                $ionicLoading.hide();
            },function (responseError) {
                $ionicLoading.hide();
            });

            $scope.openOrderDetail = function (o) {
                $state.go('deliveryman.view_order',{id:o.id});
            }

    }]);
