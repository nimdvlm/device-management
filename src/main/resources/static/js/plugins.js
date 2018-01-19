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
            url: "/api/plugin/allPlugins",
            dataSrc: ""
        },
        //默认最后一列（最后更新时间）降序排列
        order: [[2, "desc"]],
        columnDefs: [
            {
                targets: 4,
                width:"25%",
                data: "updated_at",
                title: "操作",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-danger delete" style="cursor:pointer" data-toggle="modal" data-target="#delSerModal" id="' + row.id.id + '">' + '删除' + '</a>'
                        + '<a class="btn-sm btn-success active" style="cursor:pointer" id="' + row.id.id + '">' + '激活' + '</a>'
                        + '<a class="btn-sm btn-danger suspend" style="cursor:pointer" id="' + row.id.id + '">' + '暂停' + '</a>';
                }
            },

            {
                targets: 3,
                width:"20%",
                data: null,
                title: "创建时间",
                render: function (data, type, row, meta) {
                    return row.createdTime;
                }
            },
            {
                targets: 2,
                width:"15%",
                data: null,
                title: "插件状态",
                render: function (data, type, row, meta) {
                    return row.state;
                }
            },
            {
                targets: 1,
                width:"15%",
                data: null,
                title: "插件token",
                render: function (data, type, row, meta) {
                    return row.apiToken;
                }
            },
            {
                targets: 0,
                width:"25%",
                data: null,
                title: "插件名称",
                render: function (data, type, row, meta) {
                        return row.name;
                }
            }
        ],
        initComplete: function () {
//               $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" id="'+manufacture+'" data-toggle="modal" data-target="#mm">+ 创建服务组</button>');
            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" data-toggle="modal" data-target="#mm">+ 新增插件</button>');
        }
    });

    var pluginId;
    $('#dataTables-example').on('click', 'tr .delete', function () {
        console.log('id:' + $(this).attr('id'));
        pluginId = $(this).attr('id');
    });
    $('#SerDelete').on('click', function () {
        $.ajax({
            url: "/api/plugin/deletePlugin/" + pluginId,
            type: "DELETE",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "id": pluginId,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("delete plugins success");
                $('#delSerModal').modal('hide')
                $('#lastSer').on('click', function () {
                    window.location.href = "plugins";
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });

    $('#dataTables-example').on('click', 'tr .active', function () {
        console.log('id:' + $(this).attr('id'));
        pluginId = $(this).attr('id');
        $.ajax({
            url: "/api/plugin/"+pluginId+"/activate",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "id": pluginId,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("active plugins success");
                $('#deleteModal').modal('hide')
                window.location.href = "plugins";
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });


//暂停
    $('#dataTables-example').on('click', 'tr .suspend', function () {
        console.log('id:' + $(this).attr('id'));
        pluginId = $(this).attr('id');
        $.ajax({
            url: "/api/plugin/"+pluginId+"/suspend",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "id": pluginId,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("suspend plugins success");
                window.location.href = "plugins";
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });

    $('#createnewplugins').on('click',function () {

        var name=$('#pluginName').val();
        var describe=$('#Describe').val();
        var apiToken=$('#apiToken').val();

        var myselect=$('#pluginURI').val();
        var protocol;
        if(myselect=="HTTP")
        {
            protocol="http://"
        }
        else if(myselect=="HTTPS")
        {
            protocol="https://"
        }

        var host=$('#pluginHost').val();
        var ports=$('#port').val();
        var port=parseInt(ports);
        var basePath=$('#pluginPath').val();

        var Method=$('#pluginMethod').val();

        if(name!="" || apiToken!="" || host!=""|| ports!="" || basePath!="")
        {
            $.ajax({
                url:"/api/plugin/savePlugin",
                type:"POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({
                        "additionalInfo":{"description":describe},
                        "apiToken":apiToken,
                        "clazz":"org.thingsboard.server.extensions.rest.plugin.RestApiCallPlugin",
                        "configuration":{"authMethod":Method,
                            "basePath":basePath,
                            "host":host,
                            "port":port.valueOf(),
                            "protocol":protocol,
                            "userName":"tenant@thingsboard.org",
                            "password":"tenant"
                        },
                        "name":name
                    }
                ),
                dataType:"text",
                success: function(result){
                    alert("create plugins success");
                    window.location.href = "plugins";
                },
                error: function (msg) {
                    alert(msg.message);
                }

            });
        }
        else
        {
            alert("请填写所有带*信息");
        }
    });
});




