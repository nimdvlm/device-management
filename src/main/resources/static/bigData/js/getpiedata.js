$("#main").css("display","none");
$("#main1").css("display","none");
$("#main2").css("display","none");
$("#main3").css("display","none");
$("#main").fadeIn(1000);
$("#main1").fadeIn(2000);
$("#main2").fadeIn(3000);
$("#main3").fadeIn(4000);
var myChart = echarts.init(document.getElementById('main'));

option = {
    title : {
        text: '设备数量',
        subtext: '近一周',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
    },
    series : [
        {
            name: '传感器数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:1, name:'压力传感器'},
                {value:2, name:'温度传感器'},
                {value:3, name:'湿度传感器'},
                {value:4, name:'形变传感器'},
                {value:3, name:'速率传感器'},
                {value:2, name:'光照传感器'}
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

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('main1'));

option1 = {
    title : {
        text: '数据数量',
        subtext: '近一周',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
    },
    series : [
        {
            name: '传感器数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:1, name:'压力传感器'},
                {value:2, name:'温度传感器'},
                {value:3, name:'湿度传感器'},
                {value:2, name:'形变传感器'},
                {value:5, name:'速率传感器'},
                {value:1, name:'光照传感器'}
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

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);

// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('main2'));

option2 = {
    title : {
        text: '正常数据数量',
        subtext: '近一周',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
    },
    series : [
        {
            name: '传感器数量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:4, name:'压力传感器'},
                {value:2, name:'温度传感器'},
                {value:5, name:'湿度传感器'},
                {value:3, name:'形变传感器'},
                {value:1, name:'速率传感器'},
                {value:2, name:'光照传感器'}
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

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);

// 基于准备好的dom，初始化echarts实例
var myChart3 = echarts.init(document.getElementById('main3'));

option3 = {
    title: {
        text: '正常数据比例',
        subtext: '近一周',
        x: 'center'
    },
    toolbox: {
        // y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
                pixelRatio: 2
            }
        }
    },
    tooltip: {},
    xAxis: {
        data: ['压力传感','温度传感','湿度传感','形变传感','速度传感','光照传感'],
        silent: false,
        splitLine: {
            show: false
        }
    },
    yAxis: {
        name: '百分率'
    },
    series: [{
        name: '百分率',
        type: 'bar',
        barWidth: 25,
        data: [
            {value:24,itemStyle:{color: '#b34038'}},
            {value:12,itemStyle:{color: '#c9856b'}},
            {value:45,itemStyle:{color: '#9cc5b0'}},
            {value:33,itemStyle:{color: '#7d9e85'}},
            {value:14,itemStyle:{color: '#6f9fa7'}},
            {value:25,itemStyle:{color: '#344553'}}
            ],
        animationDelay: function (idx) {
            return idx * 10;
        }
    }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};

// 使用刚指定的配置项和数据显示图表。
myChart3.setOption(option3);

/*function getData() {

    document.getElementById("YWaitDialog").setAttribute("style","display:flex;");
    function getXmlHttpObject() {

        var xmlHttpRequest;
        if(window.ActiveXObject){
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else{
            xmlHttpRequest = new XMLHttpRequest();
        }
        return xmlHttpRequest;

    }

    var myXmlHttpRequest="";
    myXmlHttpRequest = getXmlHttpObject();
    if(myXmlHttpRequest){
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url = "http://39.104.186.210:8090/api/analysis/device?tenantId=1";//url="http://39.104.186.210:8090/api/analysis/device?tenantId=1";getpiedata
        var data = null;
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest.open("post",url,true);
        myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        myXmlHttpRequest.onreadystatechange = proce;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest.send(data);
    }

    function proce() {

        if (myXmlHttpRequest.readyState == 4) {

            var mes = myXmlHttpRequest.responseText;
            window.alert(mes);
            $("#main").css("display","none");
            $("#main1").css("display","none");
            $("#main2").css("display","none");
            $("#main3").css("display","none");
            $("#main").fadeIn(3000);
            $("#main1").fadeIn(5000);
            $("#main2").fadeIn(7000);
            $("#main3").fadeIn(9000);
            document.getElementById("YWaitDialog").setAttribute("style","display:none;");
            var mes1 = JSON.parse(mes);
            meso = eval("(" + mes1 + ")");
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            option = {
                title : {
                    text: '设备数量',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
                },
                series : [
                    {
                        name: '传感器数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:meso.data.deviceCount.pressure, name:'压力传感器'},
                            {value:meso.data.deviceCount.temperature, name:'温度传感器'},
                            {value:meso.data.deviceCount.humidity, name:'湿度传感器'},
                            {value:meso.data.deviceCount.deformation, name:'形变传感器'},
                            {value:meso.data.deviceCount.velocity, name:'速率传感器'},
                            {value:meso.data.deviceCount.light, name:'光照传感器'}
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

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            // 基于准备好的dom，初始化echarts实例
            var myChart1 = echarts.init(document.getElementById('main1'));

            option1 = {
                title : {
                    text: '数据数量',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
                },
                series : [
                    {
                        name: '传感器数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:meso.data.dataCount.pressure, name:'压力传感器'},
                            {value:meso.data.dataCount.temperature, name:'温度传感器'},
                            {value:meso.data.dataCount.humidity, name:'湿度传感器'},
                            {value:meso.data.dataCount.deformation, name:'形变传感器'},
                            {value:meso.data.dataCount.velocity, name:'速率传感器'},
                            {value:meso.data.dataCount.light, name:'光照传感器'}
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

            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option1);

            // 基于准备好的dom，初始化echarts实例
            var myChart2 = echarts.init(document.getElementById('main2'));

            option2 = {
                title : {
                    text: '正常数据数量',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
                },
                series : [
                    {
                        name: '传感器数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:meso.data.usualDataCount.pressure, name:'压力传感器'},
                            {value:meso.data.usualDataCount.temperature, name:'温度传感器'},
                            {value:meso.data.usualDataCount.humidity, name:'湿度传感器'},
                            {value:meso.data.usualDataCount.deformation, name:'形变传感器'},
                            {value:meso.data.usualDataCount.velocity, name:'速率传感器'},
                            {value:meso.data.usualDataCount.light, name:'光照传感器'}
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

            // 使用刚指定的配置项和数据显示图表。
            myChart2.setOption(option2);

            // 基于准备好的dom，初始化echarts实例
            var myChart3 = echarts.init(document.getElementById('main3'));

            option3 = {
                title : {
                    text: '正常数据占有率',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
                },
                series : [
                    {
                        name: '传感器数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:meso.data.usualDataRate.pressure, name:'压力传感器'},
                            {value:meso.data.usualDataRate.temperature, name:'温度传感器'},
                            {value:meso.data.usualDataRate.humidity, name:'湿度传感器'},
                            {value:meso.data.usualDataRate.deformation, name:'形变传感器'},
                            {value:meso.data.usualDataRate.velocity, name:'速率传感器'},
                            {value:meso.data.usualDataRate.light, name:'光照传感器'}
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

            // 使用刚指定的配置项和数据显示图表。
            myChart3.setOption(option3);
            //window.alert(meso.data[0]["0"]);
            //window.alert(Object.keys(meso.data).length);*/
            /*for (var i = 0; i < splitNum; i++) {
                xAxisData.push(i);
            }
            for (var i = 0; i < Object.keys(meso.data).length; i++) {
                data1.push(meso.data[i]["0"]);
            }
            for (var i = 0; i < Object.keys(meso.data).length; i++) {
                data2.push(meso.data[i]["2"]);
            }
            for (var i = 0; i < Object.keys(meso.data).length; i++) {
                data3.push(meso.data[i]["1"]);
            }
            for (var i = 0; i < Object.keys(meso.data).length; i++) {
                data4.push(meso.data[i]["3"]);
            }
            for (var i = 0; i < Object.keys(meso.data).length; i++) {
                data5.push(meso.data[i]["4"]);
            }
            for (var i = 0; i < Object.keys(meso.data).length; i++) {
                data6.push(meso.data[i]["5"]);
            }
            for (var i = 0; i < Object.keys(meso.data).length; i++) {
                data7.push(meso.data[i]["6"]);
            }*/
        /*}
    }
}*/

function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}
function getXmlHttpObject() {

    var xmlHttpRequest;
    if(window.ActiveXObject){
        xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else{
        xmlHttpRequest = new XMLHttpRequest();
    }
    return xmlHttpRequest;
}
var myXmlHttpRequest1 = getXmlHttpObject();
var tenantId;
if(myXmlHttpRequest1){
    var url = "/api/rule/tenant";
    myXmlHttpRequest1.open("get",url,false);
    myXmlHttpRequest1.onreadystatechange = proce1;
    myXmlHttpRequest1.send(null);
}
function  proce1() {
    if(myXmlHttpRequest1.readyState == 4){

        var tenantIdj = myXmlHttpRequest1.responseText;
        var tenantIde = JSON.parse(tenantIdj);
        //var tenantIde = eval("("+tenantId+")");
        tenantId = tenantIde.tenantId;
    }
}

var myXmlHttpRequest2=getXmlHttpObject();
var inputStartDate = "";
var inputEndDate = "";
var splitNum = "";
var finalDate = "";
function starttoend(dateId) {

    if (dateId == "fname") {
        inputStartDate = document.getElementById(dateId).value;
    }
    if (dateId == "fname1") {
        inputEndDate = document.getElementById(dateId).value;
    }
}

function showData() {

    if((inputStartDate != "") && (inputEndDate != "")){
        document.getElementById("YWaitDialog").setAttribute("style","display:flex;");
        if(myXmlHttpRequest2){
            //var url = "toajax?username=" + document.getElementById("username").value;
            var url = "http://39.104.186.210:8090/api/analysis/device";//url="http://39.104.186.210:8090/api/analysis/data";getselectdata
            var startTime = new Date(inputStartDate);
            var startTimeChuo = startTime.getTime();
            var endTime = new Date(inputEndDate);
            var endTimeChuo = endTime.getTime();
            var data = "tenantId="+tenantId+"&startTime="+startTimeChuo+"&endTime="+endTimeChuo;
            //myXmlHttpRequest.open("get",url,true);
            myXmlHttpRequest2.open("post",url,true);
            myXmlHttpRequest2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            myXmlHttpRequest2.onreadystatechange = proce2;
            //myXmlHttpRequest.send(null);
            myXmlHttpRequest2.send(data);
        }

        function proce2() {

            if (myXmlHttpRequest2.readyState == 4) {
                document.getElementById("YWaitDialog").setAttribute("style","display:none;");
                var mes = myXmlHttpRequest2.responseText;
                var mes1 = JSON.parse(mes);
                meso = eval("(" + mes1 + ")");
                if(meso.status == 'success'){
                    var myChart = echarts.init(document.getElementById('main'));

                    option = {
                        title : {
                            text: '设备数量',
                            subtext: '精确查询  :'+inputStartDate+' - '+inputEndDate,
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
                        },
                        series : [
                            {
                                name: '传感器数量',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:meso.data.deviceCount.pressure, name:'压力传感器'},
                                    {value:meso.data.deviceCount.temperature, name:'温度传感器'},
                                    {value:meso.data.deviceCount.humidity, name:'湿度传感器'},
                                    {value:meso.data.deviceCount.deformation, name:'形变传感器'},
                                    {value:meso.data.deviceCount.velocity, name:'速率传感器'},
                                    {value:meso.data.deviceCount.light, name:'光照传感器'}
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

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);

                    // 基于准备好的dom，初始化echarts实例
                    var myChart1 = echarts.init(document.getElementById('main1'));

                    option1 = {
                        title : {
                            text: '数据数量',
                            subtext: '精确查询  :'+inputStartDate+' - '+inputEndDate,
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
                        },
                        series : [
                            {
                                name: '传感器数量',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:meso.data.dataCount.pressure, name:'压力传感器'},
                                    {value:meso.data.dataCount.temperature, name:'温度传感器'},
                                    {value:meso.data.dataCount.humidity, name:'湿度传感器'},
                                    {value:meso.data.dataCount.deformation, name:'形变传感器'},
                                    {value:meso.data.dataCount.velocity, name:'速率传感器'},
                                    {value:meso.data.dataCount.light, name:'光照传感器'}
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

                    // 使用刚指定的配置项和数据显示图表。
                    myChart1.setOption(option1);

                    // 基于准备好的dom，初始化echarts实例
                    var myChart2 = echarts.init(document.getElementById('main2'));

                    option2 = {
                        title : {
                            text: '正常数据数量',
                            subtext: '精确查询  :'+inputStartDate+' - '+inputEndDate,
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['压力传感器','温度传感器','湿度传感器','形变传感器','速率传感器','光照传感器']
                        },
                        series : [
                            {
                                name: '传感器数量',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:meso.data.usualDataCount.pressure, name:'压力传感器'},
                                    {value:meso.data.usualDataCount.temperature, name:'温度传感器'},
                                    {value:meso.data.usualDataCount.humidity, name:'湿度传感器'},
                                    {value:meso.data.usualDataCount.deformation, name:'形变传感器'},
                                    {value:meso.data.usualDataCount.velocity, name:'速率传感器'},
                                    {value:meso.data.usualDataCount.light, name:'光照传感器'}
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

                    // 使用刚指定的配置项和数据显示图表。
                    myChart2.setOption(option2);

                    var myChart3 = echarts.init(document.getElementById('main3'));

                    option3 = {
                        title: {
                            text: '正常数据比例',
                            subtext: '精确查询  :'+inputStartDate+' - '+inputEndDate,
                            x: 'center'
                        },
                        toolbox: {
                            // y: 'bottom',
                            feature: {
                                magicType: {
                                    type: ['stack', 'tiled']
                                },
                                dataView: {},
                                saveAsImage: {
                                    pixelRatio: 2
                                }
                            }
                        },
                        tooltip: {},
                        xAxis: {
                            data: ['压力传感','温度传感','湿度传感','形变传感','速度传感','光照传感'],
                            silent: false,
                            splitLine: {
                                show: false
                            }
                        },
                        yAxis: {
                            name: '百分率'
                        },
                        series: [{
                            name: '百分率',
                            type: 'bar',
                            barWidth: 25,
                            data: [
                                {value:meso.data.usualDataCount.pressure,itemStyle:{color: '#b34038'}},
                                {value:meso.data.usualDataCount.temperature,itemStyle:{color: '#c9856b'}},
                                {value:meso.data.usualDataCount.humidity,itemStyle:{color: '#9cc5b0'}},
                                {value:meso.data.usualDataCount.deformation,itemStyle:{color: '#7d9e85'}},
                                {value:meso.data.usualDataCount.velocity,itemStyle:{color: '#6f9fa7'}},
                                {value:meso.data.usualDataCount.light,itemStyle:{color: '#344553'}}
                            ],
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        }
                        ],
                        animationEasing: 'elasticOut',
                        animationDelayUpdate: function (idx) {
                            return idx * 5;
                        }
                    };

// 使用刚指定的配置项和数据显示图表。
                    myChart3.setOption(option3);
                }else {
                    window.alert("没有匹配的数据");
                }

            }
        }
    }else{
        window.alert("输入有误");
    }

}

/*var navCount;
navCount = localStorage.getItem("navCount");
if(navCount==null){
    navCount=0;
    localStorage.setItem("navCount",navCount);
}
if(navCount%2==1){
    $("#test1").val("显示导航栏");
    $("nav").html(null);
    $("nav").css("width","0");
    $("#navid").css("margin-left","8.5%");
}else {
    $("#test1").val("隐藏导航栏");
}
$("#test1").click(
    function () {
        navCount=localStorage.getItem("navCount");
        if(navCount%2==0){
            $("nav").html(null);
            $("nav").css("width","0");
            $("#navid").css("margin-left","8.5%");
            $("#test1")[0].value="显示导航栏";
        }else {
            $("nav").html("<ul>\n" +
                "        <li><a href=\"device1.html\"><span class=\"icon\">&#128202;</span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</a></li>\n" +
                "        <li><a href=\"start.html\"><span class=\"icon\">&#128200;</span>设备统计</a></li>\n" +
                "        <li><a href=\"model.html\"><span class=\"icon\">&#128201;</span>模型仓库</a></li>\n" +
                "        <li class=\"section\"><a href=\"hisdata.html\"><span class=\"icon\">&#128196;</span>海量分析</a></li><!--128711-->\n" +
                "    </ul>");
            $("nav").css("width","14.58%");
            showTheme();
            $("#navid").css("margin-left","0%");
            $("#test1").val("隐藏导航栏");
        }
        navCount++;
        localStorage.setItem("navCount",navCount);
    }
);*/

$('#mohuquery').change(
    function () {
        if($(this).val() == '近三天' || $(this).val() == '近一周' || $(this).val() == '近一月'){
            window.alert('需要模糊查询接口');
        }
    }
);

$('#test4').hover(
    function () {
        $('#test2').fadeIn(1000);
        $('#test3').fadeIn(1000);
    },function () {
        $('#test2').fadeOut(1000);
        $('#test3').fadeOut(1000);
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

$('#dropzone').hover(
    function () {
        $('#dropli').fadeIn(500);
    },function () {
        $('#dropli').fadeOut(500);
    }
);