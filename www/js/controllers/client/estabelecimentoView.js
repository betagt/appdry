angular.module('starter.controllers')
    .controller('EstabelecimentosViewCtrl',[
        '$scope','$state','$ionicTabsDelegate','$ionicLoading','UserData','Estabelecimentos',function ($scope,$state, $ionicTabsDelegate,$ionicLoading,UserData,Estabelecimentos) {

            $scope.selectTabWithIndex = function(index) {
                $ionicTabsDelegate.select(index);
            }

            $scope.estabelecimentos = [];
            /*$ionicLoading.show({
                template: 'Carregando...'
            });
            Estabelecimentos.query({include:'endereco,entrega'},function(data){
                $scope.estabelecimentos = data.data;
                $ionicLoading.hide();
            },function (dataError) {
                $ionicLoading.hide();
            });*/
            $scope.item = {
                    "id": 1,
                    "icone": "http://lorempixel.com/177/150/?17317",
                    "nome": "Rafael Schinner",
                    "descricao": "Quas rerum labore sit dolor et excepturi. Quod et et minima nam eaque et. Ut impedit quasi quisquam consectetur amet quisquam qui.",
                    "email": "keebler.fausto@example.com",
                    "telefone": "442.424.7964",
                    "status": 1,
                    "created_at": {
                        "date": "2016-09-03 12:56:48.000000",
                        "timezone_type": 3,
                        "timezone": "UTC"
                    },
                    "updated_at": {
                        "date": "2016-09-03 12:56:48.000000",
                        "timezone_type": 3,
                        "timezone": "UTC"
                    },
                    "endereco": {
                        "data": {
                            "id": 1,
                            "endereco": "71064 Gusikowski Hills\nSouth Justice, SD 85205-0208",
                            "complemento": "",
                            "numero": "82",
                            "bairro": "1100 Kilback Light Suite 133",
                            "cidade": "Craigchester",
                            "estado": "Wyoming",
                            "cep": "07329",
                            "latitude": "37.019818",
                            "longitude": "-19.738636",
                            "created_at": {
                                "date": "2016-09-03 12:56:48.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            },
                            "updated_at": {
                                "date": "2016-09-03 12:56:48.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            }
                        }
                    },
                    "entrega": {
                        "data": {
                            "id": 1,
                            "tempo_entrega": 6,
                            "faixa_preco": 46,
                            "tipo_pagamento": 2,
                            "tipo_entrega": 2,
                            "created_at": {
                                "date": "2016-09-03 12:56:48.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            },
                            "updated_at": {
                                "date": "2016-09-03 12:56:48.000000",
                                "timezone_type": 3,
                                "timezone": "UTC"
                            }
                        }
                    }
                };


        }]);