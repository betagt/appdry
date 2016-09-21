angular.module('starter').config(
    function ($stateProvider,$urlRouterProvider,OAuthProvider,OAuthTokenProvider,appConfig,$provide) {
    "use strict";
        $stateProvider.state('client',{
            cache:false,
            abstract:true,
            url:'/client',
            templateUrl:'templates/client/menu.html',
            controller:'ClientMenuCtrl'
        })
            .state('client.order',{
                cache:false,
                url:'/order',
                templateUrl:'templates/client/order.html',
                controller:'ClientOrderCtrl'
            })
            .state('client.checkout',{
                cache:false,
                url:'/checkout/:id',
                templateUrl:'templates/client/checkout.html',
                controller:'ClientCheckoutCtrl'
            })
            .state('client.checkout_item_detail',{
                url:'/checkout/detail/:index/:estabelecimento',
                templateUrl:'templates/client/checkout_item_detail.html',
                controller:'ClientCheckoutDetailCtrl'
            })
            .state('client.checkout_review',{
                cache:false,
                url:'/checkout_review/:id',
                templateUrl:'templates/client/checkout_review.html',
                controller:'ClientCheckoutReviewCtrl'
            })
            .state('client.checkout_successfull',{
                cache:false,
                url:'/checkout/successfull',
                templateUrl:'templates/client/checkout_successfull.html',
                controller:'ClientCheckoutSuccessfull'
            })
            .state('client.view_products',{
                url:'/view_products',
                templateUrl:'templates/client/view_products.html',
                controller:'ClientViewProductCtrl'
            })
            .state('client.view_order',{
                cache:false,
                url:'/view_order/:id',
                templateUrl:'templates/client/view_order.html',
                controller:'ClientViewOrderCtrl'
            })
            .state('client.view_delivery',{
                cache:false,
                url:'/view_delivery/:id',
                templateUrl:'templates/client/view_delivery.html',
                controller:'ClientViewDeliveryCtrl'
            })
            .state('client.estabelecimentos',{
                cache:false,
                url:'/estabelecimentos',
                templateUrl:'templates/client/estabelecimentos.html',
                controller:'EstabelecimentosCtrl'
            })
            .state('client.estabelecimentos_view',{
                cache:false,
                url:'/estabelecimentos_view/:id',
                templateUrl:'templates/client/estabelecimentos_view.html',
                controller:'EstabelecimentosViewCtrl'
            })
            .state('client.list_local_entrega',{
                url:'/list_local_entrega',
                templateUrl:'templates/client/list_local_entrega.html',
                controller:'ListLocalEntregaCtrl'
            })
            .state('client.add_local_entrega',{
                url:'/add_local_entrega',
                templateUrl:'templates/client/add_local_entrega.html',
                controller:'AddLocalEntregaCtrl'
            })
            .state('client.local_entrega_edit',{
                url:'/local_entrega_edit/:id',
                templateUrl:'templates/client/local_entrega_edit.html',
                controller:'LocalEntregaEditCtrl'
            })
            .state('client.card_add',{
                url:'/card_add',
                templateUrl:'templates/client/card_add.html',
                controller:'CardAddCtrl'
            })
            .state('client.user_edit',{
                cache:false,
                url:'/user_edit',
                templateUrl:'templates/client/user_edit.html',
                controller:'UserEditCtrl'
            })
            .state('client.faleconosco',{
                cache:false,
                url:'/faleconosco',
                templateUrl:'templates/client/faleconosco.html',
                controller:'FaleConoscoCtrl'
            })
            .state('client.location',{
                cache:false,
                url:'/client-location',
                templateUrl:'templates/client/client_location.html',
                controller:'ClientLocationCtrl'
            })
            .state('client.avaliacoes',{
                cache:false,
                url:'/avaliacoes',
                templateUrl:'templates/client/avaliacoes.html',
                controller:'AvaliacoesCtrl'
            })
            .state('client.add_avaliacao',{
                cache:false,
                url:'/add_avaliacao/:id',
                templateUrl:'templates/client/add_avaliacao.html',
                controller:'AvaliacoesAddCtrl'
            });
    });
