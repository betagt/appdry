angular.module('starter.controllers')
    .controller('CardAddCtrl',[
        '$scope', '$stateParams', 'UserAddress', '$ionicLoading', '$state','$ionicPopup','$ionicHistory','cardDb', 'UserData',
        function($scope, $stateParams, UserAddress, $ionicLoading, $state, $ionicPopup,$ionicHistory, cardDb, UserData){
            $scope.card = {};
            var cartao = null;

            $scope.cartaoSubmit = function () {
                var arr = [
                    UserData.get().id,
                    $scope.card.nome,
                    $scope.card.cpf,
                    $scope.card.cartao_numero,
                    $scope.card.mes,
                    $scope.card.ano,
                    $scope.card.cidade,
                    $scope.card.estado,
                    $scope.card.endereco,
                    $scope.card.numero,
                    $scope.card.complemento,
                    $scope.card.bairro,
                    $scope.card.cep,
                ];
                cardDb.insert(arr).then(function(res) {
                    if(res.insertId){
                        $ionicHistory.goBack(-1);
                    }
                }, function (err) {
                    $ionicPopup.alert({
                        title:'Adivertência',
                        template:'Erro ao salvar Cartão!'
                    });
                });
               /* cardDb.findByField('cartao_numero',$scope.card.cartao_numero);
                cardDb.findAll();*/
            };
            yeahList();
            function yeahList(){
                var date = new Date();
                $scope.current = date.getFullYear();
                var start = $scope.current - 0;  // Minus 10 years from current year
                var end = $scope.current + 10;  // Plus 10 years to current year
                $scope.yearArray = [];

                for(var i=start;i<=end;i++)
                {
                    $scope.yearArray.push(i);
                }
            }
    }]);