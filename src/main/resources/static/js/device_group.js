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
$('#device_group_table').DataTable({
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
            url: "../../api/noauth/allDevices",
            dataSrc: ""
        },
        //默认最后一列（最后更新时间）降序排列
        order: [[ 2, "desc" ]],
        columnDefs: [
            {
                targets: 4,
                data: "updated_at",
                title: "操作",
                render: function (data, type, row, meta) {
                    return '<a class="btn-sm btn-danger" data-toggle="modal" data-target="#delModal">'+'删除'+'</a>';
                }
            },
{
                targets: 3,
                data: null,
                title: "创建时间",
                render: function (data, type, row, meta) {
                    return row.status;
                }
            },
{
                targets: 2,
                data: null,
                title: "描述",
                render: function (data, type, row, meta) {
                    return row.createdTime;
                }
            },
{
                targets: 1,
                data: null,
                title: "包含设备数",
                render: function (data, type, row, meta) {
                    return row.additionalInfo;
                }
            },
            {
                targets: 0,
                data: null,
                title: "设备路径",
                render: function (data, type, row, meta) {
                    return row.type;
                }
            }
        ],
        initComplete:function(){
                    $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#mm">+ 创建设备</button>');
                }
});
})