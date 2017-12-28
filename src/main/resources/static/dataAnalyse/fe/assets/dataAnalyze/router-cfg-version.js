
define(function (require) {
    var angular = require('angular');
    var services = require('common/services/sysservices');
    var _ = require('underscore');
    require('angular-route');
    var app = angular.module('webapp', [
        'ngRoute'
    ]);
    window.app = app;
    app.directives = app.filters = {};
    app.config(['$provide', '$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider',
        function ($provide, $routeProvider, $controllerProvider, $compileProvider, $filterProvider) {
            // 注册服务
            _.each(services, function (item) {
                $provide.factory(item.name, item.func);
            });
            var routeMap = {
                // 解决首次进入空白bug
                'home': 'home',
                'analyze': 'analyze',
                'datatable': '',
                'offlinePM': 'offlinePM'
            };
            var routeObj = {
                template: '',
                controller: 'homeController',
                resolve: {
                    keyName: requireModule('home', routeMap['home'])
                }
            };
            $routeProvider.when('/', routeObj);
            $routeProvider.otherwise({redirectTo: 'home'});// routeMap[0]被设置为默认跳转页面
            _.each(routeMap, function (val, key) {
                if (!val) {
                    val = key;
                }
                var routeObj = {
                    template: '',
                    controller: key + 'Controller',
                    resolve: {
                        keyName: requireModule(key, val)
                    }
                };
                $routeProvider.when('/' + key, routeObj)
                    .when('/' + key + '/:name', routeObj);
            });
            function requireModule(module, path) {
                return function ($route, $q, $http) {
                    // $http.get('/nlp/uvpvPost?page=' + module + '?trade=nlp');
                    //  
                    var param = $route.current.params.name;
                    // $(document).trigger('spaHashChange', module + (param ? ('/' + param) : ''));
                    var deferred = $q.defer();
                    require([path + '/controller'], function (ret) {
                        // 注册controller
                        $controllerProvider.register(module + 'Controller', ret.controller);
                        // 注册directive
                        if (ret.directive) {
                            for (var i = ret.directive.length - 1; i >= 0; i--) {
                                if (window.app.directives.hasOwnProperty(ret.directive[i].name)) {
                                    continue;
                                }
                                $compileProvider.directive(ret.directive[i].name, ret.directive[i].func);
                                window.app.directives[ret.directive[i].name] = true;
                            }
                        }
                        // 注册filter
                        if (ret.filter) {
                            for (var i = ret.filter.length - 1; i >= 0; i--) {
                                var filterName = ret.filter[i].name;
                                if (window.app.filters.hasOwnProperty(filterName)) {
                                    continue;
                                }
                                $filterProvider.register(filterName, ret.filter[i].func);
                                window.app.filters[filterName] = true;
                            }
                        }
                        $route.current.template = ret.tpl;
                        deferred.resolve();
                    });
                    return deferred.promise;
                };
            }
        }]);
    return app;
});
