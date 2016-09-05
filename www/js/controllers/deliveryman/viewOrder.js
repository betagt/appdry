angular.module('starter.controllers')
    .controller('DeliverymanViewOrderCtrl',[
        '$scope',
        '$stateParams',
        'DeliverymanOrder',
        '$ionicLoading',
        '$cordovaGeolocation',
        '$ionicPopup',
        function($scope, $stateParams, DeliverymanOrder, $ionicLoading,$cordovaGeolocation,$ionicPopup){
            var watch;
            $scope.order = {};
            $ionicLoading.show({
                template: 'Carregando...'
            });
            DeliverymanOrder.query({id:$stateParams.id,include:'items,cupom'},function(data){
                $scope.order = data.data;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });
            $scope.goToDelivery = function () {
                $ionicPopup.alert({
                    title: 'Adivertência',
                    template: 'Para mandar a localização dê ok.'
                }).then(function () {
                    stopWatchPosition();
                });
                DeliverymanOrder.updateStatus({id:$stateParams.id},{status:1},function (data) {
                    var watchOptions ={
                        timeout:3000,
                        enableHighAccurracy:false
                    };
                    watch = $cordovaGeolocation.watchPosition(watchOptions);
                    watch.then(null,function (responseError) {

                    },function (position) {
                        DeliverymanOrder.geo({
                            id:$stateParams.id
                        },{
                            lat:position.coords.latitude,
                            long:position.coords.longitude
                        },function (data) {

                        });
                    });
                });
            };
            
            function stopWatchPosition() {
                if(watch && typeof watch == "object" && watch.hasOwnProperty('watchID')){
                    $cordovaGeolocation.clearWatch(watch.watchID);
                }
            }
            /*DeliverymanOrder.updateStatus({id:$stateParams.id},{status:1},function (data) {
                console.log(data);
            });
            DeliverymanOrder.geo({id:$stateParams.id},{lat:-23.4444,long:-45.4444},function (data) {
                console.log(data);
            });*/
        }]);
