$(function () {
    /*   $('#123').click(function () {
           $.ajax({
               url: "/api/service/serviceTables",
               type: "GET",
               contentType: "application/json;charset=utf-8",
               dataType: "text",
               success: function (result) {

                   console.log(result);

               },
               error: function (msg) {
                   alert(msg.message);
               }
           });
       })*/
    var model1;
    var manufacture1;
    var deviceType1;
    var serviceName1;
    $("#device_input").keyup(function () {
        $("#device_table tbody tr").hide()
            .filter(":contains('" + ($(this).val()) + "')").show();//filter和contains共同来实现了这个功能。
    }).keyup();
    //配置DataTables默认参数
    $.extend(true, $.fn.dataTable.defaults, {
//                    "language": {
//                        "url": "/assets/Chinese.txt"
//                    },
        "dom": "<'row'<'col-md-6'l<'#toolbar'>><'col-md-6'f>r>" +
        "t" +
        "<'row'<'col-md-5 sm-center'i><'col-md-7 text-right sm-center'p>>"
    });
    $('#dataTables-example').DataTable({
        //每页显示数据量
        "aLengthMenu": [5, 10, 25, 50, 100],
        //翻页功能
        "bPaginate": true,
        //自动宽度
        "bAutoWidth": false,
        "oLanguage": {
            "sProcessing": "正在加载中......",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "对不起，查询不到相关数据！",
            "sEmptyTable": "表中无数据存在！",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            "sSearch": "搜索",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        },//多语言配置
        ajax: {
            url: "/api/service/serviceTables",
            dataSrc: ""
        },
        //默认最后一列（最后更新时间）降序排列
        order: [[2, "desc"]],
        columnDefs: [
            {
                targets: 3,
                width:"25%",
                data: "updated_at",
                title: "操作",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-success create" style="cursor:pointer" data-toggle="modal" data-target="#creModal" name="' + model + '" id="' + deviceType + '" data="' + manufacture + '">' + '+创建服务' + '</a>'
                        + '<a class="btn-sm btn-danger del" style="cursor:pointer" data-toggle="modal" data-target="#delSerModal" name="' + model + '" id="' + deviceType + '" data="' + manufacture + '">' + '删除' + '</a>';
                }
            },

            {
                targets: 2,
                width:"25%",
                data: null,
                title: "设备型号",
                render: function (data, type, row, meta) {
                    console.log(row);
                    model = row.coordinate.split('%')[2];
                    return model;
                }
            },
            {
                targets: 1,
                width:"25%",
                data: null,
                title: "设备类型",
                render: function (data, type, row, meta) {
                    deviceType = row.coordinate.split('%')[1];
                    return deviceType;
                }
            },
            {
                targets: 0,
                width:"25%",
                data: null,
                title: "厂商",
                render: function (data, type, row, meta) {
                    manufacture = row.coordinate.split('%')[0];
                    return '<a class="show" name="' + row.coordinate.split('%')[2] + '" id="' + row.coordinate.split('%')[1] + '" data="' + row.coordinate.split('%')[0] + '">' + row.coordinate.split('%')[0] + '</a>';
                }
            }
        ],
        initComplete: function () {
//               $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" id="'+manufacture+'" data-toggle="modal" data-target="#mm">+ 创建服务组</button>');
            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" data-toggle="modal" data-target="#mm">+ 创建服务组</button>');
        }
    });
//展示设备组
    $('#dataTables-example').on('click', 'tr .show', function () {
        console.log("show1");
        var deviceType = $(this).attr('id');
        deviceType1 = deviceType;
        var model = $(this).attr('name');
        model1 = model;
        var manufacture = $(this).attr('data');
        manufacture1 = manufacture;
        console.log(deviceType1);
        console.log(model1);
        console.log(manufacture1);
        if ($.fn.dataTable.isDataTable('#dataTables-show')) {
//table.destroy();
            $('#dataTables-show').DataTable().destroy();
            console.log('aa')
        }
        table = $('#dataTables-show').DataTable({
            "aLengthMenu": [5, 10, 25, 50, 100],
            "bPaginate": true,
            "bAutoWidth": false,
            "oLanguage": {
                "sProcessing": "正在加载中......",
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "对不起，查询不到相关数据！",
                "sEmptyTable": "表中无数据存在！",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
                "sSearch": "搜索",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "末页"
                }
            },//多语言配置
            ajax: {
                url: "/api/service/services/" + manufacture + "/" + deviceType + "/" + model + "/tail",
                dataSrc: ""
            },
            //默认最后一列（最后更新时间）降序排列
            order: [[2, "desc"]],
            columnDefs: [
                {
                    targets: 3,
                    width:"25%",
                    data: "updated_at",
                    title: "操作",
                    render: function (data, type, row, meta) {
                        return '<a class="btn-sm btn-danger delDev" data-toggle="modal" data-target="#delServiceModal" style="cursor:pointer" id="' + row.serviceName + '">' + '删除' + '</a>';
                    }
                },

                {
                    targets: 2,
                    width:"25%",
                    data: null,
                    title: "服务类型",
                    render: function (data, type, row, meta) {
                        return row.serviceType;
                    }
                },
                {
                    targets: 1,
                    width:"25%",
                    data: null,
                    title: "服务描述",
                    render: function (data, type, row, meta) {
                        return row.serviceDescription;
                    }
                },
                {
                    targets: 0,
                    width:"25%",
                    data: null,
                    title: "服务名称",
                    render: function (data, type, row, meta) {
                        return row.serviceName;
                    }
                }
            ],
            // initComplete: function () {
            //     $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" id="' + manufacture + '" data-toggle="modal" data-target="#mm">+ 创建服务组</button>');
            // }
        });
    });
//创建服务
    $('#addParams').on('click', function () {
        var input = document.createElement("input");
        var p = document.createElement("p");
        $('#param').append(p);
        $('#param').append(input);
    });
    $('#dataTables-example').on('click', 'tr .create', function () {
//$("#param").empty();
        console.log("create service");
        var manufacture = $(this).attr('data');
        var deviceType = $(this).attr('id');
        var model = $(this).attr('name');
        console.log(deviceType);
        console.log(manufacture);
        console.log(model);
        $('#manufactureCre').val(manufacture);
        $('#deviceTypeCre').val(deviceType);
        $('#modelCre').val(model);

    });
    $('#serviceType').on('change', function () {
        var serviceType = $('#serviceType').val();
        if(serviceType == 'platform'){
            $('#hideDiv').css('display','block');
        }else{
            $('#hideDiv').css('display','none');
            $('#protocol').val('');
            $('#url').val('');

        }
        console.log("serviceType:"+serviceType)
    })
    $('#confirmcre').on('click', function () {
        var manufacture = $('#manufactureCre').val();
        console.log("manufacture:"+manufacture);
        var deviceType = $('#deviceTypeCre').val();
        console.log("deviceType:"+deviceType);
        var model = $('#modelCre').val();
        console.log("model:"+model);
        var serviceName = $('#serviceName').val();
        console.log("serviceName:"+serviceName)
        var serviceDescription = $('#serviceDescription').val();
        console.log("serviceDescription"+serviceDescription);
        var serviceType = $('#serviceType').val();
        var protocol = $('#protocol').val();
        console.log("protocol:"+protocol);
        var url = $('#url').val();
        console.log("url:"+url);
        var requireResponce = $('#requireResponce').val();
        console.log("requireResponce:"+requireResponce);
        var methodName = $('#methodName').val();
        console.log("methodName:"+methodName);
        var a = [];
        for (var i = 0; i < $('#param').find('input').length; i++) {
            var b = $('#param').find('input')[i].value;
            b = b.split(':');
            console.log(b[0])
            console.log(b[1])
            a[b[0]] = b[1];
        }
        console.log(a)
        var s = '{';
        for (key in a) {
            s += '"' + key + '":"' + a[key] + '",'
        }
        s = s.slice(0, s.length - 1)
        s += '}'
        console.log(s)

        var s1 = JSON.parse(s);

        $.ajax({
            url: "/api/service/saveServiceToGroup",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "manufacture": manufacture,
                    "deviceType": deviceType,
                    "model": model,
                    "description":
                        {
                            "serviceName": serviceName,
                            "serviceDescription": serviceDescription,
                            //"serviceDescription": serviceDescription,
                            "serviceType": serviceType,
                            "protocol": protocol,
                            "url": url,
                            "requireResponce": requireResponce,
                            "serviceBody":
                                {
                                    "methodName": methodName,
                                    "params": s1
                                }
                        }
                }
            ),
            dataType: "text",
            success: function (result) {
                $('#creModal').modal('hide')
                $('#last').on('click', function () {
                    window.location.href = "services";
                });
//                         var obj = JSON.parse(result);
                console.log("创建服务成功！");
            },
            error: function (msg) {
                alert(msg.message);
            }
        })
    });
//删除服务组里的服务
    $('#dataTables-show').on('click', 'tr .delDev', function () {
        //$('#devDel').val($(this).attr('id'));
        serviceName1 = $(this).attr('id');
        console.log(serviceName1);
        console.log(deviceType1);
        console.log(manufacture1);
        console.log(model1);
    });
    $('#ServiceDelete').on('click', function () {
        console.log(model1, manufacture1, deviceType1, serviceName1);
        $.ajax({
            url: "/api/service/deleteServiceFromGroup/" ,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "manufacture": manufacture1,
                    "deviceType": deviceType1,
                    "model": model1,
                    "serviceName": serviceName1,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("delete service success");
                $('#delServiceModal').modal('hide')
                $('#lastService').on('click', function () {
                    window.location.href = "services";
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
//
//创建服务组
    $('#create').on('click', function () {
        var manufacture = $('#manufacture').val();
        var deviceType = $('#deviceType').val();
        var model = $('#model').val();
        if (manufacture === '' || deviceType === '' || model === '') {

        } else {
            console.log('dianji');
            $.ajax({
                url: "/api/service/saveGroup/",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({'manufacture': manufacture, 'deviceType': deviceType, 'model': model}),
                dataType: "text",
                success: function (result) {
                    alert('123') ;
//        var obj = JSON.parse(result);
                    console.log("success");
                    console.log(result);

                    alert("create success");

                    $('#createSuc').modal('show');
                    $('#mm').modal('hide');

                    $('#lastCreate').on('click', function () {
                        window.location.href = "services";
                    });

                    alert("hello") ;

                },
                error: function (msg) {
                    alert(msg.message);
                }
            });
            //创建成功提示

        }
    });
    $('#cancle').on('click', function () {
        $('#mm').modal('hide');

    })
    $('#mm').on('hide.bs.modal', function () {
        console.log('hideeee');

        document.getElementById("createServiceGroup").reset();
    });

    var manufacture2;
    var deviceType2;
    var model2;

//删除服务组
    $('#dataTables-example').on('click', 'tr .del', function () {
        console.log('name:' + $(this).attr('data'));
        console.log('id:' + $(this).attr('id'));
        console.log('data:' + $(this).attr('name'));
        manufacture2 = $(this).attr('data');
        deviceType2 = $(this).attr('id');
        model2 = $(this).attr('name');
        //$('#confirmDel').val($(this).attr('id'));
    });
    $('#SerDelete').on('click', function () {
        $.ajax({
            url: "/api/service/deleteGroup/" ,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "manufacture": manufacture2,
                    "deviceType": deviceType2,
                    "model": model2,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("delete service group success");
                $('#delSerModal').modal('hide')
                $('#lastSer').on('click', function () {
                    window.location.href = "services";
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
});
