/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('FaleConosco',['$resource','appConfig',function ($resource, appConfig) {
        return $resource(appConfig.baseUrl+'/api/client/store_contato/:id',{},{
            query:{
                isArray:false
            }
        });
    }]);