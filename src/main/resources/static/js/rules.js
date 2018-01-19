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
            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" id="createRuleBtn" onclick="openCreateRuleModal()">+ 创建规则</button>');
        }
    });

    // $('#createRuleBtn').on('click', function() {
    //
    // });

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

    //取消添加过滤器
    $('#CancleFilterCon').on('click', function () {
        $('#AddFilterModal').modal('hide');

    })


//创建规则
    $('#create').on('click', function () {
        var apiToken = $('#PluginType').val();
        // var pluginType = $('#PluginType').val();
        // $.ajax({
        //     url: "/api/plugin/allPlugins/",
        //     type: "GET",
        //     contentType: "application/json;charset=utf-8",
        //     data: "",
        //     dataType: "text",
        //     success: function (result) {
        //         // var obj = JSON.parse(result);
        //         console.log(result);
        //         var obj = JSON.parse(result);
        //         var objName = [];
        //         console.log(objName);
        //         for (var j = 0; j < obj.length; j++) {
        //             if (pluginType ===obj.name) {
        //                 apiToken = obj.apiToken;
        //             }
        //         }
        //     },
        //     error: function(msg) {
        //         alert(msg.message);
        //     }
        // });

        var ruleName = $('#ruleName').val();
        var ruleDescription = $('#ruleDescription').val();
        var filterNames = [];
        var filterTypes = [];
        var filterAttribute = [];
        //过滤器数据
        // console.log($('#filterTable').find('tr').length);
        for(var i = 0; i < $('#filterTable').find('tr').length - 1; i++){
            filterNames[i] =$('#FilterName').val();
            filterTypes[i] =$('#FilterType').val();
            if(filterTypes[i] == 'Message Type Filter'){
            //     switch (filterAttribute[i]) {
            //         case "Get attributes":
            //             filterAttribute[i] = 'GET_ATTRIBUTES';
            //             break;
            //         case "Post attributes":
            //             filterAttribute[i] = 'POST_ATTRIBUTES';
            //             break;
            //         case "Post telemetry":
            //             filterAttribute[i] = 'POST_TELEMETRY';
            //             break;
            //         case "RPC Request":
            //             filterAttribute[i] = 'RPC_REQUEST';
            //             break;
            //     }
                filterAttribute[i] =$('#MessageType').val();
            }else{
                filterAttribute[i] = $('#FilterDescription').val();
            }
        }
        var inputPluginActionName = $('#inputPluginActionName').val();

        console.log(apiToken);
        // var inputPluginActionType = $('#inputPluginActionType').val();
        var requireConfirm = $('#requireConfirm').is(':checked');
        var inputBodyTemplate = $('#inputBodyTemplate').val();
        //
        var inputActionPath = $('#inputActionPath').val();
        var inputRequestMethod = $('#inputRequestMethod').val();
        var inputExpectedResultCode = $('#inputExpectedResultCode').val();

        var json = '{"filters":[{';
        for (var j = 0; j < filterNames.length; j++) {
            json += '"configuration":{';
            if (filterTypes[j] === "Message Type Filter") {
                json += '"messageTypes":["' + filterAttribute[j] + '"]},';
            }
            else {
                json += '"filter":["' + filterAttribute[j] + '"]},';
            }
            json += '"name":"' + filterNames[j] + '",';
            if (filterTypes[j] === "Message Type Filter") {
                json += '"clazz":"org.thingsboard.server.extensions.core.filter.MsgTypeFilter"}';
            }
            else {
                json += '"clazz":"org.thingsboard.server.extensions.core.filter.DeviceTelemetryFilter"}';
            }
        }

        json += '],';
        json += '"name":"' + ruleName +'",';
        json += '"additionalInfo":{"description":"' + ruleDescription + '"},';
        json += '"pluginToken":"' + apiToken + '",';
        json += '"action":{"configuration":{"sync":' + requireConfirm + ',';
        json += '"actionPath":"' + inputActionPath + '",';
        json += '"template":"' + inputBodyTemplate + '",';
        json += '"requestMethod":"' + inputRequestMethod + '",';
        json += '"expectedResultCode":' + inputExpectedResultCode + '},';
        json += '"clazz":"org.thingsboard.server.extensions.rest.action.RestApiCallPluginAction","name":"' + inputPluginActionName + '"}}';

        $.ajax({
            url: "/api/rule/create/",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: json,
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
        // data: JSON.stringify({
//             //传几个过滤器数据？加循环？
//             "filters":[
//             {
//             //选择不同过滤器传不同数据 未被选到的数据项填空？不传？
// /*            "configuration":{
//                //选Message Type Filter
//                 if(FilterType == 'Message Type Filter'){
//                     "messageTypes":[
//                         MessageType
//                     ]
//                 }
//                 //选Device...... Filter
//                 else{
//                  "configuration":{
//                 "filter":FilterDescription
//             },
//                 }*/
//             "name":FilterName,
//             "clazz":'org.thingsboard.server.extensions.core.filter.'+FilterType
//         }],
//         "name":ruleName,
//         "additionalInfo":{
//             "description":ruleDescription
//         },
//         "pluginToken":inputPluginActionType,
//         "action":{
//             "configuration":{
//                 "sync":requireConfirm,
//                 "requestMethod":inputRequestMethod,
//                 "actionPath":inputActionPath,
//                 "template":inputBodyTemplate,
//                 "expectedResultCode":inputExpectedResultCode
//             },
//             "clazz":"org.thingsboard.server.extensions.rest.action.RestApiCallPluginAction",
//             "name":inputPluginActionName
//         }
//
//     }),


    });
    //取消创建规则
    $('#cancle').on('click', function () {
        $('#AddRuleModal').modal('hide');
        window.location.href = "rules";
    });

});

function openCreateRuleModal() {
    $('#AddRuleModal').modal('show');
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
            var objName = [];
            $('#PluginType').empty();
            var i = 0;
            for (var j = 0; j < obj.length; j++) {
                if (obj[j].clazz === "org.thingsboard.server.extensions.rest.plugin.RestApiCallPlugin") {
                    $('#PluginType').append('<option value = "' + obj[j].apiToken + '">' + obj[j].name + '</option>');
                    objName[j] = obj[j].name;
                }
            }
            console.log(objName);
            $('#PluginType').change(function () {
                var index = jQuery.inArray($('#PluginType').val(), objName);
                console.log(index);
                $('#PluginType').attr('name', obj[index].apiToken);
                console.log($('#PluginType').attr());
            });
        },
        error: function(msg) {
            alert(msg.message);
        }
    });
}

