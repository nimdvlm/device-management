mainApp.controller("customerUserCtrl",["$scope","$resource","$location",function ($scope,$resource,$location) {
    $scope.$location = $location;

    console.log($.cookie());
    var customerId = $.cookie("customerId");
    var userObj = $resource("/api/account/customer/users?customerId=:customerId&limit=9&page=0");
    $scope.userInfo = userObj.query({customerId:customerId});
    console.log($scope.userInfo);

    var currentUserPage = 1;//用于记录当前用户页码

    var totalUserPages;//用于记录当前用户页码总数

    var userLimit = 9;

    /*初始化新增表格*/
    $("#addCustomerUser").click(function () {
        $("#customerUserName").val("");
        $("#customerUserPassword").val("");
        $("#customerUserPasswordAgain").val("");
        $("#customerUserEmail").val("");
        $("#customerUserAddInfo").val("");
    });

    /*鼠标移入动画效果*/
    $scope.fadeSiblings = function () {
        $(".chooseBtn").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };
    $scope.reSiblings = function () {
        $(".chooseBtn").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
    };

    $scope.showUserInfo = function (data) {
        // var offset = $('#customerChart').offset().top-190;
        // console.log(offset);
        // $('html, body').animate({scrollTop:offset}, 1000);
        $scope.userInfo.forEach(function (items) {
            if(data != items) items.style = {}
        });
        /*给点击元素加上特定样式*/
        data.style = {"border": "2px solid #305680"};
        console.log(data);

        $scope.name = data.name;
        $scope.userId = data.id;
        $scope.customerId = data.customer_id;
        $scope.tenantId = data.tenant_id;
        $scope.additional_info = data.additional_info;
        $scope.authority = data.authority;
        $scope.email = data.email;
    };

    $scope.customerUserLimit = function () {
        if($("#customerUserNum").val() === ""){
            setTimeout(function () {
                userLimit = 9;
                var userCurrentObj = $resource("/api/account/customer/users?customerId=:customerId&limit=:userLimit&page=:currentUserPage");
                $scope.userInfo = userCurrentObj.query({customerId:customerId,userLimit:userLimit,currentUserPage:(currentUserPage-1)});//所有客户组信息
                console.log($scope.userInfo);
            },1000);

        }else{
            setTimeout(function () {
                userLimit = $("#customerUserNum").val();
                console.log(userLimit);
                var userCurrentObj = $resource("/api/account/customer/users?customerId=:customerId&limit=:userLimit&page=:currentUserPage");
                $scope.userInfo = userCurrentObj.query({customerId:customerId,userLimit:userLimit,currentUserPage:(currentUserPage-1)});//所有客户组信息
                console.log($scope.userInfo);
            },1000);
        }

    };
    //分页
    //获取分页总数
    $.ajax({
        url:"/api/account/customer/usersPage?customerId="+customerId+"&limit="+userLimit,
        type:"GET",
        dataType:"text",
        async:false,
        success:function (msg) {
            totalUserPages = Number(msg);
            console.log(totalUserPages);
        }
    });
    Page({
        num:totalUserPages,					//页码数
        startnum:1,				//指定页码
        elem:$('#customerUserPage'),		//指定的元素
        callback:function(n){	//回调函数
            console.log(n);//当前页号
            currentUserPage = Number(n);
            var userCurrentObj = $resource("/api/account/customer/users?customerId=:customerId&limit=:userLimit&page=:currentUserPage");
            $scope.userInfo = userCurrentObj.query({customerId:customerId,userLimit:userLimit,currentUserPage:(currentUserPage-1)});//所有客户组信息
            console.log($scope.userInfo);
        }
    });


    /*新增用户*/
    $("#addCustomerUser").click(function () {
        $(".necInfo").removeClass("input-err");

    });
    $scope.createCustomerUser = function () {
        $("#modalConfirmCreateCustomerUser").attr("data-dismiss","modal");
        $(".necInfo").each(function () {
            if($(this).val()===""){
                /*增加提示效果*/
                $(this).addClass("input-err");
                $("#modalConfirmCreateCustomerUser").removeAttr("data-dismiss");
                $(this).on('focus', function() {
                    $(this).removeClass('input-err');
                });
            }
        });
        if($("#customerUserName").val() && $("#customerUserPassword").val() && $("#customerUserPasswordAgain").val() && $("#customerUserEmail").val()){
            var userName = $("#customerUserName").val();
            var userPassword = $("#customerUserPassword").val();
            var userPasswordAgain = $("#customerUserPasswordAgain").val();
            var userEmail = $("#customerUserEmail").val();
            var userAdditionalInfo = $("#customerUserAddInfo").val();
            var userCustomerId = $.cookie("customerId");
            if(userPassword === userPasswordAgain){
                var createCustomerUserInfo = '{"name":'+'"'+userName+'"'+',"password":'+'"'+userPassword+'"'+',"email":'+'"'+userEmail+'"'+',"customer_id":'+'"'+userCustomerId+'"'+',"additional_info":'+'"'+userAdditionalInfo+'"'+'}';
                console.log(createCustomerUserInfo);
                $.ajax({
                    url:"/api/account/customerUser",
                    data:createCustomerUserInfo,
                    type:"POST",
                    contentType: "application/json; charset=utf-8",//post请求必须
                    success:function (resp) {
                        toastr.success("创建用户成功！");
                        setTimeout(function () {
                            window.location.reload();
                        },1000);
                    },
                    error:function (err) {
                        toastr.error("创建用户失败！");
                    }
                });
            }
            else{
                $("#modalConfirmCreateCustomerUser").removeAttr("data-dismiss");
                toastr.error("两次输入的密码不相同！");
            }
        }
    }

    /*删除用户*/
    $scope.deleteCustomerUser = function () {
        var deleteCustomerUserObj = $resource("/api/account/user?userId=:userId");
        $scope.deleteCustomerUserInfo = deleteCustomerUserObj.delete({userId:$scope.userId},{},function (resp) {
            toastr.success("删除用户成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (err) {
            toastr.error("删除用户失败！");
        });
    };


    /*修改用户*/
    $scope.setCustomerUserInfo = function () {
        $("#refreshCustomerUserName").val($scope.name);
        $("#refreshCustomerId").val($scope.customerId);
        $("#refreshCustomerUserEmail").val($scope.email);
        $("#refreshCustomerUserAddInfo").val($scope.additional_info);
    };
    $scope.refreshCustomerUser = function () {
        var refreshCustomerUserName = $("#refreshCustomerUserName").val();
        var refreshCustomerId = $("#refreshCustomerId").val();
        var refreshCustomerUserEmail = $("#refreshCustomerUserEmail").val();
        var refreshCustomerUserAddInfo = $("#refreshCustomerUserAddInfo").val();
        var refreshCustomerUserInfo = '{"id":'+'"'+$scope.userId+'"'+',"customer_id":'+'"'+refreshCustomerId+'"'+',"name":'+'"'+refreshCustomerUserName+'"'+',"email":'+'"'+refreshCustomerUserEmail+'"'+',"additional_info":'+'"'+refreshCustomerUserAddInfo+'"'+'}';
        console.log(refreshCustomerUserInfo);
        $.ajax({
            url:"/api/account/user",
            data:refreshCustomerUserInfo,
            type:"PUT",
            contentType: "application/json; charset=utf-8",//post请求必须
            success:function (resp) {
                toastr.success("修改用户信息成功！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            },
            error:function () {
                toastr.error("修改用户信息失败！");
            }
        });
    };
}]);