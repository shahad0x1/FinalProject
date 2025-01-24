using System;
using System.Collections.Generic;

namespace StockMarketPredection.Models
{
    public partial class UserPreference
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }

        public virtual Category? Category { get; set; } = null!;
        public virtual User? User { get; set; } = null!;
    }
}
