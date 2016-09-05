angular.module('starter.controllers')
    .controller('ClientOrderCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        '$ionicActionSheet',
        'ClientOrder',
        function($scope, $state, $ionicLoading, $ionicActionSheet, ClientOrder){

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
               return ClientOrder.get({
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

            /*$scope.openOrderDetail = function (o) {
                $state.go('client.view_order',{id:o.id});
            }*/
            $scope.showActionSheet = function (order) {
                $ionicActionSheet.show({
                    buttons:[
                        {text:'ver detalhes'},
                        {text:'ver Entrega'}
                    ],
                    titleText:'O que fazer?',
                    cancelText:'Cancelar',
                    cancel:function () { },
                    buttonClicked:function (index) {
                        switch (index){
                            case 0:
                                $state.go('client.view_order',{id:order.id});
                                break;
                            case 1:
                                $state.go('client.view_delivery',{id:order.id});
                                break;
                        }
                    }
                });
            }

    }]);
