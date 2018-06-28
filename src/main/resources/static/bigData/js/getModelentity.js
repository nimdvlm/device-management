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
                var divadd1 = document.createElement("div");
                var divaddall = document.createElement("div");
                var button1 = document.createElement("button");
                button1.setAttribute("class","green");
                button1.setAttribute("style","width:56px;font-size:12px");
                button1.setAttribute("onclick","startEntity(this)");
                button1.innerHTML = '启动';
                var button2 = document.createElement("button");
                button2.setAttribute("class","green");
                button2.setAttribute("style","width:88px;font-size:12px");
                button2.setAttribute("onclick","getResult(this)");
                button2.innerHTML = '预测结果';
                var button3 = document.createElement("button");
                button3.setAttribute("class","green");
                button3.setAttribute("style","width:56px;font-size:12px");
                button3.innerHTML = '删除';
                divadd1.setAttribute("style","width:200px,height:30px;display:block");
                divaddall.setAttribute("style","width:200px,height:190px;margin-top: 20px;margin-left: 20px;margin-right: 10px;float:left");
                divadd.setAttribute("class", "card");
                if (themeCount % 2 == 1) {
                    divadd.setAttribute("style", "display:none;background-image:url(images/ting4.png);margin-right: 0px");
                } else {
                    divadd.setAttribute("style", "display:none;background-image:url(images/timg3.png);margin-right: 0px");
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
                divadd1.appendChild(button1);
                divadd1.appendChild(button2);
                divadd1.appendChild(button3);
                divaddall.appendChild(divadd);
                divaddall.appendChild(divadd1);
                document.getElementById("main2").appendChild(divaddall);
            }
        }
    }
}

getdata1();

$('.card').hover(function () {
    $('.card:hover').css("opacity","0.5");
},function () {
    $('.card').css("opacity","1");
});

$("#modelchange").click(
    function () {

        var value=[];
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
        document.getElementById("main2").appendChild(div);

    }
);

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

function startEntity(obj) {
    myXmlHttpRequest = getXmlHttpObject();
    if (myXmlHttpRequest) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        document.getElementById("YWaitDialog").setAttribute("style","display:flex;");
        var appIdString = $(obj).parent().parent().children().find("p").eq(1).html();
        var appId = appIdString.split(":")[1];
        var url = "http://39.104.186.210:8090/api/app/start-app?appId="+appId;// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //myXmlHttpRequest.open("get",url,true);
        window.alert(url);
        myXmlHttpRequest.open("get", url, true);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        myXmlHttpRequest.onreadystatechange = proce;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest.send(null);
    }

    function proce() {

        if (myXmlHttpRequest.readyState == 4) {

            document.getElementById("YWaitDialog").setAttribute("style","display:none;");
            var mes = myXmlHttpRequest.responseText;
            window.alert(mes);

        }
    }
}

function getResult(obj) {
    myXmlHttpRequest2 = getXmlHttpObject();
    if (myXmlHttpRequest2) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        document.getElementById("YWaitDialog").setAttribute("style","display:flex;");
        var appIdString = $(obj).parent().parent().children().find("p").eq(1).html();
        var appId = appIdString.split(":")[1];
        var url2 = "http://39.104.186.210:8090/api/app/real-predict?appId="+appId;// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //myXmlHttpRequest.open("get",url,true);
        window.alert(url2);
        myXmlHttpRequest2.open("get", url2, true);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        myXmlHttpRequest2.onreadystatechange = proce2;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest2.send(null);
    }

    function proce2() {

        if (myXmlHttpRequest2.readyState == 4) {

            document.getElementById("YWaitDialog").setAttribute("style","display:none;");
            var mes = myXmlHttpRequest.responseText;
            window.alert(mes);

        }
    }
}