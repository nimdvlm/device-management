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
$('#devices_table').DataTable({
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
                           return '<a class="btn-sm btn-danger del" data-toggle="modal" data-target="#delModal" id="'+row.deviceId+'">'+'删除'+'</a>'+'<a class="btn-sm btn-success ctrl" data-toggle="modal" data-target="#conModal" name="'+row.deviceId+'">'+'控制'+'</a>';
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
               function del(){
               console.log("del")};
                           $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm addDevice" data-toggle="modal" data-target="#myModal">+ 创建设备</button>');
                       $(".addDevice").click(function(){
                                          console.log("add")
                                       });
                       }
});
                $("#add").click(function(){
                    console.log("suss")
                    });
                $('#devices_table').on('click','tr .del', function () {
                console.log($(this).attr('id'))
                $('#confirmDel').val($(this).attr('id'))
                } );
                $('#confirmDelete').on('click',function(){
                var deviceId = $('#confirmDel').val();
                console.log(deviceId)
                    $.ajax({
                                         url: "/api/user/login",
                                         type: "GET",
                                         contentType: "application/json;charset=utf-8",
                                         data: JSON.stringify({'username': deviceId}),
                                         dataType: "text",
                                         success: function (result) {
                                             var obj = JSON.parse(result);
                                             console.log("success");
                                             window.location.href = "homepage";
                                         },
                                         error: function (msg) {
                                             alert(msg.message);
                                         }
                                     });
                })
                //控制功能
                $('#devices_table').on('click','tr .ctrl', function () {
                                var deviceId = $(this).attr('name');
                                console.log(deviceId)
                                $.ajax({
                                                                         url: "/api/shadow/"+deviceId,
                                                                         type: "GET",
                                                                         contentType: "application/json;charset=utf-8",
//                                                                         data: JSON.stringify({'username': deviceId}),
                                                                         dataType: "text",
                                                                         success: function (result) {
                                                                             var obj = JSON.parse(result);
                                                                             console.log("success");
                                                                             console.log(obj)
//                                                                             window.location.href = "homepage";
                                                                         },
                                                                         error: function (msg) {
                                                                             alert(msg.message);
                                                                         }
                                                                     });
                                } );
})