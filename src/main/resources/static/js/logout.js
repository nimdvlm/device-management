$(document).ready(function() {
    $("#logout").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/user/logout", // tjl
            type: "GET",
            dataType: "text",
            success: function (result) {
                try {
                    var obj = JSON.parse(result);
                    console.log("success");
                } catch(e) {
                    console.log("failed-no");
                }
                window.location.href = "signin";
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
        return false;
    });
});
