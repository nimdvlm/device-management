var mainApp = angular.module("mainApp",["ngRoute","ngAnimate","ngResource","angularFileUpload"]);
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
            controller:"mainCtrl"
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

mainApp.directive("weiYi",function(){
    return{
        restrict :'A',//A属性,E标签,C类名,D注释
        link :function(scope,element,attr){//scope可以接收到的数据//element 当前的元素//attr属性
            //拖拽的三大事件mousedown,mousemove,mouseup.使用jq绑定事件的方法进行绑定
            element.on("mousedown",function(ev){
                /*var brothersinfo=[];//在鼠标起始时获得所有兄弟节点的位置信息
                //获取兄弟节点的top,left,width(400),height(300)
                var childs=ev.target.parentNode.children;
                var brothers=[];
                for(var i=0;i<childs.length;i++){
                    if(childs[i]!==ev.target)
                        brothers.push(childs[i])
                }
                console.log(brothers);
                brothersinfo=[];
                brothers.forEach(function(item){
                    brothersinfo.push({'left':parseInt(item.style.left),'top':parseInt(item.style.top),'id':item.id})
                });
                console.log(brothersinfo);*/
                //通过event获取到当前对象
                var This = $(this);
                //获取到鼠标离当前元素上边框的距离
                var disX = ev.clientX - $(this).offset().left;
                console.log(disX);
                //获取到元素距离左边框的距离    //因为在拖拽的过程中不变的是鼠标距离元素边框的距离 通过不变和已知求变量
                var disY = ev.clientY - $(this).offset().top;
                console.log(disY);
                /*console.log(attr.data);
                if(attr.data){
                    $div=$("<div>");
                    console.log($div);
                    $div.css({"width":"100px","height":"100px","border": "2px dotted green","position":"absolute","left":that.offset().left,"top":that.offset().top});
                    $div.appendTo($("body"));
                }
                var x=e.clientX-$(this).offset().left;
                var y=e.clientY-$(this).offset().top;
                console.log(x+":"+y);*/
                $(document).on("mousemove",function(ev){
                    //将所改变的值通过样式设置给当前元素
                    This.css({
                        left:ev.clientX - disX,
                        top:ev.clientY - disY,
                    });
                    /*if(attr.data){
                        $div.css({"left":e.clientX-x,"top":e.clientY-y});
                    }else{
                        that.css({"left":e.clientX-x,"top":e.clientY-y});
                    }*/
                });
                $(document).on("mouseup",function(ev){
                    //鼠标松开时关闭所有事件
                    $(document).off();

                })
            })
        }
    }
});



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
    /*权限管理*/
    if($.cookie("userLevel") === "TENANT_ADMIN"){
        $(".tenant").attr("disabled","disabled");
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
        $("#dropQuit,#backIcon").mouseover(function () {
            $(this).css("color","#c0c0c0");
        });
        $("#dropQuit,#backIcon").mouseout(function () {
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
                userInfo = msg
                $scope.currentUser = msg.name;
                $scope.currentUserLevel = msg.authority;
            },
            error:function (err) {
                console.log(err);
            }
        });

        /*-=====个人中心用户信息修改======-*/

        //console.log(userInfo.id);
        //console.log(userInfo.additional_info);
        $scope.NAME = userInfo.name;
        $scope.EMAIL = userInfo.email;
        $scope.INFO = userInfo.additional_info;
        $scope.editUser = function () {
        //console.log($scope.tenantGroupID);
        //console.log($scope.tenantTitle);
        //console.log(tenantID);
        var email=$("#userEmail").val();
        var additional_info=$("#userSay").val();
        var name=$("#userName").val();
        var editTenantUser = '{"id":'+'"'+userInfo.id+'"'+',"email":'+'"'+email+'"'+',"name":'+'"'+name+'"'+',"additional_info":'+'"'+additional_info+'"'+'}';
        //console.log(editTenantUser);
        $.ajax({
            url:"/api/account/user",
            data:editTenantUser,
            type:"PUT",
            contentType: "application/json; charset=utf-8",//post请求必须
            success:function () {
                toastr.success("修改成功！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            },
            error:function () {
                alert("编辑失败");
            }
        });

    }



}]);




