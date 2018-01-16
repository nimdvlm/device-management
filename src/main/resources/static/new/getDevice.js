/**
 * Created by hasee on 2018/1/16.
 */
$.ajax({
    url:"/api/device/allDevices",
    type:"GET",
    dataType: "text",
    success: function (data){
        //console.log(data);
        var temp = JSON.parse(data);
        var sel = document.getElementById("device");
        for(var i=0;temp[i].name!=null;i++)
        {
            var option = new Option(temp[i].name,temp[i].deviceId);
            sel.options.add(option);
        }

    }
});