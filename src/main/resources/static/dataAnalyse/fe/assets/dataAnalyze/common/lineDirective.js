
define(function (require) {
    var angular = require('angular');
    var echarts = require('echarts');
    var macarons = require('libs/echarts-theme/macarons');

    return {
        name: 'myLine',
        func: function () {
            return {
                scope: {
                    id: '@',
                    legend: '=',
                    item: '=',
                    data: '=',
                    position: '=',
                    yname: '=',
                    range: '=',
                    formatter: '&',
                    eventclick: '&',
                    style: '@'
                },
                restrict: 'E',
                template: function (tElement, tAttr) {
                    // 添加样式
                    var style = tAttr['style'];
                    style = style ? style : 'height:340px;';
                    return '<div style="' + style + '"></div>';
                },
                replace: true,
                link: function ($scope, element, attrs, controller) {
                    $scope.$watch('data', function (newVal, oldVal) {
                        if (!newVal) {
                            return;
                        }
                        var option = {
                            // 提示框，鼠标悬浮交互时的信息提示
                            tooltip: {
                                show: true,
                                trigger: 'axis',
                                position: $scope.position,
                                formatter: $scope.formatter()
                            },
                            // 图例
                            legend: {
                                data: $scope.item,
                                y: 'bottom'
                            },
                            xAxis: [{
                                type: 'category',
                                boundaryGap: false,
                                data: newVal.date
                            }],
                            grid: {
                                x: 60
                            },
                            // 纵轴坐标轴
                            yAxis: $scope.range ? [{
                                type: 'value',
                                name: $scope.yname,
                                min: $scope.range.ymin,
                                max: $scope.range.ymax
                            }] : [{
                                type: 'value',
                                name: $scope.yname
                            }],
                            series: function () {
                                var serie = [];
                                for (var i = 0; i < $scope.legend.length; i++) {
                                    var item = {
                                        name: $scope.item[i],
                                        type: 'line',
                                        data: newVal[$scope.legend[i]]
                                    };
                                    serie.push(item);
                                }
                                return serie;
                            }()
                        };
                        var myChart = echarts.init(document.getElementById($scope.id), macarons);                    
                        
                        setInterval(function (){       
                            myChart.setOption(option);
                        }, 2100);
                        // myChart.setOption(option);
                        if ($scope.eventclick()) {
                            myChart.on('click', $scope.eventclick());
                        }
                    });
                }
            };
        }
    };
});