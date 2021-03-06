mainApp.controller("deviceModelCtrl", function ($scope, $resource) {
    //获取所有设备型号
    var deviceTypeGroup = $resource('/api/devicetype/getAll');
    $scope.deviceTypeGroups = deviceTypeGroup.query();
    // console.log("展示deviceType");
    // console.log($scope.deviceTypeGroups);

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
    $scope.showDefultIcon = false;
    $scope.showIconPictrue = function () {
        $scope.showDefultIcon = !$scope.showDefultIcon;
        console.log( $scope.showDefultIcon);
    };




    var createDeviceModel = {};
    createDeviceModel.icon = "";
    /**/$scope.imgSrcDeviceIcon1 = function () {
        console.log("imgSrcDeviceIcon1");
        createDeviceModel.icon = "../images/deviceIcon1.png";
        $scope.deviceIconShow = "../images/deviceIcon1.png";
    };
    $scope.imgSrcDeviceIcon2 = function () {
        console.log("imgSrcDeviceIcon2");
        createDeviceModel.icon = "../images/deviceIcon2.jpg";
        $scope.deviceIconShow =  "../images/deviceIcon2.jpg";
    };
    $scope.imgSrcDeviceIcon3 = function () {
        console.log("imgSrcDeviceIcon3");
        createDeviceModel.icon = "../images/deviceIcon3.png";
        $scope.deviceIconShow = "../images/deviceIcon3.png";
    };
    $scope.imgSrcTitle = function () {
        console.log("imgSrcDeviceIcon4");
        createDeviceModel.icon = "../images/title.icon";
        $scope.deviceIconShow =  "../images/title.icon";
    };
    /*$("#imgSrcDeviceIcon1").click(function(){
        console.log("imgSrcDeviceIcon1");
        createDeviceModel.icon = "../images/deviceIcon1.png";
        $("#abcv").val("../images/deviceIcon1.png");
    });
    $("#imgSrcDeviceIcon2").click(function(){
        console.log("imgSrcDeviceIcon2");
        createDeviceModel.icon = "../images/deviceIcon2.jpg";
        $("#abcv").val("../images/deviceIcon2.jpg");
    });
    $("#imgSrcDeviceIcon3").click(function(){
        console.log("imgSrcDeviceIcon3");
        createDeviceModel.icon = "../images/deviceIcon3.png";
        $("#abcv").val("../images/deviceIcon3.png");
    });
    $("#imgSrcTitle").click(function(){
        console.log("imgSrcDeviceIcon4");
        createDeviceModel.icon = "../images/title.icon";
        $("#abcv").val("../images/title.icon");
    });*/


    $scope.addDeviceModel = function () {
        createDeviceModel.manufacturerName = $("#manufacturerName").val();
        createDeviceModel.deviceType = $("#deviceType").val();
        createDeviceModel.model = $("#deviceModel").val();

        createDeviceModel.limit_lifetime = $("#limitTime").val();

        if (createDeviceModel.limit_lifetime == ""){
            createDeviceModel.limit_lifetime = 0;
        }else {
            var firstNum = createDeviceModel.limit_lifetime.substring(0,1);
            //console.log(firstNum);
            var secondNum = createDeviceModel.limit_lifetime.substring(1,2);
            //console.log(secondNum);
            var thirdNum = createDeviceModel.limit_lifetime.substring(3,4);
            //console.log(thirdNum);
            var fourthNum = createDeviceModel.limit_lifetime.substring(4,5);
            //console.log(fourthNum);
            var fifthNum = createDeviceModel.limit_lifetime.substring(6,7);
            //console.log(fifthNum);
            var sixthNum = createDeviceModel.limit_lifetime.substring(7,8);
            //console.log(sixthNum);
            const longNum = parseInt(firstNum)*10*3600000 + parseInt(secondNum)*3600000 + parseInt(thirdNum)*10*60000 + parseInt(fourthNum)*60000 + parseInt(fifthNum)*10*1000 + parseInt(sixthNum)*1000;
            //console.log(longNum);
            createDeviceModel.limit_lifetime = longNum;
        }
        if(createDeviceModel.icon == ""){
            createDeviceModel.icon = "../images/deviceDefult.PNG";
        }

        //console.log(createDeviceModel.icon);
        $scope.createDeviceModel = JSON.stringify(createDeviceModel);

        //console.log($scope.createDeviceModel);
        var createDeviceGroupObj =  $resource("/api/devicetype/insert");
        $scope.deviceInfomation = createDeviceGroupObj.save({},$scope.createDeviceModel,function (resp) {
            //console.log(resp);
            toastr.success("创建成功！");
           setTimeout(function () {
                window.location.reload();
            },500);
        },function (error) {
            toastr.error("创建失败！");
        });
    };


    /*删除*/
    $scope.deleteDeviceTypeIcon = function (item) {
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

    /*编辑查看*/
    $scope.editDeviceTypeIcon = function (item) {
        //console.log(item);
        var deviceChangeGroup = $resource('/api/devicetype/getById/:modelId');
        deviceChangeGroup.get({modelId:item.model.modelId},{},function (info) {
            // console.log(info);
            // console.log(info.model.modelName);
            $scope.modifyDeviceModel = info.model.modelName;
            $scope.modelIdSave = info.model.modelId;
            // console.log(info.manufacturer.manufacturerName);
            $scope.modifyManufacturerName = info.manufacturer.manufacturerName;
            $scope.manufacturerIdSave = info.manufacturer.manufacturerId;
            // console.log(info.deviceType.deviceTypeName);
            $scope.modifyDeviceType = info.deviceType.deviceTypeName;
            $scope.deviceTypeIdSave = info.deviceType.deviceTypeId;
            // console.log(info.model.deviceIcon);
            $scope.modifyDeviceIcon = info.model.deviceIcon;
            //console.log(info.model.limitLifetime);
            $scope.modifyDeviceDate = info.model.limitLifetime;
        });
    };

    /*编辑提交/api/devicetype/update/{modelId}/{deviceTypeId}/{manufacturerId}更新设备型号管理组PUT方法*/
    $scope.saveModifyDeviceModel = function () {
        //console.log($scope.modelIdSave);
        //console.log($scope.deviceTypeIdSave);
        //console.log($scope.manufacturerIdSave);

        var saveDeviceModel = {};
        saveDeviceModel.manufacturerName = $scope.modifyManufacturerName;
        saveDeviceModel.deviceType = $scope.modifyDeviceType;
        saveDeviceModel.model = $scope.modifyDeviceModel;
        saveDeviceModel.limit_lifetime = $scope.modifyDeviceDate;
        saveDeviceModel.icon = $scope.deviceIconShow;
        if(typeof(saveDeviceModel.icon) == "undefined"){
            saveDeviceModel.icon = $scope.modifyDeviceIcon;
        }
        console.log(saveDeviceModel);
        $scope.saveStringDeviceModel = JSON.stringify(saveDeviceModel);
        console.log($scope.saveStringDeviceModel);
        $.ajax({
            url: "/api/devicetype/update/"+$scope.modelIdSave+"/"+$scope.deviceTypeIdSave+"/"+$scope.manufacturerIdSave,
            data: $scope.saveStringDeviceModel,
            contentType: "application/json; charset=utf-8",//post请求必须
            dataType: "text",
            type: "PUT",
            success: function (msg) {
                    toastr.success("保存成功！");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);

            },
            error: function (err) {
                toastr.error("保存成功失败！");
            }
        });


       /* var saveDeviceGroupObj =  $resource("/api/devicetype/update/:modelId/:deviceTypeId/:manufacturerId");
        $scope.deviceInfomation = saveDeviceGroupObj.save({modelId:$scope.modelIdSave,deviceTypeId:$scope.deviceTypeIdSave,manufacturerId:$scope.manufacturerIdSave},$scope.saveStringDeviceModel,function () {
            toastr.success("！");
            setTimeout(function () {
            },500);
        },function (error) {
            toastr.error("保存失败！");
        });*/

    }

});