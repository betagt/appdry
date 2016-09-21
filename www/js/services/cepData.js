angular.module('starter.services')
    .factory('CepData',['$localStorage','$ionicPopup','$state','$q',function ($localStorage,$ionicPopup,$state,$q) {
        var key = 'cep';
        return {
            set:function(value){
                return $localStorage.setObject(key,value);
            },
            get:function(){
                return  $localStorage.getObject(key);
            },
            validate:function () {
                var cep = this.get();
                if(!cep){
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Me fale onde levo seu <b>Rango ;)</b>  primeiro!'
                    });
                    return true;
                }
                return false;
            }
        };
    }]);