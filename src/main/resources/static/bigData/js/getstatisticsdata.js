function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate()) + '\n';
    if (date.getHours()<10){
        h = "0"+date.getHours() + ':';
    }else {
        h = date.getHours() + ':';
    }
    if (date.getMinutes()<10){
        m = "0"+date.getMinutes() + ':';
    }else {
        m = date.getMinutes() + ':';
    }
    if (date.getSeconds()<10){
        s = "0"+date.getSeconds();
    }else {
        s = date.getSeconds();
    }
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

/*var myXmlHttpRequest="";
var deviceId = UrlParm.parm("deviceId");
var deviceNum = UrlParm.parm("deviceNum");

function getdata() {

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

var myXmlHttpRequest1 = getXmlHttpObject();
var tenantId;
if(myXmlHttpRequest1){
    var url1 = "/api/rule/tenant";
    myXmlHttpRequest1.open("get",url1,false);
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
var myXmlHttpRequest5 = getXmlHttpObject();
if(myXmlHttpRequest5){
    var url5 = "http://39.104.186.210:8090/api/device/device-types?tenantId="+tenantId;
    myXmlHttpRequest5.open("get",url5,false);
    myXmlHttpRequest5.onreadystatechange = proce5;
    myXmlHttpRequest5.send(null);
}
function  proce5() {
    if(myXmlHttpRequest5.readyState == 4){

        var deviceType = myXmlHttpRequest5.responseText;
        var deviceType1 = JSON.parse(deviceType);
        var deviceType2 = eval("("+deviceType1+")");
        for (var i=0; i<deviceType2.deviceTypes.length; i++){
            if (i==0){
                $option = $('<option></option>');
                $option.html(deviceType2.deviceTypes[i]);
                $option.attr("selected","selected");
                $('#mohuquery1').append($option);
            }else {
                $option = $('<option></option>');
                $option.html(deviceType2.deviceTypes[i]);
                $('#mohuquery1').append($option);
            }
        }
        recentBarAjax(7,deviceType2.deviceTypes[0]);

    }
}

var deviceGroup = [];
myXmlHttpRequest2 = getXmlHttpObject();
if (myXmlHttpRequest2) {
    //var url3 = "toajax?username=" + document.getElementById("username").value;
    var url2 = "/api/device/alldevices?limit=20";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
    //myXmlHttpRequest.open("get",url,true);
    myXmlHttpRequest2.open("get", url2, true);//url="http://10.108.218.64:8090/api/analysis/device"
    myXmlHttpRequest2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    myXmlHttpRequest2.onreadystatechange = proce2;
    //myXmlHttpRequest.send(null);
    myXmlHttpRequest2.send(null);
}

function proce2() {

    if (myXmlHttpRequest2.readyState == 4) {

        var mes = myXmlHttpRequest2.responseText;
        var meso = eval("(" + mes + ")");
        //window.alert(meso.datagroup[0].deviceId);
        //window.alert(meso.datagroup.length);
        for (var i = 0; i < meso.length; i++) {
            deviceGroup.push(meso[i].name);
            deviceGroup.push(meso[i].id);
        }
    }
}
var inputStartDate = "";
var inputEndDate = "";
var splitNum = "";
var deviceSelect = "";
var deviceSelect1 = "";
var subtext = "";
var urldata = "";

function showData() {

    var h = $('#fnameh').val();
    var min = $('#fnamemin').val();
    var s = $('#fnames').val();
    var h1 = $('#fnameh1').val();
    var min1 = $('#fnamemin1').val();
    var s1 = $('#fnames1').val();
    var radios = document.getElementsByName('Fruit');
    for (var a = 0, length = radios.length; a < length; a++) {
        if (radios[a].checked) {
            // 弹出选中值
            if(radios[a].value == 'device'){
                inputStartDate = $('#fname').val();
                inputEndDate = $('#fname1').val();
                splitNum = $('#fname2').val();
                deviceSelect1 = $('#fname4').val();
                if ((deviceSelect1 == "请选择设备名称")){
                    window.alert("请选择设备名称");
                    $('#modelchange').removeAttr("data-dismiss");
                }else if ((inputStartDate == "")){
                    window.alert("请输入开始时间");
                    $('#modelchange').removeAttr("data-dismiss");
                }else if ((inputEndDate == "")){
                    window.alert("请输入结束时间");
                    $('#modelchange').removeAttr("data-dismiss");
                }else if ((splitNum == "")){
                    window.alert("请输入分段个数");
                    $('#modelchange').removeAttr("data-dismiss");
                }else {
                    $('#modelchange').attr("data-dismiss","modal");
                    var startTime = new Date(inputStartDate);
                    var startTimeChuo = startTime.getTime()+h*3600*1000+min*60*1000+s*1000-8*3600*1000;
                    var endTime = new Date(inputEndDate);
                    var endTimeChuo = endTime.getTime()+h1*3600*1000+min1*60*1000+s1*1000-8*3600*1000;
                    subtext = '设备名称：'+deviceSelect1;
                    deviceSelect1 = deviceGroup[(deviceGroup.indexOf(deviceSelect1)+1)];
                    urldata = "tenantId="+tenantId+"&startTime="+startTimeChuo+"&endTime="+endTimeChuo+"&partNum="+splitNum+"&deviceId="+deviceSelect1;
                    drawstatistics(h,min,s,h1,min1,s1,subtext,urldata);
                }
            }else {
                inputStartDate = $('#fname').val();
                inputEndDate = $('#fname1').val();
                splitNum = $('#fname2').val();
                deviceSelect = $('#fname3').val();
                if ((deviceSelect == "请选择设备类型")){
                    window.alert("请选择设备类型");
                    $('#modelchange').removeAttr("data-dismiss");
                }else if ((inputStartDate == "")){
                    window.alert("请输入开始时间");
                    $('#modelchange').removeAttr("data-dismiss");
                }else if ((inputEndDate == "")){
                    window.alert("请输入结束时间");
                    $('#modelchange').removeAttr("data-dismiss");
                }else if ((splitNum == "")){
                    window.alert("请输入分段个数");
                    $('#modelchange').removeAttr("data-dismiss");
                }else {
                    $('#modelchange').attr("data-dismiss","modal");
                    var startTime1 = new Date(inputStartDate);
                    var startTimeChuo1 = startTime1.getTime()+h*3600*1000+min*60*1000+s*1000-8*3600*1000;
                    var endTime1 = new Date(inputEndDate);
                    var endTimeChuo1 = endTime1.getTime()+h1*3600*1000+min1*60*1000+s1*1000-8*3600*1000;
                    subtext = '设备类型：'+deviceSelect;
                    urldata = "tenantId="+tenantId+"&startTime="+startTimeChuo1+"&endTime="+endTimeChuo1+"&partNum="+splitNum+"&deviceType="+deviceSelect;
                    drawstatistics(h,min,s,h1,min1,s1,subtext,urldata);
                }
            }
        }
    }
}

function drawstatistics(h,min,s,h1,min1,s1,subtext,urldata) {
    myXmlHttpRequest3 = getXmlHttpObject();
    document.getElementById("YWaitDialog").setAttribute("style","display:flex;");
    if(myXmlHttpRequest3){
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url3 = "http://39.104.186.210:8090/api/analysis/data";//url="http://39.104.186.210:8090/api/analysis/data";getselectdata
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest3.open("post",url3,true);
        myXmlHttpRequest3.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        myXmlHttpRequest3.onreadystatechange = proce3;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest3.send(urldata);
    }

    function proce3() {

        if (myXmlHttpRequest3.readyState == 4) {
            document.getElementById("YWaitDialog").setAttribute("style","display:none;");
            var mes = myXmlHttpRequest3.responseText;
            if (mes == ""){
                window.alert("返回值为null");
            }else {
                var mes1 = JSON.parse(mes);
                meso = eval("("+mes1+")");
                if(meso.status == 'success'){
                    var xAxisData = [];
                    var data1 = [];
                    var data2 = [];
                    var data3 = [];
                    var data4 = [];
                    var data5 = [];
                    var data6 = [];
                    var data7 = [];
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
                    var myChart = echarts.init(document.getElementById('main'));
                    if(h<10){
                        h = "0" + h;
                    }
                    if(min<10){
                        min = "0" + min;
                    }
                    if(s<10){
                        s = "0" + s;
                    }
                    if(h1<10){
                        h1 = "0" + h1;
                    }
                    if(min1<10){
                        min1 = "0" + min1;
                    }
                    if(s1<10){
                        s1 = "0" + s1;
                    }
                    option = {
                        title: {
                            text: subtext,
                            subtext: '精确查询：'+inputStartDate+' '+h+':'+min+':'+s+' - '+inputEndDate+' '+h1+':'+min1+':'+s1,
                            subtextStyle:{
                                left: 'center'
                            }
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
                            //name: '温度'
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
                    myChart.clear();
                    myChart.setOption(option);
                }else {
                    window.alert('没有匹配的数据');
                }
            }
        }
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
);*/

$('#test12').hover(
    function () {
        $('#test121').fadeIn(1000);
        $('#test122').fadeIn(1000);
    },function () {
        $('#test121').fadeOut(1000);
        $('#test122').fadeOut(1000);
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

$('input[type=radio][name=Fruit]').change(function() {
    if (this.value == 'type') {
        $('#modaldiv').children('span').remove();
        $('#modaldiv').children('select').remove();
        $spanType = $('<span style="width: 10%;font-size: 15px;color: gray;margin-left: 20px"><strong>设备类型</strong> </span>\n' +
            '                    <select id="fname3" style="margin-left: 1%">\n' +
            '                        <option>请选择设备类型</option>\n' +
            '                        <option>temperature</option>\n' +
            '                        <option>humidity</option>\n' +
            '                        <option>pressure</option>\n' +
            '                        <option>deformation</option>\n' +
            '                        <option>velocity</option>\n' +
            '                        <option>light</option>\n' +
            '                    </select>');
        $('#modaldiv').prepend($spanType);
    }
    else if (this.value == 'device') {
        $('#modaldiv').children('span').remove();
        $('#modaldiv').children('select').remove();
        $spanDevice = $('<span style="width: 10%;font-size: 15px;color: gray;margin-left: 20px"><strong>设备名称</strong> </span>\n' +
            '                    <select id="fname4" style="margin-left: 1%">\n' +
            '                        <option>请选择设备名称</option>\n' +
            '                        <option>21</option>\n' +
            '                        <option>22</option>\n' +
            '                        <option>23</option>\n' +
            '                        <option>24</option>\n' +
            '                        <option>25</option>\n' +
            '                        <option>26</option>\n' +
            '                    </select>');
        $('#modaldiv').append($spanDevice);
        for (var i=0; i<deviceGroup.length; i=i+2){
            $deviceOption = $('<option></option>');
            $deviceOption.html(deviceGroup[i]);
            $('#fname4').append($deviceOption);
        }
    }
});

$('#mohuquery').change(
    function () {
        var days;
        var day = $('#mohuquery').val();
        if (day == '近三天'){
            days = 3;
        }else if (day == '近一周'){
            days = 7;
        }else if (day == '近一月'){
            days = 30;
        }else {
            window.alert("输入错误");
        }
        var deviceType = $('#mohuquery1').val();
        recentBarAjax(days,deviceType);
    }
);
$('#mohuquery1').change(
    function () {
        var days;
        var day = $('#mohuquery').val();
        if (day == '近三天'){
            days = 3;
        }else if (day == '近一周'){
            days = 7;
        }else if (day == '近一月'){
            days = 30;
        }else {
            window.alert("输入有误");
        }
        var deviceType = $('#mohuquery1').val();
        recentBarAjax(days,deviceType);
    }
);

$('#dropzone').hover(
    function () {
        $('#dropli').fadeIn(500);
    },function () {
        $('#dropli').fadeOut(500);
    }
);

function drawRecentBar(deviceType,subtext,legend,day,series) {

    var myChart = echarts.init(document.getElementById('main'));
    option = {
        title: {
            text: '设备类型：'+deviceType,
            subtext: '模糊查询：'+subtext,
            subtextStyle:{}
        },
        legend: {
            data: legend,
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
            data: day,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            //name:'温度'
        },
        series: series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    myChart.clear();
    myChart.setOption(option);
}

function recentBarAjax(days,deviceType) {

    var myXmlHttpRequest4 = getXmlHttpObject();
    if(myXmlHttpRequest4){
        var url4 = "http://39.104.186.210:8090/api/analysis/recent-data?tenantId="+tenantId+"&days="+days;
        myXmlHttpRequest4.open("get",url4,true);
        myXmlHttpRequest4.onreadystatechange = proce4;
        myXmlHttpRequest4.send(null);
    }
    function  proce4() {
        if(myXmlHttpRequest4.readyState == 4){

            var recentGroup = myXmlHttpRequest4.responseText;
            var mes = JSON.parse(recentGroup);
            var meso = eval("("+mes+")");
            var day = [];
            var data = [];
            var seriesGroup = [];
            var legend = [];
            var i=0;
            for (var item in meso){

                if(i==0){
                    for (var item1 in meso[item]){
                        day.push(item1);
                    }
                }
                i++;
                for (var item1 in meso[item]){
                    data.push(meso[item][item1][deviceType]);
                }
                if (item == 'maxValue'){
                    item = '最大值';
                }
                if (item == 'meanValue'){
                    item = '均值';
                }
                if (item == 'stddevValue'){
                    item = '标准差';
                }
                if (item == 'dataCount'){
                    item = '数据条数';
                }
                if (item == 'minValue'){
                    item = '最小值';
                }
                legend.push(item);
                var series = {
                    name: item,
                    type: 'bar',
                    data: data,
                    animationDelay: function (idx) {
                        return idx * 100;
                    }
                };
                seriesGroup.push(series);
                data = [];
            }

            if (days == 3){
                drawRecentBar(deviceType,"近三天",legend,day,seriesGroup);
            }else if (days == 7){
                drawRecentBar(deviceType,"近一周",legend,day,seriesGroup);
            }else if (days == 30){
                drawRecentBar(deviceType,"近一月",legend,day,seriesGroup);
            }else {
                window.alert("输入有误");
            }
        }
    }
}

//var timestamp1 = Date.parse(new Date());
//window.alert(timestamp1);
//var timestamp1 = new Date();
//window.alert(timestamp1.getFullYear()+timestamp1.getDate()+"");
//var timestamp1 = Date.parse(new Date());
//window.alert(new Date(timestamp1));