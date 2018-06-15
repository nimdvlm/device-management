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

function getdata() {

    myXmlHttpRequest = getXmlHttpObject();
    if (myXmlHttpRequest) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url = "/api/device/alldevices?limit=12";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest.open("get", url, true);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        myXmlHttpRequest.onreadystatechange = proce;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest.send(null);
    }

    function proce() {

        if (myXmlHttpRequest.readyState == 4) {

            var mes = myXmlHttpRequest.responseText;
            var meso = eval("("+mes+")");
            //window.alert(meso.datagroup[0].deviceId);
            //window.alert(meso.datagroup.length);
            for(var i=0; i<meso.length; i++){

                var a = document.createElement("a");
                a.setAttribute("style","display:none");
                $(a).fadeIn((i%6)*((i%6))*500/2+2000);
                var div = document.createElement("div");
                div.setAttribute("id","mains"+i);
                div.setAttribute("class","abc");

                if(Math.floor((i+1)/2)%2==1){
                    if(i%2==1){
                        div.setAttribute("style","background:#c8856b;width: 30.55%;height:200px;float: left;margin:20px 2.77% 20px 2.77%");//background-image:url('images/bgimage1.png')
                    }else {
                        div.setAttribute("style","background:#c8856b;width: 36.11%;height:200px;float: left;margin:20px 2.77% 20px 2.77%");//background-image:url('images/bgimage1.png')
                    }
                    var deviceName = meso[i].name;
                    a.setAttribute("href","statisticsdata.html?deviceId="+meso[i].id+"&deviceNum=No-"+(i+1));
                    a.appendChild(div);
                    document.getElementById("main1").appendChild(a);
                    var myChart = echarts.init(document.getElementById('mains'+i));
                    var labelRight = {
                        normal: {
                            position: 'right'
                        }
                    };
                    option = {
                        title: {
                            left:'center',
                            text: deviceName,
                            textStyle:{
                                //文字颜色
                                color:'#ffffff',
                                //字体风格,'normal','italic','oblique'
                                //fontStyle:'normal',
                                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                                //fontWeight:'bold',
                                //字体大小
                                fontSize:18
                            },
                            padding: 20
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            top: 80,
                            bottom: 30
                        },

                        xAxis: {
                            type : 'value',
                            position: 'top',
                            splitLine: {lineStyle:{type:'dashed'}},
                            axisLabel:{
                                textStyle: {
                                    color: '#ffffff'
                                }
                            },
                            axisLine: {
                                lineStyle:{
                                    color:'#ffffff'
                                }}
                        },
                        yAxis: {
                            type : 'category',
                            axisLine: {
                                lineStyle:{
                                    color:'#ffffff'
                                }},
                            axisLabel: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            data : ['min', 'main', 'max']
                        },
                        series : [
                            {
                                name:meso[i].deviceType,
                                type:'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{b}'
                                    }
                                },
                                data:[
                                    //{value: -0.07, label: labelRight},
                                    17,25,32
                                ],
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#8dd2f7','#b3ff9b','#ff9171'
                                            ];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);

                }else {
                    if(i%2==1){
                        div.setAttribute("style","background:#fffae3;width: 30.55%;height:200px;float: left;margin:20px 2.77% 20px 25%");//background-image:url('images/bgimage1.png')
                    }else{
                        div.setAttribute("style","background:#fffae3;width: 58.33%;height:200px;float: left;margin:20px 2.77% 20px 2.77%");//background-image:url('images/bgimage1.png')
                    }
                    var deviceName = meso[i].name;
                    a.setAttribute("href","statisticsdata.html?deviceId="+meso[i].id+"&deviceNum=No-"+(i+1));
                    a.appendChild(div);
                    document.getElementById("main1").appendChild(a);
                    var myChart = echarts.init(document.getElementById('mains'+i));
                    var labelRight = {
                        normal: {
                            position: 'right'
                        }
                    };
                    option = {
                        title: {
                            left:'center',
                            text: deviceName,
                            textStyle:{
                                //文字颜色
                                color:'#3c3e40',
                                //字体风格,'normal','italic','oblique'
                                //fontStyle:'normal',
                                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                                //fontWeight:'bold',
                                //字体大小
                                fontSize:18
                            },
                            padding: 20
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            top: 80,
                            bottom: 30
                        },

                        xAxis: {
                            type : 'value',
                            position: 'top',
                            splitLine: {lineStyle:{type:'dashed'}},
                            axisLabel:{
                                textStyle: {
                                    color: '#3c3e40'
                                }
                            },
                            axisLine: {
                                lineStyle:{
                                    color:'#3c3e40'
                                }}
                        },
                        yAxis: {
                            type : 'category',
                            axisLine: {
                                lineStyle:{
                                    color:'#3c3e40'
                                }},
                            axisLabel: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            data : ['min', 'main', 'max']
                        },
                        series : [
                            {
                                name:meso[i].deviceType,
                                type:'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: '{b}'
                                    }
                                },
                                data:[
                                    //{value: -0.07, label: labelRight},
                                    17,25,32
                                ],
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            // build a color map as your need.
                                            var colorList = [
                                                '#ff9171','#b3ff9b','#8dd2f7'
                                            ];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);

                }

            }
            var div1 = document.createElement("div");
            div1.setAttribute("style","display:none;width:92.59%;height:400px");
            $(div1).fadeIn(3000);
            document.getElementById('main2').appendChild(div1);
            var myChart1 = echarts.init(div1);
            option = {
                backgroundColor: '#fffae3',//2c343c

                title: {
                    text: '设备数量',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#000000'
                    }
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'压力传感器'},
                            {value:310, name:'温度传感器'},
                            {value:274, name:'湿度传感器'},
                            {value:235, name:'形变传感器'},
                            {value:400, name:'速率传感器'},
                            {value:211, name:'光照传感器'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#000000'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#000000'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            myChart1.setOption(option);

            var div2 = document.createElement("div");
            div2.setAttribute("style","display:none;width:92.59%;height:400px;margin-top:40px");
            $(div2).fadeIn(5000);
            document.getElementById('main2').appendChild(div2);
            var myChart2 = echarts.init(div2);
            option = {
                backgroundColor: '#fffae3',

                title: {
                    text: '正常设备数量',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#000000'
                    }
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'压力传感器'},
                            {value:310, name:'温度传感器'},
                            {value:274, name:'湿度传感器'},
                            {value:235, name:'形变传感器'},
                            {value:400, name:'速率传感器'},
                            {value:211, name:'光照传感器'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#000000'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#000000)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            myChart2.setOption(option);

            var div3 = document.createElement("div");
            div3.setAttribute("style","display:none;width:92.59%;height:400px;margin-top:40px");
            $(div3).fadeIn(5000);
            document.getElementById('main2').appendChild(div3);
            var myChart3 = echarts.init(div3);
            option = {
                backgroundColor: '#fffae3',

                title: {
                    text: '异常设备数量',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#000000'
                    }
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'压力传感器'},
                            {value:310, name:'温度传感器'},
                            {value:274, name:'湿度传感器'},
                            {value:235, name:'形变传感器'},
                            {value:400, name:'速率传感器'},
                            {value:211, name:'光照传感器'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#000000'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#000000'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            myChart3.setOption(option);

            $('.abc').hover(
                function () {
                    $('.abc:not(:hover)').css("opacity","0.1");
                    $('#main2').css("opacity","0.1");
                },function () {
                    $('.abc').css("opacity","1");
                    $('#main2').css("opacity","1");
                }
            );

        }
    }
}
getdata();

var navCount;
navCount = localStorage.getItem("navCount");
if(navCount==null){
    navCount=0;
    localStorage.setItem("navCount",navCount);
}
if(navCount%2==1){
    $("#test1").val("显示导航栏");
    $("nav").html(null);
    $("nav").css("width","0");
    $("#main1").css("margin-left","10%");
}else {
    $("#test1").val("隐藏导航栏");
}
$("#test1").click(
    function () {
        navCount=localStorage.getItem("navCount");
        if(navCount%2==0){
            $("nav").html(null);
            $("nav").css("width","0");
            $("#main1").css("margin-left","10%");
            $("#test1")[0].value="显示导航栏";
        }else {
            $("nav").html("<ul>\n" +
                "        <li><a href=\"device1.html\"><span class=\"icon\">&#128202;</span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</a></li>\n" +
                "        <li class=\"section\"><a href=\"start.html\"><span class=\"icon\">&#128200;</span>设备统计</a></li>\n" +
                "        <li><a href=\"model.html\"><span class=\"icon\">&#128201;</span>模型仓库</a></li>\n" +
                "        <li><a href=\"hisdata.html\"><span class=\"icon\">&#128196;</span>海量分析</a></li><!--128711-->\n" +
                "    </ul>");
            $("nav").css("width","14.58%");
            showTheme();
            $("#main1").css("margin-left","0");
            $("#test1").val("隐藏导航栏");
        }
        navCount++;
        localStorage.setItem("navCount",navCount);
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

//mychart.on('mouseover/mouseout/mousemove',function(params){window.alert(params.name/value/type)});
/*$('li').hover(
        function () {
            //$('li:hover a').css("display","block");
            $('li:hover a').fadeIn(2000);
        },function () {
            //$('li:hover a').css("display","none");
            $('.dropdown').fadeOut(2000);
        }
    )*/