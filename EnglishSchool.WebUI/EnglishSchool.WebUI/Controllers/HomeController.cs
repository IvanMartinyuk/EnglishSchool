using EnglishSchool.Core.Entities;
using EnglishSchool.Infractructure.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace EnglishSchool.WebUI.Controllers
{
    public class HomeController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        public HomeController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> Login(UserLoginDTO user)
        {
            if (ModelState.IsValid)
            {
                var data = _userManager.Users.FirstOrDefault(s => s.Email == user.Email);
                if (data == null)
                {
                    TempData["error"] = "Login failed";
                    return RedirectToAction("Index");
                }

                var f_password = new PasswordHasher<User>().VerifyHashedPassword(data, data.PasswordHash, user.Password);
                var result = await _signInManager.PasswordSignInAsync(data, user.Password, false, false);
                if (result == SignInResult.Success)
                {
                    HttpContext.Session.SetString("UserName", data.UserName);
                    HttpContext.Session.SetString("UserId", data.Id.ToString());
                    ViewData["isLoged"] = true;
                    return RedirectToAction("Index");
                }
                else
                {
                    TempData["error"] = "Login failed";
                    return RedirectToAction("Index");
                }
            }
            TempData["error"] = "Login failed";
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index");
        }

    }
}

