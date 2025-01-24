using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockMarketPredection.Models;
using System.Diagnostics;

namespace StockMarketPredection.Controllers
{
	public class HomeController : Controller
	{
        private readonly StockMarketDBContext _context;

        public HomeController(StockMarketDBContext context)
        {
            _context = context;
        }

        public IActionResult Index()
		{
			var companies = _context.Companies.Include(c => c.Category).ToList();

			return View(companies);
		}

		public IActionResult AboutUs()
		{
			return View();
		}

		public IActionResult ContactUs()
		{
			return View();
		}
	}
}
