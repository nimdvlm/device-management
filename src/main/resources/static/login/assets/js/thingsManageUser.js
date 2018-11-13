//var level;
var BUPT_IOT_MAIN= "39.104.84.131" //主机IP地址
var BUPT_IOT_SERVICE = "39.104.189.84" //各服务所在IP地址

//async:false（默认为true）  表示同步加载，会在ajax的success执行完成之后，在执行其他；
//async:true  表示异步加载，可能会在ajax执行完成之后，就执行下面的方法，从而导致data中没有值；
$(document).ready(function () {
    // var href = window.location.search;/* 获取属性（“?”后面的分段） */
    // var attr = href.substring(href.indexOf("?")+1);
    // var attrs = attr.split("&");
    // var level = attrs[0];
    // var tenant = attrs[1];
    // var userId = attrs[2];
    // document.cookie = "userLevel="+level;
    // document.cookie = "tenantId="+tenant;
    // document.cookie = "userId="+userId;
    // $.cookie('userLevel', level);
    // $.cookie('tenantId', tenant);
    // $.cookie('userId', userId);
    var userLevel = $.cookie("userLevel");
    var tenantId = $.cookie("tenantId");
    var userId = $.cookie("userId");
    console.log($.cookie())

    /******不同权限显示不同模块*******/
    if(userLevel == "CUSTOMER_USER"){
        $('.systemOnly').hide()
    }
    else if(userLevel == "TENANT_ADMIN"){
        $('.systemOnly').hide()
    }
    else if(userLevel == "SYS_ADMIN"){
        $('.systemOnly').show()
    }else{
        $('.systemOnly').hide()
    }

    var sessionId = undefined;
    $.ajax({
        url: "/api/user/authorize",
        contentType: "application/json; charset=utf-8",
        async: false,
        type: "GET",
        success: function (msg) {
            sessionId = msg;
        }
    });

    /*************各模块路由***************/
    $("#thingsManage").click(function () {
        if(userLevel == "CUSTOMER_USER"){
                window.location.href = "/thingsUserManager";
        }
        else if(userLevel == "TENANT_ADMIN"){
                window.location.href = "/thingsTenantManager";
        }
        else if(userLevel == "SYS_ADMIN"){
                window.location.href = "/thingsSystemManager";
        }
    });

    $("#bigData").click(function () {
       window.open("../bigData/device1.html?id="+tenantId);
    });

    $("#accountManagement").click(function () {
        window.location.href = "/userPool";
    })

    $("#3dPages").click(function () {
        if(sessionId !== undefined){
            window.open("http://"+BUPT_IOT_SERVICE+":8800?id="+tenantId+"&sessionId="+sessionId);
        }
    });

    $("#allocationCenter").click(function () {
        window.open("http://"+BUPT_IOT_SERVICE+":30090/main.html")
    })

    $("#logCenter").click(function () {
        window.open("http://"+BUPT_IOT_SERVICE+":30190")
    })

    $("#Kubernetes").click(function () {
        window.open("http://"+BUPT_IOT_SERVICE+":30000")
    })

    /*************各模块路由END***************/
    $("#logout").click(function () {
        console.log("success");
        $.ajax({
            url:"/api/user/logout",
            contentType: "application/json; charset=utf-8",
            type:"GET",
            success:function(msg) {
                console.log(msg);
                window.location.href="/";
            }
        });
    });
    /*退出登录
    $("#logout").click = function () {
        console.log("sssssssssssss");
        $.ajax({
            url:"/api/user/logout",
            contentType: "application/json; charset=utf-8",
            type:"GET",
            success:function(msg) {
                console.log(msg);
                window.location.href="/";
            }
        });
    };*/
});