// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
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

document.addEventListener('DOMContentLoaded', function () {

    var tca = document.getElementById("OldMarketArea");
    if (tca) {
        var url = "/ChartData/GetOldMarket";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                var labels = data.map(item => item.date);
                var prices = data.map(item => item.stockPrice);

                var oldMarketAreaChart = new Chart(tca, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Stock Price",
                            lineTension: 0.3,
                            backgroundColor: "rgba(78, 115, 223, 0.05)",
                            borderColor: "rgba(78, 115, 223, 1)",
                            pointRadius: 3,
                            pointBackgroundColor: "rgba(78, 115, 223, 1)",
                            pointBorderColor: "rgba(78, 115, 223, 1)",
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                            pointHitRadius: 10,
                            pointBorderWidth: 2,
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
                                    unit: 'day'
                                },
                                gridLines: {
                                    display: false,
                                    drawBorder: false
                                },
                                ticks: {
                                    maxTicksLimit: 31
                                }
                            }],
                            yAxes: [{
                                ticks: {
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
                            backgroundColor: "rgb(255,255,255)",
                            bodyFontColor: "#858796",
                            titleMarginBottom: 10,
                            titleFontColor: '#6e707e',
                            titleFontSize: 14,
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            xPadding: 15,
                            yPadding: 15,
                            displayColors: false,
                            intersect: false,
                            mode: 'index',
                            caretPadding: 10,
                            callbacks: {
                                label: function (tooltipItem, chart) {
                                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                                    return datasetLabel + ': ' + tooltipItem.yLabel;
                                }
                            }
                        }
                    }
                });
            });
    }    
});

// Total Calls Area Chart Example
//var tca = document.getElementById("TotalCallsArea");
//var totalCallsAreaChart = new Chart(tca, {
//  type: 'line',
//  data: {
//    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//    datasets: [{
//      label: "Calls",
//      lineTension: 0.3,
//      backgroundColor: "rgba(78, 115, 223, 0.05)",
//      borderColor: "rgba(78, 115, 223, 1)",
//      pointRadius: 3,
//      pointBackgroundColor: "rgba(78, 115, 223, 1)",
//      pointBorderColor: "rgba(78, 115, 223, 1)",
//      pointHoverRadius: 2,
//      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
//      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
//      pointHitRadius: 10,
//      pointBorderWidth: 2,
//      data: [0, 4552, 5322, 1256, 1930, 2050, 1567, 4570, 2500, 3200, 5090, 7306],
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
//          unit: 'month'
//        },
//        gridLines: {
//          display: false,
//          drawBorder: false
//        },
//        ticks: {
//          maxTicksLimit: 12
//        }
//      }],
//      yAxes: [{
//        ticks: {
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
//      backgroundColor: "rgb(255,255,255)",
//      bodyFontColor: "#858796",
//      titleMarginBottom: 10,
//      titleFontColor: '#6e707e',
//      titleFontSize: 14,
//      borderColor: '#dddfeb',
//      borderWidth: 1,
//      xPadding: 15,
//      yPadding: 15,
//      displayColors: false,
//      intersect: false,
//      mode: 'index',
//      caretPadding: 10,
//      callbacks: {
//        label: function(tooltipItem, chart) {
//          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//          return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
//        }
//      }
//    }
//  }
//});

// Bad Calls Area Chart Example
//var bca = document.getElementById("BadCallsArea");
//var badCallsAreaChart = new Chart(bca, {
//    type: 'line',
//    data: {
//        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//        datasets: [{
//            label: "Bad Calls",
//            lineTension: 0.3,
//            backgroundColor: "rgba(78, 115, 223, 0.05)",
//            borderColor: "rgba(78, 115, 223, 1)",
//            pointRadius: 3,
//            pointBackgroundColor: "rgba(78, 115, 223, 1)",
//            pointBorderColor: "rgba(78, 115, 223, 1)",
//            pointHoverRadius: 2,
//            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
//            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
//            pointHitRadius: 10,
//            pointBorderWidth: 2,
//            data: [0, 1790, 2850, 420, 321, 374, 231, 128, 84, 200, 173, 62],
//        }],
//    },
//    options: {
//        maintainAspectRatio: false,
//        layout: {
//            padding: {
//                left: 10,
//                right: 25,
//                top: 25,
//                bottom: 0
//            }
//        },
//        scales: {
//            xAxes: [{
//                time: {
//                    unit: 'month'
//                },
//                gridLines: {
//                    display: false,
//                    drawBorder: false
//                },
//                ticks: {
//                    maxTicksLimit: 12
//                }
//            }],
//            yAxes: [{
//                ticks: {
//                    maxTicksLimit: 5,
//                    padding: 10,
//                    callback: function (value, index, values) {
//                        return number_format(value);
//                    }
//                },
//                gridLines: {
//                    color: "rgb(234, 236, 244)",
//                    zeroLineColor: "rgb(234, 236, 244)",
//                    drawBorder: false,
//                    borderDash: [2],
//                    zeroLineBorderDash: [2]
//                }
//            }],
//        },
//        legend: {
//            display: false
//        },
//        tooltips: {
//            backgroundColor: "rgb(255,255,255)",
//            bodyFontColor: "#858796",
//            titleMarginBottom: 10,
//            titleFontColor: '#6e707e',
//            titleFontSize: 14,
//            borderColor: '#dddfeb',
//            borderWidth: 1,
//            xPadding: 15,
//            yPadding: 15,
//            displayColors: false,
//            intersect: false,
//            mode: 'index',
//            caretPadding: 10,
//            callbacks: {
//                label: function (tooltipItem, chart) {
//                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
//                    return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
//                }
//            }
//        }
//    }
//});
