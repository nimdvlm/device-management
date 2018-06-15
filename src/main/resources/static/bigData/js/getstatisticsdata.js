document.getElementById("YWaitDialog").setAttribute("style","display:flex;");
$("#main").fadeIn(3000);
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

var myXmlHttpRequest="";
var deviceId = UrlParm.parm("deviceId");
var deviceNum = UrlParm.parm("deviceNum");
var sectionA = document.getElementById("transportId");
sectionA.setAttribute("href","dydatatrue.html?deviceId="+deviceId+"&deviceNum="+deviceNum);

/*function getdata() {

    myXmlHttpRequest = getXmlHttpObject();
    if(myXmlHttpRequest){
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url = "http://10.108.218.64:8090/api/analysis/data";
        var data = "tenantId=200&startTime=1522631722000&endTime=1525631722000&partNum=7";
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest.open("post",url,true);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        myXmlHttpRequest.onreadystatechange = proce;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest.send(data);
    }

    function proce() {

        if(myXmlHttpRequest.readyState==4) {
            var myChart = echarts.init(document.getElementById('main'));
            var xAxisData = [];
            var day = [];
            var data1 = [];
            var data2 = [];
            var data3 = [];
            var mes = myXmlHttpRequest.responseText;
            var mes1 = JSON.parse(mes);
            meso = eval("("+mes1+")");
            window.alert(mes1);
            window.alert(meso);
            //window.alert(meso.data[0]["0"]);
            //window.alert(Object.keys(meso.data).length);
            for(var i=0; i<Object.keys(meso.data).length;i++){
                data1.push(meso.data[i]["0"]);
            }
            for(var i=0; i<Object.keys(meso.data).length;i++){
                data2.push(meso.data[i]["1"]);
            }
            for(var i=0; i<Object.keys(meso.data).length;i++){
                data3.push(meso.data[i]["2"]);
            }
            //for (var item in meso.data[0]){
                //day.push(item);
                //data1.push(meso.data[0][item]);
            //}
            //for (var item in meso.data[1]){
            //    data2.push(meso.data[1][item]);
            //}
            //for (var item in meso.data[2]){
            //    data3.push(meso.data[2][item]);
            //}
            //for (var i = 0; i < day.length; i++) {
            //    xAxisData.push(day[i]);
            //}

            option = {
                title: {
                    text: '统计数据 '+"  设备"+deviceNum+"  ID:"+ deviceId
                },
                legend: {
                    data: ['最大值', '均值','最小值'],
                    align: 'left'
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
                    data: xAxisData,
                    silent: false,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name:'温度'
                },
                series: [{
                    name: '最大值',
                    type: 'bar',
                    data: data1,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }, {
                    name: '均值',
                    type: 'bar',
                    data: data2,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                },
                    {
                        name: '最小值',
                        type: 'bar',
                        data: data3,
                        animationDelay: function (idx) {
                            return idx * 10;
                        }

                    }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
}

getdata();*/

//var mes = myXmlHttpRequest.responseText;
//var mes1 = JSON.parse(mes);
//meso = eval("("+mes1+")");
//window.alert(mes1);
//window.alert(meso);
//window.alert(meso.data[0]["0"]);
//window.alert(Object.keys(meso.data).length);
/*for(var i=0; i<Object.keys(meso.data).length;i++){
    data1.push(meso.data[i]["0"]);
}
for(var i=0; i<Object.keys(meso.data).length;i++){
    data2.push(meso.data[i]["1"]);
}
for(var i=0; i<Object.keys(meso.data).length;i++){
    data3.push(meso.data[i]["2"]);
}*/
//for (var item in meso.data[0]){
//day.push(item);
//data1.push(meso.data[0][item]);
//}
//for (var item in meso.data[1]){
//    data2.push(meso.data[1][item]);
//}
//for (var item in meso.data[2]){
//    data3.push(meso.data[2][item]);
//}
//for (var i = 0; i < day.length; i++) {
//    xAxisData.push(day[i]);
//}

var myChart = echarts.init(document.getElementById('main'));
var xAxisData = [];
var day = [];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var data6 = [];
var data7 = [];

option = {
    title: {
        text: '统计数据 '+"  设备"+deviceNum
    },
    legend: {
        data: ['最大值', '均值','最小值','标准差','数据条数','正常数据条数','正常数据比例'],
        align: 'left'
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
        data: xAxisData,
        silent: false,
        splitLine: {
            show: false
        }
    },
    yAxis: {
        name:'温度'
    },
    series: [{
        name: '最大值',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: '均值',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
            return idx * 10 + 50;
        }
    },
        {
            name: '最小值',
            type: 'bar',
            data: data3,
            animationDelay: function (idx) {
                return idx * 100;
            }
        },{
            name: '标准差',
            type: 'bar',
            data: data4,
            animationDelay: function (idx) {
                return idx * 10 + 150;
            }
        },{
            name: '数据条数',
            type: 'bar',
            data: data5,
            animationDelay: function (idx) {
                return idx * 10 + 200;
            }
        },{
            name: '正常数据条数',
            type: 'bar',
            data: data6,
            animationDelay: function (idx) {
                return idx * 10 + 250;
            }
        },{
            name: '正常数据比例',
            type: 'bar',
            data: data7,
            animationDelay: function (idx) {
                return idx * 10 + 300;
            }
        }

    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 基于准备好的dom，初始化echarts实例
var inputStartDate = "";
var inputEndDate = "";
var splitNum = 7;
var finalDate = "";

function starttoend(dateId) {

    if (dateId == "fname") {
        inputStartDate = document.getElementById(dateId).value;
    }
    if (dateId == "fname1") {
        inputEndDate = document.getElementById(dateId).value;
    }
    if (dateId == "fname2") {
        splitNum = document.getElementById(dateId).value;
    }
}
myXmlHttpRequest = getXmlHttpObject();
var tenantId;
if(myXmlHttpRequest){
    var url = "/api/rule/tenant";
    myXmlHttpRequest.open("get",url,true);
    myXmlHttpRequest.onreadystatechange = proce;
    myXmlHttpRequest.send(null);
}
function  proce() {
    if(myXmlHttpRequest.readyState == 4){

        var tenantIdj = myXmlHttpRequest.responseText;
        var tenantIde = JSON.parse(tenantIdj);
        //var tenantIde = eval("("+tenantId+")");
        tenantId = tenantIde.tenantId;
    }
}
function showData() {

    if((inputStartDate != "") && (inputEndDate != "")){
        window.alert("数据分析中···，请耐心等待");
        if(myXmlHttpRequest){
            //var url = "toajax?username=" + document.getElementById("username").value;
            var url = "http://39.104.186.210:8090/api/analysis/data";//url="http://39.104.186.210:8090/api/analysis/data";getselectdata
            var startTime = new Date(inputStartDate);
            var startTimeChuo = startTime.getTime();
            var endTime = new Date(inputEndDate);
            var endTimeChuo = endTime.getTime();
            var data = "tenantId="+tenantId+"&startTime="+startTimeChuo+"&endTime="+endTimeChuo+"&partNum="+splitNum;
            //myXmlHttpRequest.open("get",url,true);
            myXmlHttpRequest.open("post",url,true);
            myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            myXmlHttpRequest.onreadystatechange = proce;
            //myXmlHttpRequest.send(null);
            myXmlHttpRequest.send(data);
        }

        function proce() {

            if (myXmlHttpRequest.readyState == 4) {
                var myChart = echarts.init(document.getElementById('main'));
                $("#main").css("display","none");
                $("#main").fadeIn(3000);
                var xAxisData = [];
                var data1 = [];
                var data2 = [];
                var data3 = [];
                var data4 = [];
                var data5 = [];
                var data6 = [];
                var data7 = [];
                var mes = myXmlHttpRequest.responseText;
                window.alert(mes);
                var mes1 = JSON.parse(mes);
                meso = eval("("+mes1+")");
                for (var item in meso.data[0]){
                    var item1 = parseInt(item);
                    xAxisData.push(timestampToTime(item1));
                    data1.push(meso.data[0][item]);
                }
                for (var item in meso.data[2]){
                    data2.push(meso.data[2][item]);
                }
                for (var item in meso.data[1]){
                    data3.push(meso.data[1][item]);
                }
                for (var item in meso.data[3]){
                    data4.push(meso.data[3][item]);
                }
                for (var item in meso.data[4]){
                    data5.push(meso.data[4][item]);
                }
                for (var item in meso.data[5]){
                    data6.push(meso.data[5][item]);
                }
                for (var item in meso.data[6]){
                    data7.push(meso.data[6][item]);
                }
                //window.alert(meso.data[0]["0"]);
                //window.alert(Object.keys(meso.data).length);
                /*for(var i=0; i<splitNum; i++){
                    xAxisData.push(i);
                }
                for(var i=0; i<Object.keys(meso.data).length;i++){
                    data1.push(meso.data[i]["0"]);
                }
                for(var i=0; i<Object.keys(meso.data).length;i++){
                    data2.push(meso.data[i]["2"]);
                }
                for(var i=0; i<Object.keys(meso.data).length;i++){
                    data3.push(meso.data[i]["1"]);
                }
                for(var i=0; i<Object.keys(meso.data).length;i++){
                    data4.push(meso.data[i]["3"]);
                }
                for(var i=0; i<Object.keys(meso.data).length;i++){
                    data5.push(meso.data[i]["4"]);
                }
                for(var i=0; i<Object.keys(meso.data).length;i++){
                    data6.push(meso.data[i]["5"]);
                }
                for(var i=0; i<Object.keys(meso.data).length;i++){
                    data7.push(meso.data[i]["6"]);
                }*/

                option = {
                    title: {
                        text: '统计数据 ' + "  设备" + deviceNum
                    },
                    legend: {
                        data: ['最大值', '均值', '最小值','标准差','数据条数','正常数据条数','正常数据比例'],
                        align: 'left'
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
                        data: xAxisData,
                        silent: false,
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        name: '温度'
                    },
                    series: [{
                        name: '最大值',
                        type: 'bar',
                        data: data1,
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }, {
                        name: '均值',
                        type: 'bar',
                        data: data2,
                        animationDelay: function (idx) {
                            return idx * 10 + 100;
                        }
                    },
                        {
                            name: '最小值',
                            type: 'bar',
                            data: data3,
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        },
                        {
                            name: '标准差',
                            type: 'bar',
                            data: data4,
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        },
                        {
                            name: '数据条数',
                            type: 'bar',
                            data: data5,
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        },
                        {
                            name: '正常数据条数',
                            type: 'bar',
                            data: data6,
                            animationDelay: function (idx) {
                                return idx * 10;
                            }
                        },
                        {
                            name: '正常数据比例',
                            type: 'bar',
                            data: data7,
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
                myChart.setOption(option);
            }
        }
        document.getElementById("YWaitDialog").setAttribute("style","display:none;");
    }else{
        window.alert("输入有误");
    }

}

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
                "        <li class=\"section\"><a href=\"start.html\"><span class=\"icon\">&#128200;</span>设备统计</a></li>\n" +
                "        <li><a href=\"model.html\"><span class=\"icon\">&#128201;</span>模型仓库</a></li>\n" +
                "        <li><a href=\"hisdata.html\"><span class=\"icon\">&#128196;</span>海量分析</a></li><!--128711-->\n" +
                "    </ul>");
            $("nav").css("width","14.58%");
            showTheme();
            $("#navid").css("margin-left","0");
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

//var timestamp1 = Date.parse(new Date());
//window.alert(timestamp1);
//var timestamp1 = new Date();
//window.alert(timestamp1.getFullYear()+timestamp1.getDate()+"");
//var timestamp1 = Date.parse(new Date());
//window.alert(new Date(timestamp1));