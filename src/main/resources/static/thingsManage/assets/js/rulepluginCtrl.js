mainApp.controller("RulepluginCtrl",function($scope){

    $scope.myData=[{name:""}];
    $scope.$on('senddata',function(e,rule) {
        $scope.myData =[rule.transform];
    });//父子控制器间通信问题

        $scope.gridOptions={
        data: 'myData',
        enableHorizontalScrollbar : 0,
        columnDefs: [
            {field: 'name',displayName: '插件名称'}
            ]};
});