/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('Product',['$resource','appConfig',function ($resource,appConfig) {
        return $resource(appConfig.baseUrl+'/api/client/products',{id:'@id'},{
            query:{
                isArray:false
            },
            first:{
                method:'GET',
                url:appConfig.baseUrl+'/api/client/product/:id'
            },
        });
    }]);