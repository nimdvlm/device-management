mainApp.controller("dashboardCtrl",["$scope","$resource",function ($scope,$resource) {
    $scope.db_device;

    //@TODO 获取组件接口
    //@TODO 获取仪表板接口

    //测试数据
    $scope.Dashboards=[{"name":"Test1 Dashboard","id":1},
        {"name":"Test2 Dashboard","id":2},
        {"name":"Test3 Dashboard","id":3},
        {"name":"Test4 Dashboard","id":4}]
    $scope.Widgets=[{"name":"Line"},
        {"name":"Pie"},
        {"name":"Doughnut"}]
    $scope.isChoose=false;

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

    $scope.showDBDetail=function (item) {
        console.log(item)
        $scope.dbItem=item;

        $scope.isChoose=true;
        //折线图
        var ctx = document.getElementById("myChart1").getContext("2d");
        var myLineChart = new Chart(ctx,{
            type:'line',
            data:{
                //折线图需要为每个数据点设置一标签。这是显示在X轴上。
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                //数据集（y轴数据范围随数据集合中的data中的最大或最小数据而动态改变的）
                datasets: [{
                    fillColor: "rgba(220,220,220,0.5)", //背景填充色
                    strokeColor: "rgba(220,220,220,1)", //路径颜色
                    pointColor: "rgba(220,220,220,1)", //数据点颜色
                    pointStrokeColor: "#fff", //数据点边框颜色
                    data: [10, 59, 90, 81, 56, 55, 40] //对象数据
                }, {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: [28, 48, 40, 19, 96, 27, 200]
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
                    text: '当前设备数据',
                    fontSize: 20,
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    fontColor: '#1964ad'
                },
                legend: {
                    display:false
                }

            }

        });
    }

    $scope.addDashboard=function () {
        console.log($scope.db_name);
        //@TODO 添加仪表板接口
    }


}]);