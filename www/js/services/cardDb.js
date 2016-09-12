/**
 * Created by dsoft on 14/08/2016.
 */
angular.module('starter.services')
    .factory('cardDb',['appConfig','$cordovaSQLite',function (appConfig,$cordovaSQLite) {
        return{
            insert:function(params){
                var result = false;
                var query = "INSERT INTO card (user_id,nome, cpf, cartao_numero, mes, ano,cidade,estado,endereco,numero,complemento,bairro,cep) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
                return $cordovaSQLite.execute(appConfig.db, query, params);
            },
            findByField:function(field,cartao_numero){
                var result = [];
                var query = "SELECT * FROM card WHERE "+field+" = ?";
                $cordovaSQLite.execute(appConfig.db, query, [cartao_numero]).then(function(res) {
                    if(res.rows.length > 0) {
                        result = res.rows.item(0);
                    }
                }, function (err) {
                });
                return result;
            },
            findAll:function () {
                var query = "SELECT * FROM card ORDER BY id DESC";
                var result = [];
                $cordovaSQLite.execute(appConfig.db, query, null).then(function(res) {
                    for (var i=0; i<res.rows.length; i++) {
                        result.push(res.rows.item(i));
                    }
                }, function (err) {
                    console.error(err);
                });
                return result;
            },
            exclude:function(){

            },
            update:function(){

            }
        };

    }]);