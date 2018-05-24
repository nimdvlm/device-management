var userLevel;
$(document).ready(function () {

    /*
       登录验证
   */
    $("#login").click(function () {
        var userName = $("#form-username").val();
        var password = $("#form-password").val();
        var data = {"username":userName,"password":password};
        var dataString = JSON.stringify(data);
        //window.location.href="chooseIndex.html";//原窗口打开
        // window.open("chooseIndex.html");//新窗口打开
        if(userName && password){
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
        }

    });
    /*
       修改密码验证
   */
    $("#modify").click(function (event) {
        var userName = $("#form-username").val();
        var password = $("#form-password").val();
        var data = {"username":userName,"password":password};
        var dataString = JSON.stringify(data);
        //window.location.href="modifyPassword.html";//原窗口打开
        // window.open("modifyPassword.html");//新窗口打开
        if(userName && password){
            $.ajax({
                url:"/api/user/login",
                data:dataString,
                dataType:"json",
                contentType: "application/json; charset=utf-8",//post请求必须
                type:"POST",
                success:function(msg){
                    window.location.href = "/modifyPassword";
                },
                error:function () {
                    toastr.error("用户名或密码错误！");
                }

            });
        }

    });
    /*
        返回按钮
    */
    $("#cancel").click(function () {
        window.location.href="/signin";//原窗口打开
    });

    /*
       保存修改
    */
    $("#save").click(function () {
        if($("#newPassword").val() && $("#newPasswordAgain").val() && $("#currentPassword").val()){
            var newpassword = $("#newPassword").val();
            var currentPassword = $("#currentPassword").val();
            var infoString = '{'+'"currentPassword":'+'"'+currentPassword+'"'+',"newPassword":'+'"'+newpassword+'"'+'}';
            //字符串类型的数据发送给后台是会自动加上引号
            console.log(infoString);
            if($("#newPassword").val() == $("#newPasswordAgain").val()){
                $.ajax({
                    url:"/api/user/changePassword",
                    data:infoString,
                    contentType: "application/json; charset=utf-8",//post请求必须
                    type:"PUT",
                    success:function(msg) {
                        toastr.success("修改成功！3秒后将为您跳转到登录页面");
                        setTimeout(function () {
                            window.location.href = "/signin";
                        }, 2000);
                    },
                    error:function (msg) {
                        toastr.error("原密码输入错误，密码修改失败！");
                    }
                });
            }
            else{
                toastr.error("两次输入的新密码不同！")
            }
        }
    });




});