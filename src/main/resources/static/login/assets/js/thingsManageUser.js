//var level;

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
    console.log($.cookie());

    var token = undefined;
    $.ajax({
        url: "/api/user/authorize",
        contentType: "application/json; charset=utf-8",
        async: false,
        type: "GET",
        success: function (msg) {
            token = msg;
        }
    });


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
    $("#3dPages").click(function () {
        if(token !== undefined){
            window.open("http://39.104.189.84:8800?id="+tenantId+"&token="+token);
        }
    });

    $("#bigData").click(function () {
       window.location.href = "../bigData/device1.html?id="+tenantId;
    });
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