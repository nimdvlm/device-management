var mainApp = angular.module("mainApp",["ngRoute","ngAnimate","ui.grid","ngResource"]);
mainApp.config(["$routeProvider","$locationProvider",function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/homePage", {
            templateUrl:"homePage.html",
            controller:"mainCtrl"
        })
        .when("/deviceList",{
            templateUrl:"deviceList.html",
            controller:"mainCtrl"
        })
        .when("/deviceGroup",{
            templateUrl:"deviceGroup.html",
            controller:"mainCtrl"
        })
        .when("/service",{
            templateUrl:"service.html",
            controller:"mainCtrl"
        })
        .when("/plugins",{
            templateUrl:"plugins.html",
            controller:"mainCtrl"
        })
        .when("/rules",{
            templateUrl:"rules.html",
            controller:"mainCtrl"
        })
        .when("/evaluate",{
            templateUrl:"evaluate.html",
            controller:"mainCtrl"
        })
        .when("/customer",{
            templateUrl:"customer.html",
            controller:"mainCtrl"
        })
        .when("/tenant",{
            templateUrl:"tenant.html",
            controller:"mainCtrl"
        })
        .otherwise({
            redirectTo:"/homePage"
        });
}]);

mainApp.controller("mainCtrl",["$scope","$location","$resource",function ($scope,$location,$resource) {
    /*路由跳转*/
    $scope.$location = $location;



    /*退出登录*/
    $scope.logout = function () {
        $.ajax({
            url:"/api/user/logout",
            contentType: "application/json; charset=utf-8",
            type:"GET",
            success:function(msg) {
                console.log(msg);
                window.location.href="/";
            }
        });
    };

    $("#backIcon").click(function () {
        var href = window.location.search;//取?后的参数
        console.log(href);
        var attr = href.substring(href.indexOf("?")+1);
        console.log(attr);
        var attrs = attr.split("&");
        window.location.href = "/home?"+attrs[0]+"&"+attrs[1]+"&"+attrs[2];

    });



    /*突出显示效果*/

        $(".homeIconBackground,.side-menu-icon").mouseover(function(){
            $(this).siblings().stop().fadeTo(300, 0.3);//动画速度用数字表示时不需加引号
        });
        $(".homeIconBackground,.side-menu-icon").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
        $("#quit,#backIcon").mouseover(function () {
            $(this).css("color","#c0c0c0");
        });
        $("#quit,#backIcon").mouseout(function () {
            $(this).css("color","#ffffff");
        });

        /*HEAD MENU用户信息显示*/
        var hrefUpMenu = window.location.search;//取?后的参数
        var attrUpMenu = hrefUpMenu.substring(hrefUpMenu.indexOf("?")+1);
        var attrsUpMenu = attrUpMenu.split("&");
        console.log(attrsUpMenu[2]);
        var userId = attrsUpMenu[2]; //用于记录当前用户id
        $.ajax({
            url:"/api/account/user?userId="+userId,
            type:"GET",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            async:false,
            success:function (msg) {
                console.log(msg);
                $scope.currentUser = msg.name;
                $scope.currentUserLevel = msg.authority;
            },
            error:function (err) {
                console.log(err);
            }
        });

        /*跑马灯效果*/
   /* (function () {
        var wrap = document.getElementById('wrap'),
            first = document.getElementById('first');
        var timer = window.setInterval(move, 50);
        wrap.onmouseover = function () {
            window.clearInterval(timer);
        };
        wrap.onmouseout = function () {
            timer = window.setInterval(move, 50);
        };
        function move() {
            wrap.scrollLeft++;
            if (wrap.scrollLeft >= first.scrollWidth) {
                wrap.scrollLeft = 0;
            }
        }
    })();*/



}]);




