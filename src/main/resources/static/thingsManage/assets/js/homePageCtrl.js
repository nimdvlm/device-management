mainApp.controller("homePageCtrl",["$scope","$resource",function ($scope,$resource) {
    var Device = $resource("/api/device/alldevices?limit=1000");
    $scope.Devices = Device.query(function () {
        $scope.Devices_Number=$scope.Devices.length;
        console.log("设备个数："+$scope.Devices_Number);
        var DeviceName=getDevicesName()

        var DeviceState=$resource("/api/device/status");
        var DeviceStates=DeviceState.save({deviceId:DeviceName})
            .$promise.then(function (resp) {
                console.log(resp);
                var data=resp;
                var key='6d090f10-6e1c-11e8-8dc5-59c2cc02320f'
                console.log(data[key])
               showDeviceState(resp,DeviceName);
            })

    });

    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query(function () {
        $scope.Plugin_Number=$scope.pluginGroups.length;
        console.log("插件个数："+$scope.Plugin_Number);
    });

    var RULE = $resource('/api/rule/ruleByTenant');
    $scope.Rules=RULE.query(function () {
        $scope.Rule_Number=$scope.Rules.length;
        console.log("规则个数："+$scope.Rule_Number);
        showRuleDounut();
    })

    function showRuleDounut() {
        var  _active =0
        var  _suspend =0
        var  _error = 0

        $scope.Rules.forEach(function (item) {
            if (item.rule.state == "ACTIVE") {
                _active++;
            }
            else if (item.rule.state == "SUSPEND") {
                _suspend++;
            } else {
                _error++;
            }
        });
        console.log(_active, _suspend, _error);

        //charts.js-甜甜圈
        ctx = document.getElementById("myChart1").getContext("2d");
        var myDoughnutChart1 = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [_active, _error, _suspend],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1

                }],
                labels: [
                    '运行中',
                    '故障',
                    '已停止'
                ]
            },
            options: {
                title: {
                    display: true,
                    text: '规则运行情况',
                    fontSize: 25,
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    fontColor: '#1964ad'
                },
                legend: {
                    position: 'bottom',
                    labels:{
                        boxWidth:20
                    }
                }
            }
        });
    }
    function getDevicesName() {
        var _DeviceName=[];
        $scope.Devices.forEach(function (item) {
            _DeviceName.push(item.id);
        })
        return _DeviceName

    }
    function showDeviceState(data,DeviceName) {
        var _online=0
        var _offline=0
        var _error=0
        var devicekey

        for(var i=0;i<$scope.Devices_Number;i++){
            devicekey=DeviceName[i]
            console.log(data[devicekey])
            if (data[devicekey] === "offline") {
                _offline++;
            }else if(data[devicekey] === "online"){
                _online++;
            }else{
                _error++;
            }
        }
        console.log(_offline,_online,_error);

        //饼状图
        ctx = document.getElementById("myChart2").getContext("2d");
        var myDoughnutChart1 = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [_online, _error, _offline],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1

                }],
                labels: [
                    '上线',
                    '故障',
                    '下线'
                ]
            },
            options: {
                title: {
                    display: true,
                    text: '设备上下线情况',
                    fontSize: 25,
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    fontColor: '#1964ad'
                },
                legend: {
                    position: 'bottom',
                    labels:{
                        boxWidth:20
                    }
                }
            }
        });

    }



    /*************************
     * 样例部分
     *
    //直方图
    var ctx = document.getElementById("myChart1").getContext("2d");
    var myChart1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3,15],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 20, 147, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 20,147, 1)'
                ],
                borderWidth: 1
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
                text: '本周设备运行数量统计',
                fontSize:25,
                fontFamily:"Microsoft YaHei"
            },
            legend: {
                display:false
            }

        }
    });

    //折线图
    ctx = document.getElementById("myChart2").getContext("2d");
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
                text: '年度设备运行情况',
                fontSize:25,
                fontFamily:"Microsoft YaHei"
            },
            legend: {
                display:false
            }

        }

    });

    //甜甜圈1
    ctx=document.getElementById("myChart3").getContext("2d");
    var myDoughnutChart1 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [20, 2, 5],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1

            }],
            labels: [
                '运行中',
                '故障',
                '已停止'
            ]
        },
        options: {
            title: {
                display: true,
                text: '设备运行情况',
                fontSize:25,
                fontFamily:"Microsoft YaHei"
            },
            legend: {
                position:'top'
            }
        }
    });

    //甜甜圈2
    ctx=document.getElementById("myChart4").getContext("2d");
    var myDoughnutChart2 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [10, 3, 1],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1

            }],
            labels: [
                '激活',
                '暂停',
                '故障'
            ]
        },
        options: {
            title: {
                display: true,
                text: '规则运行情况',
                fontSize:25,
                fontFamily:"Microsoft YaHei"
            },
            legend: {
                position:'top'
            }
        }
    });
     *******/
    /******样例END*******/
}]);