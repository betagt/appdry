/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('$viaCep',['$http','appConfig',function ($http,appConfig) {
        return {
            getCep: function(cep){
                return $http.get(appConfig.baseUrl+'/api/cep/'+cep+'/json');
            }
        }
    }]);