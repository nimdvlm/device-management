
define(function (require) {
    var angular = require('angular');
    var echarts = require('echarts');
    var macarons = require('libs/echarts-theme/macarons');

    // angular会自动根据controller函数的参数名，导入相应的服务
    return {
        name: 'myNewBar',
        func: function () {
            return {
                scope: {
                    id: '@',
                    legend: '=',
                    item: '=',
                    title: '=',
                    data: '='
                },
                restrict: 'E',
                template: '<div style="height:400px;"></div>',
                replace: true,
                link: function ($scope, element, attrs, controller) {
                    $scope.$watch('data', function (newVal, oldVal) {
                            if (!newVal) {
                                return;
                            }
                            var option = {
                                // 提示框，鼠标悬浮交互时的信息提示
                                color: ['#53c1c5'],
                                tooltip: {
                                    show: true,
                                    trigger: 'axis',
                                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                toolbox: {
                                    show: true,
                                    // feature: {
                                    //     mark: {
                                    //         show: true
                                    //     },
                                    //     dataView: {
                                    //         show: true,
                                    //         readOnly: false
                                    //     },
                                    //     magicType: {
                                    //         show: true,
                                    //         type: ['line', 'bar']
                                    //     },
                                    //     restore: {
                                    //         show: true
                                    //     },
                                    //     saveAsImage: {
                                    //         show: true
                                    //     }
                                    // }
                                },
                                title: {
                                    text: $scope.title.text,
                                    subtext: $scope.title.subtext,
                                    x: 'center'
                                },
                                // 图例
                                legend: {
                                    data: $scope.legend,
                                    y: 'top'
                                },
                                xAxis: [{
                                    type: 'category',
                                    data: $scope.data.xAxis,
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }],
                                grid: {
                                    borderWidth: 0,
                                    y: 80,
                                    y2: 30
                                },
                                // 纵轴坐标轴
                                yAxis: [{
                                    type: 'value',
                                    show: false
                                }],
                                series: (function () {
                                    var len = $scope.item.length;
                                    var serie = [];
                                    for (var i = 0; i < len; i++) {
                                        var item = $scope.data.data[$scope.item[i]];
                                        serie.push({
                                            'name': $scope.legend[i],
                                            'type': 'bar',
                                            'itemStyle': {
                                                normal: {
                                                    label: {
                                                        show: true,
                                                        position: 'top',
                                                        formatter: '{c}'
                                                    }
                                                }
                                            },
                                            'data': item
                                        });
                                    }
                                    return serie;
                                })()
                            };
                            var myChart = echarts.init(document.getElementById($scope.id), macarons);       
                            setInterval(function (){                    
                                myChart.setOption(option);
                            }, 100);
                            // myChart.setOption(option);
                        }, true);
                }
            };
        }
    };
});