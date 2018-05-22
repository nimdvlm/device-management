var deviceId = UrlParm.parm("deviceId");
var deviceNum = UrlParm.parm("deviceNum");
var sectionA = document.getElementById("transportId");
sectionA.setAttribute("href","statisticsdata.html?deviceId="+deviceId+"&deviceNum="+deviceNum);
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

function getdata(deviceId) {

    myXmlHttpRequest = getXmlHttpObject();
    if (myXmlHttpRequest) {
        //var url = "toajax?username=" + document.getElementById("username").value;
        var url = "http://39.105.71.29:8080/db6/toajax1";
        var data = "deviceId=" + deviceId;
        //myXmlHttpRequest.open("get",url,true);
        myXmlHttpRequest.open("post", url, true);//url="http://10.108.218.64:8090/api/analysis/device"
        myXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        myXmlHttpRequest.onreadystatechange = proce;
        //myXmlHttpRequest.send(null);
        myXmlHttpRequest.send(data);
    }

    function proce() {
        if (myXmlHttpRequest.readyState == 4) {
            var myChart = echarts.init(document.getElementById('main1'));
            var mes = myXmlHttpRequest.responseText;
            var meso = eval("(" + mes + ")");
            option = {
                title: {
                    text: '实时数据'+"  设备"+deviceNum
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#208ed3'
                        }
                    }
                },
                legend: {
                    data:['实时数据', '方差']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
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
                        data: (function (){
                            var now = new Date();
                            var res = [];
                            var len = 10;
                            while (len--) {
                                res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                now = new Date(now - 2000);
                            }
                            return res;
                        })()
                    },
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: (function (){
                            var res = [];
                            var len = 10;
                            while (len--) {
                                res.push(10 - len - 1);
                            }
                            return res;
                        })()
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        name: '方差',
                        max: 100,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: '实时数据',
                        max: 50,
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name:'实时数据',
                        type:'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#FFA500'
                            }
                        },
                        data:(function (){
                            var res = [];
                            var len = 10;
                            while (len--) {
                                res.push(meso.dydata);
                            }
                            return res;
                        })()
                    },
                    {
                        name:'方差',
                        type:'line',
                        itemStyle: {
                            normal: {
                                color: '#BC8F8F'
                            }
                        },
                        data:(function (){
                            var res = [];
                            var len = 0;
                            while (len < 10) {
                                res.push(meso.fangcha);
                                len++;
                            }
                            return res;
                        })()
                    }
                ]
            };

            myChart.count = 11;
            setInterval(function (){
                myXmlHttpRequest = getXmlHttpObject();
                if (myXmlHttpRequest) {
                    //var url = "toajax?username=" + document.getElementById("username").value;
                    var url = "http://39.105.71.29:8080/db6/toajax1";
                    var data = "deviceId=" + deviceId;
                    //myXmlHttpRequest.open("get",url,true);
                    myXmlHttpRequest.open("post", url, true);//url="http://10.108.218.64:8090/api/analysis/device"
                    myXmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    myXmlHttpRequest.onreadystatechange = proce;
                    //myXmlHttpRequest.send(null);
                    myXmlHttpRequest.send(data);
                }

                function proce() {
                    if (myXmlHttpRequest.readyState == 4) {
                        var myChart = echarts.init(document.getElementById('main1'));
                        var mes = myXmlHttpRequest.responseText;
                        var meso = eval("(" + mes + ")");
                        axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

                        var data0 = option.series[0].data;
                        var data1 = option.series[1].data;
                        data0.shift();
                        data0.push(meso.dydata);
                        data1.shift();
                        data1.push(meso.fangcha);

                        option.xAxis[0].data.shift();
                        option.xAxis[0].data.push(axisData);
                        option.xAxis[1].data.shift();
                        option.xAxis[1].data.push(myChart.count++);

                        myChart.setOption(option);}}
            }, 2100);
            myChart.setOption(option);


        }
    }
}
getdata(deviceId);