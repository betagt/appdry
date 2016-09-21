angular.module('starter.controllers')
    .controller('FaleConoscoGuestCtrl',[
        '$scope',
        '$stateParams',
        'FaleConosco',
        '$ionicLoading',
        '$state',
        '$ionicPopup',
        function($scope, $stateParams, FaleConosco, $ionicLoading, $state,$ionicPopup){
            $scope.client = {
                assunto:"Contato"
            };
            $scope.indique = {
                assunto:"Indicar Estabelecimento"
            };
           $scope.faleConosco = function () {
               enviarFaleconosco($scope.client);
           }

           $scope.indiqueSubmit = function () {
               enviarFaleconosco($scope.indique);
           }

           function enviarFaleconosco(dataForm) {
               $ionicLoading.show({
                   template: 'Carregando...'
               });
               FaleConosco.save(null,dataForm,function(data){
                   $ionicLoading.hide();
                   $ionicPopup.alert({
                       title:'Envio',
                       template:'Recebemos sua mensagem logo entraremos em contato!'
                   }).then(function () {
                       $state.go('guest.estabelecimentos');
                   });
               },function (dataError) {
                   $ionicLoading.hide();
               });
           }
        }]);
