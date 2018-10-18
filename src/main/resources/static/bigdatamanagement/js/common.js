function online() {
    window.open("http://39.104.186.210:8888");
}

function dashboard() {
    window.open("device2.html");
}

function dashboard1() {
    window.open("../bigData/device2.html");
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