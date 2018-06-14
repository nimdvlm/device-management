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
            for(var i=0; i<8; i++){

                var div = document.createElement("div");
                var a = document.createElement("a");
                a.setAttribute("href","#");
                div.setAttribute("class","card");
                div.setAttribute("id","divcard");
                div.setAttribute("data-toggle","modal");
                div.setAttribute("data-target","#myModal");
                div.setAttribute("onclick","modalinput(this)");
                if(themeCount%2==1){
                    div.setAttribute("style","display:none;background-image:url(images/ting4.png);margin-top: 20px;margin-left: 20px");
                }else{
                    div.setAttribute("style","display:none;background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
                }
                $(div).fadeIn(500+i*300);
                $(div).fadeOut(500+i*300);
                $(div).fadeIn(500+i*300);
                /*var a = document.createElement("a");
                a.setAttribute("href","statisticsdata.html?deviceId="+meso[i].id+"&deviceNum=No-"+(i+1));*/
                var p = document.createElement("p");
                p.setAttribute("style","font-size: 20px;margin-top: 65px;color:#ffffff");
                p.innerHTML = "Model-"+(i+1);
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
            }
            for(var j=0;j<3;j++){
                var divadd = document.createElement("div");
                divadd.setAttribute("class","card");
                if(themeCount%2==1){
                    divadd.setAttribute("style","display:none;background-image:url(images/ting4.png);margin-top: 20px;margin-left: 20px");
                }else{
                    divadd.setAttribute("style","display:none;background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
                }
                $(divadd).fadeIn(3000-500*j);
                $(divadd).fadeOut(2000+800*j);
                $(divadd).fadeIn(1500+500*j);
                var p1 = document.createElement("p");
                p1.setAttribute("style","color:white;font-size:20px;margin-top:25px");
                p1.innerHTML = "Model-1";
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