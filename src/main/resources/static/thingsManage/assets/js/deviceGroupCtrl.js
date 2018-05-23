mainApp.controller("DevGroupCtrl", function ($scope, $resource) {
    //获取设备组
    $scope.showAll = true;
    $scope.showEmpty = false;

    var Devicegroup = $resource('/api/group/allgroups?limit=20');
    $scope.DeviceGroups = Devicegroup.query(function () {
        //初始化右侧视图
        $scope.item = $scope.DeviceGroups[0];
        console.log($scope.item);
        //初始化设备组的设备视图
        var DGDEVICES = $resource('/api/group/:id/devices?limit=20', {id: '@id'});
        DGDEVICES.query({id: $scope.item.id})
            .$promise.then(function (person) {
            $scope.myData = person;
            console.log("$scope.myData");
            console.log($scope.myData);
        });
    });


    //添加设备组
    $scope.addDG = function () {
        if ($scope.addDGName != "" && $scope.addDGName != null) {
            var addDG = $resource('/api/group/create');
            addDG.save({}, {"name": $scope.addDGName})
                .$promise.then(function (resp) {
                console.log("新建设备组成功");
                console.log(resp);
                $("#addRule").modal("hide");
                location.reload();
            });
        } else {
            alert("输入不能为空!");
        }
    }

    //按照关键词查找设备组，返回一个数组
    $scope.searchDG = function () {
        if ($scope.dgname != "" && $scope.dgname != null) {
            var searchDG = $resource('/api/group/allgroups?limit=20&textSearch=:name', {name: '@name'});
            searchDG.query({name: $scope.dgname})
                .$promise.then(function (person) {
                console.log($scope.dgname);
                if (person == false) {
                    //如无此结果返回[]
                    $scope.showInfo = false;
                    alert("无设备组[" + $scope.dgname + "]信息，请输入正确设备组名!");
                    location.reload();
                } else {
                    $scope.showInfo = true;
                    $scope.showAll = false;
                    $scope.Searchresults = person;
                }
            });
        }
        else {
            alert("输入不能为空!");
        }
    };

    //删除设备组
    $scope.delDG = function () {
        var delDG = $resource('/api/group/delete/:id', {id: '@id'});
        delDG.delete({}, {id: $scope.item.id}, function (resp) {
            console.log("删除成功:id=" + $scope.item.id + ";name=" + $scope.item.name);
            $("#delDG").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("1234再来一次");
            alert("删除失败，请重试！")
        });
    }


    //编辑设备组名
    /****暂无此接口
     $scope.editDGName=function(){
        if ($scope.editdg != "" && $scope.editdg != null){
            var editDG = $resource('http://localhost:8082/person/:id', {id: '@id'});
            editDG.save({id: $scope.item.id},$scope.editdg)
                .$promise.then(function (resp) {
                console.log("信息修改成功:id=" + $scope.item.id + ";name=" + $scope.item.name);
                $("#editDGName").modal("hide");
                location.reload();
            });
        }else{
            alert("输入不能为空!");
        }
    }
     *****/


    //右侧视图展示设备组详情
    $scope.show = function (DG) {
        //item是当前展示的单个设备
        $scope.item = {name: DG.name, id: DG.id};
        //获取设备组下的设备
        var DGDEVICES = $resource('/api/group/:id/devices?limit=20', {id: '@id'});
        DGDEVICES.query({id: $scope.item.id})
            .$promise.then(function (person) {
            if (person[0] != null) {
                $scope.myData = person;
                $scope.showEmpty = false;
            } else {
                $scope.showEmpty = true;
                console.log("当前设备组下无设备");
            }

        });
    };


    /*****************显示设备组内设备**********************/
        //点击按钮查看令牌
    var tokenObj = $resource('/api/device/token/:deviceId', {id: '@id'});
    $scope.showToken = function (data) {
        console.log("向后台获取设备Token中...")
        $scope.tokenJson = tokenObj.get({deviceId: data.id})
            .$promise.then(function (value) {
                $scope.token = value.deviceToken;
                console.log($scope.token);
            });
    };
    /****END***/


    /****************设备组取消关联某设备*********************/
    $scope.giveData = function (data) {
        console.log("ng-repeat中的data赋值给作用域");
        $scope.devInGroup = data;
    }//此方法用于将ng-repeat里的data赋值给作用域。非上策

    $scope.unAssign = function (data) {
        console.log("正在向后台发送请求...");
        var DISASS = $resource('/api/group/unassign/:deviceId/:groupId', {deviceId: '@id', groupId: '@id'});
        DISASS.delete({deviceId: $scope.devInGroup.id, groupId: $scope.item.id})
            .$promise.then(function (person) {
            $("#warnDelAssign").modal("hide");
            location.reload();
        });
    };
    /****END*****/

    /************查看详情-copy自deviceList.js***********/
    /*显示详情*/
    var num;//页数
    var size;//每页显示的数据个数，如果不设置，则最后一页少于pageSize后,再往前翻就只显示最后一页的数据个数
    $scope.showDetail = function (data) {
        var attrDetailObj = $resource("/api/data/getKeyAttribute/:deviceId");
        var attrDetailInfo = attrDetailObj.query({deviceId:data.id},function (resp) {
            num = Math.ceil(attrDetailInfo.length / 5);
            size = 5;
            initUI(1,5);
        });
        console.log(attrDetailInfo);//获取的所有数据，格式为[{},{}]

        /*==========显示属性==========*/
        //分页功能实现
        function initUI(pageNo, pageSize) {
            console.log(pageNo);
            console.log(pageSize);
            //pageNo 当前页号
            //pageSize 页面展示数据个数
            var html = '';
            for(var i = (pageNo-1)*pageSize; i < pageNo*pageSize; i++) {
                var item = attrDetailInfo[i];
                console.log(attrDetailInfo[i]);
                var latestTs = formatDate(new Date(attrDetailInfo[i].lastUpdateTs));
                html += '<tr>'+'<td class="list-item">'+latestTs+'</td>'+'<td class="list-item">'+item.key+'</td>'+'<td class="list-item">'+item.value+'</td>'+'</tr>';
            }
            document.getElementsByClassName('data-list')[0].innerHTML = html;
            pagination({
                cur: pageNo,
                total: num,//总共多少页
                len: 5,//显示出来的点击按钮个数
                targetId: 'pagination',
                callback: function() {
                    var me = this;
                    var oPages = document.getElementsByClassName('page-index');
                    for(var i = 0; i < oPages.length; i++) {
                        oPages[i].onclick=function() {
                            if(this.getAttribute('data-index')*pageSize>attrDetailInfo.length){
                                initUI(this.getAttribute('data-index'),pageSize-this.getAttribute('data-index')*pageSize+attrDetailInfo.length);
                            }else{
                                initUI(this.getAttribute('data-index'), size);
                            }
                        }
                    }
                    var goPage = document.getElementById('go-search');
                    goPage.onclick = function() {
                        var index = document.getElementById('yeshu').value;
                        if(!index || (+index > me.total) || (+index < 1)) {
                            return;
                        }
                        initUI(index, size);
                    }
                }
            });
        };
        //每次显示数据数量发生变化都重新分页
        $scope.showNum = function () {
            $(".pagination li,#attrDisplay tr").remove();
            var limit = $("#attrSelectInfo option:selected").text();
            num = Math.ceil(attrDetailInfo.length / limit);
            size = limit;
            initUI(1,limit);
        };
        /*===================================================================*/


        /*调用函数，显示遥测数据*/
        $('#realtime_data_table tr td').remove();//在显示遥测数据之前清空遥测数据表
        realtimeDevice(data.id);//建立websocket连接
        $("#modalCloseDetail,#modalConfirmDetail,#modalCloseTagDetail").click(function () {
            ws.close();
        });

        /*控制面板*/
        var abilityDesArr = new Array();//用于记录所有aibilityDes转换成json后的数据[{},{},...]
        var serviceName = new Array();//用于记录所有的serviceName
        var methodName = new Array();//用于记录所有的methodName
        $('#control_panel').empty();//每次将控制面板清空再渲染
        var controlObject = $resource("/api/v1/ability/:manufacturerName/:deviceTypeName/:modelName");
        $scope.controlInfo = controlObject.query({manufacturerName:data.manufacture,deviceTypeName:data.deviceType,modelName:data.model});
        $scope.controlInfo.$promise.then(function (value) {



            console.log(value);

            for(var i = 0;i<value.length;i++){
                var abilityDesJson = JSON.parse(value[i].abilityDes);//将所有abilityDes（string）转成JSON
                abilityDesArr.push(abilityDesJson);//把abilityDesJson存进数组
                serviceName.push(abilityDesJson.serviceName);//用于记录所有的服务名（有多少个小控制面板）
                methodName.push(abilityDesJson.serviceBody.methodName);//用于记录所有的方法名，用于传回数据
                //注意：小控制面板、serviceName、methodName以及各控制按钮的id编号都是一一对应的（用i循环即可），这样方便取值


                //每个小控制面板的id为ctrlDiv{{i}}
                $('#control_panel').append('<div class="col-xs-10 col-sm-6 col-md-4 service-panel"><form><fieldset id="ctrlDiv' + i + '"><legend class="service-control-legend">' + serviceName[i] + '</legend></fieldset></form></div>');
                console.log("serviceName:"+serviceName[i]);
                var params = abilityDesJson.serviceBody.params;//用于记录每一个小控制面板下有多少个控制选项,随i的取值变化而变化
                console.log("params"+params);
                console.log("params.length"+params.length);
                for(var j = 0;j < params.length;j++){
                    console.log(params[j]);
                    console.log(params[j].value);

                    var type = params[j].type;//控制类型
                    var key = params[j].key;//控制名称
                    var valueInfo = params[j].value;//控制默认值或范围


                    //每个小控制面板下的控制按钮id为parma
                    if(type == 1){
                        $('#ctrlDiv' + i).append('<div class="form-group"><label class="col-sm-3 control-label" style="text-align: left;">' + key + '</label><div class="col-sm-9"><input type="text" class="form-control" id="param'+ i + j +'"  value="' + valueInfo +'"/></div></div>');
                    }
                    else if(type == 2){
                        /*函数：split()
                         功能：使用一个指定的分隔符把一个字符串分割存储到数组*/
                        /* var temp = params[j].value.split(" ");
                         var leftStatus = temp[0];
                         var rightStatus = temp[1];
                         var curStatus = rightStatus;
                         console.log("0:"+temp[0]);
                         console.log("1:"+temp[1]);*/
                        /*var leftStatus = true;
                         var rightStatus = false;*/
                        $('#ctrlDiv' + i).append('<div class="form-group"><label class="col-sm-3 control-label" style="text-align: left;">' + key +  '</label><div class="col-sm-9"><image src="static/thingsManage/assets/img/off.png" id="param'+i+j+ '" style="cursor: pointer; width: 80px; height: 30px; margin: 0 10px;"></image></div></div>');
                        /* var img = document.getElementById("param"+i+j);
                         img.setAttribute('on', true);
                         img.setAttribute('off', false);*/
                        $("#param"+i+j).click(function () {
                            if($(this).attr("src") == "static/thingsManage/assets/img/off.png"){
                                console.log("off->on");
                                $(this).removeClass();
                                $(this).addClass("true");
                                $(this).attr("src","static/thingsManage/assets/img/on.png");

                            }else{
                                console.log("on->off");
                                $(this).removeClass();
                                $(this).addClass("false");
                                $(this).attr("src","static/thingsManage/assets/img/off.png");
                            }

                        });
                    }
                    else if(type == 3){

                        /*var temp = params[j].value.split(" ");
                         var lowerBound = temp[0];
                         var upperBound = temp[1];*/
                        var lowerBound = 10;
                        var upperBound = 20;
                        console.log(lowerBound);
                        console.log(upperBound);
                        //html5标签 <input type="number" min="" max="" step="" value=""/>
                        $('#ctrlDiv' + i).append('<div class="form-group"><label class="col-sm-3 control-label" style="text-align: left;">' + key + '</label><div class="col-sm-9"><input type="number" class="form-control" id="param'+ i + j +'" name="rangeInput" min="' + lowerBound + '" max="' + upperBound + '" value="' + lowerBound +'" step="1"/><span>(' + lowerBound + '-' + upperBound + ')</span></div></div>');
                        console.log("number:"+$("#param"+i+j).val());
                    }
                }
                $('#ctrlDiv' + i).append('<button class="btn btn-primary ctrlDivBtn" id="'+i+ '" type="button">应用</button>');

            }


            $(".ctrlDivBtn").on("click",function () {
                //注意二维数组的定义方式！！一定要定义在对应循环的上一层
                var valueArr = new Array();
                var keyArr = new Array();
                for(var i = 0;i<value.length;i++) {
                    /*console.log("serviceName:" + serviceName[i]);
                     console.log("methodName:" + methodName[i]);
                     console.log("maxi:"+value.length);*/
                    //console.log(abilityDesArr[i].serviceBody.params);
                    var params = abilityDesArr[i].serviceBody.params;//用于记录每个serviceBody的params（随i变化而变化！！）
                    /*console.log(params);*/
                    //console.log(params.length+"----"+i);
                    //console.log(abilityDesArr[i].serviceBody.params.length);
                    valueArr[i] = new Array();
                    keyArr[i] = new Array();

                    for(var j = 0;j<params.length;j++){
                        console.log(params[j].key);
                        console.log(params[j].type);

                        if(params[j].type == 2){

                            if($("#param"+i+j).attr("src") == "static/thingsManage/assets/img/off.png"){
                                valueArr[i][j] = false;
                            }
                            else if($("#param"+i+j).attr("src") == "static/thingsManage/assets/img/on.png"){
                                valueArr[i][j] = true;
                            }
                        }
                        else{
                            valueArr[i][j] = $("#param"+i+j).val();
                        }
                        keyArr[i][j] = params[j].key;
                        console.log("=========="+i+j+"=============");
                        console.log("valueInfo:"+ valueArr[i][j]);
                        console.log("key:"+ keyArr[i][j]);
                        console.log("==========="+i+j+"============");

                    }
                    // console.log(abilityDesArr[i].serviceBody.params.length);
                }


                console.log(this.id);
                var index = this.id;
                console.log(serviceName[index]);
                console.log(methodName[index]);
                // var jsonObj = {};
                var keys = [];
                var values = [];
                keys.push("serviceName");
                values.push(serviceName[index]);
                keys.push("methodName");
                values.push(methodName[index]);
                /*jsonObj.serviceName = serviceName[index];
                 jsonObj.methodName = methodName[index];*/
                for(var i = 0;i < abilityDesArr[index].serviceBody.params.length;i++){

                    // jsonObj.keyArr[index][i] = valueArr[index][i];
                    var type = document.getElementById("param"+index+i).tagName;
                    if(type == "IMG"){
                        var tag = $("#param"+index+i).attr("src");
                        if(tag == "static/thingsManage/assets/img/off.png"){
                            valueArr[index][i] = false;
                        }else if(tag == "static/thingsManage/assets/img/on.png"){
                            valueArr[index][i] = true;
                        }
                    }

                    keys.push(keyArr[index][i]);
                    values.push(valueArr[index][i]);
                    console.log("value"+index+i+":"+valueArr[index][i]);
                    console.log("key"+index+i+":"+keyArr[index][i]);
                    var json = '{';
                    for (var j = 0; j < keys.length; j++) {
                        json += '"' + keys[j] +'":"' + values[j] + '",';
                    }
                    json = json.slice(0,json.length-1);
                    json += '}';
                }
                console.log("json:"+json);
                console.log( $scope.item.id);
                var subObj = $resource("/api/shadow/control/:deviceId");
                var subInfo = subObj.save({deviceId:data.id},json,function (resp) {
                    toastr.success("应用成功！");
                },function (error) {
                    toastr.error("应用失败！");
                });
            });
        });

    };
    /*--------显示遥测数据-------------*/
    /*时间格式化*/
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

    /*    webSocket start  */
    var ws;
    function realtimeDevice(deviceId) {
        var url = 'ws://39.104.84.131:8100/websocket';
        var keys = [];
        listenWs(url);


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
            };
            // Listen for connection errors
            ws.onerror = function (e) {
                log("Error ");
            };
            // Listen for new messages arriving at the client
            //var time0 = formatDate(time);
            ws.onmessage = function (e) {
                //e是返回体
                log("Message received: " + e.data);
                var message = JSON.parse(e.data);

                for(var i in message.data) {
                    console.log(message.data[i].ts);
                    console.log(message.data[i].key);
                    console.log(message.data[i].value);
                    var telemetryDate = formatDate(new Date(message.data[i].ts));
                    var telemetryKey = message.data[i].key;
                    var telemetryValue = message.data[i].value;
                    var key = telemetryKey;
                    // 是之前出现过的key，则刷新原来的行
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
    }
    /*    webSocket end   */
    /*--------显示遥测数据END-------------*/
    /**************查看详情END****************************/

    /*************更新设备-copy自deviceList.js***********/
        //信息初始化
    var obj = $resource("/api/device/alldevices?limit=30");//获取所有设备信息
    $scope.deviceList = obj.query();
    var manufacturerObj = $resource("/api/v1/abilityGroup/manufacturers");//获取所有厂商
    $scope.manufacturerInfo = manufacturerObj.query();


    /*设置初始信息*/
    $scope.setValue = function (data) {
        console.log("ng-repeat中的data赋值给作用域");
        $scope.devInGroup = data;

        //通过父设备ID获取父设备名称
        $.ajax({
            url: "/api/device/name/" + data.parentDeviceId,
            contentType: "application/json; charset=utf-8",
            async: false,
            type: "GET",
            success: function (msg) {
                parentName = msg;
            }
        });

        //设置父类设备初始信息
        console.log("父类设备名称：" + parentName);
        $("#reParentId option").each(function () {
            if ($(this).val() == parentName) {
                $(this).attr("selected", true);
            }
        });


        /*设置厂商初始信息*/
        $("#reManufacture option").each(function () {
            if ($(this).val() == data.manufacture) {
                $(this).attr("selected", true);
            }
        });


        /*设置设备类型初始信息*/
        $("#reDeviceType").prepend("<option class='select'>" + data.deviceType + "</option>");
        $("#reDeviceType .select").attr("selected", true);

        /*设置型号初始信息*/
        $("#reModel").prepend("<option class='select'>" + data.model + "</option>");
        $("#reModel .select").attr("selected", true);

        /*设置位置初始信息*/
        $("#reLocation").val(data.location);
        /*设置状态初始信息*/
        $("#reStatus").val(data.status);

    };

    $scope.getManufacture = function () {
        manufacturerId = $("#reManufacture option:selected").attr("class");
        console.log("厂商：" + manufacturerId);
        $("#reDeviceType option").remove();
        $("#reModel option").remove();
        /*根据厂商查询设备类型*/
        console.log("/api/v1/abilityGroup/deviceTypes?manufacturerId=" + manufacturerId);
        var deviceTypeObj = $resource("/api/v1/abilityGroup/deviceTypes?manufacturerId=" + manufacturerId);
        $scope.deviceTypeInfo = deviceTypeObj.query();


        $scope.getDeviceType = function () {
            deviceTypeId = $("#reDeviceType option:selected").attr("class");
            console.log("设备类型：" + deviceTypeId);


            /*根据厂商和设备类型查询设备型号*/
            console.log("/api/v1/abilityGroup/models?manufacturerId=" + manufacturerId + "&deviceTypeId=" + deviceTypeId);
            var deviceModelObj = $resource("/api/v1/abilityGroup/models?manufacturerId=" + manufacturerId + "&deviceTypeId=" + deviceTypeId);
            $scope.deviceModelInfo = deviceModelObj.query();

            $scope.getDeviceModel = function () {
                deviceModelId = $("#reModel option:selected").attr("class");
                console.log("设备型号:" + deviceModelId);
            };
        };
    };


    /*更新设备*/
    var refreshDeviceObj = $resource("/api/device/updatedevice");
    $scope.refreshDevice = function () {
        $scope.reName = $("#reName").val();
        $scope.reParent = $("#reParentId option:selected").attr("class");
        $scope.reDeviceType = $("#reDeviceType").val();
        $scope.reManufacture = $("#reManufacture").val();
        $scope.reModel = $("#reModel").val();
        $scope.reLocation = $("#reLocation").val();
        $scope.reStatus = $("#reStatus").val();
        $scope.refreshDeviceInfo = '{"name":' + '"' + $scope.reName + '"' + ',"Id":' + '"' + $scope.devInGroup.id + '"' + ',"parentDeviceId":' + '"' + $scope.reParent + '"' + ',"deviceType":' + '"' + $scope.reDeviceType + '"' + ',"manufacture":' + '"' + $scope.reManufacture + '"' + ',"model":' + '"' + $scope.reModel + '"' + ',"location":' + '"' + $scope.reLocation + '"' + ',"status":' + '"' + $scope.reStatus + '"' + '}';
        //字符串类型的数据发送给后台是会自动加上引号
        console.log($scope.refreshDeviceInfo);
        $scope.refreshDeviceInformation = refreshDeviceObj.save({}, $scope.refreshDeviceInfo, function (resp) {
            //toastr.success("更新设备成功！");
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }, function (error) {
            toastr.error("更新设备失败！");
        });
    };
    /**************更新设备END****************/
});