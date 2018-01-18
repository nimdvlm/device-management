var deviceId='';
var ws;
document.getElementById("main");
    $("#device").change(function(){
        var child = document.getElementById("main");
        var parent = document.getElementById("container-fluid");
        var newMask = document.createElement("div");
        newMask.id ="newMask";
        parent.appendChild(newMask);
        if(child){
                 child.parentNode.removeChild(child);
        }
         else{
                 alert("没有这个div");
          }

        var vcurrent = document.getElementById("container-fluid");
        var div = document.createElement("div");
        vcurrent.appendChild(div);

        var divattr = document.createAttribute("id");
        divattr.value = "main";
        div.setAttributeNode(divattr);

        var style = document.createAttribute("style");
        div.style.height = "400px";

        deviceId=$("#device").val();
        if(deviceId!="")
        {
            realtimeDevice(deviceId);
        }
    });

// var ws = new WebSocket("ws://www.baidu.com");

//jQuery的ready事件，表示DOM加载后执行ready中的函数（此处为function（））
//$(document).ready(function(){

function realtimeDevice(deviceId) {
    var xdata;
    var ydata=[];
    var key=[];
    var token;
    var url = '';

    $.ajax({
        url: "/api/data/getKeyData/" + deviceId,
        type: "GET",
        dataType: "text",
        success: function (data) {
            var name = data.replace(/\[|]/g, "");
            name = name.replace(/\"/g, "");
            var nameuse = name.split(",");
            chart(nameuse);
        }
    });

    $.ajax({
        url: "/api/Token/getToken",
        type: "GET",
        /*contentType: "application/json;charset=utf-8",//服务端返回的一段json串给客户端*/
        /* data: //使用POST请求时前端传给后端的数据*/
        dataType: "text",//后台交付的数据为字符串形式
        success: function (data) {//success为请求成功后的回调函数
            token = data;
            console.log("token值：" + data);
            console.log('success');
            <!--刷新-->
            <!-- window.location.href = "${request.contextPath}/api/noauth/homepage";-->
            url = 'ws://10.108.217.227:8080/api/ws/plugins/telemetry?token=' + token; // eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJ1c2VySWQiOiJhMmIyNTMxMC1iN2VjLTExZTctOGZjMC01NTkyMmI1ZDQ3ZjYiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYTJiMTY4YjAtYjdlYy0xMWU3LThmYzAtNTU5MjJiNWQ0N2Y2IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNTEwMTk4Njc5LCJleHAiOjE1MTkxOTg2Nzl9.XPq489vRt3CSpqdY6kzr5DNBvhyCcnezFK4DUAgQTjVkiVqjDEPN_jGKgdb9dKA_aiXVdWptkWOjLwJqubFpjA' ;
            console.log("url值：" + url);


            // 打开Socket
            // Listen for the connection open event then call the sendMessage function
            listenWs(url)

        },
        error: function (msg) {//error为在请求出错时的回调函数
            alert(msg.message);
        }
    });

    // setTimeout("",200);//在建立websocket连接之前设置一个200ms的延时，让ajax获得token
    //获取token值

    //console.log("token值："+token);
    //   url='ws://10.108.217.227:8080/api/ws/plugins/telemetry?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZW5hbnRAdGhpbmdzYm9hcmQub3JnIiwic2NvcGVzIjpbIlRFTkFOVF9BRE1JTiJdLCJ1c2VySWQiOiJhMmIyNTMxMC1iN2VjLTExZTctOGZjMC01NTkyMmI1ZDQ3ZjYiLCJlbmFibGVkIjp0cnVlLCJpc1B1YmxpYyI6ZmFsc2UsInRlbmFudElkIjoiYTJiMTY4YjAtYjdlYy0xMWU3LThmYzAtNTU5MjJiNWQ0N2Y2IiwiY3VzdG9tZXJJZCI6IjEzODE0MDAwLTFkZDItMTFiMi04MDgwLTgwODA4MDgwODA4MCIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNTEwMTk4Njc5LCJleHAiOjE1MTkxOTg2Nzl9.XPq489vRt3CSpqdY6kzr5DNBvhyCcnezFK4DUAgQTjVkiVqjDEPN_jGKgdb9dKA_aiXVdWptkWOjLwJqubFpjA';

    // Listen for the close connection event
    // listenWs(ws) ;

    function listenWs(url) {
        if(ws instanceof WebSocket){
            ws.close();
        }

        ws = new WebSocket(url);
        ws.onopen = function (e) {
            log("Connected");
            sendMessage('{"tsSubCmds":[{"entityType":"DEVICE","entityId":"' + deviceId + '","scope":"LATEST_TELEMETRY","cmdId":2}],"historyCmds":[],"attrSubCmds":[{"entityType":"DEVICE","entityId":"' + deviceId + '","scope":"CLIENT_SCOPE","cmdId":1}]}')
            //前端获取的entityID需要给后台，以获取对应设备ID的相关信息
            //sendMessage('{"tsSubCmds":[{"entityType":"DEVICE","entityId":"9b944690-d026-11e7-a71a-974188b66f66","scope":"LATEST_TELEMETRY","cmdId":2}],"historyCmds":[],"attrSubCmds":[{"entityType":"DEVICE","entityId":"9b944690-d026-11e7-a71a-974188b66f66","scope":"CLIENT_SCOPE","cmdId":1}]}')
        }

        ws.onclose = function (e) {
            log("Disconnected: ");
        }
        // Listen for connection errors
        ws.onerror = function (e) {
            log("Error ");
        };
        // Listen for new messages arriving at the client
        //var time0 = formatDate(time);
        ws.onmessage = function (e) {
            log("Message received: " + e.data);
            // console.log("e.data值："+e.data);
            var temp = JSON.parse(e.data);//将字符串转为json
            var time;
            var value = [];

            for (var i in temp.data) {
                var j = 0;
                for (j = 0; j < key.length; j++) {
                    if (key[j] == i) {
                        value = temp.data[i];
                        ydata[j] = value[0][1];

                        log("1" + key[j] + "/" + j + "/" + ydata[j]);
                        break;
                    }
                }

                if (j == key.length
                    && i != "attribid"
                    && i != "clusterid"
                    && i != "deviceid"
                    && i != "devicename"
                    && i != "devicesnid"
                    && i != "devicestatus"
                    && i != "devicestate"
                    && i != "hascolourable"
                    && i != "hasdimmable"
                    && i != "hasoutcolor"
                    && i != "hasoutgroup"
                    && i != "hasoutlevel"
                    && i != "hasoutscene"
                    && i != "hasoutswitch"
                    && i != "haspowerusage"
                    && i != "hassensor"
                    && i != "hasswitchable"
                    && i != "hasthermometer"
                    && i != "issmartplug"
                    && i != "profileid"
                    && i != "sensordata"
                    && i != "type"
                    && i != "uid"
                    && i != "zonetype") {
                    key[j] = i;
                    value = temp.data[i];
                    ydata[j] = value[0][1];
                    log("2" + key[j] + "/" + j + "/" + ydata[j])
                }
            }


            //console.log(key);//从后台获取的数据
            // console.log(temp.data.data[0][0]);//横坐标值
            // console.log(temp.data.data[0][1]);//纵坐标值

            time = new Date(value[0][0]);//将时间戳new为Date对象
            console.log(time);
            var time0 = formatDate(time);//将时间戳转换为正常的时间格式

            xdata = time0;//横轴坐标值
            //ydata =value[0][1];
            //ydata = temp.data.data[0][1];//纵轴坐标值
            //console.log("time0:" + time0);
        }
    }


    function log(s) {
        // Also log information on the javascript console
        console.log(s);
    }

    function sendMessage(msg) {
        ws.send(msg);
        log("Message sent");
    }


    /*  用于将时间戳转换为时间 xxxx-xx-xx xx:xx:xx*/
    function formatDate(now) {

        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    function chart(data) {
        <!--路径配置-->
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }

        });
        // 使用

        require
        (
            [
                'echarts',
                'echarts/chart/line'  // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main'));//??"main"+i

                var option = {

                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    dataZoom: {
                        show: false,
                        start: 0,
                        end: 100
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data: (function () {
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleString("ja-JP").replace(/^\D*/, ''));
                                    now = new Date(now - 2000);

                                }
                                return ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'];
                            })()
                        }
                    ],
                    yAxis: [
                        {
                            type: 'real-time value',
                            scale: true,
                            name: 'real-time value',
                            boundaryGap: [0.2, 0.2]
                        },

                    ],
                    series: []
                };

                var item = [];
                for (var i = 0; i < data.length; i++) {
                    var things = {
                        name: data[i],
                        type: 'line',
                        data: (function () {
                            var res = [];
                            var len = 10;
                            while (len--) {
                                // res.push((Math.random()*10 + 5).toFixed(1) - 0);
                                res.push(ydata[i]);
                            }
                            return res;
                        })()
                    }
                    item.push(things);
                }

                var legend = {data: data};
                option.legend = legend;
                option.series = item;
                console.log(option);
                myChart.setOption(option);

                var lastData = 1;
                var axisData;
                var timeTicket;
                clearInterval(timeTicket);
                timeTicket = setInterval(function () {
                    // lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    // lastData = lastData.toFixed(1) - 0;
                    //axisData = (new Date()).toLocaleTimeString("ja-JP").replace(/^\D,'');

                    // 动态数据接口 addData

                    myChart.addData([

                        [
                            0,        // 系列索引
                            ydata[0], // 新增数据
                            false,    // 新增数据是否从队列头部插入
                            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                            xdata  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                timeTicket = setInterval(function () {
                    // lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    // lastData = lastData.toFixed(1) - 0;
                    //axisData = (new Date()).toLocaleTimeString("ja-JP").replace(/^\D,'');

                    // 动态数据接口 addData
                    myChart.addData([

                        [
                            1,        // 系列索引
                            ydata[1], // 新增数据
                            false,    // 新增数据是否从队列头部插入
                            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                            xdata  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                timeTicket = setInterval(function () {
                    // lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    // lastData = lastData.toFixed(1) - 0;
                    //axisData = (new Date()).toLocaleTimeString("ja-JP").replace(/^\D,'');

                    // 动态数据接口 addData
                    myChart.addData([

                        [
                            2,        // 系列索引
                            ydata[2], // 新增数据
                            false,    // 新增数据是否从队列头部插入
                            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                            xdata  // 坐标轴标签
                        ]
                    ]);
                }, 2100);

                timeTicket = setInterval(function () {
                    // lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
                    // lastData = lastData.toFixed(1) - 0;
                    //axisData = (new Date()).toLocaleTimeString("ja-JP").replace(/^\D,'');

                    // 动态数据接口 addData
                    myChart.addData([

                        [
                            3,        // 系列索引
                            ydata[3], // 新增数据
                            false,    // 新增数据是否从队列头部插入
                            false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                            xdata  // 坐标轴标签
                        ]
                    ]);
                }, 2100);
            }
        );
    }
}

//});

