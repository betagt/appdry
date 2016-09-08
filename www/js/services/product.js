/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('Product',['$resource','appConfig',function ($resource,appConfig) {
        return $resource(appConfig.baseUrl+'/api/client/products',{},{
            query:{
                isArray:false
            }
        });
    }]);