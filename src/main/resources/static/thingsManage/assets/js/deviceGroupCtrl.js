mainApp.controller("DevGroupCtrl", function ($scope, $resource) {
    //获取设备组
    $scope.showAll = true;
    var Devicegroup = $resource('/api/group/allgroups?limit=20');
    $scope.DeviceGroups = Devicegroup.query(function () {
        //初始化右侧视图
        $scope.item = $scope.DeviceGroups[0];
        console.log($scope.item);
        //初始化设备组的设备视图
        var DGDEVICES = $resource('/api/group/:id/devices?limit=20', {id: '@id'});
        DGDEVICES.query({id: $scope.item.id})
            .$promise.then(function (person) {
            $scope.myData = person;
            console.log("$scope.myData");
            console.log($scope.myData);
        });
    });


    //添加设备组
    $scope.addDG = function () {
        if ($scope.addDGName != "" && $scope.addDGName != null) {
            var addDG = $resource('/api/group/create');
            addDG.save({}, {"name": $scope.addDGName})
                .$promise.then(function (resp) {
                console.log("新建设备组成功");
                console.log(resp);
                $("#addRule").modal("hide");
                location.reload();
            });
        } else {
            alert("输入不能为空!");
        }
    }

    //按照关键词查找设备组，返回一个数组
    $scope.searchDG = function () {
        if ($scope.dgname != "" && $scope.dgname != null) {
            var searchDG = $resource('/api/group/allgroups?limit=20&textSearch=:name', {name: '@name'});
            searchDG.query({name: $scope.dgname})
                .$promise.then(function (person) {
                console.log($scope.dgname);
                if (person == false) {
                    //如无此结果返回[]
                    $scope.showInfo = false;
                    alert("无设备组[" + $scope.dgname + "]信息，请输入正确设备组名!");
                    location.reload();
                } else {
                    $scope.showInfo = true;
                    $scope.showAll = false;
                    $scope.Searchresults = person;
                }
            });
        }
        else {
            alert("输入不能为空!");
        }
    };

    //删除设备组
    $scope.delDG = function () {
        var delDG = $resource('/api/group/delete/:id', {id: '@id'});
        delDG.delete({}, {id: $scope.item.id}, function (resp) {
            console.log("删除成功:id=" + $scope.item.id + ";name=" + $scope.item.name);
            $("#delDG").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("1234再来一次");
            alert("删除失败，请重试！")
        });
    }


    //编辑设备组名
    /****暂无此接口
     $scope.editDGName=function(){
        if ($scope.editdg != "" && $scope.editdg != null){
            var editDG = $resource('http://localhost:8082/person/:id', {id: '@id'});
            editDG.save({id: $scope.item.id},$scope.editdg)
                .$promise.then(function (resp) {
                console.log("信息修改成功:id=" + $scope.item.id + ";name=" + $scope.item.name);
                $("#editDGName").modal("hide");
                location.reload();
            });
        }else{
            alert("输入不能为空!");
        }
    }
     *****/


    //右侧视图展示设备组详情
    $scope.show = function (DG) {
        //item是当前展示的单个设备
        $scope.item = {name: DG.name, id: DG.id};
        //获取设备组下的设备接口
        var DGDEVICES = $resource('/api/group/:id/devices?limit=20', {id: '@id'});
        DGDEVICES.query({id: $scope.item.id})
            .$promise.then(function (person) {
            $scope.myData = person;
        });
    };


    /*******显示设备组内设备********/
    //点击按钮查看令牌
    var tokenObj = $resource('/api/device/token/:deviceId', {id: '@id'});
    $scope.showToken = function (data) {
        console.log("向后台获取设备Token中...")
        $scope.tokenJson = tokenObj.get({deviceId: data.id})
            .$promise.then(function (value) {
                $scope.token = value.deviceToken;
                console.log($scope.token);
            });
    };
    /****END***/


    /*****设备组取消关联某设备*****/
    $scope.giveData = function (data) {
        console.log("ng-repeat中的data赋值给作用域");
        $scope.devInGroup = data;
    }//此方法用于将ng-repeat里的data赋值给作用域。非上策

    $scope.unAssign = function () {
        console.log("正在向后台发送请求...");
        var DISASS = $resource('/api/group/unassign/:deviceId/:groupId', {deviceId: '@id', groupId: '@id'});
        DISASS.get({deviceId: $scope.devInGroup.id, groupId: $scope.item.id})
            .$promise.then(function (person) {
            $("#warnDelAssign").modal("hide");
            location.reload();
        });
    };
    /****END*****/


    /*************更新设备-copy自deviceList.js***********/
    //信息初始化
    var obj = $resource("/api/device/alldevices?limit=30");//获取所有设备信息
    $scope.deviceList = obj.query();
    var manufacturerObj = $resource("/api/v1/abilityGroup/manufacturers");//获取所有厂商
    $scope.manufacturerInfo = manufacturerObj.query();


    /*设置初始信息*/
    $scope.setValue = function (data) {
        console.log("ng-repeat中的data赋值给作用域");
        $scope.devInGroup = data;

        //通过父设备ID获取父设备名称
        $.ajax({
            url: "/api/device/name/" + data.parentDeviceId,
            contentType: "application/json; charset=utf-8",
            async: false,
            type: "GET",
            success: function (msg) {
                parentName = msg;
            }
        });

        //设置父类设备初始信息
        console.log("父类设备名称：" + parentName);
        $("#reParentId option").each(function () {
            if ($(this).val() == parentName) {
                $(this).attr("selected", true);
            }
        });


        /*设置厂商初始信息*/
        $("#reManufacture option").each(function () {
            if ($(this).val() == data.manufacture) {
                $(this).attr("selected", true);
            }
        });


        /*设置设备类型初始信息*/
        $("#reDeviceType").prepend("<option class='select'>" + data.deviceType + "</option>");
        $("#reDeviceType .select").attr("selected", true);

        /*设置型号初始信息*/
        $("#reModel").prepend("<option class='select'>" + data.model + "</option>");
        $("#reModel .select").attr("selected", true);

        /*设置位置初始信息*/
        $("#reLocation").val(data.location);
        /*设置状态初始信息*/
        $("#reStatus").val(data.status);

    };

    $scope.getManufacture = function () {
        manufacturerId = $("#reManufacture option:selected").attr("class");
        console.log("厂商：" + manufacturerId);
        $("#reDeviceType option").remove();
        $("#reModel option").remove();
        /*根据厂商查询设备类型*/
        console.log("/api/v1/abilityGroup/deviceTypes?manufacturerId=" + manufacturerId);
        var deviceTypeObj = $resource("/api/v1/abilityGroup/deviceTypes?manufacturerId=" + manufacturerId);
        $scope.deviceTypeInfo = deviceTypeObj.query();


        $scope.getDeviceType = function () {
            deviceTypeId = $("#reDeviceType option:selected").attr("class");
            console.log("设备类型：" + deviceTypeId);


            /*根据厂商和设备类型查询设备型号*/
            console.log("/api/v1/abilityGroup/models?manufacturerId=" + manufacturerId + "&deviceTypeId=" + deviceTypeId);
            var deviceModelObj = $resource("/api/v1/abilityGroup/models?manufacturerId=" + manufacturerId + "&deviceTypeId=" + deviceTypeId);
            $scope.deviceModelInfo = deviceModelObj.query();

            $scope.getDeviceModel = function () {
                deviceModelId = $("#reModel option:selected").attr("class");
                console.log("设备型号:" + deviceModelId);
            };
        };
    };


    /*更新设备*/
    var refreshDeviceObj = $resource("/api/device/updatedevice");
    $scope.refreshDevice = function () {
        $scope.reName = $("#reName").val();
        $scope.reParent = $("#reParentId option:selected").attr("class");
        $scope.reDeviceType = $("#reDeviceType").val();
        $scope.reManufacture = $("#reManufacture").val();
        $scope.reModel = $("#reModel").val();
        $scope.reLocation = $("#reLocation").val();
        $scope.reStatus = $("#reStatus").val();
        $scope.refreshDeviceInfo = '{"name":' + '"' + $scope.reName + '"' + ',"Id":' + '"' + $scope.devInGroup.id + '"' + ',"parentDeviceId":' + '"' + $scope.reParent + '"' + ',"deviceType":' + '"' + $scope.reDeviceType + '"' + ',"manufacture":' + '"' + $scope.reManufacture + '"' + ',"model":' + '"' + $scope.reModel + '"' + ',"location":' + '"' + $scope.reLocation + '"' + ',"status":' + '"' + $scope.reStatus + '"' + '}';
        //字符串类型的数据发送给后台是会自动加上引号
        console.log($scope.refreshDeviceInfo);
        $scope.refreshDeviceInformation = refreshDeviceObj.save({}, $scope.refreshDeviceInfo, function (resp) {
            //toastr.success("更新设备成功！");
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }, function (error) {
            toastr.error("更新设备失败！");
        });
    };
    /**************更新设备END****************/
});