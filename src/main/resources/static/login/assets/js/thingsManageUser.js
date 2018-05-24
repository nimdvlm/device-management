//var level;

//async:false（默认为true）  表示同步加载，会在ajax的success执行完成之后，在执行其他；
//async:true  表示异步加载，可能会在ajax执行完成之后，就执行下面的方法，从而导致data中没有值；
$(document).ready(function () {
    var href = window.location.search;/* 获取属性（“?”后面的分段） */
    var level = href.substring(href.indexOf("?")+1)
    console.log(level);
    $("#thingsManage").click(function () {
        if(level == "TENANT_ADMIN"){
            $("#thingsManage").click(function () {
                window.location.href = "/thingsManager";
            });
        }
        else if(level == "CUSTOMER_USER"){
            $("#thingsManage").click(function () {
                window.location.href = "../thingsManage/side-menu-tenantManager.html";
            });
        }
        else if(level == "SYS_ADMIN"){
            $("#thingsManage").click(function () {
                window.location.href = "../thingsManage/side-menu-systemManager.html";
            });
        }
    });
    $.ajax({
        url:"/api/user/login",
        data:dataString,
        contentType: "application/json; charset=utf-8",//post请求必须
        dataType:"text",
        type:"POST",
        success:function(msg){
            /*console.log(userName);
            console.log(password);*/
            console.log(msg);
            var msgJson = JSON.parse(msg);
            console.log(msgJson.authority);
            userLevel = msgJson.authority;
            window.location.href = "/home?"+userLevel;
        },
        error:function () {
            toastr.error("用户名或密码错误！");
        }
    });


});