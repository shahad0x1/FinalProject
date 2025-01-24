/*document.addEventListener('DOMContentLoaded', );*/
function predict() {

    //var agentID, element = document.getElementById("agentID");
    var url = "/ChartData/GetPredictedMarket";

    //if (element) {
    //    agentID = element.value;
    //    url = "/ChartData/GetAgentCallsThisMonth/" + agentID;
    //}

    fetch(url)
        .then(response => response.json())
        .then(data => {

            var labels = data.map(item => item.date);
            var prices = data.map(item => item.stockPrice);
            var colors = data.map(item => item.color);
            var hoverColors = data.map(item => item.hoverColor);

            // Bar Chart Example
            var ctx = document.getElementById("PredictedMarketBar");
            var myBarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Predicted Price",
                        backgroundColor: colors,
                        hoverBackgroundColor: hoverColors,
                        borderColor: colors,
                        data: prices,
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: 10,
                            right: 25,
                            top: 25,
                            bottom: 0
                        }
                    },
                    scales: {
                        xAxes: [{
                            time: {
                                unit: 'date'
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                maxTicksLimit: 11,
                                minTicksLimit: 11
                            },
                            maxBarThickness: 35,
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: Math.max(...prices),
                                maxTicksLimit: 5,
                                padding: 10,
                                callback: function (value, index, values) {
                                    return value;
                                }
                            },
                            gridLines: {
                                color: "rgb(234, 236, 244)",
                                zeroLineColor: "rgb(234, 236, 244)",
                                drawBorder: false,
                                borderDash: [2],
                                zeroLineBorderDash: [2]
                            }
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        titleMarginBottom: 10,
                        titleFontColor: '#6e707e',
                        titleFontSize: 14,
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                        callbacks: {
                            label: function (tooltipItem, chart) {
                                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                                return datasetLabel + ': ' + tooltipItem.yLabel;
                            }
                        }
                    },
                }
            });
        });

    const predictedChart = document.getElementById("predictedChart");
    predictedChart.hidden = false;

}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

//// Set new default font family and font color to mimic Bootstrap's default styling
//Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
//Chart.defaults.global.defaultFontColor = '#858796';

//function number_format(number, decimals, dec_point, thousands_sep) {
//    // *     example: number_format(1234.56, 2, ',', ' ');
//    // *     return: '1 234,56'
//    number = (number + '').replace(',', '').replace(' ', '');
//    var n = !isFinite(+number) ? 0 : +number,
//        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
//        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
//        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
//        s = '',
//        toFixedFix = function (n, prec) {
//            var k = Math.pow(10, prec);
//            return '' + Math.round(n * k) / k;
//        };
//    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
//    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
//    if (s[0].length > 3) {
//        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
//    }
//    if ((s[1] || '').length < prec) {
//        s[1] = s[1] || '';
//        s[1] += new Array(prec - s[1].length + 1).join('0');
//    }
//    return s.join(dec);
//}
//// Bar Chart Example
//var ctx = document.getElementById("CallsThisMonthBar");
//var myBarChart = new Chart(ctx, {
//  type: 'bar',
//  data: {
//    labels: ["Laughing", "Happy", "Normal", "Crying", "Shouting"],
//    datasets: [{
//      label: "Calls",
//      backgroundColor: "#4e73df",
//      hoverBackgroundColor: "#2e59d9",
//      borderColor: "#4e73df",
//      data: [1200, 800, 1000, 50, 150],
//    }],
//  },
//  options: {
//    maintainAspectRatio: false,
//    layout: {
//      padding: {
//        left: 10,
//        right: 25,
//        top: 25,
//        bottom: 0
//      }
//    },
//    scales: {
//      xAxes: [{
//        time: {
//          unit: 'status'
//        },
//        gridLines: {
//          display: false,
//          drawBorder: false
//        },
//        ticks: {
//          maxTicksLimit: 5
//        },
//        maxBarThickness: 35,
//      }],
//      yAxes: [{
//        ticks: {
//          min: 0,
//          max: 2000,
//          maxTicksLimit: 5,
//          padding: 10,
//          callback: function(value, index, values) {
//            return number_format(value);
//          }
//        },
//        gridLines: {
//          color: "rgb(234, 236, 244)",
//          zeroLineColor: "rgb(234, 236, 244)",
//          drawBorder: false,
//          borderDash: [2],
//          zeroLineBorderDash: [2]
//        }
//      }],
//    },
//    legend: {
//      display: false
//    },
//    tooltips: {
//      titleMarginBottom: 10,
//      titleFontColor: '#6e707e',
//      titleFontSize: 14,
//      backgroundColor: "rgb(255,255,255)",
//      bodyFontColor: "#858796",
//      borderColor: '#dddfeb',
//      borderWidth: 1,
//      xPadding: 15,
//      yPadding: 15,
//      displayColors: false,
//      caretPadding: 10,
//      callbacks: {
//        label: function(tooltipItem, chart) {
//          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//              return number_format(tooltipItem.yLabel) + ' ' + datasetLabel;
//        }
//      }
//    },
//  }
//});
