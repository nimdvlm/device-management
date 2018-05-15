mainApp.controller("abilityCtrl", function ($scope, $resource) {


    /*能力组信息获取与展示*/
    var abilityGroup = $resource('/api/v1/abilityGroup');
    $scope.abilityGroups = abilityGroup.query();
    console.log($scope.abilityGroups);
    $scope.show = function(AG){
        console.log(AG);
        var modelId = AG.model.modelId;
        console.log(modelId);
        var abilitiesObj = $resource("/api/v1/ability/:modelId");
        $scope.abilitiesInfo = abilitiesObj.query({modelId:modelId})
            .$promise.then(function (value) {

                var jsonData = JSON.parse(value[0].abilityDes);
                $scope.serviceName = jsonData.serviceName;
                $scope.serviceDescription = jsonData.serviceDescription;
                $scope.deviceType = jsonData.serviceType;
            });

    };
   /* $scope.show = function () {
        $scope.items = $scope.abilityGroups[0];
        console.log($scope.items);

    }*/
    /*/!*选中左侧图标展示能力详情*!/
    $scope.show = function (AG) {
        //items是当前展示的单个设备
        //$scope.item = {serviceName: items.abilityDes.serviceName, serviceDescription: items.abilityDes.serviceDescription,deviceType:items.abilityDes.deviceType};
        var ABILITY = $resource('/api/v1/ability/:id', {id: '@id'});
        ABILITY.query({id: $scope.items.model.modelId})
            .$promise.then(function (person) {
            $scope.myData = person;
        });
    };*/
    /*能力信息获取与展示
    var ability = $resource('/api/v1/ability/{modelId}')
    $scope.show = function (items){
        abilityInfo = items;
        console.log(items);
        $scope.serviceName = items.serviceName;
        $scope.serviceDescription = items.serviceDescription;
        $scope.deviceType = items.deviceType;
    };*/



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


    /*创建能力
    var createAbilityObj =  $resource("/api/v1/ability");
    $scope.addAbility = function(){
        $scope.serviceName = $("#serviceName").val();
        $scope.serviceDescription = $("#serviceDescription").val();
        $scope.serviceType = $("#serviceType").val();
        $scope.protocol = $("#protocol").val();
        $scope.url = $("#url").val();
        $scope.requireResponce = $("#requireResponce").val();
        $scope.methodName = $("#methodName").val();
        $scope.key = $("#key").val();
        $scope.type = $("#type").val();
        $scope.value = $("#value").val();
        $scope.createAbility = '{"serviceName":'+'"'+$scope.serviceName+'"'+',"serviceDescription":'+'"'+$scope.serviceDescription+'"'+',"serviceType":'+'"'+$scope.serviceType+'"'+'}';
        console.log($scope.createAbility);
        $scope.ability = createAbilityObj.save({},$scope.createAbility,function (resp) {
            toastr.success("新增设备成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        },function (error) {
            toastr.error("新增设备失败！");
        });
    };*/






    /*删除能力组*/
    $scope.delAG = function () {
        var delAG = $resource('/api/v1/abilityGroup?modelId=&id', {id: '@id'});
        delAG.delete({}, {id: $scope.items.model.modelId}, function (resp) {
            console.log("删除成功:modelId=" + $scope.items.model.modelId);
            $("#deleteSM").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("删除失败");
            alert("删除失败！")
        });
    }

    /*var deleteAbilityObj = $resource('/api/v1/abilityGroup/');
    $scope.delete = function(){
        console.log(abilityInfo);
        console.log(abilityInfo.id);
        $scope.deleteAbility = deleteAbilityObj.delete({modelId:abilityInfo.id},{},function (resp){
            toastr.success("删除成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (resp) {
            toastr.error("删除失败！");
        });
    }*/

    /*删除能力组
    var deleteAbilityObj = $resource("/api/v1/abilityGroup?modelId="+ modelId);
    $scope.delAG = function(){
        console.log(abilityInfo);
        console.log(abilityInfo.id);
        $scope.deleteAbility = deleteAbilityObj.delAG({modelId:abilityInfo.id},{},function (resp) {
            toastr.success("删除设备成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);

        },function (error) {
            toastr.error("删除设备失败！");
        });
    };*/
    /*搜索能力组*/
    /*$scope.searchAbility = function () {
        var textSearch = $("#searchAbilityText").val();
        var searchAbilityObj = $resource("/api/device/alldevices?limit=20&textSearch="+textSearch);
        $scope.searchAbilityInfo = searchAbilityObj.query();
        console.log($scope.searchAbilityInfo);
        console.log($scope.searchAbilityInfo.length);
        $scope.searchAbilityInfo.$promise.then(function (value) {
            if(value == false){
                toastr.warning("无此能力组");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            }
            else{
                $scope.abilityList = $scope.searchAbilityInfo;
                $("#searchAbilityText").on("focus",function () {
                    $(this).val("");
                })
            }
        });


    };*/
    /*删除能力*/
    var deleteAbility = $resource('/api/v1/ability/:id,{id:@id}');
    $scope.deleteA = function(){
        deleteA.delete({id:$scope.itema.id},{},function(){
            toastr.success("删除成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function () {
            toastr.error("删除失败！");
        });
    }



    /*加+号添加参数
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
*/



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
