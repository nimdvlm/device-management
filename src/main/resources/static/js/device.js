$(function () {
    $("#device_input").keyup(function () {
        $("#device_table tbody tr").hide()
            .filter(":contains('"+($(this).val())+"')").show();//filter和contains共同来实现了这个功能。
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
    // $('#toolbar').html('<button style="margin-left:20px;" class="btn btn-primary btn-sm addDevice" data-toggle="modal" data-target="#createDeviceModal">+ 创建设备</button>');

    $('#devices_table').DataTable({
        "aLengthMenu" : [5,10, 25, 50, 100],
        "bPaginate" : true,
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
                "sLast": "末页",
                "bSort":true,
                "bSortClasses":true
            }
        } ,//多语言配置
        ajax: {
            url: "/api/device/allDevices",
            dataSrc: ""
        },
        //默认最后一列（最后更新时间）降序排列
        order: [[ 3, "desc" ]],
        columnDefs: [
            {
                targets: 5,
                width: "22%",
                data: "updated_at",
                title: "操作",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-danger del" style="cursor:pointer" data-toggle="modal" data-target="#delDeviceModal" id="'+row.deviceId+'">'+'删除'+'</a>'+'<a class="btn-sm btn-success ctrl" style="cursor:pointer" data-toggle="modal" data-target="#detailDeviceModal" id="'+row.deviceId+'" name="'+row.name+'">'+'详情'+'</a>'+'<a class="btn-sm btn-warning assign" style="cursor:pointer" data-toggle="modal" data-target="#assDeviceModal" name="'+row.name+'" id="'+row.deviceId+'">'+'分配'+'</a>'+'<a class="btn-sm btn-info getToken" style="cursor:pointer" data-toggle="modal" data-target="#tokenModal" id="'+row.deviceId+'">'+'令牌'+'</a>';
                }
            },
            {
                targets: 4,
                width: "8%",
                data: null,
                title: "状态",
                render: function (data, type, row, meta) {
                    return row.status;
                }
            },
            {
                targets: 3,
                width: "20%",
                data: null,
                title: "创建时间",
                render: function (data, type, row, meta) {
                    return row.createdTime;
                }
            },
            {
                targets: 2,
                width: "20%",
                data: null,
                title: "描述",
                render: function (data, type, row, meta) {
                    return row.additionalInfo;
                }
            },
            {
                targets: 1,
                width: "15%",
                data: null,
                title: "类型",
                render: function (data, type, row, meta) {
                    return row.type;
                }
            },
            {
                targets: 0,
                width: "15%",
                data: "title",
                title: "设备名称",
                render: function (data, type, row, meta) {
                    var deviceId = row.deviceId;
                    return '<a class="show" id="' + deviceId + '" >' + row.name + '</a>';
                }
            }
        ],
        initComplete:function(){
            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm addDevice" id="add_device_btn" data-toggle="modal" data-target="#createDeviceModal">+ 创建设备</button>');
        }
    });

    // 展示设备任务列表
    $('#devices_table').on('click', 'tr .show', function () {
        var deviceId = $(this).attr('id');
        console.log(deviceId);
        if ($.fn.dataTable.isDataTable('#device_task')) {
            $('#device_task').DataTable().destroy();
            console.log('aa')
        }
        alert("haha");
        $('#device_task').DataTable({
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
                url: "/api/shadow/task/list/" + deviceId,
                dataSrc: ""
            },
            //默认最后一列（最后更新时间）降序排列
            order: [[2, "desc"]],
            columnDefs: [
                {
                    targets: 3,
                    width:"10%",
                    data: "updated_at",
                    title: "操作",
                    render: function (data, type, row, meta) {
                        return '<a class="btn-sm btn-danger cancelTask" data-toggle="modal" data-target="#cancelTaskModal" style="cursor:pointer" id="' + row.id + '" name="' + deviceId + '">' + '取消' + '</a>';
                    }
                },

                {
                    targets: 2,
                    width:"15%",
                    data: null,
                    title: "任务状态",
                    render: function (data, type, row, meta) {
                        if (row.iscanceled) {
                            return "已取消";
                        }
                        else {
                            return "执行中";
                        }
                        // return row.serviceType;
                    }
                },
                {
                    targets: 1,
                    width:"50%",
                    data: null,
                    title: "任务描述",
                    render: function (data, type, row, meta) {
                        return row.description;
                    }
                },
                {
                    targets: 0,
                    width:"25%",
                    data: null,
                    title: "任务ID",
                    render: function (data, type, row, meta) {
                        return row.id;
                    }
                }
            ]
        });
    });

    // 取消设备任务
    $('#device_task').on('click', 'tr .cancelTask', function () {
        var taskId = $(this).attr('id');
        var deviceId = $(this).attr('name');
        console.log(taskId);
        console.log(deviceId);
        $('#confirmCancel').val(taskId + "/" + deviceId);
    });
    $('#cancelConfirm').on('click', function() {
        var arr = $('#confirmCancel').val().split('/');
        console.log(arr);
        var deviceId = arr[0];
        var taskId = arr[1];
        $.ajax({
            url: "/api/shadow/task/cancel/" + deviceId + "/" + taskId,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: "",
            dataType: "text",
            success: function (result) {
                console.log("success");
                $('#cancelTaskModal').modal('hide');
                window.location.href = "homepage";
                $('#device_task').ajax.reload();
            },
            error: function(msg) {
                alert(msg.message);
            }
        });
    })

    // 获取厂商列表
    $.ajax({
        url: "/api/service/manufactures/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: "",
        dataType: "text",
        success: function (result) {
            // var obj = JSON.parse(result);
            console.log(result);
            var temp = "";
            for (var j = 1; j < result.length - 1; j++) {
                temp += result[j];
            }
            console.log(temp);
            var arr = temp.split(', ');
            $('#manufacture').empty();
            $('#manufacture').append('<option value="">--请选择厂商</option>');
            $('#deviceType').empty();
            $('#deviceType').append('<option value="">--请选择设备类型</option>');
            $('#model').empty();
            $('#model').append('<option value="">--请选择设备型号</option>');
            for (var i = 0; i < arr.length; i++) {
                $('#manufacture').append('<option value = "' + arr[i] + '">' + arr[i] + '</option>');
            }
        },
        error: function(msg) {
            alert(msg.message);
        }
    });

    $('#manufacture').change(function() {
        // 获取设备类型列表
        if ($('#manufacture option:selected').val() !== ""){
            $.ajax({
                url: "/api/service/" + $('#manufacture option:selected').val() + "/deviceTypes/",
                type: "GET",
                contentType: "application/json;charset=utf-8",
                data: "",
                dataType: "text",
                success: function(result) {
                    // var obj = JSON.parse(result);
                    console.log(result);
                    var temp = "";
                    for (var j = 1; j < result.length - 1; j++) {
                        temp += result[j];
                    }
                    var arr = temp.split(', ');
                    $('#deviceType').empty();
                    $('#deviceType').append('<option value="">--请选择设备类型</option>');
                    for (var i = 0; i < arr.length; i++) {
                        $('#deviceType').append('<option value = "' + arr[i] + '">' + arr[i] + '</option>');
                    }
                },
                error: function(msg) {
                    alert(msg.message);
                }
            });
        }
    });

    $('#deviceType').change(function() {
        // 获取设备型号列表
        console.log($('#deviceType option:selected').val());
        if ($('#deviceType option:selected').val() !== "") {
            $.ajax({
                url: "/api/service/" + $('#manufacture option:selected').val() + '/' + $('#deviceType option:selected').val() + "/models/",
                type: "GET",
                contentType: "application/json;charset=utf-8",
                data: "",
                dataType: "text",
                success: function(result) {
                    // var obj = JSON.parse(result);
                    console.log(result);
                    var temp = "";
                    for (var j = 1; j < result.length - 1; j++) {
                        temp += result[j];
                    }
                    var arr = temp.split(', ');
                    $('#model').empty();
                    $('#model').append('<option value="">--请选择设备型号</option>');
                    for (var i = 0; i < arr.length; i++) {
                        $('#model').append('<option value = "' + arr[i] + '">' + arr[i] + '</option>');
                    }
                },
                error: function(msg) {
                    alert(msg.message);
                }
            });
        }
    });

    // 创建设备表单验证提交设置
    $.validator.setDefaults({
        submitHandler: function(){
            var name = $('#name').val();
            var type = $('#type').val();
            var manufacture = $('#manufacture').val();
            var deviceType = $('#deviceType').val();
            var model = $('#model').val();
            var description = $('#description').val();
            $.ajax({
                url: "/api/device/create",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({'name': name, 'type': type,'manufacture':manufacture,'deviceType':deviceType,'model':model, "additionalInfo":{"description":description}}),
                dataType: "text",
                success: function (result) {
                    // var obj = JSON.parse(result);
                    console.log("success");
                    $('#createDeviceModal').modal('hide');
                    $('#lastCreate').on('click',function(){
                        window.location.href = "homepage";
                    });
                },
                error: function (msg) {
                    alert(msg.message);
                }
            });

            $('#createSucModal').modal('show');
        }
    });

    // 创建设备必填限制
    $('#createDeviceForm').validate({
        rules: {
            deviceName: {required: true},
            bigType: {required: true},
            manufacture: {required: true},
            specificType: {required: true},
            deviceModel: {required: true}
        },
        messages: {
            deviceName: {required: '设备名称不能为空'},
            bigType: {required: '设备大类型不能为空'},
            manufacture: {required: '必须为设备选择一个厂商'},
            specificType: {required: '必须为设备选择具体类型'},
            deviceModel: {required: "必须为设备选择型号"}
        }
    });

//删除设备功能
    $('#devices_table').on('click','tr .del', function () {
        console.log($(this).attr('id'))
        $('#confirmDel').val($(this).attr('id'))
    } );
    $('#confirmDelete').on('click',function(){
        var deviceId = $('#confirmDel').val();
        console.log(deviceId)
        $.ajax({
            url: "/api/device/delete/"+deviceId,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: "",
            dataType: "text",
            success: function (result) {
//                                             var obj = JSON.parse(result);
                console.log("success");
                $('#delDeviceModal').modal('hide');
//                                          setTimeout('window.location.href = "device_group"',2000)
                $('#lastDelete').on('click',function(){
                    window.location.href = "homepage";
                    $('#devices_table').ajax.reload();
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
    // 分配功能
    $('#devices_table').on('click','tr .assign', function () {
        $("#assGroup").empty();
        var deviceId = $(this).attr('id');
        var deviceName = $(this).attr('name');
        $('#assName').val(deviceId);
        $('#deviceName').val(deviceName);
        $.ajax({
            url: "/api/group/allGroups/",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: "",
            dataType: "text",
            success: function (result) {
                var obj = JSON.parse(result);
                var groupName = [];
                var groupId = [];
                for(var x in obj){
                    groupName.push(obj[x].name);
                    groupId.push(obj[x].id)
                }
                for (var j = 0; j < groupName.length; j++) {
                    $('#assGroup').append('<option value="' + groupName[j] + '">' + groupName[j] + '</option>')
                }
                $('#assGroup').change(function () {
                    var index = jQuery.inArray($('#assGroup').val(), groupName);
                    $('#assGroup').attr('name', groupId[index]);
                })
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
    $('#assignDev').on('click',function(){
        var assName = $('#assName').val();
        var assGroup = $('#assGroup').attr('name');
        $.ajax({
            url: "/api/group/assign/"+assName+"/"+assGroup,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: "",
            dataType: "text",
            success: function (result) {
                var obj = JSON.parse(result);
                console.log('suscc');
                $('#assDeviceModal').modal('hide');
                //                                          setTimeout('window.location.href = "device_group"',2000)
                $('#lastAssign').on('click',function(){
                    window.location.href = "homepage";
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
    //详情功能
    $('#devices_table').on('click','tr .ctrl', function () {
        $("#ctrDevice").empty();
        var deviceId = $(this).attr('id');
        var ctrName = $(this).attr('name');
        $('#ctrName').text(ctrName);

        // 详情页属性栏
        $.ajax({
            url: "/api/data/getAttribute/" + deviceId,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: "",
            dataType: "text",
            success: function(result) {
                var obj = JSON.parse(result);
                console.log(obj);
                for (var i = 0; i < obj.length; i++) {
                    $('.deviceAttributeList').append('<li class="col-xs-3 col-sm-3 col-md-3 attributeName">lastUpdateTime</li> ' + '<li class="col-xs-3 col-sm-3 col-md-3 attributeValue">' + obj[i].lastUpdateTs + '</li> '
                         + '<li class="col-xs-3 col-sm-3 col-md-3 attributeName">' + obj[i].key + '</li>'
                         + '<li class="col-xs-3 col-sm-3 col-md-3 attributeValue">' + obj[i].value + '</li>');
                    var date = formatDate(new Date(obj[i].lastUpdateTs));
                    obj[i].lastUpdateTs = date;
                }
                $('#device_attribute_table').dataTable({
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
                    "data": obj,
                    "columns": [
                        {
                            "title": "最后更新时间",
                            "data": "lastUpdateTs",
                            "width": "30%"
                        },
                        {
                            "title": "键",
                            "data": "key",
                            "orderable": true,
                            "orderSequence": ["asc"],
                            "width": "20%"
                        },
                        {
                            "title": "值",
                            "data": "value",
                            "width": "50%"
                        }
                    ]
                });
            },
            error: function (msg) {
                alert(msg.message);
            }
        });

        // 详情页遥测数据栏
        $.ajax({
            url: "/api/Token/getToken/",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: "",
            dataType: "text",
            success: function(result) {
                var keys = [];
                var token = result;
                var addr = '10.108.217.227';
                var port = '8080';
                var url = 'ws://' + addr + ':' + port + '/api/ws/plugins/telemetry?token=' + token;
                var ws = new WebSocket(url);
                // 打开Socket
                    // Listen for the connection open event then call the sendMessage function
                    ws.onopen = function(e) {
                        log("Connected");
                        sendMessage('{"tsSubCmds":[{"entityType":"DEVICE","entityId":"' + deviceId + '","scope":"LATEST_TELEMETRY","cmdId":2}],"historyCmds":[]}')
                    };

                    // Listen for the close connection event
                    ws.onclose = function(e) {
                        log("Disconnected: " + e.reason);
                    };

                    // Listen for connection errors
                    ws.onerror = function(e) {
                        log("Error ");
                    };

                    // Listen for messages arriving at the client
                    ws.onmessage = function(e) {
                        log("message received: " + e.data);
                        // 将收到的数据转换成JSON格式
                        var message = JSON.parse(e.data);
                        // console.log(message);
                        for(var i in message.data) {
                            var key = i;
                            var telemetryDate = formatDate(new Date(message.data[i][0][0]));
                            var telemetryValue = message.data[i][0][1];
                            // 是之前出现过的key，则刷新原来的行
                            // console.log(keys);
                            if (inArray(key, keys)) {
                                // 遍历table
                                $('#realtime_data_table tr').each(function(trindex) {
                                   var tableKey = $(this).children('td').eq(1).text();
                                   if (tableKey === key){
                                       $(this).children('td').eq(0).text(telemetryDate);
                                       $(this).children('td').eq(2).text(telemetryValue);
                                   }
                                });
                            }
                            // 是之前未出现过的key，则新加一行显示
                            else {
                                // console.log(keys);
                                keys.push(key);
                                $('#realtime_data_table').append('<tr><td>' + telemetryDate + '</td><td>' + key + '</td><td>' + telemetryValue + '</td></tr>');
                            }
                        }
                    };

                    function log(s) {
                        // Also log information on the javascript console
                        console.log(s);
                    }

                    function sendMessage(msg) {
                        ws.send(msg);
                        log("Message sent");
                    }
            },
            error: function(msg) {
                alert(msg.message);
            }
        });

        // 详情页控制栏
        $.ajax({
            url: "/api/shadow/" + deviceId,
            type: "GET",
            contentType: "application/json:charset=utf-8",
            data: "",
            dataType: "text",
            success: function(result) {
                var obj = JSON.parse(result);
                // console.log(obj);
                var services = obj.services;
                console.log(services);
                var serviceName = [];
                $('#control_panel').empty();
                for (var i = 0; i < services.length; i++) {
                    serviceName[i] = services[i].serviceName;
                    $('#control_panel').append('<div class="col-xs-10 col-sm-6 col-md-4 service-panel"><form id="service-control-form"><fieldset id="' + serviceName[i] + '"><legend class="service-control-legend">' + serviceName[i] + '</legend></fieldset></form></div>');
                    var params = services[i].serviceBody.params;
                    console.log(params);
                    for (var j in params) {
                        // console.log(params[j]);
                        // console.log(params.params[j]);
                        var paramType = params[j].split("=");
                        // console.log(paramType);
                        if (paramType[0] === '1') {
                            var paramName = j;
                            // console.log(paramName);
                            var inputValue = paramType[1];
                            // console.log(inputValue);
                            $('#' + serviceName[i]).append('<div class="form-group"><label class="col-sm-3 control-label" for="param' + j + '" style="text-align: left;">' + paramName + '</label><div class="col-sm-9"><input type="text" class="form-control" id="param' + j + '" name="" value="' + inputValue +'"/></div></div>');
                        }
                        if (paramType[0] === '2') {
                            var paramName = j;
                            var leftStatus = paramType[1];
                            var rightStatus = paramType[2];
                            var curStatus = rightStatus;

                            $('#' + serviceName[i]).append('<div class="form-group"><label class="col-sm-3 control-label" for="' + paramName + '" style="text-align: left;">' + paramName +  '</label><div class="col-sm-9"><image src="../img/off.png" id="' + paramName + '" onclick="changeImg(this.id)" style="cursor: pointer; width: 80px; height: 30px; margin: 0 10px;"></image></div></div>');
                            var img = document.getElementById(paramName);
                            img.setAttribute('on', leftStatus);
                            img.setAttribute('off', rightStatus);
                        }
                        if (paramType[0] === '3') {
                            var paramName = j;
                            var lowerBound = paramType[1];
                            var upperBound = paramType[2];
                            $('#' + serviceName[i]).append('<div class="form-group"><label class="col-sm-3 control-label" for="param' + j + '" style="text-align: left;">' + paramName + '</label><div class="col-sm-9"><input type="number" class="form-control range-input" id="param' + j + '" name="rangeInput" min="' + lowerBound + '" max="' + upperBound + '" value="' + lowerBound +'" step="1"/><a>(' + lowerBound + '-' + upperBound + ')</a></div></div>');

                            // $('.range-input').change(function() {
                            //     // alert("change");
                            //
                            //     $('#service-control-form').validate({
                            //         rules: {
                            //             rangeInput: {min: lowerBound, max: upperBound, digits: true}
                            //         },
                            //         messages: {
                            //             rangeInput: {min: '请输入正确范围内的值', max: '请输入正确范围内的值', digits: '请输入正确范围内的值'}
                            //         }
                            //     });
                            // });
                        }
                    }
                    $('#' + serviceName[i]).append('<div class="form-group service-btn-group"><button id="' + deviceId + '" type="button" class="btn btn-primary col-sm-3" onclick="commonSubmit(this.parentNode.parentNode,this.id)">确定</button>' +
                        '<button id="' + deviceId + '" type="button" class="btn btn-info col-sm-4" onclick="delaySubmit(this.parentNode.parentNode,this.id)">延时执行</button>' +
                        '<button id="' + deviceId + '" type="button" class="btn btn-warning col-sm-4" onclick="cycleSubmit(this.parentNode.parentNode,this.id)">周期执行</button></div>');
                }
            },
            error: function(msg) {
                alert(msg.message);
            }
        });

        // 关闭详情页时清除表格
        $('#detail').on('click',function(){
            $('#device_attribute_table').DataTable().clear().draw();
            window.location.href = "homepage";
        });
        $('#detailCancel').on('click',function(){
            $('#device_attribute_table').DataTable().clear().draw();
            window.location.href = "homepage";
        });
        $('#detailClose').on('click',function(){
            $('#device_attribute_table').DataTable().clear().draw();
            window.location.href = "homepage";
        });
    } );

    // 查看令牌功能
    $('#devices_table').on('click','tr .getToken', function () {
        var deviceId = $(this).attr('id');
        $.ajax({
            url: "/api/device/token/" + deviceId,
            type: "GET",
            contentType: "application/json:charset=utf-8",
            data: "",
            dataType: "text",
            success: function(result) {
                var obj = JSON.parse(result);
                $('#token').text(obj.credentialsId);
            },
            error: function(msg) {
                alert(msg.message);
            }
        });
    } );

    // 日期时间选择插件
    $('#inputDelayTime').flatpickr({
        allowInput: false,
        clickOpens: true,
        defaultDate: formatDate(new Date()),
        enableTime: true,
        enableSeconds: true,
        minuteIncrement: 1,
        minDate: formatDate(new Date())
    });
    $('#firstExecuteTime').flatpickr({
        allowInput: false,
        clickOpens: true,
        defaultDate: formatDate(new Date()),
        enableTime: true,
        enableSeconds: true,
        minuteIncrement: 1,
        minDate: formatDate(new Date())
    });

});

// 用于将时间戳转换为时间 xxxx-xx-xx xx:xx:xx*/
function formatDate(now) {
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

// 判断元素是否在数组中
function inArray(value, array) {
    var i = array.length;
    while (i--) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

// 改变on/off开关图片
function changeImg(index) {
    // console.log(index);
    if($('#' + index).attr('src') === '../img/off.png'){
        console.log("off->on");
        $('#' + index).attr('src','../img/on.png');
    }else{
        $('#' + index).attr('src','../img/off.png');
        console.log("on->off");
    }
}

// 提交单个服务的表单
function commonSubmit(fieldSet, deviceId) {
    // console.log(fieldSet);
    console.log(deviceId);
    var serviceName = fieldSet.id;
    // console.log(serviceName);
    var children = fieldSet.childNodes;
    var keys = [];
    var values = [];
    keys.push("serviceName");
    values.push(serviceName);
    // console.log(children);
    for (var i = 1; i < children.length-1; i++) {
        var param = children[i].childNodes;
        console.log(param);
        // console.log(param[0].textContent);
        keys.push(param[0].textContent);
        // console.log(param[1].childNodes[0].value);
        if (param[1].childNodes[0] instanceof HTMLInputElement) {
            values.push(param[1].childNodes[0].value);
        }
        else {
            console.log(param[1].childNodes[0].getAttribute('on'));

            if (param[1].childNodes[0].src.indexOf('on') >= 0 ) {
                values.push(param[1].childNodes[0].getAttribute('on'));
            }
            else {
                values.push(param[1].childNodes[0].getAttribute('off'));
            }
        }
    }

    var json = '{';
    for (var j = 0; j < keys.length; j++) {
        json += '"' + keys[j] +'":"' + values[j] + '",';
    }
    json = json.slice(0,json.length-1);
    json += '}';

    $.ajax({
        url: "/api/shadow/control/"+deviceId,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data:  json,
        dataType: "text",
        success: function (result) {
            // var obj = JSON.parse(result);
            console.log(deviceId);
            console.log("success");
        },
        error: function (msg) {
            alert(msg.message);
        }
    });
}

// 延时执行，需设置延时时间
function delaySubmit(fieldSet, deviceId) {
    // 显示选择延时时间点的模态框
    $('#delayModal').modal('show');
    $('#delayClose').on('click', function() {
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);
    });
    $('#delayCancel').on('click', function() {
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);
    });
    $('#delayModal').modal({
        backdrop:"static"
    });

    // console.log(fieldSet);
    console.log(deviceId);
    var serviceName = fieldSet.id;
    // console.log(serviceName);
    var children = fieldSet.childNodes;
    var keys = [];
    var values = [];
    keys.push("serviceName");
    values.push(serviceName);
    // console.log(children);
    for (var i = 1; i < children.length-1; i++) {
        var param = children[i].childNodes;
        console.log(param);
        // console.log(param[0].textContent);
        keys.push(param[0].textContent);
        // console.log(param[1].childNodes[0].value);
        if (param[1].childNodes[0] instanceof HTMLInputElement) {
            values.push(param[1].childNodes[0].value);
        }
        else {
            console.log(param[1].childNodes[0].getAttribute('on'));

            if (param[1].childNodes[0].src.indexOf('on') >= 0 ) {
                values.push(param[1].childNodes[0].getAttribute('on'));
            }
            else {
                values.push(param[1].childNodes[0].getAttribute('off'));
            }
        }
    }

    var json = '{';
    for (var j = 0; j < keys.length; j++) {
        json += '"' + keys[j] +'":"' + values[j] + '",';
    }

    $('#delaySubmit').one('click',function(){
        var delayTime = "";
        var delayTimeStamp = ""; // 时间戳格式  怎么转换????
        delayTime = $('#inputDelayTime').val();
        delayTimeStamp = Date.parse(new Date(delayTime));
        // delayTimeStamp = delayTimeStamp / 1000;
        console.log(delayTimeStamp);
        $('#delayModal').modal('hide');
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);

        json += '"startTime":"' + delayTimeStamp + '",';
        json = json.slice(0,json.length-1);
        json += '}';

        $.ajax({
            url: "/api/shadow/control/"+deviceId,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data:  json,
            dataType: "text",
            success: function (result) {
                // var obj = JSON.parse(result);
                console.log(deviceId);
                console.log("success");
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
}

// 周期执行，需设置开始时间与周期
function cycleSubmit(fieldSet, deviceId) {
    // 显示选择延时时间点的模态框
    $('#cycleModal').modal('show');
    $('#cycleClose').on('click', function() {
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);
    });
    $('#cycleCancel').on('click', function() {
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);
    });
    $('#cycleModal').modal({
        backdrop:"static"
    });

    // console.log(fieldSet);
    console.log(deviceId);
    var serviceName = fieldSet.id;
    // console.log(serviceName);
    var children = fieldSet.childNodes;
    var keys = [];
    var values = [];
    keys.push("serviceName");
    values.push(serviceName);
    // console.log(children);
    for (var i = 1; i < children.length-1; i++) {
        var param = children[i].childNodes;
        console.log(param);
        // console.log(param[0].textContent);
        keys.push(param[0].textContent);
        // console.log(param[1].childNodes[0].value);
        if (param[1].childNodes[0] instanceof HTMLInputElement) {
            values.push(param[1].childNodes[0].value);
        }
        else {
            console.log(param[1].childNodes[0].getAttribute('on'));

            if (param[1].childNodes[0].src.indexOf('on') >= 0 ) {
                values.push(param[1].childNodes[0].getAttribute('on'));
            }
            else {
                values.push(param[1].childNodes[0].getAttribute('off'));
            }
        }
    }

    $('#cycleSubmit').one('click',function(){
        var startTime = "";
        var startTimeStamp = "";
        var cycle = "";
        var cycleUnit = "";
        startTime = $('#firstExecuteTime').val();
        startTimeStamp = Date.parse(new Date(startTime));
        // startTimeStamp = startTimeStamp / 1000;
        console.log(startTimeStamp);
        cycle = $('#cycle').val();
        cycleUnit = $('#cycleUnit').val();
        $('#cycleModal').modal('hide');
        setTimeout(function(){
            $('body').addClass('modal-open')
        },1000);

        var json = '{';
        for (var j = 0; j < keys.length; j++) {
            json += '"' + keys[j] +'":"' + values[j] + '",';
        }
        json += '"startTime":"' + startTimeStamp + '",';
        json += '"period":"' + cycle + '",';
        json += '"unit":"' + cycleUnit + '",';
        json = json.slice(0,json.length-1);
        json += '}';

        $.ajax({
            url: "/api/shadow/control/"+deviceId,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data:  json,
            dataType: "text",
            success: function (result) {
                // var obj = JSON.parse(result);
                console.log(deviceId);
                console.log("success");
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
}

// function test() {
//     console.log("test");
//     document.getElementById("delaySubmit").onclick = null;
// }
