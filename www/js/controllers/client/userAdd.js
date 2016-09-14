angular.module('starter.controllers')
    .controller('UserAddCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        '$cart',
        'UserData',
        'User',
        'ionicDatePicker',
        '$ionicPopup',
        'OAuth',
        '$localStorage',
        function($scope,$state,$ionicLoading,$cart,UserData,User, ionicDatePicker,$ionicPopup,OAuth,$localStorage){
            $scope.client = {}

            $scope.cadastroSubmit = function () {
                $scope.client.data_nascimento = $scope.client.data_nascimento.getFullYear()+'-'+$scope.client.data_nascimento.getMonth()+'-'+$scope.client.data_nascimento.getDay();

                if( $scope.client.password_confirmation!=$scope.client.password){
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Senha e a confirmação não estão iguais'
                    });
                    return false;
                }

                var createUser = User.createUser(null,$scope.client).$promise;
                createUser.then(function (data) {
                    return OAuth.getAccessToken({
                        username: $scope.client.email,
                        password: $scope.client.password
                    });
                }).then(function (data) {
                    var token =$localStorage.get('device_token')
                    return User.updateDeviceToken({device_token:token}).$promise;
                }).then(function (data) {
                    return User.authenticated({include: 'address'}).$promise;
                }).then(function (data) {
                    UserData.set( data.data);
                    switch (UserData.get().role){
                        case 'client':
                            $state.go('client.estabelecimentos');
                            break;
                        case 'deliveryman':
                            $state.go('deliveryman.order');
                            break;
                        default:
                            $state.go('guestHome');
                            break;
                    }
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Cadastro realizado com sucesso!'
                    });
                },function (errorResponse) {
                    console.log(errorResponse);
                    $ionicPopup.alert({
                        title:'Advertência',
                        template:'Houve um problema ao Cadastrar tente novamente mais tarde!'
                    });
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
