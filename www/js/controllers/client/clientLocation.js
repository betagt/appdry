angular.module('starter.controllers')
    .controller('ClientLocationCtrl',[
        '$scope','$state','$ionicTabsDelegate','UserData','$viaCep','$ionicPopup','CepData','$cordovaGeolocation','$ionicLoading',
        function ($scope,$state, $ionicTabsDelegate,UserData,$viaCep,$ionicPopup,CepData,$cordovaGeolocation,$ionicLoading) {

            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }
            var watch;
            $scope.client = {};
            $scope.address = {
                logradouro:null,
                cidade:'Palmas',
                estado:'TO'
            };
            $scope.enderecos = [];
            $scope.getCep = function () {
                setCep($scope.client.zipcode);
            };

            function setCep(cep){
                $viaCep.getCepGuest(cep.replace('-','')).then(function (data) {
                    setObjCep(data);
                    $state.go('client.estabelecimentos');
                },function (responseError) {
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'CEP Inválido!'
                    });
                });
            }

            $scope.getPosition = function(){
                $ionicLoading.show({
                    template: 'Carregando...'
                });
                var watchOptions ={
                    timeout:3000,
                    enableHighAccurracy:false
                };
                watch = $cordovaGeolocation.watchPosition(watchOptions);
                watch.then(null,function (responseError) {

                },function (position) {
                    stopWatchPosition();
                    googlePosition(position.coords.latitude,position.coords.longitude);
                    $ionicLoading.hide();
                });
            };
            function googlePosition(lat,long) {
                var latlng = new google.maps.LatLng(lat, long),geocoder,map;
                var options = {
                    zoom: 5,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'latLng': latlng
                }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[3]) {
                            setCep(results[3].address_components[0].long_name.replace('-',''));
                        } else {
                            $ionicPopup.alert({
                                title:'Advertência',
                                template:'Localização não encontrada, tente por Endereço ou CEP!'
                            });
                        }
                    } else {
                        $ionicPopup.alert({
                            title:'Advertência',
                            template:'Localização não encontrada :(, tente por Endereço ou CEP!'
                        });
                    }
                });

            }

           $scope.addressPosition = function () {
               $viaCep.getCepLocation($scope.address).then(function (data) {
                   $scope.enderecos = data.data;
               },function (responseError) {
                   $ionicPopup.alert({
                       title:'Advertência',
                       template:'Endereço não encontrado :('
                   });
               });
            }
            $scope.setLocationAddress = function (cep) {
                setCep(cep);
            }
            function setObjCep(data) {
                CepData.set({
                    address:data.data.logradouro,
                    city:data.data.localidade,
                    state:data.data.uf,
                    neighborhood:data.data.bairro,
                    cidade:data.data.data
                });
            }
            function stopWatchPosition() {
                if(watch && typeof watch == "object" && watch.hasOwnProperty('watchID')){
                    $cordovaGeolocation.clearWatch(watch.watchID);
                }
            }
        }]);