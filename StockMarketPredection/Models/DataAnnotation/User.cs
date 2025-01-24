using System.ComponentModel.DataAnnotations;

namespace StockMarketPredection.Models
{
    public partial class User
    {
        [EmailAddress(ErrorMessage = "Invalid email address")]
        //[RegularExpression(@"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$", ErrorMessage = "Invalid email address.")]
        public string Email { get; set; } = null!;

        [DataType(DataType.Password)]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one digit")]
        public string Password { get; set; } = null!;
    }
}
