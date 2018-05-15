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
    $scope.addAbility = function () {
           //赋值
            $scope.createability={"serviceName": $scope.serviceName,
                "serviceDescription": $scope.serviceDescription,
                "serviceType": $scope.serviceType,
                "protocol": $scope.protocol,
                "url": $scope.url,
                "requireResponce": $scope.requireResponce,
                "methodName": $scope.methodName,
                "key": $scope.key,
                "type": $scope.type,
                "value": $scope.value};
            console.log("传递参数：")
            console.log($scope.createability);

        //接口
        var addAbility = $resource('/api/v1/ability');
            addAbility.save({}, $scope.createability)
                .$promise.then(function (resp) {
                    console.log("xin");
                    //alert("xinzeng");
                //toastr.success("新增成功！");
                setTimeout(function () {
                    //window.location.reload();
                },500);
            },function (error) {
                toastr.error("新增失败！");
            });
    }*/


    /*创建能力*/
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
        $scope.createAbility = //'{"modelId":'+'"'+$scope.items.modelId+'"'+',"abilityDes":'+
            '{"serviceName":'+'"'+$scope.serviceName+'"'
            +',"serviceDescription":'+'"'+$scope.serviceDescription+'"'
            +',"serviceType":'+'"'+$scope.serviceType+'"'
            +',"protocol":'+'"'+$scope.protocol+'"'
            +',"url":'+'"'+$scope.url+'"'
            +',"requireResponce":'+'"'+$scope.requireResponce+'"'
            +',"methodName":'+'"'+$scope.methodName+'"'
            +',"key":'+'"'+$scope.key+'"'
            +',"type":'+'"'+$scope.type+'"'
            +',"value":'+'"'+$scope.value+'"'+'}';
        console.log($scope.createAbility);
        $scope.ability = createAbilityObj.save({},$scope.createAbility,function (resp) {
            //toastr.success("新增成功！");
            alert("success");
            console.log("success");
            setTimeout(function () {
                //window.location.reload();
            },500);
        },function (error) {
            toastr.error("新增失败！");
        });
    };



    /*删除能力组*/
    $scope.delAG = function () {
        var delAG = $resource('/api/v1/abilityGroup?modelId=:id');
        console.log("shang");
        delAG.delete({id: $scope.modelId},{} , function (resp) {
            console.log("删除成功:modelId=" + $scope.modelId);
            $("#deleteSM").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("删除失败");
            alert("删除失败！")
        });
    }

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
    $scope.deleteAA = function(){
        var deleteAA = $resource('/api/v1/ability/:abilityId');
        console.log("liu")
        deleteAA.delete({abilityId:$scope.abilityId},{},function(){
            toastr.success("删除成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function () {
            alert("删除失败！")
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
