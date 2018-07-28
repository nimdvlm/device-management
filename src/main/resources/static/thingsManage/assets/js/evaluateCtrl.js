mainApp.controller('evaluateCtrl', function ($scope,$resource,FileUploader) {


    /*POST上传文件*/
    var uploader = $scope.uploader = new FileUploader({
        url:'/api/document/upload'
    });
    $scope.uploadStatus = $scope.uploadStatus1 = false;
    $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
        uploader.clearQueue();
    }
    uploader.onAfterAddingFile = function(fileItem) {
        $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
    };
    uploader.onSuccessItem = function (fileItem,response,status,headers) {
        alert("success");
    };
    uploader.onErrorItem = function (fileItem,response,status,headers) {
        alert("error");
    };




    /*=====================================get获取全部文档==============================================*/
    var Arr = new Array();
    var strs= new Array();//定义一数组
    $.ajax({
        url:'/api/document/allFile',
        contentType: "application/json; charset=utf-8",
        async: false,
        type:"GET",
        success:function(msg) {
            //console.log(msg);
            var evaluate = JSON.parse(msg);
            //console.log(evaluate);
            //console.log(evaluate.filenames);
            //console.log(evaluate.filenames instanceof Array);
            evaluate.filenames=evaluate.filenames.replace("[","");//去除[]
            evaluate.filenames=evaluate.filenames.replace("]","");
            strs=evaluate.filenames.split(","); //以字符逗号分割字符串，返回数组
            //console.log(strs);
            var len = strs.length;
            //console.log(len);
            for(var i=0;i<len;i++){
                var str = [];
                var str = strs[i].split(".");
                var jsonStr = {name:str[0],type:str[1]};
                Arr.push(jsonStr);
            }
        }
    });
    //console.log(Arr);
    //console.log(Arr[0].name);
    $scope.arrayItem = Arr;

    

    /*=============测试代码
    var evaluate = '{"filenames":"[物联网平台.pptx, 三化物联网平台单元测试.docx, 三化物联网平台概要设计.docx, 三化物联网平台架构设计.docx, 账户系统单元测试.docx, 大数据平台单元测试.docx, 大数据平台UI设计.doc, 三化物联网平台数据库设计.docx, 大数据平台原型设计.docx, 日志单元测试.docx, 三化物联网平台UI设计.docx, 三化物联网平台系统原型.docx, 三化物联网平台需求规格说明书.doc]"}';
    var evaluate = JSON.parse(evaluate);
    console.log(evaluate);
    console.log(evaluate.filenames);
    evaluate.filenames=evaluate.filenames.replace("[","");//去除[]
    evaluate.filenames=evaluate.filenames.replace("]","");
    var strs= new Array(); //定义一数组
    strs=evaluate.filenames.split(","); //字符分割
    //console.log(strs);
    var len = strs.length;
    console.log(len);
    var Arr = new Array();
    for(var i=0;i<len;i++){
        var str = [];
        var str = strs[i].split(".");
        var jsonStr = {name:str[0],type:str[1]};
        Arr.push(jsonStr);
    }
    console.log(Arr);
    $scope.arrayItem = Arr;
    //console.log($scope.arrayItem);//能正常显示在前端；

======================================================================*/
    /*get文件的下载*/
    $scope.fileDown = function (data) {
        console.log(data);
        console.log(data.name);
        console.log(data.type);

        var result = confirm("下载此文件？");
        if(result){
            var downFile = $resource('/api/document/download/'+ encodeURI(encodeURI(data.name)) +'/'+data.type);
            downFile.get({},{},function () {
                alert("下载成功");
            });
        }else {
            alert("不下载？");
        }
    }


    /*delete删除文档*/
    $scope.delFile = function(data){
        console.log(data);
        console.log(data.name);
        console.log(data.type);
        var result = confirm("确定删除此文件？");
        if(result){
            var deleteFile = $resource('/api/document/delete/:filename/:filetype');
            deleteFile.delete({filename:encodeURI(encodeURI(data.name)),filetype:data.type},{},function(){
                alert("删除成功");
            },function () {
                alert("删除失败！");
            });
        }else {
            alert("不删除?");
        }
    }







    /*================================
    //附件下载
    $scope.fileDown = function (url, name) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";

        xhr.open("GET", "http://localhost:56888/api/ServiceStateChanges?url=" + url + "&filename=" + name + "", true);

        xhr.setRequestHeader("Authorization", 'Bearer ' + currUser.token);

        xhr.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                var response = this.response;
                var URL = window.URL || window.webkitURL || window;
                var link = document.createElement('a');
                link.href = URL.createObjectURL(response);
                link.download = name;
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                link.dispatchEvent(event);
            }
        }
        xhr.send(null);
    }
    }======================================*/
    /*post文件上传
        //取消
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        //上传按钮
        $scope.subFile = function () {
            $scope.upload($scope.file);
        };

        $scope.upload = function (file) {
            $scope.fileInfo = file;
            Upload.upload({
                //服务端接收
                method: 'POST',
                url: 'http://localhost:56897/api/serviceLogAttachments',
                file: file
            }).progress(function (evt) {
                //进度条
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
            }).success(function (newAttachment) {
                //上传成功
                $uibModalInstance.close(newAttachment);
            }).error(function (data, status, headers, config) {
                //上传失败
                console.log('error status: ' + status);
            });
        };*/


    /*$("#downFile").on("click",function (item) {
           console.log(item);
           $.ajax({
               url:"/api/document/download/"+ item.name+"/"+item.type,
               type:"GET",
               success:function () {
                   alert("下载成功！");
               },
               error:function () {
                   alert("编辑失败");
               }
           });
       })*/









});