mainApp.controller("customerCtrl",["$scope","$resource",function ($scope,$resource) {
    var href = window.location.search;//取?后的参数
    var attr = href.substring(href.indexOf("?")+1);
    var attrs = attr.split("&");
    console.log(attrs);
    var userLevel = attrs[0];
    var tenantId = attrs[1];
    var userId = attrs[2];
    var customId;
    //getUserById
    /*var userObj = $resource("/api/account/user?userId=:userId");
    var userInfo = userObj.get({userId:userId});
    console.log(userInfo);*/
    /*$.ajax({
        url:"/api/account/user?userId="+userId,
        dataType:"json",
        type:"GET",
        async:false,
        contentType: "application/json; charset=utf-8",
        success:function (msg) {
            console.log(msg);
            customId = msg.customer_id;
        }
    });*/




    var customerObj = $resource("/api/account/customer?customerId=:customerId");
    $scope.customerInfo = customerObj.get({customerId:1});
    console.log($scope.customerInfo);
}]);