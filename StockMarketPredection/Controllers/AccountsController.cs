using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StockMarketPredection.Models;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace StockMarketPredection.Controllers
{
	public class AccountsController : Controller
	{
		public static string CreateHash(string password)
		{
			byte[] secretKey = Encoding.UTF8.GetBytes("key#%&12KEY");
			var SHA256 = new System.Security.Cryptography.HMACSHA256(secretKey);
			var data = Encoding.ASCII.GetBytes(password);
			data = SHA256.ComputeHash(data);
			return Encoding.ASCII.GetString(data);
		}

		public IActionResult Register()
		{
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> Register(User userInfo)
		{
			try
			{
				if (ModelState.IsValid)
				{
					userInfo.Password = CreateHash(userInfo.Password);
					userInfo.RegisterationDate = DateTime.Now;

					StockMarketDBContext db = new StockMarketDBContext();
					db.Users.Add(userInfo);
					await db.SaveChangesAsync();

                    return RedirectToAction("RegisterPreferences", "Accounts", new { id = userInfo.Id });
				}
				return View();
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex);
				return View();
			}
		}
		
		public IActionResult RegisterPreferences(int id)
		{
			ViewData["UserId"] = id;
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> RegisterPreferences(int userId, List<int> preferences)
		{
			try
			{
                StockMarketDBContext db = new StockMarketDBContext();

                foreach (var pref in preferences)
                {
                    UserPreference userPreference = new UserPreference()
                    {
                        UserId = userId,
                        CategoryId = pref
                    };
                    db.UserPreferences.Add(userPreference);
                }
                await db.SaveChangesAsync();

                return RedirectToAction("Login", "Accounts");
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex);
				return View();
			}
		}

		public IActionResult Login()
		{
            ViewData["ErrorMsg"] = "";
            return View();
		}

		[HttpPost]
		public async Task<IActionResult> Login(User userInfo)
		{
			if (userInfo.Email != null && userInfo.Password != null)
			{
				StockMarketDBContext db = new StockMarketDBContext();
				userInfo.Password = CreateHash(userInfo.Password);
				User? login = db.Users.FirstOrDefault(log => log.Email == userInfo.Email && log.Password == userInfo.Password);
				if (login != null)
				{
					//A claim is a statement about a subject by an issuer and
					//represent attributes of the subject that are useful in the context of authentication and authorization operations.
					var claims = new List<Claim>() {
					new Claim(ClaimTypes.NameIdentifier,Convert.ToString(login.Id)),
					new Claim(ClaimTypes.Name,login.FirstName + " " + login.LastName),
					new Claim(ClaimTypes.Email,login.Email)
					};
					//Initialize a new instance of the ClaimsIdentity with the claims and authentication scheme
					var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
					//Initialize a new instance of the ClaimsPrincipal with ClaimsIdentity
					var principal = new ClaimsPrincipal(identity);
					//SignInAsync is a Extension method for Sign in a principal for the specified scheme.
					await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
						 principal, new AuthenticationProperties() { IsPersistent = true });

					if (login.Email == "Admin@StockMarket.com")
					{
                        return RedirectToAction("Index", "Home");
                    }
                    return RedirectToAction("Index", "Market");
                }
				else
				{
                    ViewData["ErrorMsg"] = "Invalid Login Information";
                    return View();
                }
			}
            ViewData["ErrorMsg"] = "Invalid Login Information";
            return View();
		}

        List<int> oldPreferencesIDs = new List<int>();

        public IActionResult Profile()
		{
			int userId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));

            StockMarketDBContext db = new StockMarketDBContext();
            var user = db.Users.FirstOrDefault(u => u.Id == userId);

			var userPreferences = db.UserPreferences.Where(up => up.UserId == userId);
			
			foreach(var up in userPreferences)
			{
                oldPreferencesIDs.Add(up.CategoryId);
			}

			if(user.Email != "Admin@StockMarket.com")
			{
				ViewData["PreferencesIDs"] = oldPreferencesIDs;
			}

            return View(user);
		}

		[HttpPost]
		public async Task<IActionResult> Profile(User userInfo, List<int> preferences)
		{
			try
			{
                StockMarketDBContext db = new StockMarketDBContext();
                var user = await db.Users.FirstOrDefaultAsync(user => user.Id == userInfo.Id);

                user.Password = string.IsNullOrEmpty(userInfo.Password) ? user.Password : CreateHash(userInfo.Password);
                user.FirstName = userInfo.FirstName;
                user.LastName = userInfo.LastName;
                user.Email = userInfo.Email;

                db.Update(user);
                await db.SaveChangesAsync();

                var userPreferences = db.UserPreferences.Where(up => up.UserId == user.Id);
                db.UserPreferences.RemoveRange(userPreferences);

                foreach (var pref in preferences)
                {
                    UserPreference userPreference = new UserPreference()
                    {
                        UserId = userInfo.Id,
                        CategoryId = pref
                    };
                    db.UserPreferences.Add(userPreference);
                }
                await db.SaveChangesAsync();
                return RedirectToAction("Index", "Home");
            }
			catch
			{
				return View(userInfo);
            }
        }

		public async Task<IActionResult> LogOut()
		{
			//SignOutAsync is Extension method for SignOut
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			//Redirect to home page
			return RedirectToAction("Index", "Home");
		}

	}
}
