mainApp.controller("pluginCtrl", function ($scope, $resource){

    /*插件信息获取与展示*/
    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query(function () {
        $scope.itemp = $scope.pluginGroups[0];
    });


    /*显示插件状态*/
        var pluginState = $resource('/api/plugin/state/:url/:port');
        pluginState.get({url:$scope.url.host,port:$scope.url.port})
            .$promise.then(function (resp) {
            console.log($scope.resp)
                $scope.state = resp.state;
        });
        console.log($scope.pluginStates);

    /*激活插件*/
    var activePlugin = function(){
        var changePlugin = $resource('/api/plugin/activate/:url/:port');
        changePlugin.save({url:$scope.url.host,port:$scope.url.port})
            .$promise.then(function (resp) {
            console.log("激活成功" + $scope.url);
            $("#activePG").modal("hide");
            location.reload();
        });
    }
    /*暂停插件*/
    var stopPlugin = function () {
        var changePlugin = $resource('/api/plugin/suspend/:url/:port');
        changePlugin.save({url:$scope.url.host,port:$scope.url.port})
            .$promise.then(function (resp) {
            console.log("激活成功" + $scope.url);
            $("#stopPG").modal("hide");
            location.reload();
        });
    }



});