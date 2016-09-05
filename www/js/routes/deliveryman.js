angular.module('starter').config(
    function ($stateProvider,$urlRouterProvider,OAuthProvider,OAuthTokenProvider,appConfig,$provide) {
        "use strict";
        $stateProvider
            .state('deliveryman',{
                cache:false,
                abstract:true,
                url:'/deliveryman',
                templateUrl:'templates/deliveryman/menu.html',
                controller:'DeliverymanMenuCtrl'
            })
            .state('deliveryman.order',{
                url:'/order',
                templateUrl:'templates/deliveryman/order.html',
                controller:'DeliverymanOrderCtrl'
            })
            .state('deliveryman.view_order',{
                cache:false,
                url:'/view_order/:id',
                templateUrl:'templates/deliveryman/view_order.html',
                controller:'DeliverymanViewOrderCtrl'
            });
    });
