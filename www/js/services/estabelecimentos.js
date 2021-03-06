/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('Estabelecimentos',['$resource','appConfig',function ($resource,appConfig) {
        return $resource(appConfig.baseUrl+'/api/estabelecimentos/:id',{id:'@id'},{
            query:{
                isArray:false
            },
            estabelecimentobycategory:{
                method:'GET',
                url:appConfig.baseUrl+'/api/estabelecimentos/:id/categories'
            },
            estabelecimentoAvaliacao:{
                method:'GET',
                url:appConfig.baseUrl+'/api/estabelecimentos/:id/avaliacoes'
            },
            estabelecimentoAvaliacaoItems:{
                method:'GET',
                url:appConfig.baseUrl+'/api/estabelecimentos/:id/avaliacoes/items'
            },
            estabelecimentoAvaliacaoOrder:{
                method:'GET',
                url:appConfig.baseUrl+'/api/client/estabelecimentos/:id/avaliacoes/order'
            }
        });

    }]);