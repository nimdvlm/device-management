//var level;

//async:false（默认为true）  表示同步加载，会在ajax的success执行完成之后，在执行其他；
//async:true  表示异步加载，可能会在ajax执行完成之后，就执行下面的方法，从而导致data中没有值；
$(document).ready(function () {
    var href = window.location.search;/* 获取属性（“?”后面的分段） */
    var attr = href.substring(href.indexOf("?")+1);
    var attrs = attr.split("&");
    var level = attrs[0];
    var tenant = attrs[1];
    $("#thingsManage").click(function () {
        if(level == "CUSTOMER_USER"){
                window.location.href = "/thingsUserManager?"+level+"&"+tenant;
        }
        else if(level == "TENANT_ADMIN"){
                window.location.href = "/thingsTenantManager?"+level+"&"+tenant;
        }
        else if(level == "SYS_ADMIN"){
                window.location.href = "/thingsSystemManager?"+level+"&"+tenant;
        }
    });
    $("#3dPages").click(function () {
        window.location.href = "http://39.104.189.84:8800?id="+tenant;
    });



});