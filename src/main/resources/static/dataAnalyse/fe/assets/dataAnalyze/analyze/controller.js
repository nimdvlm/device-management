
define(function (require) {
    var angular = require('angular');
    var tpl = require('text!analyze/content.html');
    var lineDirective = require('common/lineDirective');
    var barNewDirective = require('common/barNewDirective');
    var pieDirective = require('common/pieDirective');
    var datetimepickerDirective = require('common/datetimepickerDirective');
    var util = require('common/util/util');
    return {
        controller: function ($scope, $routeParams, $http, $interval, $filter) {    
            $scope.quaLineEndDate = new Date();
            $scope.quaLineStartDate = new Date($filter('date')(new Date(), 'yyyy-01-01T00:00:00'));    
            util.initDateOption($scope);    
    // lineDirective
    // $scope.weidu = function(){
        $scope.legend = ['temprature'];
        $scope.item = ['温度'];
        $scope.data = {
            'date': [],
            'temprature': []
            }
        var now = new Date();
        var date = [];
        var len = 10;
        while (len--) {
            date.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            now = new Date(now - 2000);
        }
        $scope.data.date = date;
        var temprature = [];
        var len = 0;
        while (len < 10) {
            // res.push((Math.random()*10 + 5).toFixed(1) - 0);
            temprature.push(9)
            len++;
        }
        $scope.data.temprature = temprature;
// barNewDirective
        $scope.appLegend = ['湿度'];
        $scope.appItem = ['temprature'];
        // $scope.appData.xAxis = date
        // $scope.appData.data.temprature = temprature
        $scope.appData = {
            'xAxis':['2017-12-1','2017-12-2','2017-12-3'],
            'data':{'temprature':[25,27,30]}
            };
            var now = new Date();
            var date = [];
            var len = 10;
            while (len--) {
                date.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                now = new Date(now - 2000);
            }
            $scope.appData.xAxis = date;
            var temprature = [];
            var len = 0;
            while (len < 10) {
                // res.push((Math.random()*10 + 5).toFixed(1) - 0);
                temprature.push(9)
                len++;
            }
            $scope.appData.data.temprature = temprature;
            interval = setInterval(function (){
                // console.log(2)
                // console.log($scope.dl)
                     axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
                $scope.data.date.shift();
                $scope.data.date.push(axisData);
                $scope.data.temprature.shift();
                $scope.data.temprature.push((Math.random() * 10 + 5).toFixed(1) - 0);
            
                axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
                $scope.appData.xAxis.shift();
                $scope.appData.xAxis.push(axisData);
                $scope.appData.data.temprature.shift();
                $scope.appData.data.temprature.push((Math.random() * 10 + 5).toFixed(1) - 0);
            }, 1000);
            
        $scope.appTitle = {
                text: '',
                subtext: ''
            };
    // }
    // $scope.weidu();
            
            
    // pie
            $scope.pieData = [{'name':'本月PM2.5正常','value':0.7},
        {'name':'本月PM2.5不正常','value':0.3}];
        a=99;
            $scope.stop = function (){
                clearInterval(interval);
            }
            // $scope.lineActive = false;
            // $scope.line = function (){
            //     $scope.barActive = false;
            //     $scope.lineActive = true;
            // }
            // $scope.barActive = false;
            // $scope.bar = function (){
            //     $scope.lineActive = false;
            //     $scope.barActive = true;
            // }
            
    /**
    * tab标签加载echarts
    */
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // 获取已激活的标签页的名称
        var activeTab = $(e.target)[0].hash;
        switch (activeTab) {
            case '#bug-permonth':
                $scope.bugTab = 'permonth';
                $scope.bugLineChange();
                break;
            case '#bug-summonth':
                $scope.bugTab = 'summonth';
                $scope.bugLineChange();
                break;
        }
    });
        },
        tpl: tpl,
        directive: [lineDirective, barNewDirective, pieDirective, datetimepickerDirective]
    };
});
