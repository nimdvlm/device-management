mainApp.controller("pluginCtrl", function ($scope, $resource){

    var str = new Array();

    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query();

    $scope.showAll = function (item) {
        str = [];//初始化数组；
        //console.log(str);
        console.log(item);
        $scope.name = item.name;
        $scope.url = item.url;
        $scope.describe = item.describe;
        console.log($scope.url);
        str = item.url.split(":");
        console.log(str);//正常显示str数组
        var pluginState = $resource('/api/plugin/state/:urlId/:portId',{urlId: '@id', portId: '@id'});
        pluginState.get({urlId:str[0],portId:str[1]}).$promise.then(function (resp) {
        $scope.pluginStateDisplay=resp;
            //插件状态展现
            if (resp.state == "ACTIVE") {
                $scope.isActive = true;
            } else {
                $scope.isActive = false;
            }
        })

    }


    /*激活插件*/
    $scope.activePlugin = function(){
        //console.log(str[0]);
        var changePlugin = $resource('/api/plugin/activate/:urlNum/:portNum',{urlNum: str[0], portNum:str[1]});
        changePlugin.save({urlNum:str[0],portNum:str[1]})
            .$promise.then(function (resp) {
            //alert("sssss")
            console.log(resp);
            toastr.success("激活成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        });
    }
    /*暂停插件*/
    $scope.stopPlugin = function () {
        console.log(str[0]);
        var changePlugin = $resource('/api/plugin/suspend/:urlDig/:portDig',{urlDig: str[0], portDig: str[1]})
        changePlugin.save({urlDig:str[0],portDig:str[1]})
            .$promise.then(function (resp) {
            //alert("sssss")
            console.log(resp);
            toastr.success("暂停成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        });
    }



});