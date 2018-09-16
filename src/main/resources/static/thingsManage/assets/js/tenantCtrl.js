mainApp.controller("tenantCtrl",["$scope","$resource","$location",function ($scope,$resource,$location) {
    $scope.$location = $location;
    //设置全局变量
    var tenantID;

//设置右侧详情初始状态
    jQuery('#detailShow').css({'display':''});
    jQuery('#tenantAdministrator').css({'display':'none'});
    jQuery('#tenantThere').css({'display':''});
    jQuery('#createManager').css({'display':'none'});
    $scope.showTenantAue = function () {
        jQuery('#detailShow').css({'display':''});
        jQuery('#tenantAdministrator').css({'display':'none'});
        jQuery('#tenantThere').css({'display':''});
        jQuery('#createManager').css({'display':'none'});
        jQuery('#tenantTow').css({'background-color':'#afd9ee'});
        jQuery('#tenantAue').css({'background-color':'#337ab7'});
    }
    $scope.showTenantTow = function () {
        jQuery('#detailShow').css({'display':'none'});
        jQuery('#tenantAdministrator').css({'display':''});
        jQuery('#tenantThere').css({'display':'none'});
        jQuery('#createManager').css({'display':''});
        jQuery('#tenantTow').css({'background-color':'#337ab7'});
        jQuery('#tenantAue').css({'background-color':'#afd9ee'});
    }

    /*鼠标移入动画效果*/
    $scope.fadeSiblings = function () {
        $(".chooseBtn").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };
    /*鼠标移出动画效果*/
    $scope.reSiblings = function () {
        $(".chooseBtn").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
    };


//获取所有租户
    var tenantGroup = $resource('/api/account/tenants?limit=9&page=0');
    $scope.tenantGroups = tenantGroup.query();
    //console.log($scope.tenantGroups);

//通过ID获取租户详情
    $scope.showTenantDetail = function (item) {
        $scope.tenantGroupID = item.id;
        $scope.tenantTitle = item.title;
        tenantID = item.id;
        //console.log(item.id);
        /*除点击元素外其他元素均无特殊样式*/
        $scope.tenantGroups.forEach(function (items) {
            if(item != items) items.style = {}
        });
        /*给点击元素加上特定样式*/
        item.style = {"border": "2px solid #305680"};

        var tenantDetail = $resource('/api/account/tenant?tenantId=:tenantID',{tenantID:'@id'});
        //console.log(item.id);
        tenantDetail.get({tenantID:item.id}).$promise.then(function (value) {
            console.log("查看是否显示disable");
            console.log(value);
            $scope.tenantDisable = value.suspendedStatus;
            console.log($scope.tenantDisable);
            $scope.tenantId = value.id;
            console.log($scope.tenantId);
            //判断显示哪种按钮；
            if($scope.tenantDisable == "false"){
                $scope.enable_disable = true;
                $scope.tenantDisable = false;
            }else {
                $scope.enable_disable = false;
                $scope.tenantDisable = true;
            }

            $scope.tenantDetailShow = value;

        })
        /*点击显示租户管理员详情*/
        var tenantAdminDetail = $resource('/api/account/tenant/users?tenantId=:adminID'+'&limit=9&page=0',{adminID:tenantID});
        $scope.tenantAdminInfo = tenantAdminDetail.query();
        console.log("value2:");
        console.log($scope.tenantAdminInfo);
        //console.log($scope.tenantAdminInfo);

    }

//修改租户信息（通过body中的ID来获取指定租户）
    $scope.editTenant = function () {
        //console.log($scope.tenantGroupID);
        //console.log($scope.tenantTitle);
        //console.log(tenantID);
        var email=$("#reTenantEmail").val();
        var additional_info=$("#reTenantInfo").val();
        var phone=$("#reTenantPhone").val();
        var address=$("#reTenantAddress").val();

        var editTenantGroup = '{"id":'+'"'+$scope.tenantGroupID+'"'+',"email":'+'"'+email+'"'+',"title":'+'"'+$scope.tenantTitle+'"'+',"additional_info":'+'"'+additional_info+'"'+',"phone":'+'"'+phone+'"'+',"address":'+'"'+address+'"'+'}';
        console.log(editTenantGroup);
        $.ajax({
            url:"/api/account/tenant",
            data:editTenantGroup,
            type:"PUT",
            contentType: "application/json; charset=utf-8",//post请求必须
            success:function () {
                toastr.success("修改成功！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            },
            error:function () {
                alert("编辑失败");
            }
        });

    }

//创建租户
    $("#addTenant").click(function () {
        $("#tenantName").removeClass("input-err");
        $("#addTenantGroup input").each(function () {     //each为每个匹配元素规定要运行的函数
            $(this).val("");
        });
    });

    $scope.createTenant = function () {
        $("#modalConfirmCreateTenant").attr("data-dismiss","modal");//attr设置或返回被选元素的属性或值；
        if($("#tenantName").val()){
            var email = $("#tenantEmail").val();
            var title = $("#tenantName").val();
            var additional_info =$("#tenantInfo").val();
            var address = $("#tenantAddress").val();
            var phone = $("#tenantPhone").val();
            var createTenantInfo = '{"email":'+'"'+email+'"'+',"title":'+'"'+title+'"'+',"additional_info":'+'"'+additional_info+'"'+',"phone":'+'"'+phone+'"'+',"address":'+'"'+address+'"'+'}';
            console.log(createTenantInfo);
            $.ajax({
                url:"/api/account/tenant",
                data:createTenantInfo,
                type:"POST",
                contentType: "application/json; charset=utf-8",//post请求必须
                success:function (resp) {
                    toastr.success("创建成功！");
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                },
                error:function (err) {
                    alert("创建失败！");
                }
            });

        }else{
            /*增加提示效果*/
            $("#tenantName").addClass("input-err");
            $("#modalConfirmCreateTenant").removeAttr("data-dismiss");
            $('#tenantName').on('focus', function() {
                $(this).removeClass('input-err');
            });
        }
    };

//删除租户
    $scope.deleteTenant = function () {
        console.log($scope.tenantGroupID);
        var deleteObj = $resource("/api/account/tenant?tenantId=:tenantId",{tenantId:"@id"});
        deleteObj.delete({tenantId:$scope.tenantGroupID},{},function (resp) {
            toastr.success("删除成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (err) {
            toastr.error("删除失败！");
        });
    };

//Admin查看租户管理员详情
    $scope.showAdminInfo = function (value) {
       //console.log(value);

       var adminInfo = $resource('/api/account/user?userId=:userID',{userID:'@id'});
       adminInfo.get({userID:value.id}).$promise.then(function (items) {
           $scope.adminInformation = items;
       })
    }

//Admin创建租户管理员
    $("#createManager").click(function () {
        $("#adminName").removeClass("input-err");
        $("#addTenantManager input").each(function () {     //each为每个匹配元素规定要运行的函数
            $(this).val("");
        });
    });

    $scope.addAdmin = function (vale) {
        $("#modalConfirmCreateAdmin").attr("data-dismiss","modal");//attr设置或返回被选元素的属性或值；
        if($("#adminName").val()){
            var name = $("#adminName").val();
            var additional_info = $("#adminAdditional_info").val();
            var email = $("#adminEmail").val();
            var password = $("#adminPassword").val();
            var createAdminInfo = '{"tenant_id":'+'"'+tenantID+'"'+',"name":'+'"'+name+'"'+',"additional_info":'+'"'+additional_info+'"'+',"email":'+'"'+email+'"'+',"password":'+'"'+password+'"'+'}';
            console.log(createAdminInfo);
            $.ajax({
                url:"/api/account/tenantAdmin",
                data:createAdminInfo,
                type:"POST",
                contentType: "application/json; charset=utf-8",//post请求必须
                success:function (resp) {
                    toastr.success("创建成功！");
                    setTimeout(function () {
                        window.location.reload();
                    },1000);
                },
                error:function (err) {
                    alert("创建失败！");
                }
            });

        }else{
            /*增加提示效果*/
            $("#adminName").addClass("input-err");
            $("#modalConfirmCreateAdmin").removeAttr("data-dismiss");
            $('#adminName').on('focus', function() {
                $(this).removeClass('input-err');
            });
        }


    }


//Admin删除租户管理员
    $scope.deleteAdmin = function (data) {
        //console.log(data);
        var result = confirm("确定删除此租户管理员？");
        if(result){
            var deleteAdmin = $resource("/api/account/user?userId=:userID",{userID:"@id"});
            deleteAdmin.delete({userID:data.id},{},function (resp) {
                toastr.success("删除成功！");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            },function (err) {
                alert("删除失败！");
            });
        }else {
            alert("不删除?");
        }
    }




    $scope.enableDisable = function () {
        /*console.log($scope.tenantDisable);
        console.log($scope.tenantId);
        console.log($scope.enable_disable);*/
        $scope.enable_disable = !$scope.enable_disable;
        $scope.tenantDisable = !$scope.tenantDisable;

        $.ajax({
            url: "/api/account/tenant/updateSuspendedStatus?suspended="+$scope.tenantDisable+"&tenantId="+$scope.tenantId,
            contentType: "application/json; charset=utf-8",//post请求必须
            dataType: "text",
            type: "PUT",
            success: function () {
                toastr.success("success!");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            },
            error: function () {
                toastr.error("失败！");

            }
        });
    }


}]);