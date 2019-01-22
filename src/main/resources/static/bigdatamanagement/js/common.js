function online() {
    window.open("http://39.104.186.210:8888");
}

function dashboard() {
    window.location.href = "device1.html";
}

function dashboard1() {
    window.location.href = "../bigData/device1.html";
}

function result() {
    window.open("pre.html");
}

function result1() {
    window.open("../bigdatamanagement/pre.html");
}

function formatDate(now) {
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

function fmtDate(obj){
    var date =  new Date(obj);
    //var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    var h = "0"+date.getHours();
    var min = "0"+date.getMinutes();
    var s = "0"+date.getSeconds();
    return h.substring(h.length-2,h.length)+":"+min.substring(min.length-2,min.length)+":"+s.substring(s.length-2,s.length);
}