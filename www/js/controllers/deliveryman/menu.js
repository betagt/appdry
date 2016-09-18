angular.module('starter.controllers')
    .controller('DeliverymanMenuCtrl',[
        '$scope',
        '$state',
        '$ionicLoading',
        'UserData',
        '$cordovaSocialSharing',
        function($scope,$state,$ionicLoading,UserData,$cordovaSocialSharing){
            $scope.user = {
              name:''
            };
            $scope.user = UserData.get();

            $scope.shareAnywhere = function() {
                $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
            }

            $scope.shareViaTwitter = function(message, image, link) {
                $cordovaSocialSharing.canShareVia("twitter", message, image, link).then(function(result) {
                    $cordovaSocialSharing.shareViaTwitter(message, image, link);
                }, function(error) {
                    alert("Cannot share on Twitter");
                });
            }
    }]);
