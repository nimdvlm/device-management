mainApp.controller("deviceModelCtrl", function ($scope, $resource) {
    //获取所有设备型号
    var deviceTypeGroup = $resource('/api/devicetype/getAll');
    $scope.deviceTypeGroups = deviceTypeGroup.query();
    console.log("展示deviceType");
    console.log($scope.deviceTypeGroups);

    /*鼠标移入动画效果
    $scope.fadeSiblings = function () {
        $(".deviceTypeIconStyle").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };*/
    /*鼠标移出动画效果
    $scope.reSiblings = function () {
        $(".deviceTypeIconStyle").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
    };*/
    $scope.showDefultIcon = false;
    $scope.showIconPictrue = function () {
        $scope.showDefultIcon = !$scope.showDefultIcon;
        console.log( $scope.showDefultIcon);
    };

    /*删除*/
    $scope.deleteDeviceTypeIcon = function (item) {
        console.log("点击删除出现字段");
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
    };




    var createDeviceModel = {};
    createDeviceModel.icon = "";
    $scope.imgSrcDeviceIcon1 = function () {
        console.log("imgSrcDeviceIcon1");
        createDeviceModel.icon = "../images/deviceIcon1.png";
        $scope.deviceIcon1 = true;
        $scope.deviceIcon2 = false;
        $scope.deviceIcon3 = false;
        $scope.title1 = false;
        console.log(createDeviceModel.icon);
        console.log($scope.deviceIcon1);
    };
    $scope.imgSrcDeviceIcon2 = function () {
        console.log("imgSrcDeviceIcon2");
        createDeviceModel.icon = "../images/deviceIcon2.jpg";
        $scope.deviceIcon1 = false;
        $scope.deviceIcon2 = true;
        $scope.deviceIcon3 = false;
        $scope.title1 = false;
        console.log(createDeviceModel.icon);
        console.log($scope.deviceIcon2);
    };
    $scope.imgSrcDeviceIcon3 = function () {
        console.log("imgSrcDeviceIcon3");
        createDeviceModel.icon = "../images/deviceIcon3.png";
        $scope.deviceIcon1 = false;
        $scope.deviceIcon2 = false;
        $scope.deviceIcon3 = true;
        $scope.title1 = false;
        console.log(createDeviceModel.icon);
        console.log($scope.deviceIcon3);
    };
    $scope.imgSrcTitle = function () {
        console.log("imgSrcDeviceIcon4");
        createDeviceModel.icon = "../images/title.icon";
        $scope.deviceIcon1 = false;
        $scope.deviceIcon2 = false;
        $scope.deviceIcon3 = false;
        $scope.title1 = true;
        console.log(createDeviceModel.icon);
        console.log($scope.title1);
    };
    $scope.addDeviceModel = function () {
        createDeviceModel.manufacturerName = $("#manufacturerName").val();
        createDeviceModel.deviceType = $("#deviceType").val();
        createDeviceModel.model = $("#deviceModel").val();

        createDeviceModel.limit_lifetime = $("#limitTime").val();

        if (createDeviceModel.limit_lifetime == ""){
            createDeviceModel.limit_lifetime = 0;
        }else {
            var firstNum = createDeviceModel.limit_lifetime.substring(0,1);
            console.log(firstNum);
            var secondNum = createDeviceModel.limit_lifetime.substring(1,2);
            console.log(secondNum);
            var thirdNum = createDeviceModel.limit_lifetime.substring(3,4);
            console.log(thirdNum);
            var fourthNum = createDeviceModel.limit_lifetime.substring(4,5);
            console.log(fourthNum);
            var fifthNum = createDeviceModel.limit_lifetime.substring(6,7);
            console.log(fifthNum);
            var sixthNum = createDeviceModel.limit_lifetime.substring(7,8);
            console.log(sixthNum);
            const longNum = parseInt(firstNum)*10*3600000 + parseInt(secondNum)*3600000 + parseInt(thirdNum)*10*60000 + parseInt(fourthNum)*60000 + parseInt(fifthNum)*10*1000 + parseInt(sixthNum)*1000;
            console.log(longNum);
            createDeviceModel.limit_lifetime = longNum;
        }
        if(createDeviceModel.icon == ""){
            createDeviceModel.icon = "../images/deviceDefult.PNG";
        }
        console.log("createDeviceModel.icon");
        console.log(createDeviceModel.icon);
        $scope.createDeviceModel = JSON.stringify(createDeviceModel);

        console.log("查看存入是数值：");
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