// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

document.addEventListener('DOMContentLoaded', function () {

    var agentID, element = document.getElementById("agentID");
    var url = "/ChartData/GetCallsThisMonth";

    if (element) {
        agentID = element.value;
        url = "/ChartData/GetAgentCallsThisMonth/" + agentID;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var labels = data.map(item => item.status);
            var counts = data.map(item => item.count);

            var ctx = document.getElementById("CallsThisMonthPie");
            var myPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: counts,
                        backgroundColor: ['#00B6FF', '#04FF00', '#FFFF00', '#FFA600', '#FF0000'],
                        hoverBackgroundColor: ['#00B6FF', '#04FF00', '#FFFF00', '#FFA600', '#FF0000'],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 0,
                },
            });

        });
});


// Pie Chart Example
//var ctx = document.getElementById("CallsThisMonthPie");
//var myPieChart = new Chart(ctx, {
//  type: 'doughnut',
//  data: {
//    labels: ["Laghing", "Happy", "Normal", "Crying", "Shouting"],
//    datasets: [{
//      data: [1200, 800, 1000, 50, 150],
//        backgroundColor: ['#00B6FF', '#04FF00', '#FFFF00', '#FFA600', '#FF0000'],
//        hoverBackgroundColor: ['#00B6FF', '#04FF00', '#FFFF00', '#FFA600', '#FF0000'],
//      hoverBorderColor: "rgba(234, 236, 244, 1)",
//    }],
//  },
//  options: {
//    maintainAspectRatio: false,
//    tooltips: {
//      backgroundColor: "rgb(255,255,255)",
//      bodyFontColor: "#858796",
//      borderColor: '#dddfeb',
//      borderWidth: 1,
//      xPadding: 15,
//      yPadding: 15,
//      displayColors: false,
//      caretPadding: 10,
//    },
//    legend: {
//      display: true
//    },
//    cutoutPercentage: 0,
//  },
//});
