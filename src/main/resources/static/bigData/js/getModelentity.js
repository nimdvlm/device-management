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
var entityDetail = [];
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
                entityDetail.push(meso.data[j].app_id);
                entityDetail.push(meso.data[j].app_name);
                entityDetail.push(meso.data[j].model_id);
                entityDetail.push(meso.data[j].tenant_id);
                entityDetail.push(meso.data[j].app_input);
                entityDetail.push(meso.data[j].app_output);
                var divadd = document.createElement("div");
                var divadd1 = document.createElement("div");
                var divaddall = document.createElement("div");
                var button1 = document.createElement("button");
                button1.setAttribute("style","width:25%;font-size:11px;padding:4% 6%;border: 1px solid #4b4f51; margin: 0");
                button1.setAttribute("data-toggle","modal");
                button1.setAttribute("data-target","#myModal");
                button1.setAttribute("onclick","viewEntity(this)");
                button1.innerHTML = '查看';
                var button2 = document.createElement("button");
                button2.setAttribute("style","width:25%;font-size:11px;;padding:4% 6%;border: 1px solid #4b4f51; margin: 0");
                button2.setAttribute("onclick","startEntity(this)");
                button2.innerHTML = '启动';
                var button4 = document.createElement("button");
                button4.setAttribute("style","width:25%;font-size:11px;;padding:4% 6%;border: 1px solid #4b4f51; margin: 0");
                button4.setAttribute("onclick","getResult(this)");
                button4.innerHTML = '预测';
                var button3 = document.createElement("button");
                button3.setAttribute("style","width:25%;font-size:11px;;padding:4% 6%;border: 1px solid #4b4f51; margin: 0");
                button3.setAttribute("onclick","deleteEntity(this)");
                button3.innerHTML = '删除';
                divadd1.setAttribute("style","width: 100%;height:10%;display:block");
                if (j<4){
                    if(j%4 == 0){
                        divaddall.setAttribute("style","width: 15%;height: 18%;margin-top: 4.5%;margin-left: 14%;float:left");
                    }else {
                        divaddall.setAttribute("style","width: 15%;height: 18%;margin-top: 4.5%;margin-left: 4%;float:left");
                    }
                }else {
                    if(j%4 == 0){
                        divaddall.setAttribute("style","width: 15%;height: 18%;margin-top: 5%;margin-left: 14%;float:left");
                    }else {
                        divaddall.setAttribute("style","width: 15%;height: 18%;margin-top: 5%;margin-left: 4%;float:left");
                    }
                }
                divadd.setAttribute("class", "card");
                divadd.setAttribute("style", "display:none;background: #fffae3;margin-right: 0px; width:100%; height:90%");
                $(divadd).fadeIn(500 + 300 * j);
                var p1 = document.createElement("p");
                p1.setAttribute("style", "color:#000000;font-size:20px;margin-top:30%");
                if(meso.data[j].app_name == 'lw_app'){
                    p1.innerHTML = meso.data[j].app_name;
                }else {
                    p1.innerHTML = 'null';
                }
                var p2 = document.createElement("p");
                p2.setAttribute("style", "display: none");
                p2.innerHTML = meso.data[j].app_id;
                //p1.innerHTML = "Model-"+ meso.data[j].app_id ;
                divadd.appendChild(p1);
                divadd.appendChild(p2);
                /*var p2 = document.createElement("p");
                p2.setAttribute("style", "color:#000000;font-size:12px;margin-top:25px");
                p2.innerHTML = "实例ID:"+ meso.data[j].app_id;
                divadd.appendChild(p2);
                var p3 = document.createElement("p");
                p3.setAttribute("style", "color:#000000;font-size:12px;margin-top:10px");
                p3.innerHTML = "Key1:"+meso.data[j].app_input[0].type + ",deviceId:" + meso.data[j].app_input[0].device_id;
                divadd.appendChild(p3);
                var p4 = document.createElement("p");
                p4.setAttribute("style", "color:#000000;font-size:12px;margin-top:10px");
                p4.innerHTML = "Key2:"+meso.data[j].app_input[1].type + ",deviceId:" + meso.data[j].app_input[1].device_id;
                divadd.appendChild(p4);*/
                divadd1.appendChild(button1);
                divadd1.appendChild(button2);
                divadd1.appendChild(button4);
                divadd1.appendChild(button3);
                divaddall.appendChild(divadd);
                divaddall.appendChild(divadd1);
                document.body.appendChild(divaddall);
                $('.card').hover(function () {
                    $('.card:hover').css("opacity","0.5");
                },function () {
                    $('.card').css("opacity","1");
                });
            }
        }
    }
}
getdata1();

$('#dropzone').hover(
    function () {
        $('#dropli').fadeIn(500);
    },function () {
        $('#dropli').fadeOut(500);
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

function viewEntity(obj) {
    var viewEntityID = $(obj).parent().parent().find('p').eq(1).html();
    var viewIndex = entityDetail.indexOf(parseInt(viewEntityID));
    var viewInputString = "";
    $('#view1').html("实例ID：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + viewEntityID);
    $('#view2').html("实例名称：&nbsp;&nbsp;&nbsp;"+entityDetail[viewIndex+1]);
    $('#view3').html("所属模型ID："+entityDetail[viewIndex+2]);
    $('#view4').html("所属租户ID："+entityDetail[viewIndex+3]);
    for (var i=0; i<entityDetail[viewIndex+4].length; i++){
        viewInputString = viewInputString+"&nbsp;&nbsp;&nbsp;输入参数-"+entityDetail[viewIndex+4][i].type+","+"绑定设备ID-"+entityDetail[viewIndex+4][i].device_id+"<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    $('#view5').html("实例输入："+viewInputString);
    $('#view6').html("实例输出：&nbsp;&nbsp;&nbsp;"+entityDetail[viewIndex+5]);
}

function startEntity(obj) {
    myXmlHttpRequest = getXmlHttpObject();
    if (myXmlHttpRequest) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        document.getElementById("YWaitDialog1").setAttribute("style","display:block;");
        var appIdString = $(obj).parent().parent().children().find("p").eq(1).html();
        var url = "http://39.104.186.210:8090/api/app/start-app?appId="+appIdString;// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest.open("get", url, true);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        myXmlHttpRequest.onreadystatechange = proce;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest.send(null);
    }

    function proce() {

        if (myXmlHttpRequest.readyState == 4) {

            document.getElementById("YWaitDialog1").setAttribute("style","display:none;");
            var mes = myXmlHttpRequest.responseText;
            window.alert(mes);

        }
    }
}

function getResult(obj) {
    myXmlHttpRequest2 = getXmlHttpObject();
    if (myXmlHttpRequest2) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        document.getElementById("YWaitDialog1").setAttribute("style","display:block;");
        var appIdString = $(obj).parent().parent().children().find("p").eq(1).html();
        var url2 = "http://39.104.186.210:8090/api/app/real-predict?appId="+appIdString;// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest2.open("get", url2, true);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        myXmlHttpRequest2.onreadystatechange = proce2;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest2.send(null);
    }

    function proce2() {

        if (myXmlHttpRequest2.readyState == 4) {

            document.getElementById("YWaitDialog1").setAttribute("style","display:none;");
            var mes = myXmlHttpRequest2.responseText;
            window.alert(mes);

        }
    }
}

function deleteEntity(obj) {
    window.alert("暂无删除实例接口");
}