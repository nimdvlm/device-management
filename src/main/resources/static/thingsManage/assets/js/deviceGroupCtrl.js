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
        else {alert("输入不能为空!");
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
    //ui-grid的js部分
    //测试数据
    //$scope.myData =[{"name":"LIANG","id":5,"l":"lijs"}]

    $scope.gridOptions = {
        data: 'myData',
        enableHorizontalScrollbar: 0,
        columnDefs: [
            {field: 'name', width: '25%', displayName: '设备名称'},
            {field: 'id', displayName: '设备id'},
            {
                field: 'name', width: '15%', displayName: '操作',
                cellTemplate: '<div class="container-fluid"><div class="row" style="padding-top: 5px"><div class="col-xs-4 text-center"><div class="div-click" ng-click="grid.appScope.goToDelete(row)"><span class="glyphicon glyphicon-minus shand"></span></div></div><div></div></div></div>'
            }
            /***暂不需要此功能
             * 根据boolean值，同一列中显示不同符号
             {
                 field: 'isIn', displayName: '操作',
                 cellTemplate: '<div class="container-fluid"><div class="row cell-action-style"><div class="col-xs-3 text-center"><div class="div-click" ng-click="grid.appScope.goToDelete(row)"><span class="glyphicon shand" ng-class="{true: \'glyphicon-minus\', false: \'glyphicon-plus\'}[row.entity.isIn]"></span></div></div><div></div></div></div>'
             } ****/
        ]
    };

    //设备组取消关联某设备-弹出删除提示modal
    $scope.goToDelete = function (row) {
        console.log("删除确认modal!");
        console.log(row.entity);
        $scope.unAssignDevid = row.entity.id;
        $("#warnDelAssign").modal("show");
    };

    //设备组取消关联某设备
    $scope.unAssign = function () {
        console.log("正在向后台发送请求...")
        var DISASS = $resource('api/group/unassign/:deviceId/:groupId', {deviceId: '@id', groupId: '@id'});
        DISASS.get({deviceId: $scope.unAssignDevid, groupId: $scope.item.id})
            .$promise.then(function (person) {
            alert("取消关联成功");
            $("#warnDelAssign").modal("hide");
        });
    };
});