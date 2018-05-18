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
        var url = "/api/device/alldevices?limit=20";//http://10.108.219.218:8100/api/v1/tenant/devices/2?limit=20;http://10.108.219.218:80/api/device/alldevices?limit=20
        //var data = null;
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
                var div = document.createElement("div");
                div.setAttribute("class","card");
                div.setAttribute("id","divcard");
                div.setAttribute("style","background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
                var a = document.createElement("a");
                a.setAttribute("href","statisticsdata.html?deviceId="+meso[i].id+"&deviceNum=No-"+(i+1));
                var div1 = document.createElement("div");
                div1.setAttribute("class","header");
                var p = document.createElement("p");
                p.setAttribute("style","font-size: 18px;margin-top:30px");
                p.innerHTML = "设备 No-"+(i+1);
                var div2 = document.createElement("div");
                div2.setAttribute("class","body");
                var p1 = document.createElement("p");
                p1.setAttribute("style","color:white");
                p1.innerHTML = "设备ID："+ meso[i].id;
                var p4 = document.createElement("p");
                p4.setAttribute("style","color:white");
                p4.innerHTML = "设备类型："+ meso[i].deviceType;
                var p5 = document.createElement("p");
                p5.setAttribute("style","color:white");
                p5.innerHTML = "设备名称："+ meso[i].name;
                var p6 = document.createElement("p");
                p6.setAttribute("style","color:white");
                p6.innerHTML = "设备状态："+ meso[i].status;
                var p7 = document.createElement("p");
                p7.setAttribute("style","color:white");
                p7.innerHTML = "设备位置："+ meso[i].location;
                div1.appendChild(p);
                div2.appendChild(p1);
                div2.appendChild(p4);
                div2.appendChild(p5);
                div2.appendChild(p6);
                div2.appendChild(p7);
                a.appendChild(div1);
                a.appendChild(div2);
                div.appendChild(a);
                document.body.appendChild(div);
            }

        }
    }
}
getdata();