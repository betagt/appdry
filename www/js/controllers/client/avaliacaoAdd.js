angular.module('starter.controllers')
    .controller('AvaliacoesAddCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        '$stateParams',
        'ClientOrder',
        'Avaliacoes',
        '$ionicPopup',
        function($scope,$state,$ionicLoading,$stateParams,ClientOrder,Avaliacoes,$ionicPopup){
                var idEstabelecimento = $stateParams.id;
                $scope.order = {};
                $scope.item = {};
                $scope.questoes = {};
                $scope.items = [];
                $scope.voto = [];
                $scope.mensagem = null;
                $ionicLoading.show({
                        template: 'Carregando...'
                });
                var orderRequest = ClientOrder.query({id:$stateParams.id,include:'items,cupom,estabelecimento,estabelecimento.endereco,estabelecimento.entrega'}).$promise;
                orderRequest.then(function(data){
                        $scope.order = data.data;
                        $scope.item = data.data.estabelecimento.data;
                        return Avaliacoes.query(null).$promise;
                }).then(function (data) {
                        $scope.questoes = data.data;
                        angular.forEach(data.data,function (value,key) {
                                $scope.items[value.id] = 2;
                        });
                        $ionicLoading.hide();
                },function (dataError) {
                        $ionicLoading.hide();
                });
            $scope.save = function () {
                $ionicLoading.show({
                    template: 'Carregando...'
                });
                angular.forEach($scope.items,function (value, key) {
                    $scope.voto.push({
                        'avaliacao_id':key,
                        'nota':value
                    });
                });
                Avaliacoes.customSave({id:idEstabelecimento},{items:$scope.voto,mensagem:$scope.voto.mensagem},function (data) {

                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title:'Confirmação',
                        template:'Avaliação realizada com sucesso obrigado!'
                    }).then(function () {
                        $state.go('client.avaliacoes');
                    });
                },function (reponseError) {
                    $ionicLoading.hide();
                });
            }

        }]);
