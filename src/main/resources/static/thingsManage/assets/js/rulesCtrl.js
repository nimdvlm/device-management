mainApp.controller("RuleCtrl", function ($scope, $resource) {
    //各种ng-show初始化
    $scope.showAllRule = true;
    $scope.showInfoRule = false;
    $scope.Rulestart = false;
    $scope.Rulestop = false;
    $scope.showaddFilter = false;
    $scope.showaddTransform = false;
    $scope.index = 0;
    $scope.showsendmail = false;
    $scope.showrestful = false;
    $scope.showPluginMail = false;
    $scope.showrestfulPOST = false;
    $scope.RESTMethod = ["POST", "DELETE", "GET"];
    $scope.RestfulBody = {};

    InitformData();

    function InitformData() {
        //数据初始化
        $scope.formData = {
            "rule": {
                //"tenantId": "1",
                "state": "ACTIVE",
                "additional_info": ""
            },
            "filters": [],
            "transform": {
                "requestBody": {}
            }
        };
        console.log("提交表单初始化");
    }

    function ObjFilter(name, type, jscode) //声明filter对象
    {
        this.name = name;
        this.type = type;
        this.jsCode = jscode;
    }

    //获取当前租户ID
    var TenantId = $resource('/api/rule/tenant');
    TenantId.get().$promise.then(function (resp) {
        $scope.formData.rule.tenantId = resp.tenantId;
        console.log("tenantid:" + $scope.formData.rule.tenantId);
    });

    //获取当前租户规则
    var RULE = $resource('/api/rule/ruleByTenant', {}, {
        //解决 Expected response to contain an array but got an object 问题
        query: {method: 'GET', isArray: true}
    });//获取所有规则组信息

    $scope.Rules = RULE.query({}, function () {

        //初始化右侧视图
        $scope.Ruleitem = $scope.Rules[0];//必须在success函数里才能取到Rules[0]
        //console.log("query获取的数据："+$scope.Rules);//bug:控制台打印[obj obj]
        console.log("query函数内的Rules：");
        console.log($scope.Rules);
        console.log("取第一个对象：");
        console.log($scope.Ruleitem);
        $scope.$broadcast('senddata', $scope.Ruleitem);
        if ($scope.Ruleitem.rule.state == "ACTIVE") {
            $scope.isActive = true;
            $scope.Rulestart = false;
            $scope.Rulestop = true;
        } else {
            $scope.isActive = false;
            $scope.Rulestart = true;
            $scope.Rulestop = false;
        }
    });
    /******bug:此时取Rules[0]为undefined
     * 原因：同步打印，还没有从后台取完数据
     * 在query()里实际上是异步打印
     * query(params,success,error)第二个参数调用了promise的success***/
    //console.log("query函数外的Rules：")
    //console.log($scope.Rules);
    //console.log("取第一个对象：");
    //console.log($scope.Rules[0]);

    //右侧展示视图
    $scope.showrule = function (rule) {
        //展示视图添加样式
        $scope.Rules.forEach(function (items) {
            if (rule != items) items.style = {}
        });
        rule.style = {"border": "2px solid #305680"};


        $scope.Ruleitem = rule;
        console.log("rule in rules:");
        console.log($scope.Ruleitem);
        //判断规则运行状态
        if ($scope.Ruleitem.rule.state == "ACTIVE") {
            $scope.isActive = true;
            $scope.Rulestart = false;
            $scope.Rulestop = true;
        } else {
            $scope.isActive = false;
            $scope.Rulestart = true;
            $scope.Rulestop = false;
        }

        //判断规则中插件类型
        if ($scope.Ruleitem.transform.name == "MailPlugin") {
            $scope.showPluginMail = true;
        } else {
            $scope.showPluginMail = false;
        }
        //把数据发送给表格控制器
        $scope.$broadcast('senddata', $scope.Ruleitem);
    };

    //根据id查找规则
    $scope.searchRule = function () {
        if ($scope.ruleid != "" && $scope.ruleid != null) {
            var searchRULE = $resource('/api/rule/:id', {id: '@id'});
            searchRULE.get({id: $scope.ruleid})
                .$promise.then(function (person) {
                console.log("文本框输入内容：" + $scope.ruleid);
                console.log("返回的数据：");
                console.log(person);
                if (person.rule.ruleId != undefined) {
                    $scope.showInfoRule = true;
                    $scope.showAllRule = false;
                    $scope.searchresult = person;
                    //console.log("接口返回对象：" + person.rule.name + person.rule.ruleId);
                } else {
                    $scope.showInfoRule = false;
                    alert("无规则组[id=" + $scope.ruleid + "]信息，请输入正确设备组名!");
                }

            });
        }
        else {
            alert("输入不能为空!");
        }
    };

    // 编辑规则名
    /*********无该功能接口
     $scope.editRuleName=function(){
        if ($scope.editrulename != "" && $scope.editrulename != null){
            var editRule = $resource('http://localhost:8081/api/rule/:id', {id: '@id'});
            editRule.save({id: $scope.Ruleitem.id.id},$scope.editrulename)
                .$promise.then(function (resp) {
                console.log("信息修改成功:id=" + $scope.Ruleitem.id.id + ";name=" + $scope.Ruleitem.name);
                $("#editDGName").modal("hide");
               location.reload();
            });
        }else{
           alert("输入不能为空!");
        }
    }
     *********/

    //删除规则
    $scope.delRule = function () {
        var delRULE = $resource('/api/rule/delete/:id', {id: '@id'});
        delRULE.delete({}, {id: $scope.Ruleitem.rule.ruleId}, function (resp) {
            console.log("删除成功");
            $("#delDG").modal("hide");
            location.reload();
        }, function (resp) {
            console.log("1234再来一次");
            alert("删除失败，请重试！")
        });
    }

    //启动规则
    $scope.startRule = function () {
        //$scope.state1 = "ACTIVE";
        var editRule = $resource('/api/rule/active/:id', {id: '@id'});
        //editRule.save({id: $scope.Ruleitem.rule.ruleId}, $scope.state1)
        editRule.save({id: $scope.Ruleitem.rule.ruleId})
            .$promise.then(function (resp) {
            console.log("规则激活成功:id=" + $scope.Ruleitem.rule.ruleId);
            $("#editDGName").modal("hide");
            location.reload();
        });
    }

    //暂停规则
    $scope.stopRule = function () {
        //$scope.state2 = "UNACTIVE";
        var editRule = $resource('/api/rule/suspend/:id', {id: '@id'});
        //editRule.save({id: $scope.Ruleitem.rule.ruleId}, $scope.state2)
        editRule.save({id: $scope.Ruleitem.rule.ruleId})
            .$promise.then(function (resp) {
            console.log("规则暂停成功:id=" + $scope.Ruleitem.rule.ruleId);
            $("#editDGName").modal("hide");
            location.reload();
        });
    }

    /* =============================================================
     添加规则
     ============================================================ */
    //"js代码"文本框初始化
    var addfilterJS = "function filter(deviceId,key,value){if(deviceId=='35818ec0-5a65-11e8-b66a-e5d2dad89b7c'&&key=='1231' && value>101){return true;}  else{return false;}}";
    document.getElementById('addfilterjs').value = addfilterJS;

    //点击添加规则-添加过滤器
    $scope.subFilter = function () {
        //H5 required属性无效bug
        if ($('#addfiltername').val() != "") {
            $('#filternamealert').hide();
            $scope.showaddFilter = true;
            $scope.formData.filters.push(new ObjFilter($('#addfiltername').val(), $('#addfiltertype').val(), $('#addfilterjs').val()));
            console.log($scope.formData.filters);
            $("input[type=reset]").trigger("click");
            document.getElementById('addfilterjs').value = addfilterJS;
            /****若出现嵌套model添加一次儿子后闪退bug，把js命令换成data-dismiss*****/
            $("#addruleFilter").modal("hide");
        } else {
            $('#filternamealert').show();
        }
    }

    //点击添加规则-点击添加插件,获取所有插件
    $scope.getAllplugin = function () {
        var getAllPLUGINS = $resource("/api/plugin/allPlugins");
        $scope.allPlugins = getAllPLUGINS.query({}, function () {
            $scope.Plugin = $scope.allPlugins;
            //初始化select.value，解决显示一行空白项bug
            //若初始化为第一个插件信息，判断插件类型的函数要写双份(待改)
            //$scope.RuleaddPlugin=$scope.Plugin[0];
        });
    }

    var tempurl;

    //点击添加规则-根据插件名判断插件类型
    $scope.change = function (data) {
        if (data.name == "MailPlugin") {
            console.log("判断添加插件类型为MailPlugin");
            $scope.showsendmail = true;
            $scope.showrestful = false;
            data.method = "POST";
            data.url = "http://" + data.url + "/api/plugin/sendMail";
            console.log("MailUrl：" + data.url);
        } else if (data.name == "RestfulPlugin") {
            console.log("判断添加插件类型为RestfulPlugin");
            $scope.showrestful = true;
            $scope.showsendmail = false;
            tempurl = data.url;
            data.url = "http://" + data.url + "/api/restful/sendRequest";
        } else {
            console.log("判断添加插件类型为其他")
            $scope.showsendmail = false;
        }
    }

    //点击添加规则-RestfulRequest插件-判断方法
    $scope.changemethod = function (method) {
        if (method == "POST") {
            $scope.showrestfulPOST = true;
            $scope.RestfulBody.body = "{\"result\": \"success\"}";
        } else {
            $scope.showrestfulPOST = false;
            $scope.RestfulBody.body = "";
        }
        $scope.RestfulBody.method = method;
        $scope.RestfulBody.url = tempurl + "/api/test/send" + method + "Request";
    }

    //点击添加规则-添加插件
    $scope.subTransform = function () {
        //判断添加类型为MailPlugin
        if ($scope.RuleaddPlugin.name == "MailPlugin") {
            //解决ng-repeat动态遍历空数组报错bug
            $scope.mailTo = [];
            for (var i = 0; i < $scope.fchat.replies.length; i++) {
                $scope.mailTo.push($scope.fchat.replies[i].value);
            }

            //插件为Mail时requestbody
            $scope.MailrequestBody = {to: []};
            $scope.MailrequestBody.to = $scope.mailTo;
            $scope.MailrequestBody.subject = $('#addTranMailSub').val();
            $scope.MailrequestBody.text = $('#addTranMailText').val();

            $scope.showaddTransform = true;
            $scope.formData.transform.name = $scope.RuleaddPlugin.name;
            $scope.formData.transform.url = $scope.RuleaddPlugin.url;
            $scope.formData.transform.method = "POST";
            $scope.formData.transform.requestBody = $scope.MailrequestBody;
        } else if ($scope.RuleaddPlugin.name == "RestfulPlugin") {
            $scope.showaddTransform = true;
            $scope.formData.transform.name = $scope.RuleaddPlugin.name;
            $scope.formData.transform.url = $scope.RuleaddPlugin.url;
            $scope.formData.transform.method = "POST";
            $scope.formData.transform.requestBody = $scope.RestfulBody;
        }
        console.log("新建规则-创建插件:");
        console.log($scope.formData.transform);
        $("input[type=reset]").trigger("click");
    }

    //添加规则
    $scope.createRule = function () {
        if ($scope.formData.rule.name != "" && $scope.formData.rule.name != null) {
            $('#rulenamealert').hide();
            console.log($scope.formData);
            var addRULE = $resource('/api/rule/create');
            addRULE.save({}, $scope.formData)
                .$promise.then(function (resp) {
                console.log("新建规则成功");
                $("#addRule").modal("hide");
                location.reload();
            });
        } else {
            $('#rulenamealert').show();
        }
    }


    /********添加规则-添加多个MailPlugin收件人*****/
    $scope.fchat = new Object();
    $scope.fchat.replies = [{value: ""}];//数据类型为数组
    // 初始化时由于只有1条回复，所以不允许删除
    $scope.fchat.canDescReply = false;

    // 增加回复数
    $scope.fchat.incrReply = function ($index) {
        $scope.fchat.replies.splice($index + 1, 0, {value: ""});
        console.log($scope.fchat.replies);
        // 增加新的回复后允许删除
        $scope.fchat.canDescReply = true;
    }

    // 减少回复数
    $scope.fchat.decrReply = function ($index) {
        // 如果回复数大于1，删除被点击回复
        if ($scope.fchat.replies.length > 1) {
            $scope.fchat.replies.splice($index, 1);
        }
        // 如果回复数为1，不允许删除
        if ($scope.fchat.replies.length == 1) {
            $scope.fchat.canDescReply = false;
        }
    }
    /***ng-repeat动态遍历空数组会报索引重复的bug
     * 所以只能设为对象，再取出其中的value发给接口*/
    /***添加多个收件人END*****/

    /* =============================================================
     添加规则END
     ============================================================ */

    /*鼠标移入动画效果*/
    $scope.fadeSiblings = function () {
        $(".chooseBtn").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };
    /*鼠标移出动画效果*/
    $scope.reSiblings = function () {
        $(".chooseBtn").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
    };

    /******modal关闭后清除数据******/
    $scope.clearFilterPlugin = function () {
        $(':input').each(function () {
            var type = this.type;
            var tag = this.tagName.toLowerCase(); // normalize case
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = "";
            else if (tag == 'select')
                this.selectedIndex = 1;
        });

        //恢复现场
        document.getElementById('addfilterjs').value = addfilterJS;
        $('#filternamealert').hide();
        $scope.showsendmail = false;
        $scope.showrestful = false;
        $scope.showPluginMail = false;
        $scope.showrestfulPOST = false;
    };

    $scope.clearForm = function () {
        $(':input').each(function () {
            var type = this.type;
            var tag = this.tagName.toLowerCase(); // normalize case
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = "";
        });

        //恢复现场
        document.getElementById('addfilterjs').value = addfilterJS;
        $('#rulenamealert').hide();
        InitformData();
        $scope.showaddFilter = false;
        $scope.showaddTransform = false;
    };
});