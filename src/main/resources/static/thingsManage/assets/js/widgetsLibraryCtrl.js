mainApp.controller("widgetsLibraryCtrl", function ($scope, $resource) {
    show();
    setInterval(show,4000);

    function show() {
        var random_1=Math.ceil(Math.random()*20);
        var random_2=Math.ceil(Math.random()*20);
        var random_3=Math.ceil(Math.random()*20);
        var random_4=Math.ceil(Math.random()*20);
        var random_5=Math.ceil(Math.random()*20);
        var random_6=Math.ceil(Math.random()*20);
        var random_7=Math.ceil(Math.random()*20);

        //甜甜圈
        var ctx=document.getElementById("Doughnut").getContext("2d");
        var myDoughnutChart2 = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [random_1, random_2, random_3],
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
                }]
            },
            options: {
                title: {
                    display: true,
                    text: '环形图',
                    fontSize: 20,
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    fontColor: '#1964ad'
                },
                legend: {
                    position:'top'
                }
            }
        });

        //饼状图
        ctx=document.getElementById("PieChart").getContext("2d");
        var myDoughnutChart2 = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [random_4, random_5, random_6],
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
                }]
            },
            options: {
                title: {
                    display: true,
                    text: '扇形图',
                    fontSize: 20,
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    fontColor: '#1964ad'
                },
                legend: {
                    position:'top'
                }
            }
        });

        //直方图
        ctx = document.getElementById("Histogram").getContext("2d");
        var myChart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
                datasets: [{
                    label: '# of Votes',
                    data: [random_1, random_2, random_3, random_4, random_5, random_6,random_7],
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
                    text: '直方图',
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

        //折线图
        ctx = document.getElementById("LineChart").getContext("2d");
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
                    data: [random_1, random_2, random_3, random_4, random_5, random_6, random_7] //对象数据
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
                    text: '折线图',
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


});