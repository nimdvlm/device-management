mainApp.controller("abilityCtrl", function ($scope, $resource) {



    /*var abilityInfo;

    var obj = $resource('/api/v1/abilityGroup');
    $scope.abilityGroup = obj.query();
    console.log($scope.abilityGroup);
    deviceInfo =*/
    /*能力组信息获取与展示*/
    var abilityGroup = $resource('/api/v1/abilityGroup');
    $scope.abilityGroups = abilityGroup.query(function () {
        $scope.items = $scope.abilityGroups[0];
    });



    /*创建能力组*/
    var createAbilityObj =  $resource("/api/v1/abilityGroup");
    $scope.addAM = function(){
        $scope.manufacturerName = $("#manufacturerName").val();
        $scope.deviceType = $("#deviceType").val();
        $scope.model = $("#model").val();
        $scope.createAbilityInfo = '{"manufacturerName":'+'"'+$scope.manufacturerName+'"'+',"deviceType":'+'"'+$scope.deviceType+'"'+',"model":'+'"'+$scope.model+'"'+'}';
        console.log($scope.createAbilityInfo);
        $scope.abilityInformation = createAbilityObj.save({},$scope.createAbilityInfo,function (resp) {
            toastr.success("新增设备成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        },function (error) {
            toastr.error("新增设备失败！");
        });
    };

    /*删除能力组*/
    $scope.delAM = function () {
        var delAM = $resource('/api/v1/abilityGroup');
        delAM.delete({}, {id: $scope.item.id}, function (resp) {
            console.log("删除成功:id=" + $scope.item.id + ";name=" + $scope.item.name);
            $("#delAM").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("1234再来一次");
            alert("删除失败，请重试！")
        });
    }


    /*搜索能力组*/
    /*展示platform*/
    $scope.showURL = function () {
        if($parent.ad == thirdparty){
           $scope.myvar = true;
        }else{
            $scope.myvar = flase;
        }

    }



});

   /* var obj = $resource("/api/device/alldevices");
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

    //右侧视图展示设备组详情
    $scope.show = function (DG) {
        //item是当前展示的单个设备
        $scope.item = {name: DG.name, id: DG.id};


        //获取设备组下的设备接口
        var DGDEVICES = $resource('/api/group/:id/devices', {id: '@id'});
        DGDEVICES.query({id: $scope.item.id})
            .$promise.then(function (person) {
            $scope.DGDevices=person;
            console.log("获取设备组下的设备："+$scope.DGDevices);
        });
    };



})*/
