/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('Cupom',['$resource','appConfig',function ($resource,appConfig) {
        return $resource(appConfig.baseUrl+'/api/cupom/:code',{code:'@code'},{
            query:{
                isArray:false
            }
        });

    }]);