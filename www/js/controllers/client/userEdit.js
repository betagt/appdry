angular.module('starter.controllers')
    .controller('UserEditCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        '$cart',
        'UserData',
        'User',
        'ionicDatePicker',
        '$ionicPopup',
        function($scope,$state,$ionicLoading,$cart,UserData,User, ionicDatePicker,$ionicPopup){
            var user = UserData.get();
            $scope.client = {}
            $scope.disabeEmail = true;
            $scope.client = user;
            $scope.client.data_nascimento = new Date(user.data_nascimento)
            $scope.cadastroSubmit = function () {
                $scope.client.data_nascimento = $scope.client.data_nascimento.getFullYear()+'-'+$scope.client.data_nascimento.getMonth()+'-'+$scope.client.data_nascimento.getDay();
                if($scope.client.password){
                    if(!$scope.client.rePassword){
                        $ionicPopup.alert({
                            title:'Advertência',
                            template:'digite a comfirmação de senha'
                        }).then(function () {
                            //$scope.client.rePassword.focusFirstInputs;
                        });
                        return false;
                    }
                }

                User.update(null,$scope.client,function (data) {
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Cadastro atualizado com sucesso!'
                    });
                    UserData.set(data.data);
                    $state.go('client.estabelecimentos');
                },function (errorResponse) {
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Houve um problema ao Atualizar tente novamente mais tarde!'
                    })
                });
            }

            
            
            
            var ipObj1 = {
                callback: function (val) {  //Mandatory
                   $scope.client.data_nascimento = new Date(val);
                },
                disabledDates: [            //Optional
                    /*new Date(2016, 2, 16),
                    new Date(2015, 3, 16),
                    new Date(2015, 4, 16),
                    new Date(2015, 5, 16),
                    new Date('Wednesday, August 12, 2015'),
                    new Date("08-16-2016"),
                    new Date(1439676000000)*/
                ],
                from: new Date(1930, 1, 1), //Optional
                to: new Date(), //Optional
                inputDate: new Date(),      //Optional
                mondayFirst: true,          //Optional
                disableWeekdays: [0],       //Optional
                closeOnSelect: false,       //Optional
                templateType: 'modal'       //Optional
            };

            $scope.openDatePicker = function(){
                ionicDatePicker.openDatePicker(ipObj1);
            };

    }]);
