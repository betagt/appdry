angular.module('starter.controllers')
    .controller('ListLocalEntregaCtrl',[
        '$scope',
        '$stateParams',
        '$state',
        'UserAddress',
        '$ionicActionSheet',
        '$ionicLoading',
        function($scope, $stateParams,$state, UserAddress, $ionicActionSheet, $ionicLoading){
        $scope.enderecos = {};

        $ionicLoading.show({
            template:'Carregando...'
        });
        updateList().then(function (data) {
            $scope.enderecos = data.data;
            $ionicLoading.hide();
        },function () {
            $ionicLoading.hide();
        });
        $scope.showActionSheet = function (address) {
                $ionicActionSheet.show({
                        buttons:[
                                {text:'<i class="icon ion-edit balanced"></i> Editar'},
                                {text:'<i class="icon ion-ios-trash assertive"></i> Excluir'}
                        ],
                        titleText:'O que fazer?',
                        cancelText:'<i class="icon ion-close-circled assertive"></i> Cancelar',
                        cancel:function () { },
                        buttonClicked:function (index) {
                                switch (index){
                                        case 0:
                                                $state.go('client.local_entrega_edit',{id:address.id});
                                        break;
                                        case 1:
                                                $ionicLoading.show({
                                                    template:'Carregando...'
                                                });
                                                var addressAjax = UserAddress.remove({id:address.id}).$promise;
                                                addressAjax.then(function (data) {
                                                    return updateList();
                                                }).then(function (data) {
                                                    $scope.enderecos = data.data;
                                                    $ionicLoading.hide();
                                                },function () {
                                                    $ionicLoading.hide();
                                                });
                                                return true;
                                        break;
                                }
                        }
                });
        }
        function updateList(){
                return UserAddress.query(null).$promise;
        }
        $scope.goAddEndereco = function () {
             $state.go('client.add_local_entrega');
        };
    }]);
