mainApp.controller("deviceModelCtrl", function ($scope, $resource) {
    console.log("展示deviceType");
    var deviceTypeGroup = $resource('/api/devicetype/getAll');
    $scope.deviceTypeGroups = deviceTypeGroup.query();
    console.log("展示deviceType");
    console.log($scope.deviceTypeGroups);





});