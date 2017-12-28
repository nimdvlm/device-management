
define(function (require) {
    var angular = require('angular');
    var echarts = require('echarts');
    var macarons = require('libs/echarts-theme/macarons');

    //angular会自动根据controller函数的参数名，导入相应的服务
    return {
        name: 'myBar',
        func: function () {
            return {
                scope: {
                    id: '@',
                    legend: '=',
                    item: '=',
                    data: '='
                },
                restrict: 'E',
                template: '<div style="height:250px;"></div>',
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
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            // 图例
                            legend: {
                                data: $scope.legend,
                                y: 'bottom'
                            },
                            xAxis: [{
                                type: 'category',
                                data: function () {
                                    if ($scope.id === 'barDown') {
                                        return $scope.data.click.slice(0, 3);
                                    } else if ($scope.id === 'barUp') {
                                        return $scope.data.click.slice(3, 6);
                                    }
                                }()
                            }],
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            // 纵轴坐标轴
                            yAxis: [{
                                type: 'value'
                            }],
                            series: function () {
                                $len = $scope.data.speed.length;
                                if ($scope.id === 'barDown') {
                                    var serie = [];
                                    for (var i = 0; i < $len; i++) {
                                        var item = $scope.data.speed[i];
                                        serie.push({
                                            'name': item.name,
                                            'type': item.type,
                                            'data': item.data.slice(0, 3)
                                        });
                                    }
                                    return serie;
                                } else if ($scope.id === 'barUp') {
                                    var serie = [];
                                    for (var i = 0; i < $len; i++) {
                                        var item = $scope.data.speed[i];
                                        serie.push({
                                            'name': item.name,
                                            'type': item.type,
                                            'data': item.data.slice(3, 6)
                                        });
                                    }
                                    return serie;
                                }
                            }()
                        };
                        var myChart = echarts.init(document.getElementById($scope.id), macarons);
                        myChart.setOption(option);
                    });
                }
            };
        }
    };
});
