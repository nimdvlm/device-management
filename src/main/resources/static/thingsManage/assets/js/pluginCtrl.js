mainApp.controller("pluginCtrl", function ($scope, $resource){

    var str = new Array();

    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query();

    $scope.showAll = function (item) {
        str = [];
        console.log(str);
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


    /*激活插件*/
    $scope.activePlugin = function(){
        console.log("liu");
        var changePlugin = $resource('/api/plugin/activate/:urlNum/:portNum',{urlNum: '@id', portNum: '@id'});
        changePlugin.save({urlNum:str[0],portNum:str[1]})
            .$promise.then(function (resp) {
            alert("sssss")
            console.log(resp);
            //toastr.success("激活成功！");
            setTimeout(function () {
                //window.location.reload();
            },500);
        });
    }
    /*暂停插件*/
    $scope.stopPlugin = function () {
        console.log("MM");
        var changePlugin = $resource('/api/plugin/suspend/:urlDig/:portDig',{urlDig: '@id', portDig: '@id'})
        changePlugin.save({urlDig:str[0],portDig:str[1]})
            .$promise.then(function (resp) {
            alert("sssss")
            console.log(resp);
            //toastr.success("激活成功！");
            setTimeout(function () {
                //window.location.reload();
            },500);
        });
    }



});