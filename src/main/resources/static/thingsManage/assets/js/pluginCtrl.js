mainApp.controller("pluginCtrl", function ($scope, $resource){

    var str = new Array();

    var pluginGroup = $resource('/api/rule/allPlugins');
    $scope.pluginGroups = pluginGroup.query();

    /*鼠标移入动画效果*/
    $scope.fadeSiblings = function () {
        $(".pluginChoose").mouseover(function () {
            $(this).siblings().stop().fadeTo(300, 0.3);
        });
    };
    /*鼠标移出动画效果*/
    $scope.reSiblings = function () {
        $(".pluginChoose").mouseout(function () {
            $(this).siblings().stop().fadeTo(300, 1);
        });
    };

    $scope.showAll = function (item) {
        str = [];//初始化数组；
        //console.log(str);
        //console.log(item);
        /*除点击元素外其他元素均无特殊样式*/
        $scope.pluginGroups.forEach(function (items) {
            if(item != items) items.style = {}
        });
        /*给点击元素加上特定样式*/
        item.style = {"border": "2px solid #305680"};
        $scope.name = item.name;
        $scope.url = item.url;
        $scope.describe = item.describe;
        //console.log($scope.url);
        str = item.url.split(":");
        //console.log(str);//正常显示str数组
        var pluginState = $resource('/api/plugin/state/:urlId/:portId',{urlId: '@id', portId: '@id'});
        pluginState.get({urlId:str[0],portId:str[1]}).$promise.then(function (resp) {
        $scope.pluginStateDisplay=resp;
            //插件状态展现
            if (resp.state == "ACTIVE") {
                $scope.isActive = true;
            } else {
                $scope.isActive = false;
            }
        })
        //获取插件所有接口
        var interfaceInfo = $resource('/api/plugin/allUrls/:hostID/:portID',{hostID:"@id",portID:"@id"});
        interfaceInfo.get({hostID:str[0],portID:str[1]}).$promise.then(function(res){
            $scope.interfaceInfomations = res;
            var arrs = [];
            var arry = [];
            arrs = $scope.interfaceInfomations.api;
            for(var i=0;i<arrs.length;i++){
                if(arrs[i].indexOf("/api/v1")== -1){
                    $scope.interface = "内部";
                    var fileData = {"name":$scope.interfaceInfomations.api[i],"value":$scope.interface};
                    arry.push(fileData);//重新构建数组对象

                }else{
                    $scope.interface = "外部";
                    var fileData = {"name":$scope.interfaceInfomations.api[i],"value":$scope.interface};
                    arry.push(fileData);
                }

            }
            $scope.interfaceArray = arry;
        })

    }


    /*激活插件*/
    $scope.activePlugin = function(){
        //console.log(str[0]);
        var changePlugin = $resource('/api/plugin/activate/:urlNum/:portNum',{urlNum: str[0], portNum:str[1]});
        changePlugin.save({urlNum:str[0],portNum:str[1]})
            .$promise.then(function (resp) {
            //alert("sssss")
            //console.log(resp);
            toastr.success("激活成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        });
    }
    /*暂停插件*/
    $scope.stopPlugin = function () {
        console.log(str[0]);
        var changePlugin = $resource('/api/plugin/suspend/:urlDig/:portDig',{urlDig: str[0], portDig: str[1]})
        changePlugin.save({urlDig:str[0],portDig:str[1]})
            .$promise.then(function (resp) {
            //alert("sssss")
            //console.log(resp);
            toastr.success("暂停成功！");
            setTimeout(function () {
                window.location.reload();
            },500);
        });
    }


    /*实现向上滚动显示数据
    * scrollTop 0.1
    * Dependence jquery-1.7.1.js
    */
    ;(function($){
        $.fn.scrollTop = function(options){
            var defaults = {
                speed:30
            }
            var opts = $.extend(defaults,options);
            this.each(function(){
                var $timer;
                var scroll_top=0;
                var obj = $(this);
                var $height = obj.find("ul").height();
                obj.find("ul").clone().appendTo(obj);
                obj.hover(function(){
                    clearInterval($timer);
                },function(){
                    $timer = setInterval(function(){
                        scroll_top++;
                        if(scroll_top > $height){
                            scroll_top = 0;
                        }
                        obj.find("ul").first().css("margin-top",-scroll_top);
                    },opts.speed);
                }).trigger("mouseleave");
            })
        }
    })(jQuery)
    $(function(){
        $("#box").scrollTop({
            speed:70 //数值越大 速度越慢
        });
    })
    
 /*查看插件运行状态websocket*/
    var stompClient = null;

    // 开启socket连接
    function connect() {
        var socket = new SockJS('http://39.104.189.84:30080/api/v1/smartruler/socket');
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {}
            , function () {
                //alert("Connected!") ;
                //alert("begin to send") ;
                stompClient.send("/plugins/metrics/details", {}, "mailplugin:8300") ;

                var res = stompClient.subscribe("/plugins/metrics/response/mailplugin/8300", function(frame){
                    console.log(frame.body);
                    var json1 = frame.body;
                    var adaper = function (json) {
                        var newArr = [];
                        var map = {
                            "a": 1,
                            "b": 2
                        }
                        for(var i in map){
                            newArr[map[i]] = json[i];
                        }
                        return newArr;
                    }
                    adaper(json1);
                    console.log(json1);
                    console.log(json1[16]);
                    console.log(json1[69]);
                    console.log(json1[70]);
                    var item = ".";

                    var newarr = [];
                    for(var i=0;i<json1.length;i++){
                        if(json1[i] != item){
                            newarr.push(json1[i]);
                            }
                        }
                        console.log(newarr);
                    var info = JSON.stringify( newarr );
                    console.log(info);


                    /*console.log("frame:");
                    console.log(frame) ;
                    console.log(frame.body);
                    $scope.frameInfo = JSON.parse(frame.body);
                    console.log($scope.frameInfo);
                    $scope.frameBody = $scope.frameInfo.requestCount;
                    console.log($scope.frameInfo.requestCount);
                    console.log($scope.frameInfo[com.tjlcast.mailPlugin.controller.MailController]);
                    $scope.mainPligin = $scope.frameInfo[com.tjlcast.mailPlugin.controller.MailController];*/
                    //console.log($scope.mainPligin);
                }) ;
                //console.log("res:")
                //console.log(res) ;
            });
    }

    // 断开socket连接
    function disconnect() {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        setConnected(falses);
        //alert("Disconnected");
    }

    // 向‘/app/change-notice’服务端发送消息
    function sendName() {
        var value = "hello tjlcast.";
        //alert("send" + value) ;
        stompClient.send("/app/change-notice", {}, value);
    }

    function subscribe_app() {
        stompClient.subscribe("/app/app_subscribe", function(frame){
            console.log(frame) ;
        })
    }

    connect() ;

 $("#runingStatus").click(function () {


 })


 
 
});