
define(function (require) {
    var angular = require('angular');
    var echarts = require('echarts');
    var macarons = require('libs/echarts-theme/macarons');

    //angular会自动根据controller函数的参数名，导入相应的服务
    return {
        name: 'myPie',
        func: function () {
            return {
                scope: {
                    id: '@',
                    data: '=',
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
                        var legend = [];
                        angular.forEach(newVal, function (item) {
                            legend.push(item.name);
                        });
                        var option = {
                            // 提示框，鼠标悬浮交互时的信息提示
                            tooltip: {
                                show: true,
                                trigger: 'axis'
                            },
                            // 图例
                            legend: {
                                data: legend,
                                y: 'bottom',
                                x: 'right',
                                orient : 'vertical'
                            },
                            series: [
                                {
                                    roseType: 'angle',
                                    name: '访问来源',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['50%', '60%'],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                formatter: '{b}:{c}({d}%)'
                                            },
                                            labelLine: {show: true}
                                        }
                                    },
                                    data: $scope.data
                                }
                            ]
                        };
                        var myChart = echarts.init(document.getElementById($scope.id), macarons);
                        myChart.setOption(option);
                    });
                }
            };
        }
    };
});
