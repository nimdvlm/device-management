mainApp.controller("pluginCtrl", function ($scope, $resource){

    //ng-show初始化
    $scope.Rulestart = false;
    $scope.Rulestop = false;



    var str =[];
    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query();

    $scope.showAll = function (item) {
        console.log(item);
        $scope.name = item.name;
        $scope.url = item.url;
        $scope.describe = item.describe;
        console.log($scope.url);
        str = item.url.split(":");
        console.log(str);
        var pluginState = $resource('/api/plugin/state/:urlId/:portId',{urlId: '@id', portId: '@id'});
        $scope.pluginStateDisply = pluginState.get({urlId:str[0],portId:str[1]})
        console.log($scope.pluginStateDisply);
        $scope.state = $scope.pluginStateDisply;
        console.log($scope.state);

    }




    /*激活插件
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
    }*/
    /*暂停插件
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
    }*/



});