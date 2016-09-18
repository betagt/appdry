angular.module('starter.filters')
    .filter('dateTimeFormat',function ($filter) {
        return function (input,format) {

                return $filter('date')(new Date(input),format);

        }
    });