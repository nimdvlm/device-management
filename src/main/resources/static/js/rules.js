$(function () {
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

    //添加过滤器确定
    $('#AddFilterCon').on('click', function () {
        var filterName = $('#FilterName').val();
        var filterType = $('#FilterType').val();
        var messageType = $('#MessageType').val();
        var filterDescription = $('#FilterDescription').val();

        if(filterType=='Message Type Filter'){
            $('#filterTableBody').append('<tr><td>' + filterName + '</td><td>' + filterType + '</td><td>' + messageType + '</td><td>' + '' + '</td></tr>');
        }
        else{
            $('#filterTableBody').append('<tr><td>' + filterName + '</td><td>' + filterType + '</td><td>' + '' + '</td><td>' + filterDescription + '</td></tr>');
        }
        $('#AddFilterModal').modal('hide');
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);
    });
    $('#CancelFilterCon').on('click', function () {
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);
    });
    $('#addFilterClose').on('click', function () {
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);
    });


    $('#cancle').on('click', function () {
        $('#CreateRulesModal').modal('hide');

    })
    $('#CreateRulesModal').on('hide.bs.modal', function () {

        document.getElementById("createRuleForm").reset();
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

});
//取消添加过滤器
$('#CancleFilterCon').on('click', function () {
    $('#AddFilterModal').modal('hide');

})


//创建规则
$('#create').on('click', function () {
    var ruleName = $('#ruleName').val();
    var ruleDescription = $('#ruleDescription').val();
    //过滤器数据
    for(){
        var FilterName =$('#FilterName').val();
        var FilterType =$('#FilterType').val();
        if(FilterType == 'Message Type Filter'){
            var MessageType =$('#MessageType').val();
        }else{
            var FilterDescription ==$('#FilterDescription').val();
        }
    }
    var inputPluginActionName = $('#inputPluginActionName').val();
    var inputPluginActionType = $('#inputPluginActionType').val();
    var requireConfirm = $('#requireConfirm').val();
    var inputBodyTemplate = $('#inputBodyTemplate').val();
    //
    var inputActionPath = $('#inputActionPath').val();
    var inputRequestMethod = $('#inputRequestMethod').val();
    var inputExpectedResultCode = $('#inputExpectedResultCode').val();
        $.ajax({
            url: "/api/rule/create/",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                //传几个过滤器数据？加循环？
        "filters":[
        {
            //选择不同过滤器传不同数据 未被选到的数据项填空？不传？
/*            "configuration":{
                if(FilterType == 'Message Type Filter'){
                    "messageTypes":[
                        MessageType
                    ]
                }
                else{

                }*/
            "name":FilterName,
            "clazz":'org.thingsboard.server.extensions.core.filter.'+FilterType
        }
    ],
        "name":ruleName,
        "additionalInfo":{
        "description":ruleDescription
    },
                "pluginToken":inputPluginActionType,
            "action":{
            "configuration":{
                "sync":requireConfirm,
                    "requestMethod":inputRequestMethod,
                    "actionPath":inputActionPath,
                    "template":inputBodyTemplate,
                    "expectedResultCode":inputExpectedResultCode
            },
            "clazz":"org.thingsboard.server.extensions.rest.action.RestApiCallPluginAction",
                "name":inputPluginActionName
    }

    }),
            dataType: "text",
            success: function (result) {
                console.log("success");
                console.log(result);
                $('#createSuc').modal('show');
                $('#AddRuleModal').modal('hide');
                $('#lastCreate').on('click', function () {
                    window.location.href = "rules";
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });

});


//取消创建规则
$('#cancle').on('click', function () {
    $('#AddRuleModal').modal('hide');
    window.location.href = "rules";
})


