function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}
var deviceId = UrlParm.parm("deviceId");
var deviceNum = UrlParm.parm("deviceNum");
var sectionA = document.getElementById("transportId");
sectionA.setAttribute("href","statisticsdata.html?deviceId="+deviceId+"&deviceNum="+deviceNum);
var showDevice = document.getElementById("showDevice");
showDevice.innerHTML = "设备"+deviceNum+"（ID:"+deviceId+"）"+"</br>";
//th0.innerHTML = "设备No-"+deviceNum+"设备ID："+deviceId;
var websocket = null;
var i=0;
var tBody = document.getElementById("tBody");
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket("ws://39.104.84.131:8100/websocket");
}
else {
    alert('当前浏览器 Not support websocket')
}

//连接发生错误的回调方法
websocket.onerror = function () {
    window.alert("WebSocket连接发生错误");
};

//连接成功建立的回调方法
websocket.onopen = function () {
    window.alert("WebSocket连接成功");
};

//接收到消息的回调方法
websocket.onmessage = function (event) {
    if(i==0){
        websocket.send('{"deviceId":'+deviceId+'}');
    }
    var message =JSON.parse(event.data);
    var a=message.data[2].ts;
    var a1=timestampToTime(a);
    //window.alert(timestampToTime(a));
    var b=message.data[2].key;
    var c=message.data[2].value;
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.setAttribute("style","text-align: center;");
    td1.innerHTML=a1;
    var td2 = document.createElement("td");
    td2.setAttribute("style","text-align: center;");
    td2.innerHTML=b;
    var td3 = document.createElement("td");
    td3.setAttribute("style","text-align: center;");
    td3.innerHTML=c;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tBody.appendChild(tr);
    i++;

};

//连接关闭的回调方法
websocket.onclose = function () {
};

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//将消息显示在网页上

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}

/*var data = [
    [
        "123",
        "456"
    ],
    [
        "Garrett Winters",
        "Director"
    ]
];*/
$('#table_id_example').DataTable();
//发送消息
/*function send() {
    var message = document.getElementById('text').value;
    websocket.send(message);//{"deviceId":"a23fa690-5e5d-11e8-b16e-59c2cc02320f"}
}*/