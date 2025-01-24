using System;
using System.Collections.Generic;

namespace StockMarketPredection.Models
{
    public partial class StockData
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double OpenPrice { get; set; }
        public double ClosePrice { get; set; }
        public double MaxPrice { get; set; }
        public double MinPrice { get; set; }
        public int CompanyId { get; set; }

        public virtual Company? Company { get; set; } = null!;
    }
}
