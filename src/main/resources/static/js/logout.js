$(document).ready(function() {
    $("#logout").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/user/logout", // tjl
            type: "GET",
            dataType: "text",
            success: function (result) {
                var obj = JSON.parse(result);
                console.log("success");
                window.location.href = "signin";
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
        return false;
    });
});
