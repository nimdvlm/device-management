mainApp.controller('evaluateCtrl', function ($scope,$resource) {

    /*get获取全部文档*/
    var evaluateGroup = $resource('/api/document/allFile');
    $scope.evaluateGroups = evaluateGroup.query();
    console.log("获取文档成功：");
    console.log($scope.evaluateGroups);


    /*get文件的下载*/








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












});