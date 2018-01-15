//创建服务组必填限制
$('#createServiceGroup').validate({
    rules:{
        manufacture:{required:true},
        deviceType:{required:true},
        model:{required:true}
    },
    messages:{

        manufacture:{required:'厂商不能为空'},
        deviceType:{required:'设备类型不能为空'},
        model:{required:"设备型号不能为空"}
    }
});