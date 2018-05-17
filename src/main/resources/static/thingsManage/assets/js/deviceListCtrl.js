
mainApp.controller("deviceListCtrl",["$scope","$resource",function ($scope,$resource) {
    $scope.deviceInfo;//用于记录当前选中的设备
    var parentName;//用于记录父设备名称


    /*设备列表信息获取与展示*/
    var obj = $resource("/api/device/alldevices?limit=30");
    $scope.deviceList = obj.query();//返回值为限制个数的所有设备信息
    //console.log($scope.deviceList);

    /*在右侧表格中显示各个设备的信息*/
    $scope.show = function (data) {
        //如果父设备ID为undefined，直接显示null
        if(data.parentDeviceId == "undefined"){
            parentName = "";
        }
        else{
            $.ajax({
                url:"/api/device/name/"+data.parentDeviceId,
                contentType: "application/json; charset=utf-8",
                async: false,
                type:"GET",
                success:function(msg) {
                    parentName = msg;
                }
            });
        }
        //通过父设备ID获取父设备名称


        /*
       //angularjs会将string类型变量解析成object
       var parentNameObj = $resource("/api/device/name/:parentId");
        $scope.parentName = parentNameObj.get({parentId:data.parentDeviceId});
        */

        $scope.deviceInfo = data;
        //console.log(data);
        $scope.ID = data.id;
        $scope.deviceName = data.name;
        $scope.deviceType = data.deviceType;
        $scope.location = data.location;
        $scope.manufacture = data.manufacture;
        $scope.status = data.status;
        $scope.parentName = parentName;//父设备名
        //console.log("$scope.parentName:"+$scope.parentName);
        $scope.model = data.model;
    };




    /*删除设备*/
    var deleteDeviceObj = $resource("/api/device/delete/:deviceId");
    $scope.delete = function(){
        //console.log($scope.deviceInfo);
        //console.log($scope.deviceInfo.id);
        $scope.deleteDevice = deleteDeviceObj.delete({deviceId:$scope.deviceInfo.id},{},function (resp) {
            toastr.success("删除设备成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);

        },function (error) {
            toastr.error("删除设备失败！");
        });
    };

    /*查看令牌*/

    var tokenObj = $resource("/api/device/token/:deviceId");
    $scope.showToken = function (){
        $scope.tokenJson = tokenObj.get({deviceId:$scope.deviceInfo.id})
            .$promise.then(function (value) {
                $scope.token = value.deviceToken;
                //console.log($scope.token);
            });
    };



    /*分配设备*/
    var deviceGroupObj = $resource("/api/group/allgroups?limit=300");
    var deviceGroupAssignObj = $resource("/api/group/assign/:deviceId/:groupId");
    $scope.deviceGroup = deviceGroupObj.query();
    $scope.assignDeviceGroup = function(){
        var groupId = $("#deviceGroupSelect option:selected").attr("id");
        //console.log("groupId:"+groupId);
        //console.log("deviceInfo:"+$scope.deviceInfo.id);
        $scope.deviceGroupAssign = deviceGroupAssignObj.get({deviceId:$scope.deviceInfo.id,groupId:groupId},
            function (resp) {
            toastr.success("设备分配成功！");
            },function (err) {
            toastr.error("设备分配失败！");
        });
    };








    /*所有厂商*/
    var manufacturerObj = $resource("/api/v1/abilityGroup/manufacturers");
    $scope.manufacturerInfo = manufacturerObj.query();

    var manufacturerId;//用于记录厂商id
    var deviceTypeId;//用于记录设备类型id
    var deviceModelId;//用于记录设备型号id



    /* =============================================================
       更新设备
     ============================================================ */
    /*获取厂商*/

    /*设置初始信息*/
    $scope.setValue = function (){
        //设置父类设备初始信息
        //console.log("父类设备名称："+parentName);
        $("#reParentId option").each(function () {
            if($(this).val() == parentName){
                $(this).attr("selected",true);
            }
        });


        /*设置厂商初始信息*/
        $("#reManufacture option").each(function () {
            if($(this).val() == $scope.deviceInfo.manufacture){
                $(this).attr("selected",true);
            }
        });


        /*设置设备类型初始信息*/
        $("#reDeviceType").prepend("<option class='select'>"+$scope.deviceInfo.deviceType+"</option>");
        $("#reDeviceType .select").attr("selected",true);

        /*设置型号初始信息*/
        $("#reModel").prepend("<option class='select'>"+$scope.deviceInfo.model+"</option>");
        $("#reModel .select").attr("selected",true);

        /*设置位置初始信息*/
        $("#reLocation").val($scope.deviceInfo.location);
        /*设置状态初始信息*/
        $("#reStatus").val($scope.deviceInfo.status);

    };









    $scope.getManufacture = function () {
        manufacturerId = $("#reManufacture option:selected").attr("class");
        //console.log("厂商："+manufacturerId);
        $("#reDeviceType option").remove();
        $("#reModel option").remove();
          /*根据厂商查询设备类型*/
        //console.log("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        var deviceTypeObj = $resource("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        $scope.deviceTypeInfo = deviceTypeObj.query();


        $scope.getDeviceType = function () {
            deviceTypeId = $("#reDeviceType option:selected").attr("class");
            console.log("设备类型："+deviceTypeId);


            /*根据厂商和设备类型查询设备型号*/
            console.log("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            var deviceModelObj = $resource("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            $scope.deviceModelInfo = deviceModelObj.query();

            $scope.getDeviceModel = function () {
                deviceModelId = $("#reModel option:selected").attr("class");
                console.log("设备型号:"+deviceModelId);
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
        $scope.refreshDeviceInfo = '{"name":'+'"'+$scope.reName+'"'+',"Id":'+'"'+$scope.deviceInfo.id+'"'+',"parentDeviceId":'+'"'+$scope.reParent+'"'+',"deviceType":'+'"'+$scope.reDeviceType+'"'+',"manufacture":'+'"'+$scope.reManufacture+'"'+',"model":'+'"'+$scope.reModel+'"'+',"location":'+'"'+$scope.reLocation+'"'+',"status":'+'"'+$scope.reStatus+'"'+'}';
        //字符串类型的数据发送给后台是会自动加上引号
        //console.log($scope.refreshDeviceInfo);
        $scope.refreshDeviceInformation = refreshDeviceObj.save({},$scope.refreshDeviceInfo,function (resp) {
            toastr.success("更新设备成功！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        },function (error) {
            toastr.error("更新设备失败！");
        });
    };
    /* =============================================================
             更新设备End
        ============================================================ */






    /* =============================================================
          创建设备
        ============================================================ */
    $scope.getCreateManufacture = function () {
        manufacturerId = $("#manufacture option:selected").attr("class");
        console.log("厂商："+manufacturerId);


        /*根据厂商查询设备类型*/
        console.log("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        var deviceTypeObj = $resource("/api/v1/abilityGroup/deviceTypes?manufacturerId="+manufacturerId);
        $scope.deviceTypeInfo = deviceTypeObj.query();


        $scope.getCreateDeviceType = function () {
            deviceTypeId = $("#deviceType option:selected").attr("class");
            console.log("设备类型："+deviceTypeId);


            /*根据厂商和设备类型查询设备型号*/
            console.log("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            var deviceModelObj = $resource("/api/v1/abilityGroup/models?manufacturerId="+manufacturerId+"&deviceTypeId="+deviceTypeId);
            $scope.deviceModelInfo = deviceModelObj.query();

            $scope.getCreateDeviceModel = function () {
                deviceModelId = $("#model option:selected").attr("class");
                console.log("设备型号:"+deviceModelId);
            };
        };
    };

    /*创建设备*/
    var createDeviceObj =  $resource("/api/device/create");
    $scope.createDevice = function(){
        if($("#name").val()){
            $scope.name = $("#name").val();
            $scope.parent = $("#parentId option:selected").attr("class");
            if($("#manufacture").val() == "? undefined:undefined ?"){
                $scope.manufacture = "";
            }else{
                $scope.manufacture = $("#manufacture").val();
            }
            if($("#deviceType").val() == "? undefined:undefined ?"){
                $scope.deviceType = "";
            }else{
                $scope.deviceType = $("#deviceType").val();
            }
            if($("#model").val() == "? undefined:undefined ?"){
                $scope.model = "";
            }else{
                $scope.model = $("#model").val();
            }
            $scope.location = $("#location").val();
            $scope.status = $("#status").val();
            $scope.createDeviceInfo = '{"name":'+'"'+$scope.name+'"'+',"parentDeviceId":'+'"'+$scope.parent+'"'+',"deviceType":'+'"'+$scope.deviceType+'"'+',"manufacture":'+'"'+$scope.manufacture+'"'+',"model":'+'"'+$scope.model+'"'+',"location":'+'"'+$scope.location+'"'+',"status":'+'"'+$scope.status+'"'+'}';
            //字符串类型的数据发送给后台是会自动加上引号
            console.log($scope.createDeviceInfo);
            $scope.deviceInformation = createDeviceObj.save({},$scope.createDeviceInfo,function (resp) {
                window.location.reload();
            },function (error) {
                toastr.error("新增设备失败！");
            });
        }
        else{
            /*增加提示效果*/
            $("#name").addClass("input-err");
            $("#modalConfirm").removeAttr("data-dismiss");
            $('#name').on('focus', function() {
                $(this).removeClass('input-err');
            });
        }

    };
    /* =============================================================
         创建设备End
       ============================================================ */



/*搜索设备*/
$scope.searchDevice = function () {
    var textSearch = $("#searchDeviceText").val();
    var searchDeviceObj = $resource("/api/device/alldevices?limit=20&textSearch="+textSearch);
    $scope.searchDeviceInfo = searchDeviceObj.query();
    console.log($scope.searchDeviceInfo);
    console.log($scope.searchDeviceInfo.length);
    /*if($scope.searchDeviceInfo.$promise.then(function (value) {

        })){
        toastr.warning("设备名称输入有误，无此设备！");
    }*/
    $scope.searchDeviceInfo.$promise.then(function (value) {
        if(value == false){
            toastr.warning("设备名称输入有误，无此设备！");
            setTimeout(function () {
                window.location.reload();
            },1000);
        }
        else{
            $scope.deviceList = $scope.searchDeviceInfo;
            $("#searchDeviceText").on("focus",function () {
                $(this).val("");
            })
        }
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
    var keys = [];
    function realtimeDevice(deviceId) {
        var url = 'ws://10.108.218.108:8100/websocket';

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
    /*--------显示遥测数据end-------------*/

    // 改变on/off开关图片
    function changeImg(index) {
        // console.log(index);
        if($('#' + index).attr('src') === '../img/off.png'){
            console.log("off->on");
            $('#' + index).attr('src','img/on.png');
        }else{
            $('#' + index).attr('src','img/off.png');
            console.log("on->off");
        }
    }

/*显示详情*/
$scope.showDetail = function () {
    /*显示属性*/
    var attrDetailObj = $resource("/api/data/getKeyAttribute/:deviceId");
    $scope.attrDetailInfo = attrDetailObj.query({deviceId:$scope.deviceInfo.id});
    //console.log($scope.attrDetailInfo);

    /*调用函数，显示遥测数据*/
    realtimeDevice($scope.deviceInfo.id);





    /*控制面板*/

    var controlObject = $resource("/api/v1/ability/:manufacturerName/:deviceTypeName/:modelName");
    $scope.controlInfo = controlObject.query({manufacturerName:$scope.deviceInfo.manufacture,deviceTypeName:$scope.deviceInfo.deviceType,modelName:$scope.deviceInfo.model});
    $scope.controlInfo.$promise.then(function (value) {
        $('#control_panel').empty();
        console.log(value);
        var abilityDesArr = new Array();
        var serviceName = new Array();
        for(var i = 0;i<value.length;i++){
            var abilityDesJson = JSON.parse(value[i].abilityDes);//将所有abilityDes转成JSON
            abilityDesArr.push(abilityDesJson);//把abilityDesJson存进数组
            serviceName.push(abilityDesJson.serviceName);
            $('#control_panel').append('<div class="col-xs-10 col-sm-6 col-md-4 service-panel"><form id="service-control-form"><fieldset id="' + serviceName[i] + '"><legend class="service-control-legend">' + serviceName[i] + '</legend></fieldset></form></div>');
            console.log(serviceName[i]);
            var params = abilityDesJson.serviceBody.params;
            console.log(params);
            console.log(params.length);
            for(var j = 0;j < params.length;j++){
                console.log(params[j]);
                console.log(params[j].value);
                var temp = params[j].value.split(" ");
                console.log(temp);
                var type = params[j].type;
                var key = params[j].key;
                var valueInfo = params[j].value;
                if(type == 1){
                    $('#' + serviceName[i]).append('<div class="form-group"><label class="col-sm-3 control-label" for="param' + j + '" style="text-align: left;">' + key + '</label><div class="col-sm-9"><input type="text" class="form-control" id="param' + j + '" name="" value="' + valueInfo +'"/></div></div>');
                }
                else if(type == 2){
                    var leftStatus = "true";
                    var rightStatus = "false";
                    var curStatus = rightStatus;

                    $('#' + serviceName[i]).append('<div class="form-group"><label class="col-sm-3 control-label" for="' + key + '" style="text-align: left;">' + key +  '</label><div class="col-sm-9"><image src="img/off.png" id="' + key + '" onclick="changeImg(this.id)" style="cursor: pointer; width: 80px; height: 30px; margin: 0 10px;"></image></div></div>');
                    var img = document.getElementById(key);
                    img.setAttribute('on', leftStatus);
                    img.setAttribute('off', rightStatus);
                }
                /*else if(type == 3){
                    var paramName = j;
                    var lowerBound = paramType[1];
                    var upperBound = paramType[2];
                    $('#' + serviceName[i]).append('<div class="form-group"><label class="col-sm-3 control-label" for="param' + j + '" style="text-align: left;">' + paramName + '</label><div class="col-sm-9"><input type="number" class="form-control range-input" id="param' + j + '" name="rangeInput" min="' + lowerBound + '" max="' + upperBound + '" value="' + lowerBound +'" step="1"/><a>(' + lowerBound + '-' + upperBound + ')</a></div></div>');
                }*/
            }
        }

        for(var i = 0;i < abilityDesArr.length;i++ ){
            //abilityDesArr = [{...[{}]},{...[{}]},{...[{}]}]
            //abilityDesArr[i] = {...[{}]}
            //abilityDesArr[i].params = [{},{},...]
            //abilityDesArr[i].params.length
           /* $("#control-panel").append("<tr><td><div id=abilityDesArr[i].serviceName><h3>abilityDesArr[i].serviceName</h3></div></td></tr>");
            for(var j = 0;j < abilityDesArr[i].params.length;j++){
                if(abilityDesArr[i].params.type == 1){
                    $("#"+abilityDesArr[i].serviceName).append("<p>abilityDesArr[i].params.key<input value=abilityDesArr[i].params.value></p>");
                }else if(abilityDesArr[i].params.type == 2){
                    $("#"+abilityDesArr[i].serviceName).append("<p>abilityDesArr[i].params.key<select><option>abilityDesArr[i].params.value</option><option>abilityDesArr[i].params.value</option></select></p>");
                }else if(abilityDesArr[i].params.type == 3){
                    $("#"+abilityDesArr[i].serviceName).append("<p>abilityDesArr[i].params.key<button>abilityDesArr[i].params.value</button></p>");
                }
            }
            $("#"+abilityDesArr[i].serviceName).append("<button class='btn btn-primary'id=i>应用</button>");*/
        }




        /*  console.log("arr:"+abilityDesArr[0].serviceName);
                  console.log($scope.abilityDesInfo);
          $scope.operate = function (type,outerIndex,innerIndex) {
              console.log("type:"+type);
              console.log("div:"+outerIndex);
              console.log("p:"+innerIndex);

                  if(type == 1){

                      $(document).ready(function () {
                          alert("111");
                          $("#operateTable"+outerIndex+innerIndex).css("background","red");
                          //append("<input type='text' class='ctrlInfo'>");
                      });


                  }
                  else if(type == 2){
                      alert("222");
                      $("#operateTable"+outerIndex+innerIndex).append("<select><option>on</option><option>off</option></select>");
                  }
                  else if(type == 3){
                      $("#operateTable"+outerIndex+innerIndex).append();
                  }
          }*/



    });
};


    /* =============================================================
         jquery动画效果
       ============================================================ */

/* HIGHLIGHT效果*/
    $(document).ready(function () {
        $(".highlight").mouseover(function () {
            $(this).css("color","#337ab7");
        });
        $(".highlight").mouseout(function () {
            $(this).css("color","#305680");
        });


    });







}]);


