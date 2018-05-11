mainApp.controller("pluginCtrl", function ($scope, $resource){

    /*插件信息获取与展示*/
    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query(function () {
        $scope.itemp = $scope.pluginGroups[0];
    });

    /*激活插件*/
    var active = function(){

    }

});