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
        .when("/widgetsLibrary",{
            templateUrl:"widgetsLibrary.html",
            controller:"mainCtrl"
        })
        .when("/dashboard",{
            templateUrl:"dashboard.html",
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
        .when("/customerUser",{
            templateUrl:"customerUser.html",
            controller:"mainCtrl"
        })
        .when("/customer",{
            templateUrl:"customer.html",
            controller:"mainCtrl"
        })
        .when("/tenantAdmin",{
            templateUrl:"tenantAdmin.html",
            controller:"tenantAdminCtrl"
        })
        .when("/homeTenant",{
            templateUrl:"homeTenant.html",
            controller:"homePageCtrl"
        });
    if($.cookie("userLevel") === "SYS_ADMIN"){
        console.log("系统权限跳转")
        $routeProvider
            .otherwise({
                redirectTo:"/homeTenant"
            });
    }else{
        console.log("其他权限跳转")
        $routeProvider
            .otherwise({
                redirectTo:"/homePage"
            });
    }
}]);

mainApp.controller("mainCtrl",["$scope","$location","$resource",function ($scope,$location,$resource) {
    /*路由跳转*/
    $scope.$location = $location;
    console.log($.cookie());

    /*权限管理*/
    if($.cookie("userLevel") === "CUSTOMER_USER"){
        $(".user").attr("disabled","disabled");
        $(".userDelete").removeAttr("data-target");
        $(".userDelete").css({cursor:"text",color:"#333"});
        $(".userDelete").removeClass("highlight");
    }

    /*侧边栏选中效果*/
    var href  = window.location.hash;
    var hrefClass = href.substring(2,href.length);
    console.log(hrefClass);
    $("#"+hrefClass).css("background","#4f6f93");
    $("#"+hrefClass).siblings().css("background","");

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
        window.location.href = "/home";

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
        var userId = $.cookie("userId");
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




}]);




