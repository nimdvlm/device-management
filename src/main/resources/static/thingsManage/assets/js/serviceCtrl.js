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

    /*删除能
    $scope.delAM = function () {
        var delAM = $resource('/api/v1/abilityGroup/:id',{id: '@id'});
        delAM.delete({}, {id: $scope.items.id}, function (resp) {
            console.log("删除成功:id=" + $scope.items.id + ";name=" + $scope.items.name);
            $("#delAM").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("1234再来一次");
            alert("删除失败，请重试！")
        });
    }力组*/


    var deleteAbilityObj = $resource("/api/v1/abilityGroup/:modelId");
    $scope.delAM = function(){
        console.log(abilityInfo);
        console.log(abilityInfo.id);
        $scope.deleteAbility = deleteAbilityObj.delAM({modelId:abilityInfo.id},{},function (resp) {
            toastr.success("删除设备成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);

        },function (error) {
            toastr.error("删除设备失败！");
        });
    };
    /*搜索能力组
    *
    *
    *
    * */
    /*展示platform*/
    $scope.showURL = function () {
        if($parent.ad == thirdparty){
           $scope.myvar = true;
        }else{
            $scope.myvar = flase;
        }

    }

    /*+号添加参数*/
    $scope.itemc=[];  //初始化数组，以便为每一个ng-model分配一个对象
    var i=0;
    $scope.CC= {
        addPlus: function () {     //每次添加都要给items数组的长度加一
            $scope.itemc[i] = 0;
            i++;
        },
        delPlus: function (key) {   //每次删除一个输入框都后要让i自减，否则重新添加时会出bug
            console.log(key);
            $scope.itemc.splice(key, 1);
            i--;
            //每次删除时得重新计算总值$scope.getResult();
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
    

    var changeFunction = function () {
        var optionValue = $("#test").val().trim();
        if(optionValue == "platform"){
            $("#d0").hide();
        }else{
            $("#d0").show();
        }
    }
    
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
