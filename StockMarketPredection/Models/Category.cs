using System;
using System.Collections.Generic;

namespace StockMarketPredection.Models
{
    public partial class Category
    {
        public Category()
        {
            Companies = new HashSet<Company>();
            UserPreferences = new HashSet<UserPreference>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? FaClass { get; set; }

        public virtual ICollection<Company> Companies { get; set; }
        public virtual ICollection<UserPreference> UserPreferences { get; set; }
    }
}
