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
        var url = "/api/device/alldevices?limit=20";
        //var data = "deviceId=" + deviceId;
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
                if(themeCount%2==1){
                    div.setAttribute("style","background-image:url(images/ting4.png);margin-top: 20px;margin-left: 20px");
                }else{
                    div.setAttribute("style","background-image:url(images/timg3.png);margin-top: 20px;margin-left: 20px");
                }
                var a = document.createElement("a");
                a.setAttribute("href","dydatatrue.html?deviceId="+meso[i].id+"&deviceNum=No-"+(i+1));
                var div1 = document.createElement("div");
                div1.setAttribute("class","header");
                var p = document.createElement("p");
                p.setAttribute("style","font-size: 19px;margin-top: 25px");
                p.innerHTML = "设备 No-"+(i+1);
                var p0 = document.createElement("p");
                p0.setAttribute("style","font-size: 9px");
                p0.innerHTML = "实时数据";
                var div2 = document.createElement("div");
                div2.setAttribute("class","body");
                var p1 = document.createElement("p");
                p1.setAttribute("style","color:white;margin-top: 5px");
                p1.innerHTML = "设备ID："+ meso[i].id;
                var p2 = document.createElement("p");
                p2.setAttribute("style","color:white");
                p2.innerHTML = "设备类型："+ meso[i].deviceType;
                var p3 = document.createElement("p");
                p3.setAttribute("style","color:white");
                p3.innerHTML = "设备名称："+ meso[i].name;
                var p4 = document.createElement("p");
                p4.setAttribute("style","color:white");
                p4.innerHTML = "设备状态："+ meso[i].status;
                var p5 = document.createElement("p");
                p5.setAttribute("style","color:white");
                p5.innerHTML = "设备位置："+ meso[i].location;
                div1.appendChild(p);
                div1.appendChild(p0);
                div2.appendChild(p1);
                div2.appendChild(p2);
                div2.appendChild(p3);
                div2.appendChild(p4);
                div2.appendChild(p5);
                a.appendChild(div1);
                a.appendChild(div2);
                div.appendChild(a);
                document.body.appendChild(div);
            }

        }
    }
}
getdata();