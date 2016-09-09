/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('UserAddress',['$resource','appConfig',function ($resource,appConfig) {
        return $resource(appConfig.baseUrl+'/api/users/address',{id:'@id'},{
            query:{
                isArray:false
            },
            create:{
                method:'POST',
                url:appConfig.baseUrl+'/api/users/address'
            },
            remove:{
                method:'DELETE',
                url:appConfig.baseUrl+'/api/users/address/:id'
            },
            first:{
                method:'GET',
                url:appConfig.baseUrl+'/api/users/address/:id'
            },
            save:{
                method:'PUT',
                url:appConfig.baseUrl+'/api/users/address/:id'
            }
        });

    }]);