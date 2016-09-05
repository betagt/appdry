// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controllers',[]);
angular.module('starter.services',[]);
angular.module('starter.filters',[]);
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'starter.filters',
  'angular-oauth2',
  'ngResource',
  'ngCordova',
  'uiGmapgoogle-maps',
  'pusher-angular'
])
    .constant('appConfig',{
      baseUrl:'http://localhost:8000',
      pusherKey:'5af096247925712d9f40'
    })
    .run(function ($ionicPlatform,$window,appConfig,$localStorage,$ionicPopup) {
      $window.client = new Pusher(appConfig.pusherKey);
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
        Ionic.io();
        var push = new Ionic.Push({
          debug:true,
          onNotification:function (message) {
            $ionicPopup.alert({
              title: 'Adivertência',
              template: message.text
            });
          }
        });
        push.register(function (token) {
          $localStorage.set('device_token',token.token);
        });
      });
    }).config(function ($stateProvider,$urlRouterProvider,OAuthProvider,OAuthTokenProvider,appConfig,$provide) {
  OAuthProvider.configure({
    baseUrl: appConfig.baseUrl,
    clientId: 'appid01',
    clientSecret: 'secret', // optional
    grantPath: '/oauth/access_token'
  });
  OAuthTokenProvider.configure({
    name: 'token',
    options: {
      secure: false
    }
  });
  $stateProvider.state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'LoginCtrl'
  })
      .state('home',{
        url:'/home',
        templateUrl:'templates/home.html',
        controller:function ($scope) {

        }
      });
  // redirecionamento padrão
  $urlRouterProvider.otherwise('/guest-home');

  $provide.decorator('OAuthToken',['$localStorage','$delegate',function ($localStorage,$delegate) {
    Object.defineProperties($delegate,{
      setToken:{
        value:function (data) {
          return $localStorage.setObject('token',data);
        },
        enumerable:true,
        configurable:true,
        writable:true
      },
      getToken:{
        value:function () {
          return $localStorage.getObject('token');
        },
        enumerable:true,
        configurable:true,
        writable:true
      },
      removeToken:{
        value:function () {
          return $localStorage.getObject('token',null);
        },
        enumerable:true,
        configurable:true,
        writable:true
      }
    });
    return $delegate;
  }]);
}).service('cart',function () {
  this.items = [];
});
