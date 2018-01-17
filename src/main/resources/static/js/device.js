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
        order: [[ 2, "desc" ]],
        columnDefs: [
            {
                targets: 5,
                data: "updated_at",
                title: "操作",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-danger del" style="cursor:hand" data-toggle="modal" data-target="#delDeviceModal" id="'+row.deviceId+'">'+'删除'+'</a>'+'<a class="btn-sm btn-success ctrl" style="cursor:hand" data-toggle="modal" data-target="#detailDeviceModal" id="'+row.deviceId+'" name="'+row.name+'">'+'详情'+'</a>'+'<a class="btn-sm btn-warning assign" style="cursor:hand" data-toggle="modal" data-target="#assDeviceModal" name="'+row.name+'" id="'+row.deviceId+'">'+'分配'+'</a>';
                }
            },
            {
                targets: 4,
                data: null,
                title: "状态",
                render: function (data, type, row, meta) {
                    return row.status;
                }
            },
            {
                targets: 3,
                data: null,
                title: "创建时间",
                render: function (data, type, row, meta) {
                    return row.createdTime;
                }
            },
            {
                targets: 2,
                data: null,
                title: "描述",
                width: "20%",
                render: function (data, type, row, meta) {
                    return row.additionalInfo;
                }
            },
            {
                targets: 1,
                data: null,
                title: "类型",
                render: function (data, type, row, meta) {
                    return row.type;
                }
            },
            {
                targets: 0,
                data: "title",
                title: "设备名称",
                render: function (data, type, row, meta) {
                    return row.name;
                }
            }
        ],
        initComplete:function(){
            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm addDevice" id="add_device_btn" data-toggle="modal" data-target="#createDeviceModal">+ 创建设备</button>');
        }
    });

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

    // $('#add_device_btn').click(function() {
    //     alert("add device");
    //     $.ajax({
    //         url: "/api/service/manufactures/",
    //         type: "GET",
    //         contentType: "application/json;charset=utf-8",
    //         data: "",
    //         dataType: "text",
    //         success: function (result) {
    //             console.log(result);
    //             var obj = JSON.parse(result);
    //             console.log(obj);
    //             $('#manufacture').options.length = 0;
    //         },
    //         error: function(msg) {
    //             alert(msg.message);
    //         }
    //     });
    // });

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

//删除功能
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
//                分配功能
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
                var groups = [];
                for(x in obj){
                    groups.push(obj[x].id);
                }
                var optionstring = "";
                for (var j = 0; j < groups.length; j++) {
                    optionstring += "<option value=\"" + groups[j] + "\" >" + groups[j] + "</option>";
                }
                $('#assGroup').append(optionstring)
            },
            error: function (msg) {
                alert(msg.message);
            }
        });
    });
    $('#assignDev').on('click',function(){
        var assName = $('#assName').val();
        var assGroup = $('#assGroup').val();
        $.ajax({
            url: "/api/group//assign/"+assName+"/"+assGroup,
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

//         $.ajax({
//             url: "/api/shadow/"+deviceId,
//             type: "GET",
//             contentType: "application/json;charset=utf-8",
// //                                                                         data: JSON.stringify({'username': deviceId}),
//             dataType: "text",
//             success: function (result) {
//
//                 var obj = JSON.parse(result);
//                                                                             // console.log(obj);
// //                                                                             console.log(obj.responce_msg.services)
//                 var services = obj.responce_msg.services;
//                 var serviceNames = [];
//                 for (x in services){
//                     var divs = document.createElement("div");
// //                                                                             divs.setAttribute('id',services[x].serviceName)
//                     $('#ctrDevice').append(divs);
//                     var label5 = document.createElement("label");
//                     label5.innerText = services[x].serviceName;
//                     divs.append(label5)
//                     serviceNames.push(services[x].serviceName);
//
//                     var input = document.createElement("input");
//                     var data = document.createElement("input");
//                     var submit = document.createElement("input");
//                     var label = document.createElement("label");
//                     submit.setAttribute('type','button');
//                     submit.value = '确定';
//                     data.setAttribute('type','number');
// //                                                                             var input = document.createElement('input');
// //                                                                             input.setAttribute('type','checkbox');
// //                                                                             div.appendChild(input);
// //                                                                             document.getElementById('ctrDevice').appendChild(image);
// //                                                                             console.log(document.getElementById('ctrDevice'))
// //
// //                                                                             console.log(services[x].serviceBody.params)
//                     for(y in services[x].serviceBody.params){
//                         var serv = services[x].serviceBody.params[y].split("=");
// //                                                                                console.log(y);
// //                                                                                console.log(serv);
//
//                         var input = document.createElement("input");
//                         var label = document.createElement("label");
//                         var image = document.createElement("img");
//                         image.setAttribute('src','../img/off.png');
//                         image.setAttribute("on",serv[1]);
//                         image.setAttribute("off",serv[2]);
//                         image.onclick = images;
//                         function images(){
//                             if(this.getAttribute('src') == '../img/off.png'){
//                                 this.setAttribute('src','../img/on.png');
//                             }else{
//                                 this.setAttribute('src','../img/off.png');
//                             }
//                         }
//                         if(serv[0] == '1'){
//
//                             input.value = serv[1];
//                             label.innerText = y;
// //                                                                                alert('label')
//                             console.log(label)
//                             divs.append(label);
//                             divs.append(input);
//                         }
//                         if(serv[0] == '2'){
//                             label.innerText = y;
//                             console.log(label)
//                             divs.append(label);
//                             divs.append(image);
//
//                         }
//                         if(serv[0] == '3'){
//                             label.innerText = y;
//                             console.log(label)
//                             divs.append(label);
//                             divs.append(data);
//                         }
//                         divs.append(submit);
//
//                     }
//                     submit.onclick = submits;
//                     function submits(){
//                         var subChildren = this.parentNode.childNodes;
//                         var diction = [];
//                         for(var i=0; i<subChildren.length-1;){
//                             if(i==0){
//                                 diction['serviceName'] = subChildren[i].innerHTML;
//
//                                 console.log('serviceName -->'+subChildren[i].innerHTML);
//                                 i++
//                             }else{
//                                 if(subChildren[i+1] instanceof HTMLInputElement){
//                                     diction[subChildren[i].innerHTML] = subChildren[i+1].value;
//                                     console.log(subChildren[i].innerHTML+"-->"+subChildren[i+1].value);
//
//                                 }else{
//                                     if(subChildren[i+1].getAttribute('src').indexOf('on')>=0){
//                                         diction[subChildren[i].innerHTML] = subChildren[i+1].getAttribute('on');
//                                     }else{
//                                         diction[subChildren[i].innerHTML] = subChildren[i+1].getAttribute('off');
//                                     }
//                                     console.log(subChildren[i].innerHTML+"-->"+subChildren[i+1].getAttribute('src'));
//                                 }
//                                 //diction(subChildren[i]) = subChildren[i+1]
//                                 // console.log(subChildren[i]+"-->"+subChildren[i+1]);
//                                 i=i+2;
//                             }
//
//                         }
//
//                         var s = '{';
//                         for(key in diction){
//                             s += '"'+key+'":"'+diction[key]+'",'
//                         }
//                         s = s.slice(0,s.length-1)
//                         s += '}'
//                         $.ajax({
//                             url: "/api/shadow/control/"+deviceId,
//                             type: "POST",
//                             contentType: "application/json;charset=utf-8",
//                             data:  s,
//                             dataType: "text",
//                             success: function (result) {
//                                 var obj = JSON.parse(result);
//                                 console.log("success");
//                                 window.location.href = "homepage";
//                             },
//                             error: function (msg) {
//                                 alert(msg.message);
//                             }
//                         });
//
//                     }
//                 }
//
//
// //                                                                             console.log(serviceNames);
// //                                                                             window.location.href = "homepage";
//             },
//             error: function (msg) {
//                 alert(msg.message);
//             }
//         });

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

});

// $(document).ready(function() {
//     // validate form 表单验证
//     console.log("start form validation");
//     $('#createDeviceForm').bootstrapValidator({
//         message: 'This value is not valid',
//         feedbackIcons: {
//             valid: 'glyphicon glyphicon-ok',
//             invalid: 'glyphicon glyphicon-remove',
//             validating: 'glyphicon glyphicon-refresh'
//         },
//         fields: {
//             deviceName: {
//                 message: 'The device name is not valid',
//                 validators: {
//                     notEmpty: {
//                         message: '设备名称不能为空',
//                     }
//                 }
//             },
//             bigType: {
//                 validators: {
//                     notEmpty: {
//                         message: '设备大类型不能为空'
//                     }
//                 }
//             },
//             manufacture: {
//                 validators: {
//                     notEmpty: {
//                         message: '必须为设备选择一个厂商'
//                     }
//                 }
//             },
//             specificType: {
//                 validators: {
//                     notEmpty: {
//                         message: '必须为设备选择具体类型'
//                     }
//                 }
//             },
//             deviceModel: {
//                 validators: {
//                     notEmpty: {
//                         message: '必须为设备选择型号'
//                     }
//                 }
//             }
//         }
//     });
// });

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
