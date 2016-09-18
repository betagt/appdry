/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('Avaliacoes',['$resource','appConfig',function ($resource,appConfig) {
        return $resource(appConfig.baseUrl+'/api/client/questoes',{id:'@id'},{
            query:{
                isArray:false
            },
            customSave:{
                method:'POST',
                url:appConfig.baseUrl+'/api/client/:id/store_avaliacao'
            }
        });

    }]);