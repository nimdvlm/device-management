mainApp.controller("dashboardCtrl",["$scope","$resource","$timeout",function ($scope,$resource,$timeout) {
    $scope.db_device;
    $scope.isShowEmpty=false;

    //测试数据
    //$scope.Dashboards=[{"name":"Test1 Dashboard","id":1},
    //    {"name":"Test2 Dashboard","id":2},
    //    {"name":"Test3 Dashboard","id":3},
    //   {"name":"Test4 Dashboard","id":4}]
    $scope.Widgets=[{"name":"Line"},
        {"name":"Pie"},
        {"name":"Doughnut"}]
    $scope.isChoose=false;

    //获取cookie中各种Id
    var tenantId = $.cookie("tenantId")
    var customerId = $.cookie("customerId")


    //获取所有dashboard
    var Dashboard = $resource('/api/dashboard/getAllDashboard');
    $scope.Dashboards = Dashboard.query();

    //右侧展示视图
    $scope.showDBDetail=function (item) {
        console.log(item)

        $scope.dbItem=item;

        $scope.isChoose=true;

        //获取当前dashbaord下entity
        var Entity = $resource('/api/dashboard/entity/getByDashboardId/:id', {id: '@id'})
        var entitys=Entity.query({},{id: item.id},function(resp){
            console.log(resp)

            if(resp==null||resp==""){
                $scope.isShowEmpty=true;
                $scope.entitys=""
            }else{
                $scope.isShowEmpty=false;
                $scope.entitys=resp
                //ng-repeat直接getElementById获取不到
                $timeout(function () {
                    for(var i=0;$scope.entitys.length;i++)
                        $scope.drawChart(i);
                },300);
            }
        })
    }

    //@TODO entity展示实时数据
    $scope.drawChart=function (i) {
        var entity=$scope.entitys[i]

        var title=entity.name
        var device=entity.device_id
        //折线图
        var ctx = document.getElementById("entityChart_"+i).getContext("2d");
        var myLineChart = new Chart(ctx,{
            type:'line',
            data:{
                //折线图需要为每个数据点设置一标签。这是显示在X轴上。
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                //数据集（y轴数据范围随数据集合中的data中的最大或最小数据而动态改变的）
                datasets: [{
                    label:device,
                    fillColor: "rgba(220,220,220,0.5)", //背景填充色
                    strokeColor: "rgba(220,220,220,1)", //路径颜色
                    pointColor: "rgba(220,220,220,1)", //数据点颜色
                    pointStrokeColor: "#fff", //数据点边框颜色
                    data: [10, 59, 90, 81, 56, 55, 40] //对象数据
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: title,
                    fontSize: 20,
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    fontColor: '#1964ad'
                },
                legend: {
                    //display:false
                    position:'bottom'
                }

            }

        });
    }

    //创建dashboard
    $scope.addDashboard=function () {
        var name=document.getElementById('add_db_name').value
        var addDB = $resource('/api/dashboard/insert');
        addDB.save({}, {"name": name,"tenant_id":tenantId,"customer_id":customerId})
            .$promise.then(function (resp) {
            console.log("创建成功")
            if(resp.id!=""){
                location.reload();
            }else{
                toastr.warning("不允许创建同名设备！");
            }
        })
    }

    //创建entity
    //@TODO 创建entity

    //创建entity时获取所有设备名
    var Device = $resource("/api/device/alldevices?limit=1000");
    $scope.Devices = Device.query(function () {
        $scope.DeviceName = getDevicesName();
    });
    function getDevicesName() {
        var _DeviceName=[];
        $scope.Devices.forEach(function (item) {
            _DeviceName.push({name:item.name,id:item.id});//name和id的对象数组
        })
        return _DeviceName
    }


    //删除dashboard
    $scope.delDashboard=function () {
        var delDB = $resource('/api/dashboard/delete/:id', {id: '@id'});
        delDB.delete({}, {id: $scope.dbItem.id}, function (resp) {
            console.log("删除成功:id=" + $scope.dbItem.id);
            $("#delDashboard").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("1234再来一次");
            alert("删除失败，请重试！")
        });
    }

    //删除entity
    //@TODO 删除entity



}]);