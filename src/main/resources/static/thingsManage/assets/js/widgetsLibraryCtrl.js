mainApp.controller("widgetsLibraryCtrl", function ($scope, $resource) {
    //甜甜圈1
    setInterval(show,4000);

    function show() {
        var random_1=Math.ceil(Math.random()*20);
        var random_2=Math.ceil(Math.random()*20);
        var random_3=Math.ceil(Math.random()*20);

        ctx=document.getElementById("Doughnut").getContext("2d");
        var myDoughnutChart2 = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [random_1, random_2, random_3],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: '环形图',
                    fontSize: 20,
                    fontFamily: "Microsoft YaHei",
                    fontStyle: 'normal',
                    fontColor: '#1964ad'
                },
                legend: {
                    position:'top'
                }
            }
        });
    }
});