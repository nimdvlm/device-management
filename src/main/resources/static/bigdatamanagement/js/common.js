var a=0;
var b=0;
var c=0;
var d=0;
$('#ul1').click(
    function () {
        if(a%2==0){
            $(this).parent().find('li').eq(1).css("display","none");
            $(this).parent().find('li').eq(2).css("display","none");
            $(this).parent().find('li').eq(3).css("display","none");
        }else {
            $(this).parent().find('li').eq(1).css("display","block");
            $(this).parent().find('li').eq(2).css("display","block");
            $(this).parent().find('li').eq(3).css("display","block");
        }
        a++;
    }
);
$('#ul2').click(
    function () {
        if(b%2==0){
            $(this).parent().find('li').eq(1).css("display","none");
            $(this).parent().find('li').eq(2).css("display","none");
            $(this).parent().find('li').eq(3).css("display","none");
        }else {
            $(this).parent().find('li').eq(1).css("display","block");
            $(this).parent().find('li').eq(2).css("display","block");
            $(this).parent().find('li').eq(3).css("display","block");
        }
        b++;
    }
);
$('#ul3').click(
    function () {
        if(c%2==0){
            $(this).parent().find('li').eq(1).css("display","none");
            $(this).parent().find('li').eq(2).css("display","none");
            $(this).parent().find('li').eq(3).css("display","none");
        }else {
            $(this).parent().find('li').eq(1).css("display","block");
            $(this).parent().find('li').eq(2).css("display","block");
            $(this).parent().find('li').eq(3).css("display","block");
        }
        c++;
    }
);
$('#ul4').click(
    function () {
        if(d%2==0){
            $(this).parent().find('li').eq(1).css("display","none");
            $(this).parent().find('li').eq(2).css("display","none");
        }else {
            $(this).parent().find('li').eq(1).css("display","block");
            $(this).parent().find('li').eq(2).css("display","block");
        }
        d++;
    }
);

function formatDate(now) {
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}