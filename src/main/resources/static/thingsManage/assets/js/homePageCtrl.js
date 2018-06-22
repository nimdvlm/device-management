
mainApp.controller("homePageCtrl",["$scope","$location",function ($scope,$location) {
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
}]);