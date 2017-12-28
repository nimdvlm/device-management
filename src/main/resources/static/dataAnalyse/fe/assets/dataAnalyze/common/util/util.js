
define([
    'require'
], function (require) {
    'use strict';
    return {
        dataTableOption: {
            lengthChange: true,
            searching: true,
            autoWidth: false,
            order: [
                [0, 'desc']
            ],
            retrieve: true,
            language: {
                paginate: {
                    next: '下一页',
                    previous: '上一页'
                },
                lengthMenu: '本页显示 _MENU_条',
                processing: '数据加载中...',
                infoEmpty: '暂无数据',
                emptyTable: '暂无数据',
                loadingRecords: '数据加载中，请稍等...',
                info: '当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条',
                search: '全文检索:',
                searchPlaceHolder: '当前显示条目中查询内容'
            }
        },

        /**
         * 百分比颜色渐变默认样式
         */
        optionPercent: [{
                maxValue: 10,
                minValue: 0,
                attrs: {
                    'background-color': '#FFCCCC',
                }
            },
            {
                maxValue: 10,
                minValue: 90,
                attrs: {
                    'background-color': '#FFFF99',
                }
            },
            {
                maxValue: 90,
                minValue: 100,
                attrs: {
                    'background-color': '#CCFF99',
                }
            }
        ],

        /**
         * 数值颜色渐变默认样式
         */
        optionNum: [{
                maxValue: 50,
                minValue: 0,
                attrs: {
                    'background-color': '#CCFF99',
                }
            },
            {
                maxValue: 200,
                minValue: 50,
                attrs: {
                    'background-color': '#FFFF99',
                }
            },
            {
                minValue: 200,
                attrs: {
                    'background-color': '#FFCCCC',
                }
            }
        ],

        /**
         * 产品信息
         */
        productIds: {
            'ps': '1',
            '内容消费': '2',
            '百度地图': '3',
            // 'star': '4',
            // 'ecom': '5',
            'mars': '8',
            '知识': '9',
            '贴吧': '10',
            '大商业': '11',
            '糯米': '12'
        },
        initDateOption: function ($scope) {
            $scope.dateOption = {
                timepicker: false,
                format: 'Y-m-d',
                allowBlank: false,
                scrollMonth: false,
                scrollTime: false,
                scrollInput: false,
                maxDate: new Date()
            };
            $scope.endDate = new Date();
            $scope.startDate = new Date($scope.endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        },
        initSubProduct: function (product, $http, filterArray, callback0, callback) {
            if (callback && typeof callback !== 'function') {
                callback('错误处理必须是一个函数！');
            }
            if (callback0 && typeof callback0 !== 'function') {
                callback('成功处理必须是一个函数');
            }
            if (filterArray && Array.isArray(filterArray)) {
                callback('过滤数组必须是一个数组');
            }
            $http.get('pub/subproductlist?productid=' + this.productIds[product])
                .success(function (response) {
                    if (response.status === 0) {
                        for (var key in response.data) {
                            filterArray.forEach(function (element) {
                                if (response.data[key] === element) {
                                    delete response.data[key];
                                }
                            });
                        }
                        callback0(response.data);
                    } else {
                        callback('获取子类失败');
                    }
                }).error(function () {
                    callback('服务器错误');
                });
        },
        combineUrl: function (option, baseUrl) {
            if (typeof option !== 'object') {
                return null;
            }
            var urlParam = [];
            for (var key in option) {
                var temp = encodeURIComponent(key) + '=' + encodeURIComponent(option[key]);
                urlParam.push(temp);
            }
            return baseUrl + urlParam.join('&');
        },
        htmlEncode: function (str) {
            var s = '';
            if (str.length === 0) {
                return '';
            }
            s = str.replace(/\n/g, '<br/>');
            return s;
        }
    };
});