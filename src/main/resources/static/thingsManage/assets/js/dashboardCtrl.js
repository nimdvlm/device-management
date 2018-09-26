
mainApp.controller("dashboardCtrl",["$scope","$resource","$timeout",function ($scope,$resource,$timeout) {
    $scope.db_device;
    $scope.isShowEmpty=false;


    $scope.Widgets=[{"name":"line"}]
    $scope.isChoose=false;

    //获取cookie中各种Id
    var tenantId = $.cookie("tenantId")
    var customerId = $.cookie("customerId")


    //获取所有左侧视图dashboard仪表盘
    var Dashboard = $resource('/api/dashboard/getAllDashboard', {}, {
    //解决 Expected response to contain an array but got an object 问题
        query: {method: 'GET', isArray: true}
    });
    $scope.Dashboards = Dashboard.query();
    console.log($scope.Dashboards);


    //右侧展示视图
    $scope.showDBDetail=function (item) {
        console.log("右侧试图展示；");
        console.log(item);
        //展示视图添加样式
        $scope.Dashboards.forEach(function (items) {
            if (item != items) items.style = {}
        });
        item.style = {"border": "2px solid #305680"};


        $scope.dbItem=item;//当前dashbaord

        $scope.isChoose=true;

        //获取当前dashbaord下entity
        var Entity = $resource('/api/dashboard/entity/getByDashboardId/:id', {id: '@id'});
        var entitys=Entity.query({},{id: item.id},function(resp){
            console.log(resp);
            if(resp==null||resp==""){
                $scope.isShowEmpty=true;
                $scope.entitys="";
            }else{
                $scope.isShowEmpty=false;

                //根据设备id获取设备名称
                resp.forEach(function (entity) {
                    $.ajax({
                        url:"/api/device/name/"+entity.device_id,
                        contentType: "application/json; charset=utf-8",
                        async: false,
                        type:"GET",
                        success:function(msg) {
                            entity.device_name = msg;
                        },
                        error:function (err) {
                            entity.device_name = "";
                        }
                    });
                });
                //$resource.get方法会把接受的string类型变为object

                $scope.entitys=resp;

                //ng-repeat直接getElementById获取不到
                $timeout(function () {
                    for(var i=0;i<$scope.entitys.length;i++)
                        $scope.showRealtime(i);
                },300);
            }
        })
    };


    /*    webSocket start  */
    var ws
    var KeySets=[]

    $scope.showRealtime=function (i) {
        var i=i;
        var entity=$scope.entitys[i]

        var name=entity.name
        var deviceId=entity.device_id
        var type=entity.entity_type
        var message={}

        //绘制表格
        var myChart=drawChart(deviceId,type,i)

        //获取websocket实时数据
        var url = 'ws://39.104.189.84:30080/api/v1/deviceaccess/websocket';
        listenWs(url);

        //测试用模拟数据
        //var _ts=1531101929
        //setInterval(test,1500)

        function listenWs(url) {
            if(ws instanceof WebSocket){
                ws.close();
            }

            ws = new WebSocket(url);

            ws.onopen = function (e) {
                log("Connected");
                sendMessage('{"deviceId":"' + deviceId + '"}');
            };

            ws.onclose = function (e) {
                log("Disconnected: ");
                KeySets=[]
            };
            // Listen for connection errors
            ws.onerror = function (e) {
                log("Error ");
            };
            // Listen for new messages arriving at the client
            ws.onmessage = function (e) {
                //e是返回体
                log("Message received: " + e.data);
                message = JSON.parse(e.data);
                updateChart(message,myChart)
            }
        }

        function log(s) {
            // Also log information on the javascript console
            console.log(s);
        }

        function sendMessage(msg) {
            ws.send(msg);
            log("Message sent");
        }

        function test() {
            //测试数据
            var _value=Math.ceil(Math.random()*25);
            _ts=_ts+101929

            message={data:[
                {"ts":_ts,"key":"tmp","value":_value}
            ]}

            //更新数据
            updateChart(message,myChart)
        }
    }

    //更新数据
    function updateChart(message,myChart){
        console.log("更新ing...")
        var tempDate,tempKey,tempValue
        var message=message
        var chart=myChart

        //整理数据
        for(var i in message.data) {
            console.log(message.data[i].ts);
            console.log(message.data[i].key);
            console.log(message.data[i].value);
            tempDate = formatDate(new Date(message.data[i].ts));
            tempKey = message.data[i].key;
            tempValue = message.data[i].value;

                if($.inArray(tempKey,KeySets)>=0&&KeySets.length!==0){
                    var y=KeySets.indexOf(tempKey)
                    chart.data.datasets[y].data.push(tempValue)
                    //此处为待解决问题。二者时间戳不一致
                    if(y==0)
                    chart.data.labels.push(tempDate)
                }else{
                    KeySets.push(tempKey)
                    chart=newLine(chart)
                    var x=KeySets.indexOf(tempKey)
                    chart.data.datasets[x].label=tempKey
                    chart.data.datasets[x].data.push(tempValue)

                }


            //为了美观，超过20个则删除
            if(chart.data.datasets[0].data.length>13){
                chart.data.labels.shift()
                chart.data.datasets.forEach(function(dataset) {
                    dataset.data.shift();
             });
            }
            chart.update();
        }

    }

    //添加新曲线
    function newLine(myChart) {
        var ranR=220-Math.ceil(Math.random()*3)*50
        var ranG=220-Math.ceil(Math.random()*3)*50
        var ranB=220-Math.ceil(Math.random()*3)*50
        var mychart=myChart

        var newLine={
            label:"",
            backgroundColor: "rgba(255,255,255,0.1)", //背景填充色
            borderColor: "rgba("+ranR+","+ranG+","+ranB+",1)", //路径颜色
            pointBackgroundColor: "rgba("+ranR+","+ranG+","+ranB+",1)", //数据点颜色
            pointBorderColor: "#fff", //数据点边框颜色
            pointHoverBackgroundColor:"55bae7",
            //下面的四个属性是chart_1_x版本中的，update不支持
            // fillColor: "rgba(220,220,220,0.5)",
            // strokeColor: "rgba(220,220,220,1)",
            // pointColor: "rgba(220,220,220,1)",
            // pointStrokeColor: "#fff",
            data: [] //对象数据
        }
        mychart.data.datasets.push(newLine)
        return mychart
    }

    //绘制图表
    function drawChart(deviceId,type,i) {
        var num=i

        //折线图
        var ctx = document.getElementById("entityChart_"+num).getContext("2d");
        var myChart = new Chart(ctx,{
            type:type,
            data:{
                //折线图需要为每个数据点设置一标签。这是显示在X轴上。
                labels: [],
                //数据集（y轴数据范围随数据集合中的data中的最大或最小数据而动态改变的）
                datasets: []
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                title: {
                    display: false
                },
                legend: {
                    position:'bottom'
                }

            }

        });
        return myChart
    }

    //时间格式化
    function formatDate(now) {
        //var year=now.getFullYear();
        //var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        if(second<10){
            second="0"+second
        }
        if(minute<10){
            minute="0"+minute
        }
        if(hour<10){
            hour="0"+hour
        }
        //return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        return hour+":"+minute+":"+second;
    }
    /*    webSocket end   */

    //创建dashboard仪表盘
    $scope.addDashboard=function () {
        var name=document.getElementById('add_db_name').value
        var addDB = $resource('/api/dashboard/insert');
        addDB.save({}, {"name": name,"tenant_id":tenantId,"customer_id":customerId})
            .$promise.then(function (resp) {
            console.log("创建成功");
            if(resp.id!=""){
                location.reload();
            }else{
                toastr.warning("不允许创建同名设备！");
            }
        })
    }


    //获取所有设备名
    $scope.getAllDevice=function () {
        var Device = $resource("/api/device/alldevices?limit=1000");
        $scope.Devices = Device.query(function () {
            $scope.DeviceName = getDevicesName($scope.Devices);
        });

        function getDevicesName(arr) {
            var _DeviceName = [];
            arr.forEach(function (item) {
                _DeviceName.push({name: item.name, id: item.id});//name和id的对象数组
            })
            return _DeviceName
        }
    }


    //创建entity
    $scope.addEntity=function () {
        var formData={}

        formData.name=$scope.add_entity_name
        formData.device_id=$scope.add_entity_device.id
        formData.entity_type=$scope.add_entity_type.name
        formData.dashboard_id=$scope.dbItem.id

        //@TODO 从子组建获取position
        formData.position="100px"//后端接口调整，临时赋值为常值

        console.log(formData)
        var addEntity = $resource('/api/dashboard/entity/insert');
        addEntity.save({}, formData)
            .$promise.then(function (resp) {
            console.log("创建成功")
            if(resp.id!=""){
                location.reload();
            }else{
                toastr.warning("666！");
            }
        })

    }

    //删除dashboard
    $scope.delDashboard=function () {
        var delDB = $resource('/api/dashboard/delete/:id', {id: '@id'});
        delDB.delete({}, {id: $scope.dbItem.id}, function (resp) {
            console.log("删除成功:id=" + $scope.dbItem.id);
            $("#delDashboard").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("1234再来一次");
            alert("删除失败，请重试！")
        });
    }

    //获取当前entityId
    $scope.getEntityId=function (entity) {
        $scope.entity_id=entity.id
    };

    //点击可拖动组件
    $scope.saveEntity = function (entity,i) {
        var num=i
        console.log("entity");
        console.log(entity);
        console.log("entity选择的位置为：");
        console.log($scope.left);
        console.log($scope.top)
    };
    //删除entity
    $scope.delEntity=function (entity) {
        console.log("删除实例："+entity.id);
        var result = confirm("确定删除？");
        if(result){
            var delDB = $resource('/api/dashboard/entity/delete/:id', {id: '@id'});
            delDB.delete({}, {id: entity.id}, function (resp) {
                console.log("删除成功:id=" + entity.id);
                $("#delDashboard").modal("hide");
                location.reload();
            }, function (resp) {
                console.log("1234再来一次");
                alert("删除失败，请重试！")
            });
        }
    };

    //清除表格
    $scope.cleanForm=function () {
        $(':input').each(function () {
            var type = this.type;
            var tag = this.tagName.toLowerCase(); // normalize case
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = "";
        });
    }

    //鼠标移入移出动画效果
    $scope.fadeSiblings = function () {
        $(".chooseBtn").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };
    $scope.reSiblings = function () {
        $(".chooseBtn").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
    };

    /*$scope.weiYi_mouseDown = function (index,ev) {
        console.log(index);
        console.log(ev);
        var disX = ev.clientX - $(index).offset().left;
        console.log(disX);
        var disY = ev.clientY - $(index).offset().top;
        console.log(disY);
    }*/

}]);
mainApp.directive("weiYi",function(){
    return{
        restrict :'A',//A属性,E标签,C类名,D注释
        scope:{
            left:'=',
            top:'='
        },
        /*template:'<div style="height: 20px;width: 100px;background: red">'+
        '<input type="text" ng-model="left" maxlength="2">'+
        '<input type="text" ng-model="top" maxlength="2">'+
        '</div>',*/
        link :function(scope,element,attr){//scope可以接收到的数据//element 当前的元素//attr属性
            //拖拽的三大事件mousedown,mousemove,mouseup.使用jq绑定事件的方法进行绑定
            element.on("mousedown",function(ev){
                /*var brothersinfo=[];//在鼠标起始时获得所有兄弟节点的位置信息
                //获取兄弟节点的top,left,width(400),height(300)
                var childs=ev.target.parentNode.children;
                var brothers=[];
                for(var i=0;i<childs.length;i++){
                    if(childs[i]!==ev.target)
                        brothers.push(childs[i])
                }
                console.log(brothers);
                brothersinfo=[];
                brothers.forEach(function(item){
                    brothersinfo.push({'left':parseInt(item.style.left),'top':parseInt(item.style.top),'id':item.id})
                });
                console.log(brothersinfo);*/
                //通过event获取到当前对象
                var This = $(this);
                //获取到鼠标离当前元素上边框的距离
                var disX = ev.clientX - $(this).offset().left;
                console.log(disX);
                //获取到元素距离左边框的距离    //因为在拖拽的过程中不变的是鼠标距离元素边框的距离 通过不变和已知求变量
                var disY = ev.clientY - $(this).offset().top;
                console.log(disY);
                /*console.log(attr.data);
                if(attr.data){
                    $div=$("<div>");
                    console.log($div);
                    $div.css({"width":"100px","height":"100px","border": "2px dotted green","position":"absolute","left":that.offset().left,"top":that.offset().top});
                    $div.appendTo($("body"));
                }
                var x=e.clientX-$(this).offset().left;
                var y=e.clientY-$(this).offset().top;
                console.log(x+":"+y);*/
                $(document).on("mousemove",function(ev){
                    //将所改变的值通过样式设置给当前元素
                    This.css({
                        left:ev.clientX - disX,
                        top:ev.clientY - disY
                    });
                    scope.left = ev.clientX - disX;
                    scope.top = ev.clientY - disY;

                    /*if(attr.data){
                        $div.css({"left":e.clientX-x,"top":e.clientY-y});
                    }else{
                        that.css({"left":e.clientX-x,"top":e.clientY-y});
                    }*/
                });
                $(document).on("mouseup",function(ev){
                    //鼠标松开时关闭所有事件
                    $(document).off();
                    console.log("最终坐标位置");
                    console.log(scope.left);
                    console.log(scope.top);

                })
            })
        }
    }
});
