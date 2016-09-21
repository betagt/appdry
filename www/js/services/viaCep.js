/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('$viaCep',['$http','appConfig',function ($http,appConfig) {
        return {
            getCep: function(cep){
                return $http.get(appConfig.baseUrl+'/api/cep/'+cep+'/json');
            },
            getCepGuest: function(cep){
                return $http.get(appConfig.baseUrl+'/cep/'+cep+'/json');
            },
            getCepLocation: function(params){
                return $http({
                    method:'GET',
                    url:appConfig.baseUrl+'/api/cep/logradouro?cidade='+params.cidade+'&logradouro='+params.logradouro+'&estado='+params.estado
                });
            }
        }
    }]);