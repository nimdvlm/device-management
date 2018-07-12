mainApp.controller("customerCtrl",["$scope","$resource","$location",function ($scope,$resource,$location) {
    $scope.$location = $location;

    var currentPage=1;//用于记录当前页号
    var customersLimit = 9;//用于记录当前展示客户个数
    var totalPages;

    $scope.customerLimit = function () {
        if($("#customerNum").val() === ""){
            setTimeout(function () {
                /*customersLimit = 9;
                var customerCurrentObj = $resource("/api/account/customers?limit=:customersLimit&page=:page");
                $scope.customersInfo = customerCurrentObj.query({customersLimit:customersLimit,page:(currentPage-1)});//所有客户组信息
                console.log($scope.customersInfo);

                //获取分页总数
                $.ajax({
                    url:"api/account/customersPage?limit="+customersLimit,
                    type:"GET",
                    dataType:"text",
                    async:false,
                    success:function (msg) {
                        totalPages = Number(msg);
                        console.log(totalPages);
                    }
                });



                //分页
                Page({
                    num:totalPages,					//页码数
                    startnum:1,				//指定页码
                    elem:$('#customerPage'),		//指定的元素
                    callback:function(n){	//回调函数
                        console.log(n);//当前页号
                        currentPage = Number(n);
                        var customerObj = $resource("/api/account/customers?limit=:customersLimit&page=:page");
                        $scope.customersInfo = customerObj.query({customersLimit:customersLimit,page:(currentPage-1)});//所有客户组信息
                        console.log($scope.customersInfo);
                    }
                });*/
                window.location.reload();
            },1000);

        }else{
            setTimeout(function () {
                customersLimit = $("#customerNum").val();
                console.log(customersLimit);
                var customerCurrentObj = $resource("/api/account/customers?limit=:customersLimit&page=0");
                $scope.customersInfo = customerCurrentObj.query({customersLimit:customersLimit});//第一页所有客户组信息
                console.log($scope.customersInfo);

                //获取分页总数
                $.ajax({
                    url:"api/account/customersPage?limit="+customersLimit,
                    type:"GET",
                    dataType:"text",
                    async:false,
                    success:function (msg) {
                        totalPages = Number(msg);
                        console.log(totalPages);
                    }
                });



                //分页
                Page({
                    num:totalPages,					//页码数
                    startnum:1,				//指定页码
                    elem:$('#customerPage'),		//指定的元素
                    callback:function(n){	//回调函数
                        console.log(n);//当前页号
                        currentPage = Number(n);
                        var customerObj = $resource("/api/account/customers?limit=:customersLimit&page=:page");
                        $scope.customersInfo = customerObj.query({customersLimit:customersLimit,page:(currentPage-1)});//所有客户组信息
                        console.log($scope.customersInfo);
                    }
                });
            },1000);
        }
    };

    //获取所有客户组
    var customerObj = $resource("/api/account/customers?limit=9&page=:page");
    $scope.customersInfo = customerObj.query({page:(currentPage-1)});//所有客户组信息
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

    //选中客户组信息展示
    $scope.showCustomer = function (data) {
        var offset = $('#customerChart').offset().top-215;
        console.log(offset);
        $('html, body').animate({scrollTop:offset}, 1000);
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
        // document.cookie="customerId="+$scope.customerId;
        $.cookie("customerId",$scope.customerId);
    };

    //获取分页总数
    $.ajax({
        url:"api/account/customersPage?limit="+customersLimit,
        type:"GET",
        dataType:"text",
        async:false,
        success:function (msg) {
            totalPages = Number(msg);
            console.log(totalPages);
        }
    });



    //分页
    Page({
        num:totalPages,					//页码数
        startnum:1,				//指定页码
        elem:$('#customerPage'),		//指定的元素
        callback:function(n){	//回调函数
            console.log(n);//当前页号
            currentPage = Number(n);
            var customerObj = $resource("/api/account/customers?limit=:customersLimit&page=:page");
            $scope.customersInfo = customerObj.query({customersLimit:customersLimit,page:(currentPage-1)});//所有客户组信息
            console.log($scope.customersInfo);
        }
    });



    //删除客户组
    $scope.deleteCustomer = function () {
        // console.log($scope.customerInfo);
        var deleteObj = $resource("/api/account/customer?customerId=:customerId");
        deleteObj.delete({customerId:$scope.customerInfo.id},{},function (resp) {
            toastr.success("删除客户组成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (err) {
            toastr.error("删除客户组失败！");
        });
    };

    //新增客户组
    $("#addCustomer").click(function () {
        $("#customerName").removeClass("input-err");
        $("#createCustomer input").each(function () {
            $(this).val("");
        });

    });
    $scope.createCustomer = function () {
        $("#modalConfirmCreateCustomer").attr("data-dismiss","modal");
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
                    toastr.success("创建客户组成功！");
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                },
                error:function (err) {
                    toastr.error("创建客户组失败！");
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
    };

    //显示现有信息
    $scope.setCustomerInfo = function () {
        $("#refreshCustomerPhone").val($scope.customerInfo.phone);
        $("#refreshCustomerEmail").val($scope.customerInfo.email);
        $("#refreshCustomerAddress").val($scope.customerInfo.address);
        $("#refreshCustomerAddInfo").val($scope.customerInfo.additional_info);
        console.log($scope.customerInfo.phone);
    };

    //修改客户组信息
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
                toastr.success("修改客户组信息成功！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            },
            error:function () {
                toastr.error("修改客户组信息失败！");
            }
        });
    };

    //展示客户组下所有设备
    $scope.showDeviceList = function () {
      var deviceListObj = $resource("/api/device/customerDevices/:customerId?limit=1000");
      $scope.deviceListInfo = deviceListObj.query({customerId:$scope.customerId});
      console.log($scope.deviceListInfo);
    };
    //清空客户组所有设备
    $scope.deleteCustomerDevice = function () {
        var emptyObj = $resource("/api/device/unassign/customerDevices/:customerId");
        var emptyInfo = emptyObj.delete({customerId:$scope.customerId},{},function (resp) {
            toastr.success("已清空当前客户组所有设备！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (err) {
            toastr.error("清空当前客户组所有设备失败！");
        });
    };
    

    //样式
    $(".highlight").mouseover(function () {
        $(this).css("color","#337ab7");
    });
    $(".highlight").mouseout(function () {
        $(this).css("color","#305680");
    });
}]);