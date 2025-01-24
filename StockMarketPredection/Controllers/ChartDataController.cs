using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockMarketPredection.Models;
using StockMarketPredection.Models.DataAnnotation;
using System.ComponentModel.Design;
using System.Text.Json;

namespace StockMarketPredection.Controllers
{
    public class ChartDataController : Controller
    {
        private readonly StockMarketDBContext _context;
        private readonly HttpClient _httpClient;
        private readonly string API_Url = "https://query1.finance.yahoo.com/v8/finance/chart/";
                                         //https://query1.finance.yahoo.com/v8/finance/chart/2222.SR?period1=1693526400&period2=1696118400&interval=1d

        public ChartDataController(StockMarketDBContext context)
        {
            _context = context;
            _httpClient = new HttpClient();
        }

        public IActionResult GetOldMarket()
        {
            var stockDataLastMonth = new[]
            {
                new { Date = 1, StockPrice = 168.42 },
                new { Date = 2, StockPrice = 144.02 },
                new { Date = 3, StockPrice = 114.02 },
                new { Date = 4, StockPrice = 102.06 },
                new { Date = 5, StockPrice = 196.99 },
                new { Date = 6, StockPrice = 183.24 },
                new { Date = 7, StockPrice = 121.23 },
                new { Date = 8, StockPrice = 118.18 },
                new { Date = 9, StockPrice = 118.34 },
                new { Date = 10, StockPrice = 130.42 },
                new { Date = 11, StockPrice = 152.48 },
                new { Date = 12, StockPrice = 143.19 },
                new { Date = 13, StockPrice = 129.12 },
                new { Date = 14, StockPrice = 161.19 },
                new { Date = 15, StockPrice = 113.95 },
                new { Date = 16, StockPrice = 129.21 },
                new { Date = 17, StockPrice = 136.64 },
                new { Date = 18, StockPrice = 145.61 },
                new { Date = 19, StockPrice = 178.52 },
                new { Date = 20, StockPrice = 119.97 },
                new { Date = 21, StockPrice = 151.42 },
                new { Date = 22, StockPrice = 159.24 },
                new { Date = 23, StockPrice = 104.65 },
                new { Date = 24, StockPrice = 160.75 },
                new { Date = 25, StockPrice = 117.05 },
                new { Date = 26, StockPrice = 106.51 },
                new { Date = 27, StockPrice = 194.89 },
                new { Date = 28, StockPrice = 196.56 },
                new { Date = 29, StockPrice = 180.84 },
                new { Date = 30, StockPrice = 130.46 },
                new { Date = 31, StockPrice = 109.77 }
            };
            return Ok(stockDataLastMonth);
        }

        public IActionResult GetPredictedMarket()
        {
            var stockData = new[]
            {
                new { Date = "2024-09-01", StockPrice = 137.45 },
                new { Date = "2024-09-02", StockPrice = 195.07 },
                new { Date = "2024-09-03", StockPrice = 173.20 },
                new { Date = "2024-09-04", StockPrice = 159.87 },
                new { Date = "2024-09-05", StockPrice = 115.60 },
                new { Date = "2024-09-06", StockPrice = 115.60 },
                new { Date = "2024-09-07", StockPrice = 105.81 },
                new { Date = "2024-09-08", StockPrice = 186.62 },
                new { Date = "2024-09-09", StockPrice = 160.11 },
                new { Date = "2024-09-10", StockPrice = 170.81 }
            };

            // Create a new list to hold the updated data with Color and HoverColor properties
            var predictedStockData = new List<dynamic>();

            // Loop through the stockData to add Color and HoverColor
            for (int i = 0; i < stockData.Length; i++)
            {
                var currentDay = stockData[i];
                string color, hoverColor;

                if (i == 0)
                {
                    color = "green";
                    hoverColor = "lightgreen";
                }
                else
                {
                    var previousDay = stockData[i - 1];

                    if (currentDay.StockPrice >= previousDay.StockPrice)
                    {
                        color = "green";
                        hoverColor = "lightgreen";
                    }
                    else
                    {
                        color = "red";
                        hoverColor = "lightcoral";
                    }
                }

                var updatedDay = new
                {
                    Date = currentDay.Date,
                    StockPrice = currentDay.StockPrice,
                    Color = color,
                    HoverColor = hoverColor
                };

                predictedStockData.Add(updatedDay);
            }

            return Ok(predictedStockData);
        }

        public class ApiStockData
        {
            public string Date { get; set; }
            public double ClosePrice { get; set; }
        }

        public async void MarketsToExcel(string symbol, Company company)
        {
            string url = API_Url + symbol + "?period1=1697835600&period2=1729458000&interval=1d";

            try
            {
                _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

                var exResponse = await _httpClient.GetAsync(url);
                if (exResponse.IsSuccessStatusCode)
                {
                    string exResponseData = await exResponse.Content.ReadAsStringAsync();
                    var exApiResponse = JsonSerializer.Deserialize<ApiResponse>(exResponseData);

                    var exResult = exApiResponse.Chart.Result[0];
                    var extimestamps = exResult.Timestamps;
                    var exclosePrices = exResult.Indicators.Quotes[0].Close;

                    List<ExcelStockData> excelStockDataList = new List<ExcelStockData>();

                    for (int i = 0; i < extimestamps.Count; i++)
                    {
                        if (exclosePrices[i] != null)
                        {
                            excelStockDataList.Add(new ExcelStockData
                            {
                                CompanyName = company.Name,
                                Date = DateTimeOffset.FromUnixTimeSeconds(extimestamps[i]).Date.ToShortDateString(),
                                ClosePrice = (double)exclosePrices[i]
                            });
                        }
                    }

                    string filePath = @"C:\Users\AMCT\source\repos\StockMarketPredection\" + company.Name + ".xlsx";

                    var excelService = new ExcelExportService();
                    excelService.ExportToExcel(excelStockDataList, filePath);
                    Console.WriteLine("Data exported successfully.");
                }
                Console.WriteLine(exResponse.StatusCode.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public async Task<IActionResult> GetTop10Markets(string symbol)
        {
            var (startDateTimestamp, endDateTimestamp) = GetLastMonthUnixTimestamps();
            string url = API_Url + symbol + "?period1=" + startDateTimestamp + "&period2=" + endDateTimestamp + "&interval=1d";

            try
            {
                _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

                var response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var company = await _context.Companies.FirstOrDefaultAsync(c => symbol.Contains(c.Symbol));

                    string responseData = await response.Content.ReadAsStringAsync();
                    var apiResponse = JsonSerializer.Deserialize<ApiResponse>(responseData);

                    var result = apiResponse.Chart.Result[0];
                    var timestamps = result.Timestamps;
                    var openPrices = result.Indicators.Quotes[0].Open;
                    var closePrices = result.Indicators.Quotes[0].Close;
                    var highPrices = result.Indicators.Quotes[0].High;
                    var lowPrices = result.Indicators.Quotes[0].Low;

                    List<StockData> stockDataList = new List<StockData>();
                    List<ApiStockData> apiStockDataList = new List<ApiStockData>();

                    for (int i = 0; i < timestamps.Count; i++)
                    {
                        stockDataList.Add(new StockData
                        {
                            Date = DateTimeOffset.FromUnixTimeSeconds(timestamps[i]).Date,
                            OpenPrice = (double)openPrices[i],
                            ClosePrice = (double)closePrices[i],
                            MaxPrice = (double)highPrices[i],
                            MinPrice = (double)lowPrices[i],
                            CompanyId = company.Id
                        });

                        apiStockDataList.Add(new ApiStockData
                        {
                            Date = DateTimeOffset.FromUnixTimeSeconds(timestamps[i]).Date.ToShortDateString(),
                            ClosePrice = (double)closePrices[i]
                        });
                    }

                    //MarketsToExcel(symbol, company);
                    return Ok(apiStockDataList);
                }
                return Problem(response.StatusCode.ToString());
            }
            catch (Exception ex)
            {
                return Problem(ex.ToString());
            }
        }

        public static long ConvertToUnixTimestamp(DateTime date)
        {
            return ((DateTimeOffset)date).ToUnixTimeSeconds();
        }

        public static (long startDateTimestamp, long endDateTimestamp) GetLastMonthUnixTimestamps()
        {
            DateTime currentDate = DateTime.UtcNow;

            DateTime oneMonthAgo = currentDate.AddMonths(-1);

            long endDateTimestamp = ConvertToUnixTimestamp(currentDate);
            long startDateTimestamp = ConvertToUnixTimestamp(oneMonthAgo);

            return (startDateTimestamp, endDateTimestamp);
        }

    }
}