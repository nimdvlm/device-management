var generalmodelmes;
var customizemodelmes;
var appmes;

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
var myXmlHttpRequest1=getXmlHttpObject();
if (myXmlHttpRequest1) {
    //var url3 = "toajax?username=" + document.getElementById("username").value;
    var url1 = "http://39.104.186.210:8090/api/model/get-general-model";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
    //myXmlHttpRequest.open("get",url,true);
    myXmlHttpRequest1.open("get", url1, false);//url="http://10.108.218.64:8090/api/analysis/device"
    myXmlHttpRequest1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    myXmlHttpRequest1.onreadystatechange = proce1;
    //myXmlHttpRequest.send(null);
    myXmlHttpRequest1.send(null);
}

function proce1() {

    if (myXmlHttpRequest1.readyState == 4) {

        var mes = myXmlHttpRequest1.responseText;
        var mes1 = JSON.parse(mes);
        var meso = eval("(" + mes1 + ")");
        generalmodelmes = meso;
        $('#chart_map').find('p').eq(1).html('模型名称：&nbsp;&nbsp;' + meso.data[meso.data.length-1].model_name);
        $('#chart_map').find('p').eq(2).html('模型描述：&nbsp;&nbsp;' +meso.data[meso.data.length-1].model_desc);
        $('#chart_map').find('p').eq(3).html('模型ID：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +meso.data[meso.data.length-1].model_id);
        $('#chart_map') .find('p').eq(4).html('模型路径：&nbsp;&nbsp;' +meso.data[meso.data.length-1].model_path);
        $('#chart_map') .find('p').eq(5).html('模型输入：&nbsp;&nbsp;' +meso.data[meso.data.length-1].model_input);
        for (var i=0; i<meso.data.length; i++) {
            $button1 = $('<button></button>');
            $button1.html(meso.data[i].model_name);
            if (i==meso.data.length-1){
                $button1.addClass('selectbutton');
            }
            $button1.addClass('abc');
            $li1 = $('<li></li>');
            $li1.append($button1);
            $('#addbutton1').after($li1);
        }
        $('#chart_map').append($('<button class="t_divbtn" id="button1" style="width:7%;height: 5%;margin-left: 46%;margin-top: 2%;font-size: 14px">添加应用</button>'));
        $("#button1").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
    }
}

var myXmlHttpRequest2=getXmlHttpObject();
if (myXmlHttpRequest2) {
    //var url3 = "toajax?username=" + document.getElementById("username").value;
    var url2 = "http://39.104.186.210:8090/api/model/get-tenant-model?tenantId=2";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
    //myXmlHttpRequest.open("get",url,true);
    myXmlHttpRequest2.open("get", url2, false);//url="http://10.108.218.64:8090/api/analysis/device"
    myXmlHttpRequest2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    myXmlHttpRequest2.onreadystatechange = proce2;
    //myXmlHttpRequest.send(null);
    myXmlHttpRequest2.send(null);
}

function proce2() {

    if (myXmlHttpRequest2.readyState == 4) {

        var mes = myXmlHttpRequest2.responseText;
        var mes1 = JSON.parse(mes);
        var meso = eval("(" + mes1 + ")");
        customizemodelmes = meso;
        for (var i=0; i<meso.data.length; i++){
            $button1 = $('<button></button>');
            $button1.html(meso.data[i].model_name);
            $button1.addClass('abc1');
            $li1 = $('<li></li>');
            $li1.append($button1);
            $('#addbutton2').after($li1);
        }
    }
}

var myXmlHttpRequest3=getXmlHttpObject();
if (myXmlHttpRequest3) {
    //var url3 = "toajax?username=" + document.getElementById("username").value;
    var url3 = "http://39.104.186.210:8090/api/app/get-app?tenantId=2";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
    //myXmlHttpRequest.open("get",url,true);
    myXmlHttpRequest3.open("get", url3, false);//url="http://10.108.218.64:8090/api/analysis/device"
    myXmlHttpRequest3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    myXmlHttpRequest3.onreadystatechange = proce3;
    //myXmlHttpRequest.send(null);
    myXmlHttpRequest3.send(null);
}

function proce3() {

    if (myXmlHttpRequest3.readyState == 4) {

        var mes = myXmlHttpRequest3.responseText;
        var mes1 = JSON.parse(mes);
        var meso = eval("(" + mes1 + ")");
        appmes = meso;
        for (var i=0; i<meso.data.length; i++){
            $button1 = $('<button></button>');
            if(meso.data[i].app_name == ""){
                $button1.html('predict_app');
            }else {
                $button1.html(meso.data[i].app_name);
            }
            $button1.addClass('abc2');
            $li1 = $('<li></li>');
            $li1.append($button1);
            $('#addbutton3').after($li1);
        }
    }
}

$('.abc').click(
    function () {
        $('.abc').removeClass('selectbutton');
        $('.abc1').removeClass('selectbutton');
        $('.abc2').removeClass('selectbutton');
        $(this).addClass('selectbutton');
        for (var i=0; i<generalmodelmes.data.length; i++){
            if(generalmodelmes.data[i].model_name == $(this).html()) {
                $('#chart_map').find('p').eq(0).html('通用模型');
                $('#chart_map').find('p').eq(1).html('模型名称：&nbsp;&nbsp;' + generalmodelmes.data[i].model_name);
                $('#chart_map').find('p').eq(2).html('模型描述：&nbsp;&nbsp;' + generalmodelmes.data[i].model_desc);
                $('#chart_map').find('p').eq(3).html('模型ID：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + generalmodelmes.data[i].model_id);
                $('#chart_map') .find('p').eq(4).html('模型路径：&nbsp;&nbsp;' + generalmodelmes.data[i].model_path);
                $('#chart_map') .find('p').eq(5).html('模型输入：&nbsp;&nbsp;' + generalmodelmes.data[i].model_input);
            }
        }
        $('#chart_map').find('button').remove();
        $('#chart_map').append($('<button class="t_divbtn" id="button1" style="width:7%;height: 5%;margin-left: 46%;margin-top: 2%;font-size: 14px">添加应用</button>'));
        $("#button1").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
    }
);
$('.abc1').click(
    function () {
        $('.abc').removeClass('selectbutton');
        $('.abc1').removeClass('selectbutton');
        $('.abc2').removeClass('selectbutton');
        $(this).addClass('selectbutton');
        for (var i=0; i<customizemodelmes.data.length; i++){
            if(customizemodelmes.data[i].model_name == $(this).html()) {
                $('#chart_map').find('p').eq(0).html('自定义模型');
                $('#chart_map').find('p').eq(1).html('模型名称：&nbsp;&nbsp;' + customizemodelmes.data[i].model_name);
                $('#chart_map').find('p').eq(2).html('模型描述：&nbsp;&nbsp;' + customizemodelmes.data[i].model_desc);
                $('#chart_map').find('p').eq(3).html('模型ID：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + customizemodelmes.data[i].model_id);
                $('#chart_map') .find('p').eq(4).html('模型路径：&nbsp;&nbsp;' + customizemodelmes.data[i].model_path);
                $('#chart_map') .find('p').eq(5).html('模型输入：&nbsp;&nbsp;' + customizemodelmes.data[i].model_input);
            }
        }
        $('#chart_map').find('button').remove();
        $('#chart_map').append($('<button class="t_divbtn" id="button2" style="width:7%;height: 5%;margin-left: 37.5%;margin-top: 2%;font-size: 14px">添加应用</button>\n' +
            '                    <button class="t_divbtn" id="button3" style="width:7%;height: 5%;margin-left: 0.5%;margin-top: 2%;font-size: 14px">添加模型</button>\n' +
            '                    <button class="t_divbtn" id="button4" style="width:7%;height: 5%;margin-left: 0.5%;margin-top: 2%;font-size: 14px">删除模型</button>'));
        $("#button2").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
        $("#button3").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
        $("#button4").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
    }

);
$('.abc2').click(
    function () {
        $('.abc').removeClass('selectbutton');
        $('.abc1').removeClass('selectbutton');
        $('.abc2').removeClass('selectbutton');
        $(this).addClass('selectbutton');
        var a;
        for (var i=0; i<appmes.data.length; i++){
            if ($(this).html() == 'predict_app'){
                a = "";
            }else {
                a = $(this).html();
            }
            if(appmes.data[i].app_name == a) {
                $('#chart_map').find('p').eq(0).html('模型应用');
                if(a == ''){
                    $('#chart_map').find('p').eq(1).html('应用名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 'predict_app');
                }else {
                    $('#chart_map').find('p').eq(1).html('应用名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + appmes.data[i].app_name);
                }
                $('#chart_map').find('p').eq(2).html('所属模型ID：&nbsp;&nbsp;' + appmes.data[i].model_id);
                $('#chart_map').find('p').eq(3).html('应用ID：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + appmes.data[i].app_id);
                $('#chart_map') .find('p').eq(4).html('停止时间：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + appmes.data[i].stop_time);
                $('#chart_map') .find('p').eq(5).html('模型输入：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + "输入属性1："+appmes.data[i].app_input[0].type+"，设备ID："+appmes.data[i].app_input[0].device_id+"<br><br><br><br>"+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;输入属性2："+appmes.data[i].app_input[1].type+"，设备ID："+appmes.data[i].app_input[1].device_id);
            }
        }
        $('#chart_map').find('button').remove();
        $('#chart_map').append($('<button class="t_divbtn" id="button5" style="width:7%;height: 5%;margin-left: 38%;margin-top: 1%;font-size: 14px">启动应用</button>\n' +
            '                    <button class="t_divbtn" id="button6" style="width:7%;height: 5%;margin-left: 0.5%;margin-top: 1%;font-size: 14px">预测结果</button>\n' +
            '                    <button class="t_divbtn" id="button7" style="width:7%;height: 5%;margin-left: 0.5%;margin-top: 1%;font-size: 14px">删除应用</button>'));
        $("#button5").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
        $("#button6").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
        $("#button7").click(
            function () {
                window.alert("暂不支持此功能");
            }
        );
    }
);

