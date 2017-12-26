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
                           return '<a class="btn-sm btn-danger del" data-toggle="modal" data-target="#delModal" id="'+row.deviceId+'">'+'删除'+'</a>'+'<a class="btn-sm btn-success ctrl" data-toggle="modal" data-target="#conModal" id="'+row.name+'" name="'+row.deviceId+'">'+'控制'+'</a>';
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
                           return "<span class='row-details row-details-close' data_id='" + row.deviceId + "'></span>&nbsp;"+row.name;
                       }
                   }
               ],
               initComplete:function(){
                     $("#toolbar").append('<button style="margin-left:20px;" class="btn btn-primary btn-sm addDevice" data-toggle="modal" data-target="#myModal">+ 创建设备</button>');
               $("#create").click(function(){
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
                                        var obj = JSON.parse(result);
                                        console.log("success");
                                        window.location.href = "homepage";
                                    },
                                    error: function (msg) {
                                        alert(msg.message);
                                    }
                                });
               });
               }

});
$('.table').on('click', ' tbody td .row-details',
               function() {
                   var nTr = $(this).parents('tr')[0];
                   if (oTable.fnIsOpen(nTr)) //判断是否已打开
                   {
                       /* This row is already open - close it */
                       $(this).addClass("row-details-close").removeClass("row-details-open");
                       oTable.fnClose(nTr);
                   } else {
                       /* Open this row */
                       $(this).addClass("row-details-open").removeClass("row-details-close");
                       //  alert($(this).attr("data_id"));
                       //oTable.fnOpen( nTr,
                       // 调用方法显示详细信息 data_id为自定义属性 存放配置ID
                       fnFormatDetails(nTr, $(this).attr("data_id"));
                   }
               });


   function fnFormatDetails(nTr, pdataId) {
       //根据配置Id 异步查询数据
       $.get("../resources/user_share/row_details/language.txt",
               function(json) {
                   var array = json.data;
                   for (var i = 0; i < array.length; i++) {
                       if (pdataId == array[i].language) {
                           var sOut = '<center> <p style="width:70%">' + array[i].desc + '<a target="_blank" href="' + array[i].url + '">更多</a></p></center>';
                           oTable.fnOpen(nTr, sOut, 'details');
                       }
                   }
               });}

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
                                             var obj = JSON.parse(result);
                                             console.log("success");
                                             $('#delModal').modal('hide')
                                             window.location.href = "homepage";
                                         },
                                         error: function (msg) {
                                             alert(msg.message);
                                         }
                                     });
                })
                //控制功能
                $('#devices_table').on('click','tr .ctrl', function () {
                $("#ctrDevice").empty();
                                var deviceId = $(this).attr('name');
                                var ctrName = $(this).attr('id');
                                $('#ctrName').val(ctrName)
                                $.ajax({
                                                                         url: "/api/shadow/"+deviceId,
                                                                         type: "GET",
                                                                         contentType: "application/json;charset=utf-8",
//                                                                         data: JSON.stringify({'username': deviceId}),
                                                                         dataType: "text",
                                                                         success: function (result) {

                                                                             var obj = JSON.parse(result);
//                                                                             console.log(obj);
//                                                                             console.log(obj.responce_msg.services)
                                                                             var services = obj.responce_msg.services;
                                                                             var serviceNames = [];
                                                                             for (x in services){
                                                                             var divs = document.createElement("div");
//                                                                             divs.setAttribute('id',services[x].serviceName)
                                                                             $('#ctrDevice').append(divs);
                                                                             var label5 = document.createElement("label");
                                                                             label5.innerText = services[x].serviceName;
                                                                             divs.append(label5)
                                                                             serviceNames.push(services[x].serviceName);

                                                                             var input = document.createElement("input");
                                                                             var data = document.createElement("input");
                                                                             var submit = document.createElement("input");
                                                                             var label = document.createElement("label");
                                                                             submit.setAttribute('type','button');
                                                                             submit.value = '确定';
                                                                             data.setAttribute('type','number');
//                                                                             var input = document.createElement('input');
//                                                                             input.setAttribute('type','checkbox');
//                                                                             div.appendChild(input);
//                                                                             document.getElementById('ctrDevice').appendChild(image);
//                                                                             console.log(document.getElementById('ctrDevice'))
//
//                                                                             console.log(services[x].serviceBody.params)
                                                                                for(y in services[x].serviceBody.params){
                                                                                var serv = services[x].serviceBody.params[y].split("=");
//                                                                                console.log(y);
//                                                                                console.log(serv);

                                                                                var input = document.createElement("input");
                                                                                var label = document.createElement("label");
                                                                                var image = document.createElement("img");
                                                                                image.setAttribute('src','../img/off.png');
                                                                                image.setAttribute("on",serv[1]);
                                                                                image.setAttribute("off",serv[2]);
                                                                                image.onclick = images;
                                                                                function images(){
                                                                                if(this.getAttribute('src') == '../img/off.png'){
                                                                                this.setAttribute('src','../img/on.png');
                                                                                }else{
                                                                                this.setAttribute('src','../img/off.png');
                                                                                }
                                                                                }
                                                                                if(serv[0] == '1'){

                                                                                input.value = serv[1];
                                                                                label.innerText = y;
//                                                                                alert('label')
                                                                                console.log(label)
                                                                                divs.append(label);
                                                                                divs.append(input);
                                                                                }
                                                                                if(serv[0] == '2'){
                                                                                label.innerText = y;
                                                                                console.log(label)
                                                                                divs.append(label);
                                                                                divs.append(image);

                                                                                }
                                                                                if(serv[0] == '3'){
                                                                                label.innerText = y;
                                                                                console.log(label)
                                                                                divs.append(label);
                                                                               divs.append(data);
                                                                                }
                                                                                divs.append(submit);

                                                                                }
                                                                                submit.onclick = submits;
                                                                                function submits(){
                                                                                var subChildren = this.parentNode.childNodes;
                                                                                var diction = [];
                                                                                for(var i=0; i<subChildren.length-1;){
                                                                                    if(i==0){
                                                                                    diction['serviceName'] = subChildren[i].innerHTML;

                                                                                   console.log('serviceName -->'+subChildren[i].innerHTML);
                                                                                    i++
                                                                                    }else{
                                                                                        if(subChildren[i+1] instanceof HTMLInputElement){
                                                                                         diction[subChildren[i].innerHTML] = subChildren[i+1].value;
                                                                                         console.log(subChildren[i].innerHTML+"-->"+subChildren[i+1].value);

                                                                                        }else{
                                                                                            if(subChildren[i+1].getAttribute('src').indexOf('on')>=0){
                                                                                                diction[subChildren[i].innerHTML] = subChildren[i+1].getAttribute('on');
                                                                                            }else{
                                                                                                diction[subChildren[i].innerHTML] = subChildren[i+1].getAttribute('off');
                                                                                            }
                                                                                            console.log(subChildren[i].innerHTML+"-->"+subChildren[i+1].getAttribute('src'));
                                                                                           }
                                                                                     //diction(subChildren[i]) = subChildren[i+1]
                                                                                     // console.log(subChildren[i]+"-->"+subChildren[i+1]);
                                                                                     i=i+2;
                                                                                    }

                                                                                }

                              var s = '{';
                            for(key in diction){
                             s += '"'+key+'":"'+diction[key]+'",'
                            }
                           s = s.slice(0,s.length-1)
                            s += '}'
                            $.ajax({
                                url: "/api/shadow/control/"+deviceId,
                                type: "POST",
                                contentType: "application/json;charset=utf-8",
                                data:  s,
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

                                                                                }
                                                                                }


//                                                                             console.log(serviceNames);
//                                                                             window.location.href = "homepage";
                                                                         },
                                                                         error: function (msg) {
                                                                             alert(msg.message);
                                                                         }
                                                                     });
                                } );

})