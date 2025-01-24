using ClosedXML.Excel;
using System;
using System.Collections.Generic;
using System.IO;

namespace StockMarketPredection
{
    public class ExcelStockData
    {
        public string CompanyName { get; set; }
        public string Date { get; set; }
        public double ClosePrice { get; set; }
    }

    public class ExcelExportService
    {
        public void ExportToExcel(List<ExcelStockData> stockDataList, string filePath)
        {
            using (var workbook = new XLWorkbook())
            {
                string companyName = stockDataList.FirstOrDefault().CompanyName;
                var worksheet = workbook.Worksheets.Add(companyName);

                worksheet.Cell(1, 1).Value = "Company Name";
                worksheet.Cell(1, 2).Value = "Date";
                worksheet.Cell(1, 3).Value = "Close Price";

                for (int i = 0; i < stockDataList.Count; i++)
                {
                    worksheet.Cell(i + 2, 1).Value = stockDataList[i].CompanyName;
                    worksheet.Cell(i + 2, 2).Value = stockDataList[i].Date; //Date.ToString("yyyy-MM-dd");
                    worksheet.Cell(i + 2, 3).Value = stockDataList[i].ClosePrice;
                }

                workbook.SaveAs(filePath);
            }
        }
    }
}
