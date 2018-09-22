mainApp.controller("widgetsLibraryCtrl", function ($scope, $resource) {
    show();
    setInterval(show, 4000);

    function show() {
        var random_1 = Math.ceil(Math.random() * 20);
        var random_2 = Math.ceil(Math.random() * 20);
        var random_3 = Math.ceil(Math.random() * 20);
        var random_4 = Math.ceil(Math.random() * 20);
        var random_5 = Math.ceil(Math.random() * 20);
        var random_6 = Math.ceil(Math.random() * 20);
        var random_7 = Math.ceil(Math.random() * 20);

        // //甜甜圈
        // var ctx=document.getElementById("Doughnut").getContext("2d");
        // var myDoughnutChart2 = new Chart(ctx, {
        //     type: 'doughnut',
        //     data: {
        //         datasets: [{
        //             data: [random_1, random_2, random_3],
        //             backgroundColor: [
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         title: {
        //             display: true,
        //             text: '环形图',
        //             fontSize: 20,
        //             fontFamily: "Microsoft YaHei",
        //             fontStyle: 'normal',
        //             fontColor: '#1964ad'
        //         },
        //         legend: {
        //             position:'top'
        //         }
        //     }
        // });
        //
        // //饼状图
        // ctx=document.getElementById("PieChart").getContext("2d");
        // var myDoughnutChart2 = new Chart(ctx, {
        //     type: 'pie',
        //     data: {
        //         datasets: [{
        //             data: [random_4, random_5, random_6],
        //             backgroundColor: [
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         title: {
        //             display: true,
        //             text: '扇形图',
        //             fontSize: 20,
        //             fontFamily: "Microsoft YaHei",
        //             fontStyle: 'normal',
        //             fontColor: '#1964ad'
        //         },
        //         legend: {
        //             position:'top'
        //         }
        //     }
        // });

        //直方图
        var ctx = document.getElementById("Histogram").getContext("2d");
        var myChart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                datasets: [{
                    label: '# of Votes',
                    data: [random_1, random_2, random_3, random_4, random_5, random_6, random_7],
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
                            beginAtZero: true
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
                    display: false
                }

            }
        });

        //折线图
        ctx = document.getElementById("LineChart").getContext("2d");
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
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
                            beginAtZero: true
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
                    display: false
                }

            }

        });

        //仪表盘
        var myChart = echarts.init(document.getElementById('Dashboard'));
        var option = {
            title: {
                text: '仪表盘',
                left: "center",
                top: '10px',
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    color: '#1964ad'
                }
            },
            tooltip: { //弹窗组件
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                name: '仪表盘',
                type: 'gauge',
                radius: '70%',
                center: ['50%', '60%'],
                //detail: {formatter: '{value}%'},
                detail: {show: false},
                data: [{value: 45, name: ''}],
                axisLine: {lineStyle: {width: 20}},
                splitLine: {length: 25},
                pointer: {
                    width: 2
                }
            }]

        };
        myChart.setOption(option);
        setInterval(function () {//把option.series[0].data[0].value的值使用random()方法获取一个随机数
            option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart.setOption(option, true);
        }, 4000);

        //仪表盘1
        var myChart1 = echarts.init(document.getElementById('Dashboard1'));
        var option1 = {
            title: {
                text: '仪表盘一',
                left: "center",
                top: '10px',
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    color: '#1964ad'
                }
            },
            tooltip: { //弹窗组件
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                name: '仪表盘1',
                type: 'gauge',
                radius: '70%',
                center: ['50%', '60%'],
                detail: {formatter: '{value}%', fontSize: '10'},
                //detail:{show:false},
                data: [{value: 45, name: ''}],
                axisLine: {lineStyle: {width: 20, color: [[0.1, '#c23531'], [0.9, '#63869e'], [1, '#91c7ae']]}},
                splitLine: {length: 25},
                pointer: {
                    width: 2
                }
            }]

        };
        myChart1.setOption(option1);
        setInterval(function () {//把option.series[0].data[0].value的值使用random()方法获取一个随机数
            option1.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart1.setOption(option1, true);
        }, 4000);

        //仪表盘2
        var myChart2 = echarts.init(document.getElementById("Dashboard2"));
        option2 = {
            title: {
                text: '仪表盘二',
                left: "center",
                top: '10px',
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    color: '#1964ad'
                }
            },
            //提示框组件。开发实际中去掉了指针，提示框可以不用设置。
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            //下面属性才是仪表盘的核心！！反正我是这么认为的！！！
            series: [{
                //类型
                type: 'gauge',
                //半径
                radius: 125,
                //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
                startAngle: 180,
                //结束角度。
                endAngle: 0,
                center: ['50%', '90%'],
                //仪表盘轴线相关配置。
                axisLine: {
                    show: true,
                    // 属性lineStyle控制线条样式
                    lineStyle: {
                        width: 40,
                        color: [[1, '#63869e']]
                    }
                },
                //分隔线样式。
                splitLine: {
                    show: false,
                },
                //刻度样式。
                axisTick: {
                    show: false,
                },
                //刻度标签。
                axisLabel: {
                    show: false,
                },
                //仪表盘指针。
                pointer: {
                    //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
                    show: false,
                    //指针长度
                    length: '90%',
                    width: 0,
                },
                //仪表盘详情，用于显示数据。
                detail: {
                    show: true,
                    offsetCenter: [0, '-10%'],
                    formatter: '{value}%',
                    textStyle: {
                        fontSize: 20
                    }
                },
                data: [{
                    value: 0,
                    //   name: '存储量'
                }]
            }]
        };
        myChart2.setOption(option2);
        //设置定时，加载随机数据，可以直观显示
        timeTicket = setInterval(function () {
            var random = (Math.random() * 100).toFixed(2);
            var color = [[random / 100, '#63869e'], [1, '#c23531']];
            option2.series[0].axisLine.lineStyle.color = color;
            option2.series[0].data[0].value = random;
            myChart2.setOption(option2, true);
        }, 4000)
        var myChart3 = echarts.init(document.getElementById("Dashboard3"));
        option3 = {
            title: {
                text: '仪表盘三',
                left: "center",
                top: '10px',
                textStyle: {
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    color: '#1964ad'
                }
            },
            tooltip: { //弹窗组件
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    type: "gauge",
                    center: ["50%", "70%"], // 仪表位置
                    radius: "100", //仪表大小
                    startAngle: 200, //开始角度
                    endAngle: -20, //结束角度
                    axisLine: {
                        show: false,
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.5, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 1,
                                    color: "#E75F25" // 50% 处的颜色
                                }, {
                                    offset: 0.8,
                                    color: "#D9452C" // 40% 处的颜色
                                }], false)], // 100% 处的颜色
                                [0.7, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 1,
                                    color: "#FFC539" // 70% 处的颜色
                                }, {
                                    offset: 0.8,
                                    color: "#FE951E" // 66% 处的颜色
                                }, {
                                    offset: 0,
                                    color: "#E75F25" // 50% 处的颜色
                                }], false)],
                                [0.9, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 1,
                                    color: "#C7DD6B" // 90% 处的颜色
                                }, {
                                    offset: 0.8,
                                    color: "#FEEC49" // 86% 处的颜色
                                }, {
                                    offset: 0,
                                    color: "#FFC539" // 70% 处的颜色
                                }], false)],
                                [1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0.2,
                                    color: "#1CAD52" // 92% 处的颜色
                                }, {
                                    offset: 0,
                                    color: "#C7DD6B" // 90% 处的颜色
                                }], false)]
                            ],
                            width: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    pointer: { //指针样式
                        length: '45%'
                    },
                    detail: {
                        show: false
                    }
                },
                {
                    type: "gauge",
                    center: ["50%", "71%"], // 默认全局居中
                    radius: "87.5",
                    startAngle: 200,
                    endAngle: -20,
                    axisLine: {
                        show: true,
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [ //表盘颜色
                                [0.5, "#DA462C"],//0-50%处的颜色
                                [0.7, "#FF9618"],//51%-70%处的颜色
                                [0.9, "#FFED44"],//70%-90%处的颜色
                                [1, "#20AE51"]//90%-100%处的颜色
                            ],
                            width: 18//表盘宽度
                        }
                    },
                    splitLine: { //分割线样式（及10、20等长线样式）
                        length: 30,
                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 2
                        }
                    },
                    axisTick: { //刻度线样式（及短线样式）
                        length: 20
                    },
                    axisLabel: { //文字样式（及“10”、“20”等文字样式）
                        color: "black",
                        distance: 5 //文字离表盘的距离
                    },
                    detail: {
                        formatter: '{value}%',
                        offsetCenter: [0, "40%"],
                        fontSize: 10,
                        // backgroundColor: '#FFEC45',
                        // height:30,
                        /*  rich : {
                         score : {
                         //   color : "",
                         fontFamily : "微软雅黑",
                         fontSize : 10
                         }
                         }*/
                    },
                    data: [{
                        value: 0,
                        /*    label: {
                         textStyle: {
                         fontSize: 10
                         }
                         }*/
                    }]
                }
            ]
        };
        myChart3.setOption(option3);
        setInterval(function () {//把option.series[0].data[0].value的值使用random()方法获取一个随机数
            option3.series[1].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart3.setOption(option3, true);
        }, 4000);
    }

});