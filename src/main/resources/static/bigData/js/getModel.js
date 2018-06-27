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
                var div = document.createElement("div");
                var a = document.createElement("a");
                a.setAttribute("href", "#");
                div.setAttribute("class", "card");
                div.setAttribute("id", "divcard");
                div.setAttribute("data-toggle", "modal");
                div.setAttribute("data-target", "#myModal");
                div.setAttribute("onclick", "modalinput(this)");
                if (themeCount % 2 == 1) {
                    div.setAttribute("style", "display:none;background-image:url(images/ting4.png);margin-top: 20px;margin-left: 20px");
                } else {
                    div.setAttribute("style", "display:none;background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
                }
                $(div).fadeIn(500 + i * 300);
                /*var a = document.createElement("a");
                a.setAttribute("href","statisticsdata.html?deviceId="+meso[i].id+"&deviceNum=No-"+(i+1));*/
                var p = document.createElement("p");
                p.setAttribute("style", "font-size: 20px;margin-top: 65px;color:#ffffff");
                p.innerHTML = model_name;
                var p1 = document.createElement("p");
                p1.setAttribute("style", "font-size: 20px;margin-top: 65px;color:#ffffff;display:none");
                p1.innerHTML = model_id;
                //p.innerHTML = "设备 No-"+(i+1);
                /*var p0 = document.createElement("p");
                p0.setAttribute("style","font-size: 9px");
                p0.innerHTML = "统计数据";
                var div2 = document.createElement("div");
                div2.setAttribute("class","body");
                var p1 = document.createElement("p");
                p1.setAttribute("style","color:white;margin-top: 5px");
                p1.innerHTML = "设备ID："+ meso[i].id;
                var p2 = document.createElement("p");
                p2.setAttribute("style","color:white");
                p2.innerHTML = "设备类型："+ meso[i].deviceType;
                var p3 = document.createElement("p");
                p3.setAttribute("style","color:white;font-size: 19px;");
                p3.innerHTML = meso[i].name;
                var p4 = document.createElement("p");
                p4.setAttribute("style","color:white");
                p4.innerHTML = "设备状态："+ meso[i].status;
                var p5 = document.createElement("p");
                p5.setAttribute("style","color:white");
                p5.innerHTML = "设备位置："+ meso[i].location;*/
                div.appendChild(p);
                div.appendChild(p1);
                //div1.appendChild(p0);
                //div2.appendChild(p1);
                //div2.appendChild(p2);
                //div2.appendChild(p3);
                //div2.appendChild(p4);
                //div2.appendChild(p5);
                //a.appendChild(div1);
                //a.appendChild(div2);
                a.appendChild(div);
                document.getElementById("main1").appendChild(a);
                for (var k = 0; k < model_input.length; k++) {
                    $select = $('<select></select>');
                    $option = $('<option></option>');
                    $option.html(model_input[k]);
                    $select.append($option);
                    for (var b=0; b<deviceGroup.length; b++){
                        $option1 = $('<option></option>');
                        $option1.html(deviceGroup[b]);
                        $select.append($option1);
                    }
                    $('#modelSelect').append($select);
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
getdata1();

$('.card').hover(function () {
    $('.card:hover').css("opacity","0.5");
},function () {
    $('.card').css("opacity","1");
});

function modalinput(obj) {
    var modalName = $(obj).find("p").eq(0).html();
    var modalId = $(obj).find("p").eq(1).html();
    document.getElementById("myModalLabel").innerHTML = "模型定制："+modalName;

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
                    $('#main2').empty();
                    getdata1();

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