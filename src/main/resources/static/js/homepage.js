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
                                                                                        diction[subChildren[i].innerHTML] = subChildren[i+1].getAttribute('src');
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