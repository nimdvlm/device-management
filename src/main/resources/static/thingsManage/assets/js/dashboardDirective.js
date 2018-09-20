mainApp.directive("weiYi",function(){
    return{
        restrict :'AE',//A属性（默认）,E标签,C类名,D注释
        replace: true,
        scope:{
            option:'=pageOption'
        },
        /*template:'<div class="dashboard_item" ng-repeat="entity in flavor" ng-mousedown="weiYi_mouseDown($index,item)" ng-mouseover="weiYi_mouseover($index)" ng-mouseup="weiYi_mouseup($index)">'+
            '<div class="entity_title">'+
            '<span id="entity_name">{{entity.name}}</span>'+
            '<span ng-click="delEntity(entity)" style="float: right;margin-top: 10px">'+
            '<i class="glyphicon glyphicon-trash shand dbicon" title="删除当前实例"></i>'+
            '</span>'+
            '<span>&emsp;设备：{{entity.device_name}}</span>'+
            '</div>'+
            '<canvas id="entityChart_{{$index}}" min-height="400"></canvas>'+
            '<span ng-click="saveEntity(entity,i)"  style="float: right;margin-top: 10px" id="saveEntity_{{$index}}">'+
            '<i class="glyphicon glyphicon-check shand dbicon" title="保存当前实例"></i>'+
            '</span>'+
            '</div>',*/
        template:'<div class="dashboard_item" ng-repeat="entity in page">'+
            '<div class="entity_title">'+
            '<span id="entity_name">{{entity.name}}</span>'+
            '<span ng-click="delEntity(entity)" style="float: right;margin-top: 10px">'+
            '<i class="glyphicon glyphicon-trash shand dbicon" title="删除当前实例"></i>'+
            '</span>'+
            '<span>&emsp;设备：{{entity.device_name}}</span>'+
            '</div>'+
            '<span ng-click="saveEntity(entity,i)"  style="float: right;margin-top: 10px" id="saveEntity_{{$index}}">'+
            '<i class="glyphicon glyphicon-check shand dbicon" title="保存当前实例"></i>'+
            '</span>'+
            '</div>',
        link :function($scope,element,attr){//scope可以接收到的数据//element 当前的元素//attr属性
            //拖拽的三大事件mousedown,mousemove,mouseup.使用jq绑定事件的方法进行绑定
            $scope.page = $scope.option.curr;
            console.log("查看自定义指令中是否拿到值");
            console.log($scope.page);



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
                    $scope.left = ev.clientX - disX;
                    $scope.top = ev.clientY - disY;

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
                    console.log($scope.left);
                    console.log($scope.top);


                })
            })
        }
    }
});
