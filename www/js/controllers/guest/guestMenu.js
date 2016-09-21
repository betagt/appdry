angular.module('starter.controllers')
    .controller('GuestMenuCtrl',[
        '$scope','$state','UserData', '$cordovaSocialSharing', 'CepData',
            function ($scope,$state,UserData,$cordovaSocialSharing,CepData) {
                $scope.cep = CepData.get();
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