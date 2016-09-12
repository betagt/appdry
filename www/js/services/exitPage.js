angular.module('starter.services').factory('backButtonOverride', function ($rootScope, $ionicPlatform) {
    var results = {};


    function _setup($scope, customBackFunction) {
        // override soft back
        // framework calls $rootScope.$ionicGoBack when soft back button is pressed
        var oldSoftBack = $rootScope.$ionicGoBack;
        $rootScope.$ionicGoBack = function() {
            customBackFunction();
        };
        var deregisterSoftBack = function() {
            $rootScope.$ionicGoBack = oldSoftBack;
        };

        // override hard back
        // registerBackButtonAction() returns a function which can be used to deregister it
        var deregisterHardBack = $ionicPlatform.registerBackButtonAction(
            customBackFunction, 101
        );

        // cancel custom back behaviour
        $scope.$on('$destroy', function() {
            deregisterHardBack();
            deregisterSoftBack();
        });
    }

    results.setup = _setup;
    return results;
});