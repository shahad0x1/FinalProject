using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace StockMarketPredection.Models
{
    public partial class Company
    {
        public Company()
        {
            Predictions = new HashSet<Prediction>();
            StockDatum = new HashSet<StockData>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Symbol { get; set; } = null!;

        [DisplayName("Category")]
        public int CategoryId { get; set; }

        public virtual Category? Category { get; set; } = null!;
        public virtual ICollection<Prediction> Predictions { get; set; }
        public virtual ICollection<StockData> StockDatum { get; set; }
    }
}
