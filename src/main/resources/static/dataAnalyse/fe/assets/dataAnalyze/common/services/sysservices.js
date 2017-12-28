
define(function (require) {
    return [{
        name: 'SDeliver',
        func: function () {
            var service = {};
            service.setDeliver = function (deliver, type) {
                service.deliver = deliver;
                service.type = type;
            }
            return service;
        }
    }
    // , {
    //     name: 'authService',
    //     func: function ($http, $location) {
    //         var authService = {};
    //         authService.isAuthed = function (page) {
    //             var trans = '';
    //             var r = /^\/([a-zA-Z]+\d*)\/*/g;
    //             var res = r.exec(page);
    //             trans = res[1];
    
    //             $http.get(url).success(function (data) {
    //                 // 如果需要统一权限管理平台的权限认证，则删除下的true
    //                 if (true || data.status === 0) {
    //                     authService.currentPage = page;
    //                     $location.path(page);
    //                 } else {
    //                     authService.page = '/error';
    //                     if ($location.path() === '/error') {
    //                         return;
    //                     }
    //                     $location.path('/error');
    //                 }
    //             });
    //         }
    //         return authService;
    //     }
    // }
];
});
