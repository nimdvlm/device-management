$.get("http://139.159.242.107:8092/api/dashboard/device-status",function (data) {

    var data1 = data.暂停;
    var data2 = data.运行;
    var data3 = data.离线;

    var myChart1 = echarts.init(document.getElementById('main1'),'dark');
    myChart1.title = '正负条形图';

    option1 = {
        title: {
            text: '设备状态统计',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#ffffff'          // 主标题文字颜色
            }
        },
        backgroundColor: 'transparent',
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['暂停', '运行', '离线'],
            top:'9%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'value'
            }
        ],
        yAxis : [
            {
                type : 'category',
                axisTick : {show: false},
                data : ['周日','周六','周五','周四','周三','周二','周一']
            }
        ],
        series : [
            {
                name:'暂停',
                type:'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data:data1
                //data:[200, 170, 240, 244, 200, 220, 210]
            },
            {
                name:'运行',
                type:'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true
                    }
                },
                data:data2
                //data:[320, 302, 341, 374, 390, 450, 420]
            },
            {
                name:'离线',
                type:'bar',
                stack: '总量1',
                label: {
                    normal: {
                        show: true
                    }
                },
                data:data3
                //data:[120, 132, 101, 134, 190, 230, 210]
            }
        ]
    };

    myChart1.setOption(option1);
});

$.get("http://139.159.242.107:8092/api/dashboard/device-type",function (data) {
    var myChart2 = echarts.init(document.getElementById('main2'),'dark');
    option2 = {
        title: {
            text: '设备类型统计',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#ffffff'          // 主标题文字颜色
            }
        },
        backgroundColor: 'transparent',
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '设备类型',
                type: 'pie',
                radius : '60%',
                center: ['50%', '50%'],
                data:[
                    {value:data.压力传感器, name:'压力传感器'},
                    {value:data.速率传感器, name:'速率传感器'},
                    {value:data.形变传感器, name:'形变传感器'},
                    {value:data.光照传感器, name:'光照传感器'},
                    {value:data.湿度传感器, name:'湿度传感器'},
                    {value:data.温度传感器, name:'温度传感器'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option2);
});

$.get("http://139.159.242.107:8092/api/dashboard/user-satis-level",function (data) {
    var myChart3 = echarts.init(document.getElementById('main3'),'dark');
    myChart3.title = '嵌套环形图';

    option3 = {
        title: {
            text: '用户满意度调查',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#ffffff'          // 主标题文字颜色
            }
        },
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
            {
                name:'用户满意度',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '40%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:data.差, name:'差', selected:true},
                    {value:data.较差, name:'较差'},
                    {value:data.一般, name:'一般'},
                    {value:data.较好, name:'较好'},
                    {value:data.好, name:'好'}
                ]
            },
            {
                name:'不满因素',
                type:'pie',
                radius: ['55%', '70%'],

                data:[
                    {value:data.bug, name:'bug较多'},
                    {value:data.请求太慢, name:'请求太慢'},
                    {value:data.安全性不够, name:'安全性不够'},
                    {value:data.不符合需求, name:'不符合需求'},
                    {value:data.操作繁琐, name:'操作繁琐'},
                    {value:data.专业性太强, name:'专业性太强'},
                    {value:data.服务器不稳定, name:'服务器不稳定'},
                    {value:data.其他, name:'其他'}
                ]
            }
        ]
    };
    myChart3.setOption(option3);
});

$.get("http://139.159.242.107:8092/api/dashboard/failure-rate",function (data) {

});

var myChart4 = echarts.init(document.getElementById('main4'),'dark');
var base = new Date() - 365 * 24 * 3600 * 1000;
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [];
/*var data = [Math.random() * 300];*/

for (var i = 1; i < 365; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    /*data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));*/
    data.push(Math.random());
}

$.get("http://139.159.242.107:8092/api/dashboard/failure-rate",function (data) {
    option4 = {
        title: {
            text: '设备故障率整体走势',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#ffffff'          // 主标题文字颜色
            }
        },
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '17%',
            width:'90%',
            height:'70%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            axisTick: {length:5}
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name:'历史故障率',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: data
            }
        ]
    };

    myChart4.setOption(option4);
});

$.get("http://139.159.242.107:8092/api/dashboard/device-count",function (data) {

    var myChart5 = echarts.init(document.getElementById('main5'),'dark');
    myChart5.title = '堆叠柱状图';

    option5 = {
        title: {
            text: '设备数量统计',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#ffffff'          // 主标题文字颜色
            }
        },
        backgroundColor: 'transparent',
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            width:'90%',
            height:'80%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'温度传感器',
                type:'bar',
                data:data.温度传感器,
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data : [
                        [{type : 'min'}, {type : 'max'}]
                    ]
                }
            },
            {
                name:'湿度传感器',
                type:'bar',
                stack: '广告',
                data:data.湿度传感器
            },
            {
                name:'光照传感器',
                type:'bar',
                stack: '广告',
                data:data.光照传感器
            },
            {
                name:'速率传感器',
                type:'bar',
                stack: '广告',
                data:data.速率传感器
            },
            {
                name:'形变传感器',
                type:'bar',
                data:data.形变传感器,
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data : [
                        [{type : 'min'}, {type : 'max'}]
                    ]
                }
            },
            {
                name:'压力传感器',
                type:'bar',
                barWidth : 5,
                stack: '搜索引擎',
                data:data.压力传感器,
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data : [
                        [{type : 'min'}, {type : 'max'}]
                    ]
                }
            }
        ]
    };

    myChart5.setOption(option5);
});

var myChart6 = echarts.init(document.getElementById('main6'),'dark');
option6 = {
    backgroundColor: 'transparent',
    tooltip : {
        formatter: "{a} <br/>{c}"
    },
    series : [
        {
            name:'华东地区',
            type:'gauge',
            min:0,
            max:100,
            splitNumber:10,
            radius: '80%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                    width: 3,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length :25,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                width: 5
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 10,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail : {
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: 10
                }
            },
            data:[{value: 6.02, name: '华东地区(%)'}]
        }


    ]
};

setInterval(function (){
    /*option6.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;*/
    option6.series[0].data[0].value = (6 + Math.random()*10).toFixed(2);
    myChart6.setOption(option6);
},2000);

myChart6.setOption(option6);

var myChart7 = echarts.init(document.getElementById('main7'),'dark');
option7 = {
    backgroundColor: 'transparent',
    tooltip : {
        formatter: "{a} <br/>{c}"
    },
    series : [
        {
            name:'华北地区',
            type:'gauge',
            min:0,
            max:100,
            splitNumber:10,
            radius: '80%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                    width: 3,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length :25,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                width: 5
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 10,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail : {
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: 10
                }
            },
            data:[{value: 25.18, name: '华北地区(%)'}]
        }


    ]
};

setInterval(function (){
    /*option7.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;*/
    option7.series[0].data[0].value = (25 + Math.random()*8).toFixed(2);
    myChart7.setOption(option7);
},2000);
myChart7.setOption(option7);

var myChart8 = echarts.init(document.getElementById('main8'),'dark');
option8 = {
    backgroundColor: 'transparent',
    tooltip : {
        formatter: "{a} <br/>{c}"
    },
    series : [
        {
            name:'华南地区',
            type:'gauge',
            min:0,
            max:100,
            splitNumber:10,
            radius: '80%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                    width: 3,
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length :25,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                width: 5
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 10,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail : {
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff',
                    fontSize: 10
                }
            },
            data:[{value: 14.96, name: '华南地区(%)'}]
        }


    ]
};

setInterval(function (){
    /*option8.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;*/
    option8.series[0].data[0].value = (15 + Math.random()*15).toFixed(2);
    myChart8.setOption(option8);
},2000);
myChart8.setOption(option8);

$.get("http://139.159.242.107:8092/api/dashboard/failure-reason",function (data) {
    var myChart9 = echarts.init(document.getElementById('main9'),'dark');
// Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
    var dataBJ = [
        /*[55,9,56,0.46,18,6,1],
        [25,11,21,0.65,34,9,2],
        [56,7,63,0.3,14,5,3],
        [33,7,29,0.33,16,6,4],
        [42,24,44,0.76,40,16,5],
        [82,58,90,1.77,68,33,6],
        [74,49,77,1.46,48,27,7],
        [78,55,80,1.29,59,29,8],
        [267,216,280,4.8,108,64,9],
        [185,127,216,2.52,61,27,10],
        [39,19,38,0.57,31,15,11],
        [41,11,40,0.43,21,7,12],
        [64,38,74,1.04,46,22,13],
        [108,79,120,1.7,75,41,14],
        [108,63,116,1.48,44,26,15],
        [33,6,29,0.34,13,5,16],
        [94,66,110,1.54,62,31,17],
        [186,142,192,3.88,93,79,18],
        [57,31,54,0.96,32,14,19],
        [22,8,17,0.48,23,10,20],
        [39,15,36,0.61,29,13,21],
        [94,69,114,2.08,73,39,22],
        [99,73,110,2.43,76,48,23],
        [31,12,30,0.5,32,16,24],
        [42,27,43,1,53,22,25],
        [154,117,157,3.05,92,58,26],
        [234,185,230,4.09,123,69,27],*/
        [160,120,186,2.77,91,50,28],
        [160,120,186,2.77,91,50,28],
        [160,120,186,2.77,91,50,28]
        /*[134,96,165,2.76,83,41,29],
        [52,24,60,1.03,50,21,30],
        [46,5,49,0.28,10,6,31]*/
    ];

    var dataGZ = [
        [26,37,27,1.163,27,13,1],
        [85,62,71,1.195,60,8,2],
        [78,38,74,1.363,37,7,3],
        [21,21,36,0.634,40,9,4],
        [41,42,46,0.915,81,13,5],
        [56,52,69,1.067,92,16,6],
        [64,30,28,0.924,51,2,7],
        [55,48,74,1.236,75,26,8],
        [76,85,113,1.237,114,27,9],
        [91,81,104,1.041,56,40,10],
        [84,39,60,0.964,25,11,11],
        [64,51,101,0.862,58,23,12],
        [70,69,120,1.198,65,36,13],
        [77,105,178,2.549,64,16,14],
        [109,68,87,0.996,74,29,15],
        [73,68,97,0.905,51,34,16],
        [54,27,47,0.592,53,12,17],
        [51,61,97,0.811,65,19,18],
        [91,71,121,1.374,43,18,19],
        [73,102,182,2.787,44,19,20],
        [73,50,76,0.717,31,20,21],
        [84,94,140,2.238,68,18,22],
        [93,77,104,1.165,53,7,23],
        [99,130,227,3.97,55,15,24],
        [146,84,139,1.094,40,17,25],
        [113,108,137,1.481,48,15,26],
        [81,48,62,1.619,26,3,27],
        [56,48,68,1.336,37,9,28],
        [82,92,174,3.29,0,13,29],
        [106,116,188,3.628,101,16,30],
        [118,50,0,1.383,76,11,31]
    ];

    var dataSH = [
        [91,45,125,0.82,34,23,1],
        [65,27,78,0.86,45,29,2],
        [83,60,84,1.09,73,27,3],
        [109,81,121,1.28,68,51,4],
        [106,77,114,1.07,55,51,5],
        [109,81,121,1.28,68,51,6],
        [106,77,114,1.07,55,51,7],
        [89,65,78,0.86,51,26,8],
        [53,33,47,0.64,50,17,9],
        [80,55,80,1.01,75,24,10],
        [117,81,124,1.03,45,24,11],
        [99,71,142,1.1,62,42,12],
        [95,69,130,1.28,74,50,13],
        [116,87,131,1.47,84,40,14],
        [108,80,121,1.3,85,37,15],
        [134,83,167,1.16,57,43,16],
        [79,43,107,1.05,59,37,17],
        [71,46,89,0.86,64,25,18],
        [97,71,113,1.17,88,31,19],
        [84,57,91,0.85,55,31,20],
        [87,63,101,0.9,56,41,21],
        [104,77,119,1.09,73,48,22],
        [87,62,100,1,72,28,23],
        [168,128,172,1.49,97,56,24],
        [65,45,51,0.74,39,17,25],
        [39,24,38,0.61,47,17,26],
        [39,24,39,0.59,50,19,27],
        [93,68,96,1.05,79,29,28],
        [188,143,197,1.66,99,51,29],
        [174,131,174,1.55,108,50,30],
        [187,143,201,1.39,89,53,31]
    ];

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };
    option9 = {
        title: {
            text: '设备故障因素',
            textStyle: {
                fontSize: 14,
                fontWeight: 'bolder',
                color: '#ffffff'          // 主标题文字颜色
            }
        },
        backgroundColor: 'transparent',
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 20,
        //     dimension: 6,
        //     inRange: {
        //         colorLightness: [0.5, 0.8]
        //     }
        // },
        radar: {
            indicator: [
                {name: '接入线路故障', max: 300},
                {name: '没有定期维护', max: 250},
                {name: '人为破坏', max: 300},
                {name: '平台接入模块故障', max: 5},
                {name: '年限已久', max: 200},
                {name: '自然环境因素', max: 100}
            ],
            shape: 'circle',
            splitNumber: 5,
            name: {
                textStyle: {
                    color: 'rgb(238, 197, 102)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)'
                }
            }
        },
        series: [
            {
                name: '北京',
                type: 'radar',
                lineStyle: lineStyle,
                data: data,
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#F9713C'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.1
                    }
                }
            }
        ]
    };
    myChart9.setOption(option9);
});

/*var navCount;
navCount = localStorage.getItem("navCount");
if(navCount==null){
    navCount=0;
    localStorage.setItem("navCount",navCount);
}
if(navCount%2==1){
    $("#test1").val("显示导航栏");
    $("nav").css("display","none");
    $("nav").css("width","0");
    $("#main1").css("margin-left","9.5%");
    $("#map").css("margin-left","9%");
}else {
    $("#test1").val("隐藏导航栏");
}
$("#test1").click(
    function () {
        navCount=localStorage.getItem("navCount");
        if(navCount%2==0){
            $("nav").css("display","none");
            $("#test1")[0].value="显示导航栏";
            $("#main1").css("margin-left","9.5%");
            $("#map").css("margin-left","9%");
        }else {
            $("nav").css("display","block");
            showTheme();
            $("#test1").val("隐藏导航栏");
            $("#main1").css("margin-left","1.5%");
            $("#map").css("margin-left","1%");
        }
        navCount++;
        localStorage.setItem("navCount",navCount);
    }
);*/

$('#test4').hover(
    function () {
        $('#test2').fadeIn(1000);
        $('#test3').fadeIn(1000);
    },function () {
        $('#test2').fadeOut(500);
        $('#test3').fadeOut(500);
    }
);

$('#test2').click(
    function () {
        themeCount=0;
        localStorage.setItem("themeCount",themeCount);
        showTheme();
    }
);

$('#test3').click(
    function () {
        themeCount=1;
        localStorage.setItem("themeCount",themeCount);
        showTheme();
    }
);

$('#test5').hover(
    function () {
        $('#test6').fadeIn(1000);
        $('#test7').fadeIn(1000);
    },function () {
        $('#test6').fadeOut(1000);
        $('#test7').fadeOut(1000);
    }
);

