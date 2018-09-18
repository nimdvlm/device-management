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
    $scope.deleteDeviceType = function (item) {
        console.log(item);
        console.log(item.model.modelId);
        var deleteDevice = $resource('/api/devicetype/delete?modelId=:id');
        deleteDevice.delete({id: item.model.modelId},{} , function (resp) {
            console.log(resp);
            alert("删除success！");
            location.reload();
        }, function (resp) {
            console.log("删除失败");
            alert("删除失败！")
        });
    }

    /*删除能力组
    $scope.delAG = function () {
        var delAGObj = $resource('/api/v1/abilityGroup?modelId=:id');
        delAGObj.delete({id: modelId},{} , function (resp) {
            //console.log(resp);
            $("#deleteSM").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("删除失败");
            alert("删除失败！")
        });
    }*/

});