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
var myXmlHttpRequest1="";
var deviceGroup = [];
var modelDetail = [];

function getdata(){

    myXmlHttpRequest3 = getXmlHttpObject();
    if (myXmlHttpRequest3) {
        //var url3 = "toajax?username=" + document.getElementById("username").value;
        var url3 = "/api/device/alldevices?limit=20";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
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
            var meso = eval("(" + mes + ")");
            //window.alert(meso.datagroup[0].deviceId);
            //window.alert(meso.datagroup.length);
            for (var i = 0; i < meso.length; i++) {
                deviceGroup.push(meso[i].name);
                deviceGroup.push(meso[i].id);
            }
        }
    }

    myXmlHttpRequest = getXmlHttpObject();
    if (myXmlHttpRequest) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url = "http://39.104.186.210:8090/api/model/get-model";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest.open("get", url, false);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        myXmlHttpRequest.onreadystatechange = proce;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest.send(null);
    }

    function proce() {

        if (myXmlHttpRequest.readyState == 4) {

            var mes = myXmlHttpRequest.responseText;
            var mes1 = JSON.parse(mes);
            var meso = eval("(" + mes1 + ")");
            //window.alert(meso.datagroup[0].deviceId);
            //window.alert(meso.datagroup.length);
            for (var i = 0; i < meso.data.length; i++) {

                var model_name = meso.data[i].model_name;
                var model_id = meso.data[i].model_id;
                var model_input = meso.data[i].model_input;
                modelDetail.push(model_name);
                modelDetail.push(model_id);
                modelDetail.push(model_input);
                var divadd = document.createElement("div");
                var divadd1 = document.createElement("div");
                var divaddall = document.createElement("div");
                var button1 = document.createElement("button");
                button1.setAttribute("style","width:50%;font-size:11px;border: 1px solid #4b4f51; margin: 0");
                button1.setAttribute("data-toggle","modal");
                button1.setAttribute("data-target","#myModal");
                button1.setAttribute("onclick","addModel(this)");
                button1.innerHTML = '添加实例';
                var button2 = document.createElement("button");
                button2.setAttribute("style","width:50%;font-size:11px;border: 1px solid #4b4f51; margin: 0");
                button2.setAttribute("data-toggle","modal");
                button2.setAttribute("data-target","#myModal1");
                button2.setAttribute("onclick","viewModel(this)");
                button2.innerHTML = '查看详情';
                divadd1.setAttribute("style","width: 100%;height:10%;display:block");
                if(i%4 == 0){
                    divaddall.setAttribute("style","width: 15%;height: 18%;margin-top: 3%;margin-left: 14%;float:left");
                }else {
                    divaddall.setAttribute("style","width: 15%;height: 18%;margin-top: 3%;margin-left: 4%;float:left");
                }
                divadd.setAttribute("class", "card");
                divadd.setAttribute("style", "display:none;background: #fffae3;margin-right: 0px; width:100%; height:90%");
                $(divadd).fadeIn(500 + 300 * i);
                var p1 = document.createElement("p");
                p1.setAttribute("style", "color:#000000;font-size:20px;margin-top:30%");
                p1.innerHTML = model_name;
                var p2 = document.createElement("p");
                p2.setAttribute("style", "display: none");
                p2.innerHTML = model_id;
                divadd.appendChild(p1);
                divadd.appendChild(p2);
                divadd1.appendChild(button1);
                divadd1.appendChild(button2);
                divaddall.appendChild(divadd);
                divaddall.appendChild(divadd1);
                document.body.appendChild(divaddall);
                $('body').append($('<div id="main2" style="width: 100%;margin-left:20px; margin-top:250px; font-size:16px">\n' +
                    '    <h1 style="color: white;font-size: 16px; margin-left: 1%">自定义模型</h1>\n' +
                    '</div>'));
                for (var e=0; e<10; e++){
                    var divadd2 = document.createElement("div");
                    var divadd3 = document.createElement("div");
                    var divaddall1 = document.createElement("div");
                    var button11 = document.createElement("button");
                    button11.setAttribute("style","width:33.3%;font-size:11px;border: 1px solid #4b4f51; margin: 0");
                    button11.setAttribute("data-toggle","modal");
                    button11.setAttribute("data-target","#myModal");
                    button11.setAttribute("onclick","addModel1(this)");
                    button11.innerHTML = '添加';
                    var button21 = document.createElement("button");
                    button21.setAttribute("style","width:33.3%;font-size:11px;border: 1px solid #4b4f51; margin: 0");
                    button21.setAttribute("data-toggle","modal");
                    button21.setAttribute("data-target","#myModal1");
                    button21.setAttribute("onclick","viewModel1(this)");
                    button21.innerHTML = '详情';
                    var button13 = document.createElement("button");
                    button13.setAttribute("style","width:33.3%;font-size:11px;border: 1px solid #4b4f51; margin: 0");
                    button13.setAttribute("data-toggle","modal");
                    button13.setAttribute("data-target","#myModal1");
                    button13.setAttribute("onclick","deleteModel1(this)");
                    button13.innerHTML = '删除';
                    divadd3.setAttribute("style","width: 100%;height:10%;display:block");
                    if(i%4 == 0){
                        divaddall1.setAttribute("style","width: 15%;height: 18%;margin-top: 3%;margin-left: 14%;float:left");
                    }else {
                        divaddall1.setAttribute("style","width: 15%;height: 18%;margin-top: 3%;margin-left: 4%;float:left");
                    }
                    divadd2.setAttribute("class", "card");
                    divadd2.setAttribute("style", "display:none;background: #fffae3;margin-right: 0px; width:100%; height:90%");
                    $(divadd2).fadeIn(500 + 300 * i);
                    var p3 = document.createElement("p");
                    p3.setAttribute("style", "color:#000000;font-size:20px;margin-top:30%");
                    p3.innerHTML = 'Customize-'+e;
                    divadd2.appendChild(p3);
                    divadd3.appendChild(button11);
                    divadd3.appendChild(button21);
                    divadd3.appendChild(button13);
                    divaddall1.appendChild(divadd2);
                    divaddall1.appendChild(divadd3);
                    document.body.appendChild(divaddall1);
                }

            }
        }
    }
}

function getdata1() {

    myXmlHttpRequest1 = getXmlHttpObject();
    if (myXmlHttpRequest1) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url1 = "http://39.104.186.210:8090/api/app/get-app";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest1.open("get", url1, true);//url="http://10.108.218.64:8090/api/analysis/device"
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

            //window.alert(meso.datagroup[0].deviceId);
            //window.alert(meso.datagroup.length);

            for (var j = 0; j < meso.data.length; j++) {
                var divadd = document.createElement("div");
                divadd.setAttribute("class", "card");
                if (themeCount % 2 == 1) {
                    divadd.setAttribute("style", "display:none;background-image:url(images/ting4.png);margin-top: 20px;margin-left: 20px");
                } else {
                    divadd.setAttribute("style", "display:none;background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
                }
                $(divadd).fadeIn(500 + 300 * j);
                var p1 = document.createElement("p");
                p1.setAttribute("style", "color:white;font-size:20px;margin-top:25px");
                    p1.innerHTML = "Model-"+ meso.data[j].model_id ;
                divadd.appendChild(p1);
                var p2 = document.createElement("p");
                p2.setAttribute("style", "color:white;font-size:12px;margin-top:25px");
                p2.innerHTML = "实例ID:"+ meso.data[j].app_id;
                divadd.appendChild(p2);
                var p3 = document.createElement("p");
                p3.setAttribute("style", "color:white;font-size:12px;margin-top:10px");
                p3.innerHTML = "Key1:"+meso.data[j].app_input[0].type + ",deviceId:" + meso.data[j].app_input[0].device_id;
                divadd.appendChild(p3);
                var p4 = document.createElement("p");
                p4.setAttribute("style", "color:white;font-size:12px;margin-top:10px");
                p4.innerHTML = "Key2:"+meso.data[j].app_input[1].type + ",deviceId:" + meso.data[j].app_input[1].device_id;
                divadd.appendChild(p4);
                document.getElementById("main2").appendChild(divadd);
            }
        }
    }
}

getdata();
//getdata1();

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
                "        <li><a href=\"start.html\"><span class=\"icon\">&#128200;</span>设备统计</a></li>\n" +
                "        <li class=\"section\"><a href=\"model.html\"><span class=\"icon\">&#128201;</span>模型仓库</a></li>\n" +
                "        <li><a href=\"hisdata.html\"><span class=\"icon\">&#128196;</span>海量分析</a></li><!--128711-->\n" +
                "    </ul>");
            $("nav").css("width","14.58%");
            showTheme();
            $("#navid").css("margin-left","0%");
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

$('#dropzone').hover(
    function () {
        $('#dropli').fadeIn(500);
    },function () {
        $('#dropli').fadeOut(500);
    }
);

function addModel1() {
    window.alert("暂无自定义模型接口");
}
function viewModel1() {
    window.alert("暂无自定义模型接口");
}
function deleteModel1() {
    window.alert("暂无自定义模型接口");
}

function addModel(obj) {

    $('#modelSelect').empty();
    var modalName = $(obj).parent().parent().find("p").eq(0).html();
    var modalId = $(obj).parent().parent().find("p").eq(1).html();
    var modalInput = modelDetail[modelDetail.indexOf(parseInt(modalId))+1];
    for (var k = 0; k < modalInput.length; k++) {
        $select = $('<select></select>');
        $option = $('<option></option>');
        $option.html("选择需要绑定参数"+modalInput[k]+"的设备");
        $select.append($option);
        for (var b=0; b<deviceGroup.length; b=b+2){
            $option1 = $('<option></option>');
            $option1.html(deviceGroup[b]);
            $select.append($option1);
        }
        $('#modelSelect').append($select);
    }
    document.getElementById("myModalLabel").innerHTML = "添加模型"+modalName+"的实例";

    $("#modelchange").click(
        function () {

            myXmlHttpRequest2 = getXmlHttpObject();
            if (myXmlHttpRequest2) {
                //var url = "toajax?username=" + document.getElementById("username").value;
                var dataSourceSelect = '[';
                for (var c=0; c<$('#modelSelect').find('select').length; c++){
                    if(c == $('#modelSelect').find('select').length-1){
                        dataSourceSelect = dataSourceSelect + '"'+ $('#modelSelect').find('select').eq(c).val()+ '"]';
                    }else {
                        dataSourceSelect = dataSourceSelect + '"'+ $('#modelSelect').find('select').eq(c).val()+ '",';
                    }
                }
                var url1 = "http://39.104.186.210:8090/api/app/create-app?tenantId=1&modelId="+modalId+"&dataSource="+dataSourceSelect;// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
                //myXmlHttpRequest.open("get",url,true);
                window.alert(url1);
                myXmlHttpRequest2.open("get", url1, true);//url="http://10.108.218.64:8090/api/analysis/device"
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
                    window.alert(meso.status);
                    window.location.href = "modelentity.html";

                    //window.alert(meso.datagroup[0].deviceId);
                    //window.alert(meso.datagroup.length);

                    /*var value=[];
                    $("select option:checked").each(function (i,n) {
                        value.push(n.value);
                    });
                    var div = document.createElement("div");
                    div.setAttribute("class","card");
                    if(themeCount%2==1){
                        div.setAttribute("style","background-image:url(images/ting4.png);margin-top: 20px;margin-left: 20px");
                    }else{
                        div.setAttribute("style","background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
                    }
                    var p1 = document.createElement("p");
                    p1.setAttribute("style","color:white;font-size:20px;margin-top:25px");
                    p1.innerHTML = modalName;
                    div.appendChild(p1);
                    var p2 = document.createElement("p");
                    p2.setAttribute("style","color:white;font-size:12px;margin-top:25px");
                    p2.innerHTML = "设备ID:"+value[0];
                    div.appendChild(p2);
                    var p3 = document.createElement("p");
                    p3.setAttribute("style","color:white;font-size:12px;margin-top:10px");
                    p3.innerHTML = "Key1:"+value[1];
                    div.appendChild(p3);
                    var p4 = document.createElement("p");
                    p4.setAttribute("style","color:white;font-size:12px;margin-top:10px");
                    p4.innerHTML = "Key2:"+value[2];
                    div.appendChild(p4);
                    document.getElementById("main2").appendChild(div);*/
                }
            }


        }
    );
    /*$(obj).find("p").each(
        function (i,n) {
            window.alert(i);
            window.alert(n.innerHTML);
        }
    );*/

}

function viewModel(obj) {

    var index = modelDetail.indexOf(parseInt($(obj).parent().parent().find('p').eq(1).html()));
    $('#view1').html("模型名称:"+modelDetail[index-1]);
    $('#view2').html("模型ID:&nbsp;&nbsp;&nbsp;"+modelDetail[index]);
    $('#view3').html("模型参数:"+modelDetail[index+1]);

}