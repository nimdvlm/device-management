// var userLevel;
// var tenant;
// var userId;
window.URL = window.URL || window.webkitURL;

$(document).ready(function () {
    /*Enter回车登录*/
    $(document).keydown(function () {
        if (event.keyCode == 13) {
            $("#login").click();
        }
    });


    /*
     登录验证
     */

    $("#login").click(function () {
        var userName = $("#form-username").val();
        var password = $("#form-password").val();
        var captcha = $("#form-identifycode").val() || '';
        var data = {"username": userName, "password": password, "captcha": captcha};
        var dataString = JSON.stringify(data);
        //window.location.href="chooseIndex.html";//原窗口打开
        // window.open("chooseIndex.html");//新窗口打开
        if (userName && password) {
            $.ajax({
                url: "/api/user/login",
                data: dataString,
                contentType: "application/json; charset=utf-8",//post请求必须
                dataType: "text",
                type: "POST",
                success: function (msg) {
                    /*console.log(userName);
                     console.log(password);*/
                    // console.log(msg);
                    var msgJson = JSON.parse(msg);
                    $.cookie("userLevel", msgJson.authority);
                    $.cookie("tenantId", msgJson.tenant_id);
                    $.cookie("userId", msgJson.user_id);
                    $.cookie("customerId", msgJson.customer_id);
                    /* userLevel = msgJson.authority;
                     tenant = msgJson.tenant_id;
                     userId = msgJson.user_id;
                     window.location.href = "/home?"+userLevel+"&"+tenant+"&"+userId;*/
                    window.location.href = "/home";
                },
                error: function (error) {
                    var errObject = getErrObject(error)
                    if (errObject.msg === '验证码错误，请重试！') {
                        toastr.error("验证码错误！");
                    } else {
                        toastr.error("用户名或密码错误！");
                        $("#form-identifycode").val("")
                    }
                    if (errObject.needCaptcha) {
                        $('#captcha').show()
                        getCaptchaPic()
                    }

                    function getErrObject(error) {
                        var errString = error.responseText
                        var error = $.parseJSON(errString)
                        return error
                    }

                    function getCaptchaPic() {
                        // jquery的ajax无法正确获取blob数据，需自己写xmlhttprequest
                        window.URL = window.URL || window.webkitURL;
                        if (typeof history.pushState == "function") {
                            var xhr = new XMLHttpRequest();
                            xhr.open("get", "/api/user/getCaptcha", true);
                            xhr.responseType = "blob";
                            xhr.onload = function () {
                                if (this.status == 200) {
                                    var blob = this.response;
                                    var img = document.getElementById("captchaPic");
                                    img.onload = function (e) {
                                        window.URL.revokeObjectURL(img.src); // 清除释放
                                    };
                                    img.src = window.URL.createObjectURL(blob);
                                }
                            }
                            xhr.send();
                        } else {
                            //console.log('浏览器当前版本无法加载验证码')
                        }
                    }
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
        var data = {"username": userName, "password": password};
        var dataString = JSON.stringify(data);
        //window.location.href="modifyPassword.html";//原窗口打开
        // window.open("modifyPassword.html");//新窗口打开
        if (userName && password) {
            $.ajax({
                url: "/api/user/login",
                data: dataString,
                dataType: "json",
                contentType: "application/json; charset=utf-8",//post请求必须
                type: "POST",
                success: function (msg) {
                    window.location.href = "/modifyPassword";
                },
                error: function () {
                    toastr.error("用户名或密码错误！");
                }

            });
        }

    });
    /*
     返回按钮
     */
    $("#cancel").click(function () {
        window.location.href = "/signin";//原窗口打开
    });

    /*
     保存修改
     */
    $("#save").click(function () {
        if ($("#newPassword").val() && $("#newPasswordAgain").val() && $("#currentPassword").val()) {
            var newpassword = $("#newPassword").val();
            var currentPassword = $("#currentPassword").val();
            var infoString = '{' + '"currentPassword":' + '"' + currentPassword + '"' + ',"newPassword":' + '"' + newpassword + '"' + '}';
            //字符串类型的数据发送给后台是会自动加上引号
            //console.log(infoString);
            if ($("#newPassword").val() == $("#newPasswordAgain").val()) {
                $.ajax({
                    url: "/api/user/changePassword",
                    data: infoString,
                    contentType: "application/json; charset=utf-8",//post请求必须
                    type: "PUT",
                    success: function (msg) {
                        toastr.success("修改成功！3秒后将为您跳转到登录页面");
                        setTimeout(function () {
                            window.location.href = "/signin";
                        }, 2000);
                    },
                    error: function (msg) {
                        toastr.error("原密码输入错误，密码修改失败！");
                    }
                });
            }
            else {
                toastr.error("两次输入的新密码不同！")
            }
        }
    });


});