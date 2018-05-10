
mainApp.controller("deviceListCtrl",["$scope","$resource","$http",function ($scope,$resource,$http) {
    var deviceInfo;//用于记录当前选中的设备

    /*设备列表信息获取与展示*/
    var obj = $resource("/api/device/alldevices");
    $scope.deviceList = obj.query();//返回值为整个接口返回的内容
    console.log($scope.deviceList);
    $scope.show = function (data) {
        deviceInfo = data;
        console.log(data);
        $scope.ID = data.id;
        $scope.deviceName = data.name;
        $scope.deviceType = data.deviceType;
        $scope.location = data.location;
        $scope.manufacture = data.manufacture;
        $scope.status = data.status;
        $scope.parentId = data.parentDeviceId;
        $scope.model = data.model;
    };


    /*新增设备*/
    var createDeviceObj =  $resource("/api/device/create");
    $scope.createDevice = function(){
        $scope.name = $("#name").val();
        $scope.parent = $("#parentId").val();
        $scope.deviceType = $("#deviceType").val();
        $scope.manufacture = $("#manufacture").val();
        $scope.model = $("#model").val();
        $scope.location = $("#location").val();
        $scope.status = $("#status").val();
        $scope.createDeviceInfo = '{"name":'+'"'+$scope.name+'"'+',"parentDeviceId":'+'"'+$scope.parent+'"'+',"deviceType":'+'"'+$scope.deviceType+'"'+',"manufacture":'+'"'+$scope.manufacture+'"'+',"model":'+'"'+$scope.model+'"'+',"location":'+'"'+$scope.location+'"'+',"status":'+'"'+$scope.status+'"'+'}';
        console.log($scope.createDeviceInfo);
        $scope.deviceInformation = createDeviceObj.save({},$scope.createDeviceInfo,function (resp) {
            toastr.success("新增设备成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        },function (error) {
            toastr.error("新增设备失败！");
        });
    };

    /*删除设备*/
    var deleteDeviceObj = $resource("/api/device/delete/:deviceId");
    $scope.delete = function(){
        console.log(deviceInfo);
        console.log(deviceInfo.id);
        $scope.deleteDevice = deleteDeviceObj.delete({deviceId:deviceInfo.id},{},function (resp) {
            toastr.success("删除设备成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        },function (error) {
            toastr.error("删除设备失败！");
        });
    };

    /*查看令牌*/
    var tokenObj = $resource("/api/device/token/:deviceId");
    $scope.showToken = function () {
        var tokenJson = tokenObj.get({deviceId:deviceInfo.id});
        console.log(tokenJson);
        $scope.token = tokenJson.credentialsId;
        console.log(tokenJson.credentialsId);

    }








    /*更新设备*/
    // var refreshObj = $resource("");

    /*分配设备*/

}]);


