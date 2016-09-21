
angular.module('starter.controllers')
    .controller('AvaliacoesCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        'ClientOrder',
        '$ionicModal',
        'Estabelecimentos',
        function($scope, $state, $ionicLoading, ClientOrder,$ionicModal,Estabelecimentos){

            $scope.items = [];
            $scope.order = [];
            $scope.item = [];
            $scope.avaliacoesItens = [];
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
                    include:'estabelecimento.endereco,estabelecimento.entrega,items'
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


            $ionicModal.fromTemplateUrl('templates/client/modal/avaliacao_view.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function(item) {
                $scope.item = item.estabelecimento.data;
                $scope.order = item;
                $ionicLoading.show({
                    template:'Carregando...'
                });
                Estabelecimentos.estabelecimentoAvaliacaoOrder({id:item.id},function (data) {
                    $ionicLoading.hide();
                    $scope.avaliacoesItens = data.data;
                    $scope.modal.show();
                },function (responseError) {
                    $ionicLoading.hide();
                });
            };
            $scope.closeModal = function() {
                $scope.modal.hide();
            };
            // Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function() {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function() {
                // Execute action
            });
        }]);
