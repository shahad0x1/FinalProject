using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace StockMarketPredection.Models
{
    public partial class User
    {
        public User()
        {
            UserPreferences = new HashSet<UserPreference>();
        }

        public int Id { get; set; }
        [DisplayName("First Name")]
        public string FirstName { get; set; } = null!;
        [DisplayName("Last Name")]
        public string LastName { get; set; } = null!;
        public DateTime RegisterationDate { get; set; }

        public virtual ICollection<UserPreference> UserPreferences { get; set; }
    }
}
