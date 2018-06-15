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

    /*myXmlHttpRequest = getXmlHttpObject();
    if (myXmlHttpRequest) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url = "/api/device/alldevices?limit=30";// /api/device/alldevices?limit=20http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
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
            //window.alert(meso.datagroup.length);*/

    for(var j=0;j<9;j++){
        var divadd = document.createElement("div");
        divadd.setAttribute("class","card");
        if(themeCount%2==1){
            divadd.setAttribute("style","display:none;background-image:url(images/ting4.png);margin-top: 20px;margin-left: 20px");
        }else{
            divadd.setAttribute("style","display:none;background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
        }
        $(divadd).fadeIn(2000-500/3*j);
        $(divadd).fadeOut(1000+800/3*j);
        $(divadd).fadeIn(1500+500/3*j);
        var p1 = document.createElement("p");
        p1.setAttribute("style","color:white;font-size:20px;margin-top:25px");
        p1.innerHTML = "Model-"+j;
        divadd.appendChild(p1);
        var p2 = document.createElement("p");
        p2.setAttribute("style","color:white;font-size:12px;margin-top:25px");
        p2.innerHTML = "设备ID:10001";
        divadd.appendChild(p2);
        var p3 = document.createElement("p");
        p3.setAttribute("style","color:white;font-size:12px;margin-top:10px");
        p3.innerHTML = "Key1:temperature";
        divadd.appendChild(p3);
        var p4 = document.createElement("p");
        p4.setAttribute("style","color:white;font-size:12px;margin-top:10px");
        p4.innerHTML = "Key2:speed";
        divadd.appendChild(p4);
        document.getElementById("main2").appendChild(divadd);
    }
}
//}
//}
getdata();

$('.card').hover(function () {
    $('.card:hover').css("opacity","0.5");
},function () {
    $('.card').css("opacity","1");
});

var modalName;
function modalinput(obj) {
    modalName = $(obj).find("p").html();
    document.getElementById("myModalLabel").innerHTML = "模型定制："+modalName;
    /*$(obj).find("p").each(
        function (i,n) {
            window.alert(i);
            window.alert(n.innerHTML);
        }
    );*/
}

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