using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EnglishSchool.WebUI.Controllers
{
    public class UserConfigureController : Controller
    {
        private readonly ISchoolDbContext _context;
        public UserConfigureController(ISchoolDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var users = await _context.Users
                .Include(u => u.Role)
                .Include(u => u.Tutor)
                .ToListAsync();

            return View(users);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(User user)
        {
            if (ValidateUser(user))
            {
                _context.Users.Add(user);
                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            return View(user);
        }

        public async Task<IActionResult> Edit(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, User user)
        {
            if (id != user.Id)
            {
                return NotFound();
            }

            if (ValidateUser(user))
            {
                var dbUser = _context.Users.Find(user.Id);
                dbUser.Phone = user.Phone;
                dbUser.Login = user.Login;
                dbUser.Email = user.Email;
                dbUser.Birthplace = user.Birthplace;
                dbUser.ClassesLeft = user.ClassesLeft;
                dbUser.EnglishLevel = user.EnglishLevel;
                dbUser.Image = user.Image;
                dbUser.RoleId = user.RoleId;
                dbUser.TutorId = user.TutorId;
                _context.Users.Update(dbUser);
                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            return View(user);
        }

        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }

            return RedirectToAction(nameof(Index));
        }
        public bool ValidateUser(User user)
        {
            return !user.Email.IsNullOrEmpty()
                && !user.Login.IsNullOrEmpty()
                && !user.Phone.IsNullOrEmpty();
        }
    }
}
