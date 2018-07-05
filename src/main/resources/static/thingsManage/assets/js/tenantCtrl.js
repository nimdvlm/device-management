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
        $(".homeBackgroundstyle").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };
    /*鼠标移出动画效果*/
    $scope.reSiblings = function () {
        $(".homeBackgroundstyle").mouseout(function () {
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
            //console.log(value.title);
            $scope.tenantDetailShow = value;

        })
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


}]);