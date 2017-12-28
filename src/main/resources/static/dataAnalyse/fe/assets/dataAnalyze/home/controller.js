
define(function (require) {
    var angular = require('angular');
    var tpl = require('text!home/content.html');
    
    return {
        controller: function ($scope, $routeParams, $http, $interval, $filter) {            
            clearInterval(interval);
        },
        tpl: tpl,
        directive: []
    };
});
