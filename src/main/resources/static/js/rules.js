$(function () {
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
            url: "/api/rule/allRules",
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
                    return '<a class="btn-sm btn-danger delete" style="cursor:pointer" data-toggle="modal" data-target="#deleteModal" id="' + row.id.id + '">' + '删除' + '</a>'
                        + '<a class="btn-sm btn-success active" style="cursor:pointer" id="' + row.id.id + '">' + '激活' + '</a>'
                        + '<a class="btn-sm btn-danger suspend" style="cursor:pointer" id="' + row.id.id + '">' + '暂停' + '</a>';
                }
            },

            {
                targets: 2,
                width:"25%",
                data: null,
                title: "当前状态",
                render: function (data, type, row, meta) {
                    return row.state;
                }
            },
            {
                targets: 1,
                width:"25%",
                data: null,
                title: "创建时间",
                render: function (data, type, row, meta) {
                    return row.createdTime;
                }
            },
            {
                targets: 0,
                width:"25%",
                data: null,
                title: "规则名称",
                render: function (data, type, row, meta) {
                    return row.name;
                }
            }
        ],
        initComplete: function () {
//               $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" id="'+manufacture+'" data-toggle="modal" data-target="#CreateRulesModal">+ 创建服务组</button>');
            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" data-toggle="modal" data-target="#AddRuleModal">+ 创建规则</button>');
        }
    });

//添加过滤器
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
                    $('#CreateRulesModal').modal('hide');

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
        $('#CreateRulesModal').modal('hide');

    })
    $('#CreateRulesModal').on('hide.bs.modal', function () {
        console.log('hideeee');

        document.getElementById("createServiceGroup").reset();
    });

    var ruleId;

//删除
    $('#dataTables-example').on('click', 'tr .delete', function () {
        console.log('id:' + $(this).attr('id'));
        ruleId = $(this).attr('id');
    });
    $('#RuleDelete').on('click', function () {
        $.ajax({
            url: "/api/rule/delete/" + ruleId,
            type: "DELETE",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "id": ruleId,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("delete rule success");
                $('#deleteModal').modal('hide')
                $('#lastDelete').on('click', function () {
                    window.location.href = "rules";
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });

//激活
    $('#dataTables-example').on('click', 'tr .active', function () {
        console.log('id:' + $(this).attr('id'));
        ruleId = $(this).attr('id');
        $.ajax({
            url: "/api/rule/active/" + ruleId,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "id": ruleId,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("active rule success");
                $('#deleteModal').modal('hide')
                window.location.href = "rules";
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });


//暂停
    $('#dataTables-example').on('click', 'tr .suspend', function () {
        console.log('id:' + $(this).attr('id'));
        ruleId = $(this).attr('id');
        $.ajax({ 
            url: "/api/rule/suspend/" +ruleId,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                    "id": ruleId,
                }
            ),
            dataType: "text",
            success: function (result) {
                //var obj = JSON.parse(result);
                console.log("suspend rule success");
                window.location.href = "rules";
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });


    // 获取插件名称列表
    $.ajax({
        url: "/api/plugin/allPlugins/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: "",
        dataType: "text",
        success: function (result) {
            // var obj = JSON.parse(result);
            console.log(result);
            var obj = JSON.parse(result);
            $('#PluginType').empty();
            for (var j = 0; j < obj.length; j++) {
                $('#PluginType').append('<option value = "' + obj[j].name + '">' + obj[j].name + '</option>');
            }
            // var temp = "";
            // for (var j = 1; j < result.length - 1; j++) {
            //     temp += result[j];
            // }
            // console.log(temp);
            // var obj = JSON.parse(temp);
            // // var pluginArr = [];
            // // console.log(pluginArr);
            // $('#PluginType').empty();
            // for (var j = 0; j < obj.length; j++) {
            //     // for (var k = 1; k < objArr[j].length)
            //     // pluginArr = JSON.parse(objArr[j]);
            //     $('#PluginType').append('<option value = "' + obj[j].name + '">' + obj[j].name + '</option>');
            // }
            // // for (var i = 0; i < arr.length; i++) {
            // //
            // // }
        },
        error: function(msg) {
            alert(msg.message);
        }
    });

    //创建规则过滤器选择
    $('#FilterType').on('change', function () {
        var FilterType = $('#FilterType').val();
        if(FilterType == 'Message Type Filter'){
            $('#Filter1').css('display','block');
            $('#Filter2').css('display','none');
        }else{
            $('#Filter1').css('display','none');
            $('#Filter2').css('display','block');
        }
    })

    $('#filterTable').dataTable({
        "paging": true,
        "pagingType": "simple_numbers",
        "pageLength": 5,
        "lengthMenu": [5, 10, 15, 20],
        "autoWidth": false,
        "language": {
            "sProcessing":   "处理中...",
            "sLengthMenu":   "显示 _MENU_ 项结果",
            "sZeroRecords":  "没有匹配结果",
            "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix":  "",
            "sSearch":       "搜索:",
            "sUrl":          "",
            "sEmptyTable":     "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands":  ",",
            "oPaginate": {
                "sFirst":    "首页",
                "sPrevious": "上页",
                "sNext":     "下页",
                "sLast":     "末页"
            },
        },
        // "data": ,
        "columnDefs": [
            {
                "title": "过滤器名称",
                "data": "",
                "width": "30%"
            },
            {
                "title": "过滤器类型",
                "data": "",
                "width": "50%"
            },
            {
                "title": "操作",
                "data": "updated_at",
                "width": "20%",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-primary editFilter" data-toggle="modal" data-target="#" style="cursor:pointer" id="" name="">' + '编辑' + '</a >';
                }
            }
        ],
        initComplete:function(){
            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm addFilter" id="add_filter_btn" data-toggle="modal" data-target="#">+ 添加过滤器</button>');
        }
    });

        });


