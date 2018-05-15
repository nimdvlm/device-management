mainApp.controller("abilityCtrl", function ($scope, $resource) {
   var modelId;
   var abilityId;

    /*能力组信息获取与展示*/
    var abilityGroup = $resource('/api/v1/abilityGroup');
    $scope.abilityGroups = abilityGroup.query();
    console.log($scope.abilityGroups);


    $scope.show = function(AG){
        console.log(AG);
        modelId = AG.model.modelId;
        console.log(modelId);
        var abilitiesObj = $resource("/api/v1/ability/:modelId");
        $scope.arrs = abilitiesObj.query({modelId:modelId})
            .promise.then()
        console.log($scope.arrs);

    };


/*.$promise.then(function (value) {
        console.log(value);
        var jsonData = JSON.parse(value[0].abilityDes);
        $scope.serviceName = jsonData.serviceName;
        $scope.serviceDescription = jsonData.serviceDescription;
        $scope.deviceType = jsonData.serviceType;
    });*/


    /*创建能力组*/
    $scope.addAM = function(){
        $scope.manufacturerName = $("#manufacturerName").val();
        $scope.deviceType = $("#deviceType").val();
        $scope.model = $("#model").val();
        $scope.createAbilityInfo = '{"manufacturerName":'+'"'+$scope.manufacturerName+'"'+',"deviceType":'+'"'+$scope.deviceType+'"'+',"model":'+'"'+$scope.model+'"'+'}';
        console.log($scope.createAbilityInfo);

        var createAbilityGroupObj =  $resource("/api/v1/abilityGroup");
        $scope.abilityInformation = createAbilityGroupObj.save({},$scope.createAbilityInfo,function (resp) {
            toastr.success("新增设备成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        },function (error) {
            toastr.error("新增设备失败！");
        });
    };


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
        $scope.createAbility = '{"modelId":'+'"'+modelId+'"'+',"abilityDes":'+
            '{"serviceName":'+'"'+$scope.serviceName+'"'
            +',"serviceDescription":'+'"'+$scope.serviceDescription+'"'
            +',"serviceType":'+'"'+$scope.serviceType+'"'
            +',"protocol":'+'"'+$scope.protocol+'"'
            +',"url":'+'"'+$scope.url+'"'
            +',"requireResponce":'+$scope.requireResponce
            +',"serviceBody":'+"{"
            +'"methodName":'+'"'+$scope.methodName+'"'
            +',"params":'+'['+'{'
            +'"key":'+'"'+$scope.key+'"'
            +',"type":'+'"'+$scope.type+'"'
            +',"value":'+'"'+$scope.value+'"'+'}'+']'+'}'+'}'+'}';
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
        var delAGObj = $resource('/api/v1/abilityGroup?modelId=:id');
        //console.log("shang");
        delAGObj.delete({id: modelId},{} , function (resp) {
            console.log(resp);
            console.log("删除成功:modelId=" + modelId);
            $("#deleteSM").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("删除失败");
            alert("删除失败！")
        });
    }


    /*删除能力*/
    $scope.deleteAA = function(){
        var deleteAA = $resource('/api/v1/ability/:abilityId');
        console.log("liu")
        deleteAA.delete({abilityId:abilityId},{},function(){
            //toastr.success("删除成功！");
            alert("sss");
            setTimeout(function () {
               // window.location.reload();
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
