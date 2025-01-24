using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockMarketPredection.Models;
using System.Security.Claims;

namespace StockMarketPredection.Controllers
{
    [Authorize]
    public class MarketController : Controller
    {
        private readonly StockMarketDBContext _context;

        public MarketController(StockMarketDBContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            int userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));
            List<Company> companies = new List<Company>();

            var preferences = await _context.UserPreferences.Where(up => up.UserId == userId).ToListAsync();

            foreach(var up in preferences)
            {
                var com = await _context.Companies.Where(c => c.CategoryId == up.CategoryId).Include(c => c.Category).ToListAsync();
                companies.AddRange(com);
            }
            
            if(companies.Any())
            {
                return View(companies);
            }
            return View();
        }
    }
}
