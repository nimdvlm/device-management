mainApp.controller("customerUserCtrl",["$scope","$resource","$location",function ($scope,$resource,$location) {
    $scope.$location = $location;

    console.log($.cookie());
    var customerId = $.cookie("customerId");
    var userObj = $resource("/api/account/customer/users?customerId=:customerId&limit=9&page=0");
    $scope.userInfo = userObj.query({customerId:customerId});
    console.log($scope.userInfo);

    var currentUserPage;//用于记录当前用户页码

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
    };

    $scope.customerUserLimit = function () {
        setTimeout(function () {
            console.log($("#customerUserNum").val());
        },1000);

    };
    //分页

    Page({
        num:20,					//页码数
        startnum:1,				//指定页码
        elem:$('#customerUserPage'),		//指定的元素
        callback:function(n){	//回调函数
            console.log(n);//当前页号
            currentUserPage = Number(n);
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
}]);