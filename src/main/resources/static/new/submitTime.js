function submitTime(){
    // 表单提交数据
    alert("submittime")
    var sTime = document.getElementById("start_date").value;
    var eTime = document.getElementById("end_date").value;
    alert(sTime);
    alert(eTime);
    var str1 = sTime.replace(/-/g,'/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var str2 = eTime.replace(/-/g,'/');
    var date1 = new Date(str1);//将字符串类型的时间转换为日期对象
    var date2 = new Date(str2);
    alert(str1);
    alert(str2);
    var time1 = date1.getTime();//将日期对象转换为时间戳
    var time2 = date2.getTime();
    alert(time1);
    alert(time2);
    if(time1 > time2 )
        alert("Wrong time.")
    var device_ID = document.getElementById("device").value;//获取设备id
    alert(device_ID);
    $(document).ready(function() {
        $.ajax({
            url: "/api/Token/getHistoricalData/"+device_ID+"/"+time1+"/"+time2,
            type: "GET",
            /*contentType: "application/json;charset=utf-8",//服务端返回的一段json串给客户端*!/
            //data: JSON.stringify({'time1': time1, 'time2': time2,'device_ID':device_ID}),//使用POST请求时前端传给后端的数据*/
            dataType: "text",//后台交付的数据为字符串形式
            success: function (data) {//success为请求成功后的回调函数
                console.log(data);
                console.log(data.data[0]);
            },
            error: function (msg) {//error为在请求出错时的回调函数
                alert(msg.message);
            }
        });
    }