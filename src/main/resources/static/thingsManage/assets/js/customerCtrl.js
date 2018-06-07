mainApp.controller("customerCtrl",["$scope","$resource",function ($scope,$resource) {
    var href = window.location.search;//取?后的参数
    var attr = href.substring(href.indexOf("?")+1);
    var attrs = attr.split("&");
    console.log(attrs);
    var userLevel = attrs[0];
    var tenantId = attrs[1];
    var userId = attrs[2];
    var customId;
    //getUserById
    /*var userObj = $resource("/api/account/user?userId=:userId");
    var userInfo = userObj.get({userId:userId});
    console.log(userInfo);*/
    /*$.ajax({
        url:"/api/account/user?userId="+userId,
        dataType:"json",
        type:"GET",
        async:false,
        contentType: "application/json; charset=utf-8",
        success:function (msg) {
            console.log(msg);
            customId = msg.customer_id;
        }
    });*/



    $scope.limit = function () {
        setTimeout(function () {
            console.log($("#customerNum").val());
        },1000);

    };

    //获取所有客户
    var customerObj = $resource("/api/account/customers?limit=10&page=0");
    $scope.customersInfo = customerObj.query();//所有客户信息
    console.log($scope.customersInfo);

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

    //选中客户信息展示
    $scope.showCustomer = function (data) {
        $scope.customersInfo.forEach(function (items) {
            if(data != items) items.style = {}
        });
        /*给点击元素加上特定样式*/
        data.style = {"border": "2px solid #305680"};

        console.log(data);
        $scope.customerInfo = data;
        $scope.tenantId = data.tenant_id;
        $scope.title = data.title;
        $scope.customerId = data.id;
        $scope.additionalInfo = data.additional_info;
        $scope.address = data.address;
        $scope.email = data.email;
        $scope.phone = data.phone;

    };
    //分页
    $(".addActive").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        var pageIndex = Number($(this).text());
    });



    //删除客户
    $scope.deleteCustomer = function () {
        // console.log($scope.customerInfo);
        var deleteObj = $resource("/api/account/customer?customerId=:customerId");
        deleteObj.delete({customerId:$scope.customerInfo.id},{},function (resp) {
            toastr.success("删除客户成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (err) {
            toastr.error("删除客户失败！");
        });
    };

    //新增客户
    $("#addCustomer").click(function () {
        $("#customerName").removeClass("input-err");
    });
    $scope.createCustomer = function () {

        if($("#customerName").val()){
            var title = $("#customerName").val();
            var phone = $("#customerPhone").val();
            var email = $("#customerEmail").val();
            var address = $("#customerAddress").val();
            var additional_info =$("#customerAddInfo").val();
            var createCustomerInfo = '{"title":'+'"'+title+'"'+',"phone":'+'"'+phone+'"'+',"email":'+'"'+email+'"'+',"address":'+'"'+address+'"'+',"additional_info":'+'"'+additional_info+'"'+'}';
            console.log(createCustomerInfo);
            $.ajax({
                url:"/api/account/customer",
                data:createCustomerInfo,
                type:"POST",
                contentType: "application/json; charset=utf-8",//post请求必须
                success:function (resp) {
                    toastr.success("创建客户成功！");
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                },
                error:function (err) {
                    toastr.error("创建客户失败！");
                }
            });

        }else{
            /*增加提示效果*/
            $("#customerName").addClass("input-err");
            $("#modalConfirmCreateCustomer").removeAttr("data-dismiss");
            $('#customerName').on('focus', function() {
                $(this).removeClass('input-err');
            });
        }
    }

    //显示现有信息
    $scope.setCustomerInfo = function () {
        $("#refreshCustomerPhone").val($scope.customerInfo.phone);
        $("#refreshCustomerEmail").val($scope.customerInfo.email);
        $("#refreshCustomerAddress").val($scope.customerInfo.address);
        $("#refreshCustomerAddInfo").val($scope.customerInfo.additional_info);
        console.log($scope.customerInfo.phone);
    };

    //修改用户
    $scope.refreshCustomer = function () {

        var phone = $("#refreshCustomerPhone").val();
        var email = $("#refreshCustomerEmail").val();
        var address = $("#refreshCustomerAddress").val();
        var additional_info =$("#refreshCustomerAddInfo").val();
        var refreshCustomerInfo = '{"id":'+'"'+$scope.customerId+'"'+',"title":'+'"'+$scope.title+'"'+',"phone":'+'"'+phone+'"'+',"email":'+'"'+email+'"'+',"address":'+'"'+address+'"'+',"additional_info":'+'"'+additional_info+'"'+'}';
        console.log(refreshCustomerInfo);
        $.ajax({
            url:"/api/account/customer",
            data:refreshCustomerInfo,
            type:"PUT",
            contentType: "application/json; charset=utf-8",//post请求必须
            success:function (resp) {
                toastr.success("修改客户信息成功！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            },
            error:function () {
                toastr.error("修改客户信息失败！");
            }
        });
    }

}]);