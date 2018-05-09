mainApp.controller("DevGroupCtrl", function ($scope, $resource) {
    //获取设备组
    $scope.showAll = true;
    var Devicegroup = $resource('/api/group/allgroups');
    $scope.DeviceGroups = Devicegroup.query(function(){
        //初始化右侧视图
        $scope.item = $scope.DeviceGroups[0];
    });


    //添加设备组
    $scope.addDG=function () {
        if ($scope.addDGName != "" && $scope.addDGName != null){
            var addDG = $resource('/api/group/create');
            addDG.save({},{"name":$scope.addDGName})
                .$promise.then(function (resp) {
                console.log("新建设备组成功");
                console.log(resp);
                $("#addRule").modal("hide");
                location.reload();
            });
        }else{
            alert("输入不能为空!");
        }
    }

    //查找设备组
    /******暂无此接口
    $scope.searchDG = function () {
        if ($scope.dgname != "" && $scope.dgname != null) {
            var searchDG = $resource('http://localhost:8082/person/:name', {name: '@name'});
            searchDG.get({name: $scope.dgname})
                .$promise.then(function (person) {
                console.log("文本框输入内容：" + $scope.dgname);
                if (person.name != undefined) {
                    $scope.showInfo = true;
                    $scope.showAll = false;
                    $scope.searchresult = person;
                    console.log("接口返回对象：" + person.name + person.time + person.id);
                } else {
                    $scope.showInfo = false;
                    alert("无设备组[" + $scope.dgname + "]信息，请输入正确设备组名!");
                }

            });
        }
        else {
            alert("输入不能为空!");
        }
    };
     *****/

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
        //console.log(DG.name);
        $scope.item = {name: DG.name, time: DG.time, id: DG.id};

        //获取设备组下的设备
        var DGDEVICES = $resource('/api/group/:id/devices', {id: '@id'});
        DGDEVICES.query({id: $scope.item.id})
            .$promise.then(function (person) {
                $scope.DGDevices=person;
                console.log("获取设备组下的设备："+$scope.DGDevices);
        });
    };

    //ui-grid的js部分
    $scope.myData = $scope.DGDevices;

    $scope.gridOptions = {
        data: 'myData',
        enableHorizontalScrollbar: 0,
        columnDefs: [
            {field: 'name', displayName: '设备名称'},
            {field: 'id', displayName: '设备id'}


            /***嘤嘤嘤舍不得
            {
                field: 'isIn', displayName: '操作',
                cellTemplate: '<div class="container-fluid"><div class="row cell-action-style"><div class="col-xs-3 text-center"><div class="div-click" ng-click="grid.appScope.goToDelete(row)"><span class="glyphicon shand" ng-class="{true: \'glyphicon-minus\', false: \'glyphicon-plus\'}[row.entity.isIn]"></span></div></div><div></div></div></div>'
            } ****/
             ]
    };

    //弹出删除/关联信息modal
    $scope.goToDelete = function (row) {
        if (row.entity.isIn) {
            angular.element('#warnDelAssign').modal({
                backdrop: false
            });
        } else {
            angular.element('#warnAddAssign').modal({
                backdrop: false
            });
        }
        ;
    };

});