mainApp.controller("RuleCtrl", function ($scope, $resource) {
    //各种ng-show初始化
    $scope.showAllRule = true;
    $scope.showInfoRule = false;
    $scope.Rulestart = false;
    $scope.Rulestop = false;
    $scope.showaddFilter=false;
    $scope.showaddTransform=false;
    $scope.index=0;
    $scope.showsendmail=false;

    $scope.formData={
        "rule":{
            "tenantId": 1,
            "state": "ACTIVE",
            "ruleId":24
        },
        "filters":[],
        "transform":{

        }
    };

    function ObjFilter(name,type,jscode) //声明filter对象
    {
        this.name = name;
        this.type = type;
        this.jscode = jscode;
    }


    var RULE = $resource('/api/rule/allRules',{},{
        //解决 Expected response to contain an array but got an object 问题
        query:{method:'GET',isArray:true}
    });//获取所有规则组信息


    //报错获取不了rules[0]
    $scope.Rules = RULE.query({},function () {

        //初始化右侧视图
        $scope.Ruleitem = $scope.Rules[0];//Rules[0]获取不到第一个对象咋弄？为啥必须在函数里？
        console.log("query获取的数据："+$scope.Rules);//此时打印是数组
        console.log("取第一个对象：" + $scope.Ruleitem);
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

    //右侧展示视图
    $scope.showrule = function (rule) {
        $scope.Ruleitem = rule;
        console.log("rule in rules:"+$scope.Ruleitem);
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
                console.log("返回的数据："+person);
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
        delRULE.delete({}, {id: $scope.Ruleitem.id.id}, function (resp) {
            console.log("删除成功:id=" + $scope.Ruleitem.id.id + ";name=" + $scope.Ruleitem.name);
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
            console.log("规则激活成功:id=" + $scope.Ruleitem.rule.ruleId + ";state=" + $scope.Ruleitem.rule.state);
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
            console.log("规则激活成功:id=" + $scope.Ruleitem.rule.ruleId + ";state=" + $scope.Ruleitem.rule.state);
            $("#editDGName").modal("hide");
            location.reload();
        });
    }

    //点击添加规则-添加过滤器，跳转到添加规则组页
    $scope.subFilter=function(){
        $scope.showaddFilter=true;
        //每次弹出添加过滤器，生成单独的对象filter，在js里将其添加到formData。以此解决index问题
        //$scope.formData.filters[$scope.index].name=addfilter.name.value;
        ///$scope.formData.filters[$scope.index].jscode=$('#addfilterjs').val();
        //$scope.index++;

        $scope.formData.filters.push(new ObjFilter($('#addfiltername').val(),$('#addfiltertype').val(),$('#addfilterjs').val()));
        console.log($scope.formData.filters);
        $("input[type=reset]").trigger("click");

        /****嵌套model添加一次儿子后闪退bug，所以把js命令换成data-dismiss
         $("#addruleFilter").modal("hide");
         *****/
    }

    //点击添加规则-插件类型判断
    $scope.addsendmail=function () {
        if($('#addtransformname').val()=="Sendmail"){
            $scope.showsendmail=true;
        }else{
            $scope.showsendmail=false;
        }
    }

    //点击添加规则-添加插件
    $scope.subTransform=function () {
        $scope.showaddTransform=true;
        $scope.formData.transform.name=$('#addtransformname').val();
        $scope.formData.transform.url=$('#addtransformurl').val();
        $scope.formData.transform.method=$('#addtransformmethod').val();
        console.log($scope.formData.transform);
        $("input[type=reset]").trigger("click");
    }
    
    //添加规则
    $scope.createRule=function () {
        console.log($scope.formData);
        var addRULE = $resource('/api/rule/create');
        addRULE.save({},$scope.formData)
            .$promise.then(function (resp) {
            console.log("新建设备组成功");
            $("#addRule").modal("hide");
            location.reload();
    });
    }
});