require.config({
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});
// 使用
require
(
    [
        'echarts',
        'echarts/chart/line'  // 使用柱状图就加载bar模块，按需加载
    ],
    function (ec)
    {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById('main1'));
        var option = {

            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['历史数据']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            dataZoom : {
                show : false,
                start : 0,
                end : 100
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    data : (function (){
                        var now = new Date();
                        var res = [];
                        var len =10;
                        while (len--) {
                            res.unshift(now.toLocaleString("ja-JP").replace(/^\D*/,''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale: true,
                    name : 'data',
                    boundaryGap: [0.2, 0.2]
                },

            ],
            series : [
                {

                    data:(function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() *1000));
                        }
                        return res;
                    })()
                },
                {
                    name:'历史数据',
                    type:'line',
                    data:(function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push((Math.random()).toFixed(1) - 0);//当前y轴数据
                        }
                        return res;
                    })()
                }
            ]
        };
        myChart.setOption(option);

        var lastData = 11;
        var axisData;
        var timeTicket;
        clearInterval(timeTicket);
        timeTicket = setInterval(function (){
            lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
            lastData = lastData.toFixed(1) - 0;
            axisData = (new Date()).toLocaleTimeString("ja-JP").replace(/^\D*/,'');

            // 动态数据接口 addData
            myChart.addData([

                [
                    1,
                    // 系列索引

                    e.data.data[1],
                    //lastData, // 新增数据

                    false,    // 新增数据是否从队列头部插入
                    false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
                    axisData  // 坐标轴标签
                ]
            ]);
        }, 2100);
    }
);