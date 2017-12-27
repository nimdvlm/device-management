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
$('#dataTables-example').DataTable({
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
  "sLast": "末页"
   }
   } ,//多语言配置
ajax: {
            url: "/api/service/serviceTables",
            dataSrc: ""
        },
        //默认最后一列（最后更新时间）降序排列
        order: [[ 2, "desc" ]],
        columnDefs: [
            {
                targets: 3,
                data: "updated_at",
                title: "操作",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-success del" style="cursor:pointer" data-toggle="modal" data-target="#creModal" id="'+row.id+'">'+'+创建服务'+'</a>';
                }
            },

{
                targets: 2,
                data: null,
                title: "设备型号",
                render: function (data, type, row, meta) {
                var model = row.coordinate.split('%')[2];
                    return model;
                }
            },
{
                targets: 1,
                data: null,
                title: "设备类型",
                render: function (data, type, row, meta) {
                var deviceType = row.coordinate.split('%')[1];
                    return deviceType;
                }
            },
            {
                targets: 0,
                data: null,
                title: "厂商",
                render: function (data, type, row, meta) {
                manufacture = row.coordinate.split('%')[0];
                    return '<a class="show" id="'+row.id+'">'+manufacture+'</a>';
                }
            }
        ],
        initComplete:function(){
                    $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" id="'+manufacture+'" data-toggle="modal" data-target="#mm">+ 创建服务组</button>');
                }
});
//展示设备组
$('#dataTables-example').on('click','tr .show', function () {
var groupId = $(this).attr('id');
console.log(groupId);
if ( $.fn.dataTable.isDataTable( '#dataTables-show' ) ){
//table.destroy();
$('#dataTables-show').DataTable().destroy();
console.log('aa')
}
table = $('#dataTables-show').DataTable({
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
  "sLast": "末页"
   }
   } ,//多语言配置
ajax: {
            url: "/api/group/"+groupId+"/devices",
            dataSrc: ""
        },
        //默认最后一列（最后更新时间）降序排列
        order: [[ 2, "desc" ]],
        columnDefs: [
            {
                targets: 3,
                data: "updated_at",
                title: "操作",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-danger delDev" data-toggle="modal" data-target="#delDevModal" id="'+row.deviceId+'">'+'删除'+'</a>';
                }
            },

{
                targets: 2,
                data: null,
                title: "创建时间",
                render: function (data, type, row, meta) {
                    return row.createdTime;
                }
            },
{
                targets: 1,
                data: null,
                title: "设备组名",
                render: function (data, type, row, meta) {
                    return row.name;
                }
            },
            {
                targets: 0,
                data: null,
                title: "设备组ID",
                render: function (data, type, row, meta) {
                    return row.deviceId;
                }
            }
        ],
         initComplete:function(){
                            $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm create" id="'+manufacture+'" data-toggle="modal" data-target="#mm">+ 创建服务组</button>');
                        }
});
});
//创建服务
$('#addParams').on('click',function(){
var input = document.createElement("input");
var p = document.createElement("p");
$('#param').append(p);
$('#param').append(input);
});
$('#dataTables-example').on('click','tr .create', function () {
console.log(7878)
var manufacture = $(this).attr('id');
console.log(manufacture);
 $('#manufactureCre').val(manufacture);
});
//删除设备组里的设备
$('#dataTables-show').on('click','tr .delDev', function () {
var deviceId = $(this).attr('id');
$('#devDel').val($(this).attr('id'));
console.log(deviceId)
});
$('#devDelete').on('click',function(){
                var devDelId = $('#devDel').val();
 $.ajax({
                                             url: "/api/group/unassign/"+devDelId,
                                             type: "GET",
                                             contentType: "application/json;charset=utf-8",
                                             data: "",
                                             dataType: "text",
                                             success: function (result) {
                                                 var obj = JSON.parse(result);
                                                 console.log("success");
                                                 $('#delDevModal').modal('hide')
$('#lastDev').on('click',function(){
window.location.href = "device_group";
});
//                                                 window.location.href = "device_group";
                                             },
                                             error: function (msg) {
                                                 alert(msg.message);
                                             }
                                         });
});

//创建设备组
$('#create').on('click',function(){
    var manufacture = $('#manufacture').val();
     var deviceType = $('#deviceType').val();
      var model = $('#model').val();
     $.ajax({
                                             url: "/api/service/saveGroup/",
                                             type: "POST",
                                             contentType: "application/json;charset=utf-8",
                                             data: JSON.stringify({'manufacture': manufacture,'deviceType':deviceType,'model':model}),
                                             dataType: "text",
                                             success: function (result) {
//                                                 var obj = JSON.parse(result);
                                                 console.log("success");
                                                 $('#mm').modal('hide')
$('#lastCreate').on('click',function(){
window.location.href = "services";
});
//                                                 window.location.href = "device_group";
                                             },
                                             error: function (msg) {
                                                 alert(msg.message);
                                             }
                                         });
})
//删除设备组
$('#dataTables-example').on('click','tr .del', function () {
                console.log($(this).attr('id'))
                $('#confirmDel').val($(this).attr('id'))
                } );
                $('#confirmDelete').on('click',function(){
                var deviceGroupId = $('#confirmDel').val();
                console.log(deviceGroupId)
                    $.ajax({
                                         url: "/api/group/delete/"+deviceGroupId,
                                         type: "GET",
                                         contentType: "application/json;charset=utf-8",
                                         data: "",
                                         dataType: "text",
                                         success: function (result) {
                                             var obj = JSON.parse(result);
                                             console.log("success");
                                             $('#delModal').modal('hide');
//                                          setTimeout('window.location.href = "device_group"',2000)
$('#last').on('click',function(){
window.location.href = "device_group";
});
                                         },
                                         error: function (msg) {
                                             alert(msg.message);
                                         }
                                     });
                })
})