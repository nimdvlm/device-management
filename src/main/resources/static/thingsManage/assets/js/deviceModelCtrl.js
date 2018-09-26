mainApp.controller("deviceModelCtrl", function ($scope, $resource) {
    //获取所有设备型号
    var deviceTypeGroup = $resource('/api/devicetype/getAll');
    $scope.deviceTypeGroups = deviceTypeGroup.query();
    console.log("展示deviceType");
    console.log($scope.deviceTypeGroups);

    /*鼠标移入动画效果*/
    $scope.fadeSiblings = function () {
        $(".deviceTypeIconStyle").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };
    /*鼠标移出动画效果*/
    $scope.reSiblings = function () {
        $(".deviceTypeIconStyle").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
    };


    /*删除*/
    $scope.deleteDeviceTypeIcon = function (item) {
        console.log(item);
        console.log(item.model.modelId);
        $scope.modelId = item.model.modelId;
    };
    $scope.deleteDeviceType = function () {
        var deleteDevice = $resource('/api/devicetype/delete?modelId=:id');
        deleteDevice.delete({id: $scope.modelId},{} , function (resp) {
            //console.log(resp);
            toastr.success("删除成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        }, function (resp) {
            toastr.error("删除失败！");
        });
    }

    $scope.addDeviceModel = function () {
        var createDeviceModel = {};
        createDeviceModel.manufacturerName = $("#manufacturerName").val();
        createDeviceModel.deviceType = $("#deviceType").val();
        createDeviceModel.model = $("#deviceModel").val();
        createDeviceModel.icon = $("#potatoIcon").val();
        createDeviceModel.limit_lifetime = $("#limitTime").val();
        console.log(createDeviceModel.limit_lifetime);
        if (createDeviceModel.limit_lifetime == ""){
            createDeviceModel.limit_lifetime = 0;
        }
        console.log(createDeviceModel.limit_lifetime);
        $scope.createDeviceModel = JSON.stringify(createDeviceModel);
        console.log($scope.createDeviceModel);
        var createDeviceGroupObj =  $resource("/api/devicetype/insert");
        $scope.deviceInfomation = createDeviceGroupObj.save({},$scope.createDeviceModel,function (resp) {
            console.log(resp);
            toastr.success("创建成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        },function (error) {
            toastr.error("创建失败！");
        });
    }







});