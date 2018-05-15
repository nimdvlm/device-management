mainApp.controller("pluginCtrl", function ($scope, $resource){



    /*插件信息获取与展示*/
    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query(function () {
        $scope.itemp = $scope.pluginGroups[0];
    });




    /*激活插件*/
    $scope.activePlugin = function(){
        var changePlugin = $resource('/api/plugin/activate/:url/:port');
        var arr= new Array;
        arr = $scope.url.split(":");
        console.log($scope.arr[0]);
        console.log($scope.arr[1]);
        changePlugin.save({url:arr[0],port:arr[1]})
            .$promise.then(function (resp) {
            console.log("激活成功" + $scope.url);
            $("#activePG").modal("hide");
            location.reload();
        });
    }
    /*暂停插件*/
    $scope.stopPlugin = function () {
        var changePlugin = $resource('/api/plugin/suspend/:url/:port');
        $scope.mySplit = function (string,nb) {
            var array = string.split(":");
            return array[nb];
        }
       // var arr= new Array;
       // arr = url.split(":");
        changePlugin.save({url:mySplit(string,0),port:mySplit(string,1)})
            .$promise.then(function (resp) {
            console.log("激活成功" + $scope.url);
            $("#stopPG").modal("hide");
            location.reload();
        });
    }

    /*显示插件状态*/

    //var pluginState = $resource('/api/plugin/state/:url/:port');


});