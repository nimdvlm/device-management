
mainApp.controller("deviceListCtrl",["$scope","$resource",function ($scope,$resource) {
    $scope.deviceInfo;//用于记录当前选中的设备
    var parentName;//用于记录父设备名称


    /*设备列表信息获取与展示*/
    var obj = $resource("/api/device/alldevices?limit=30");
    $scope.deviceList = obj.query();//返回值为限制个数的所有设备信息
    console.log($scope.deviceList);

    /*在右侧表格中显示各个设备的信息*/
    $scope.show = function (data) {
        //通过父设备ID获取父设备名称
        $.ajax({
            url:"/api/device/name/"+data.parentDeviceId,
            contentType: "application/json; charset=utf-8",
            async: false,
            type:"GET",
            success:function(msg) {
               parentName = msg;
            }
        });

        /*
       //angularjs会将string类型变量解析成object
       var parentNameObj = $resource("/api/device/name/:parentId");
        $scope.parentName = parentNameObj.get({parentId:data.parentDeviceId});
        */

        $scope.deviceInfo = data;
        console.log(data);
        $scope.ID = data.id;
        $scope.deviceName = data.name;
        $scope.deviceType = data.deviceType;
        $scope.location = data.location;
        $scope.manufacture = data.manufacture;
        $scope.status = data.status;
        $scope.parentName = parentName;//父设备名
        console.log("$scope.parentName:"+$scope.parentName);
        $scope.model = data.model;
    };




    /*删除设备*/
    var deleteDeviceObj = $resource("/api/device/delete/:deviceId");
    $scope.delete = function(){
        console.log($scope.deviceInfo);
        console.log($scope.deviceInfo.id);
        $scope.deleteDevice = deleteDeviceObj.delete({deviceId:$scope.deviceInfo.id},{},function (resp) {
            toastr.success("删除设备成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);

        },function (error) {
            toastr.error("删除设备失败！");
        });
    };

    /*查看令牌*/
    var tokenObj = $resource("/api/device/token/:deviceId");
    $scope.showToken = function (){
        $scope.tokenJson = tokenObj.get({deviceId:$scope.deviceInfo.id})
            .$promise.then(function (value) {
                $scope.token = value.deviceToken;
                console.log($scope.token);
            });
    };



    /*分配设备*/
    var deviceGroupObj = $resource("/api/group/allgroups?limit=300");
    var deviceGroupAssignObj = $resource("/api/group/assign/:deviceId/:groupId");
    $scope.deviceGroup = deviceGroupObj.query();
    $scope.assignDeviceGroup = function(){
        var groupId = $("#deviceGroupSelect option:selected").attr("id");
        console.log("groupId:"+groupId);
        console.log("deviceInfo:"+$scope.deviceInfo.id);
        $scope.deviceGroupAssign = deviceGroupAssignObj.get({deviceId:$scope.deviceInfo.id,groupId:groupId},
            function (resp) {
            toastr.success("设备分配成功！");
            },function (err) {
            toastr.error("设备分配失败！");
        });
    };








    /*所有厂商*/
    var manufacturerObj = $resource("/api/v1/abilityGroup/manufacturers");
    $scope.manufacturerInfo = manufacturerObj.query();

    var manufacturerId;//用于记录厂商id
    var deviceTypeId;//用于记录设备类型id
    var deviceModelId;//用于记录设备型号id



    /* =============================================================
       更新设备
     ============================================================ */
    /*获取厂商*/

    /*设置初始信息*/
    $scope.setValue = function (){
        //设置父类设备初始信息
        console.log("父类设备名称："+parentName);
        $("#reParentId option").each(function () {
            if($(this).val() == parentName){
                $(this).attr("selected",true);
            }
        });


        /*设置厂商初始信息*/
        $("#reManufacture option").each(function () {
            if($(this).val() == $scope.deviceInfo.manufacture){
                $(this).attr("selected",true);
            }
        });


        /*设置设备类型初始信息*/
        $("#reDeviceType").prepend("<option class='select'>"+$scope.deviceInfo.deviceType+"</option>");
        $("#reDeviceType .select").attr("selected",true);

        /*设置型号初始信息*/
        $("#reModel").prepend("<option class='select'>"+$scope.deviceInfo.model+"</option>");
        $("#reModel .select").attr("selected",true);

        /*设置位置初始信息*/
        $("#reLocation").val($scope.deviceInfo.location);
        /*设置状态初始信息*/
        $("#reStatus").val($scope.deviceInfo.status);

    };









    $scope.getManufacture = function () {
        manufacturerId = $("#reManufacture option:selected").attr("class");
        console.log("厂商："+manufacturerId);
        $("#reDeviceType option").remove();
        $("#reModel option").remove();
          /*根据厂商查询设备类型*/
        console.log("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        var deviceTypeObj = $resource("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        $scope.deviceTypeInfo = deviceTypeObj.query();


        $scope.getDeviceType = function () {
            deviceTypeId = $("#reDeviceType option:selected").attr("class");
            console.log("设备类型："+deviceTypeId);


            /*根据厂商和设备类型查询设备型号*/
            console.log("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            var deviceModelObj = $resource("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            $scope.deviceModelInfo = deviceModelObj.query();

            $scope.getDeviceModel = function () {
                deviceModelId = $("#reModel option:selected").attr("class");
                console.log("设备型号:"+deviceModelId);
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
        $scope.refreshDeviceInfo = '{"name":'+'"'+$scope.reName+'"'+',"Id":'+'"'+$scope.deviceInfo.id+'"'+',"parentDeviceId":'+'"'+$scope.reParent+'"'+',"deviceType":'+'"'+$scope.reDeviceType+'"'+',"manufacture":'+'"'+$scope.reManufacture+'"'+',"model":'+'"'+$scope.reModel+'"'+',"location":'+'"'+$scope.reLocation+'"'+',"status":'+'"'+$scope.reStatus+'"'+'}';
        //字符串类型的数据发送给后台是会自动加上引号
        console.log($scope.refreshDeviceInfo);
        $scope.refreshDeviceInformation = refreshDeviceObj.save({},$scope.refreshDeviceInfo,function (resp) {
            toastr.success("更新设备成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (error) {
            toastr.error("更新设备失败！");
        });
    };
    /* =============================================================
             更新设备End
        ============================================================ */






    /* =============================================================
          创建设备
        ============================================================ */
    $scope.getCreateManufacture = function () {
        manufacturerId = $("#manufacture option:selected").attr("class");
        console.log("厂商："+manufacturerId);


        /*根据厂商查询设备类型*/
        console.log("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        var deviceTypeObj = $resource("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        $scope.deviceTypeInfo = deviceTypeObj.query();


        $scope.getCreateDeviceType = function () {
            deviceTypeId = $("#deviceType option:selected").attr("class");
            console.log("设备类型："+deviceTypeId);


            /*根据厂商和设备类型查询设备型号*/
            console.log("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            var deviceModelObj = $resource("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            $scope.deviceModelInfo = deviceModelObj.query();

            $scope.getCreateDeviceModel = function () {
                deviceModelId = $("#model option:selected").attr("class");
                console.log("设备型号:"+deviceModelId);
            };
        };
    };

    /*创建设备*/
    var createDeviceObj =  $resource("/api/device/create");
    $scope.createDevice = function(){
        if($("#name").val()){
            $scope.name = $("#name").val();
            $scope.parent = $("#parentId option:selected").attr("class");
            $scope.deviceType = $("#deviceType").val();
            $scope.manufacture = $("#manufacture").val();
            $scope.model = $("#model").val();
            $scope.location = $("#location").val();
            $scope.status = $("#status").val();
            $scope.createDeviceInfo = '{"name":'+'"'+$scope.name+'"'+',"parentDeviceId":'+'"'+$scope.parent+'"'+',"deviceType":'+'"'+$scope.deviceType+'"'+',"manufacture":'+'"'+$scope.manufacture+'"'+',"model":'+'"'+$scope.model+'"'+',"location":'+'"'+$scope.location+'"'+',"status":'+'"'+$scope.status+'"'+'}';
            //字符串类型的数据发送给后台是会自动加上引号
            console.log($scope.createDeviceInfo);
            $scope.deviceInformation = createDeviceObj.save({},$scope.createDeviceInfo,function (resp) {
                window.location.reload();
            },function (error) {
                toastr.error("新增设备失败！");
            });
        }
        else{
            /*增加提示效果*/
            $("#name").addClass("input-err");
            $("#modalConfirm").removeAttr("data-dismiss");
            $('#name').on('focus', function() {
                $(this).removeClass('input-err');
            });
        }

    };
    /* =============================================================
         创建设备End
       ============================================================ */



/*搜索设备*/
$scope.searchDevice = function () {
    var textSearch = $("#searchDeviceText").val();
    var searchDeviceObj = $resource("/api/device/alldevices?limit=20&textSearch="+textSearch);
    $scope.searchDeviceInfo = searchDeviceObj.query();
    console.log($scope.searchDeviceInfo);
    console.log($scope.searchDeviceInfo.length);
    /*if($scope.searchDeviceInfo.$promise.then(function (value) {

        })){
        toastr.warning("设备名称输入有误，无此设备！");
    }*/
    $scope.searchDeviceInfo.$promise.then(function (value) {
        if(value == false){
            toastr.warning("设备名称输入有误，无此设备！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        }
        else{
            $scope.deviceList = $scope.searchDeviceInfo;
            $("#searchDeviceText").on("focus",function () {
                $(this).val("");
            })
        }
    });
};

/*显示详情*/
$scope.showDetail = function () {
    /*显示属性*/
    var attrDetailObj = $resource("/api/data/getKeyAttribute/:deviceId");
    $scope.attrDetailInfo = attrDetailObj.query({deviceId:$scope.deviceInfo.id});
    console.log($scope.attrDetailInfo);

    /*显示遥测数据*/
    var realTimeObj = $resource("/api/data/getlatestData/:deviceId");
    $scope.realTimeInfo = realTimeObj.query({deviceId:$scope.deviceInfo.id});
    console.log($scope.realTimeInfo);
};


    /* =============================================================
         jquery动画效果
       ============================================================ */

/* HIGHLIGHT效果*/
    $(document).ready(function () {
        $(".highlight").mouseover(function () {
            $(this).css("color","#337ab7");
        });
        $(".highlight").mouseout(function () {
            $(this).css("color","#305680");
        });


    });







}]);


