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
                    console.log(password);
                    console.log(msg);*/
                    window.location.href = "chooseIndex.html";
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
                    window.location.href = "modifyPassword.html";
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
        window.location.href="index.html";//原窗口打开
    });

    /*
       保存修改
    */
    $("#save").click(function () {
        $.ajax({
            url:"http://localhost:5501/my-objects",
            //data:$("#form-username").val(),
            dataType:"json",
            type:"GET",
            success:function(msg){
                if($("#newPassword").val() && $("#newPasswordAgain").val()) {
                        if ($("#newPassword").val() == $("#newPasswordAgain").val() && $("#currentPassword").val() == msg[0].password) {
                            //msg[0].password = $("#newPassword").val();
                            //toastr.error("用户名或密码错误！");
                            // alert("修改成功！将为您跳转到登录页面");
                            toastr.success("修改成功！3秒后将为您跳转到登录页面");
                            setTimeout(function () {
                                window.location.href = "index.html";
                            },2000);



                        }
                        else if ($("#currentPassword").val() != msg[0].password) {
                            //alert("原密码输入错误！");
                            toastr.error("原密码输入错误！");
                        }
                        else {
                            //alert("两次输入的新密码不相同！");
                            toastr.error("两次输入的新密码不相同！");
                        }
                }
            }
        });
        console.log("旧密码：" + $("#currentPassword").val());
        console.log("新密码：" + $("#newPassword").val());
        console.log("再次输入：" + $("#newPasswordAgain").val());
    });




});