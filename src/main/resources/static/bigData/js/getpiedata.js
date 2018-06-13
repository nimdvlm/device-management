document.getElementById("YWaitDialog").setAttribute("style","display:flex;");
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
                {value:null, name:'压力传感器'},
                {value:null, name:'温度传感器'},
                {value:null, name:'湿度传感器'},
                {value:null, name:'形变传感器'},
                {value:null, name:'速率传感器'},
                {value:null, name:'光照传感器'}
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
                {value:null, name:'压力传感器'},
                {value:null, name:'温度传感器'},
                {value:null, name:'湿度传感器'},
                {value:null, name:'形变传感器'},
                {value:null, name:'速率传感器'},
                {value:null, name:'光照传感器'}
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
                {value:null, name:'压力传感器'},
                {value:null, name:'温度传感器'},
                {value:null, name:'湿度传感器'},
                {value:null, name:'形变传感器'},
                {value:null, name:'速率传感器'},
                {value:null, name:'光照传感器'}
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
                {value:null, name:'压力传感器'},
                {value:null, name:'温度传感器'},
                {value:null, name:'湿度传感器'},
                {value:null, name:'形变传感器'},
                {value:null, name:'速率传感器'},
                {value:null, name:'光照传感器'}
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

function getData() {

    window.alert("数据分析中···，请耐心等待");
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
            //window.alert(Object.keys(meso.data).length);
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
        }
    }
}