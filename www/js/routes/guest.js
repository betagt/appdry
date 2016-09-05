angular.module('starter').config(
    function ($stateProvider,$urlRouterProvider,OAuthProvider,OAuthTokenProvider,appConfig,$provide) {
        "use strict";
        $stateProvider
            .state('guestHome',{
                cache:false,
                url:'/guest-home',
                templateUrl:'templates/guest/guest_home.html',
                controller:'GuestHomeCtrl'
            })
            .state('guest',{
                cache:false,
                abstract:true,
                url:'/guest',
                templateUrl:'templates/guest/menu.html',
                controller:'GuestMenuCtrl'
            })
            .state('guest.location',{
            cache:false,
            url:'/guest-location',
            templateUrl:'templates/guest/guest_location.html',
            controller:'GuestLocationCtrl'
        });
    });
