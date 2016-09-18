/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('User',['$resource','appConfig',function ($resource,appConfig) {
        return $resource(appConfig.baseUrl+'/api/authenticated',{id:'@id'},{
            query:{
                isArray:false
            },
            authenticated:{
                method:'GET',
                url:appConfig.baseUrl+'/api/authenticated'
            },
            updateDeviceToken:{
                method:'PATCH',
                url:appConfig.baseUrl+'/api/device_token'
            },
            updateFone:{
                method:'PATCH',
                url:appConfig.baseUrl+'/api/users/updatefone'
            },
            rememberMe:{
                method:'PATCH',
                url:appConfig.baseUrl+'/remember_me'
            },
            update:{
                method:'PUT',
                url:appConfig.baseUrl+'/api/users/update_user'
            },
            createUser:{
                method:'POST',
                url:appConfig.baseUrl+'/store_user'
            }
        });

    }]);