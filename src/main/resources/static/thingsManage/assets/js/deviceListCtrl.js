
mainApp.controller("deviceListCtrl",["$scope","$resource",function ($scope,$resource) {

    /*设备列表信息获取与展示*/
    var obj = $resource("/api/device/alldevices");
    $scope.deviceList = obj.query();//data返回值为整个接口返回的内容
    console.log($scope.deviceList);
    $scope.show = function (data) {
        console.log(data);
        $scope.ID = data.deviceId;
        $scope.deviceName = data.name;
        $scope.deviceType = data.type;
        $scope.description = data.additionalInfo;
        $scope.createTime = data.createTime;
        $scope.status = data.status;
    }
    $scope.delete = function(id){

    }

}]);


