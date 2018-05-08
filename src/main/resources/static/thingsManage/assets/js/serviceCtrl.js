
mainApp.controller("serviceCtrl",["$scope","$location",function ($scope,$location) {
    var mainApp = angular.module("mainApp",["ngRoute","ngAnimate"]);

    $scope.Bmanagement =
        [{serviceName:216,serviceType:"设备",serviceDescription:"Tpss"},
        {serviceName:217,serviceType:"设备",serviceDescription:"Tps"},
        {serviceName:218,serviceType:"设备",serviceDescription:"Tp"},
        {serviceName:219,serviceType:"设备",serviceDescription:"T"}]
    /*mainApp.filter('search',function () {
        return function (input,serviceName) {
            var result = [];
            console.log("serviceName param=" + serviceName);
            console.log("arguments[1] param="+ arguments[1]);
            if(typeof (serviceName)!= 'undefined'&& serviceName!=''){
                angular.forEach(input,function (item) {
                    if(item.serviceName==serviceName){
                        result.push(item);
                    }
                });
                return result;
            }
            return input;
        };
    });*/
}]);

/*过滤器
var mainApp = angular.module("mainApp",[]);
mainApp.controller("serviceCtrl",function ($scope) {
    $scope.managements = [{vendor:216,equipmentType:"设备1",equipmentModel:"Tpss"},
        {vendor:215,equipmentType:"设备2",equipmentModel:"Tps"},
        {vendor:214,equipmentType:"设备3",equipmentModel:"Tp"},
        {vendor:213,equipmentType:"设备4",equipmentModel:"T"}]
});
app.filter('search',function () {
    return function (input,equipmentType) {
        var result = [];
        console.log("equipmentType param=" + equipmentType);
        console.log("arguments[1] param="+ arguments[1]);
        if(typeof (equipmentType)!= 'undefined'&& equipmentType!=''){
            angular.forEach(input,function (item) {
                if(item.equipmentType==equipmentType){
                    result.push(item);
                }
            });
            return result;
        }
        return input;
    };
});*/

