angular.module('starter.filters')
    .filter('arraySum',function ($filter) {
        return function (items,prop) {
            var subtotal = 0;
            angular.forEach(items,function (item) {
                subtotal += item[prop];
            })
            return subtotal;
        }
    });