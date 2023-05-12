using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EnglishSchool.WebUI.Controllers
{
    public class CourseConfigureController : Controller
    {
        private readonly ISchoolDbContext _context;

        public CourseConfigureController(ISchoolDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var courses = _context.Courses.ToList();
            return View(courses);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Course course)
        {
            if (ValidateCourse(course))
            {
                _context.Courses.Add(course);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(course);
        }

        public IActionResult Edit(int id)
        {
            var course = _context.Courses.FirstOrDefault(c => c.Id == id);
            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }

        [HttpPost]
        public IActionResult Edit(Course course)
        {
            if (ValidateCourse(course))
            {
                _context.Courses.Update(course);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(course);
        }

        public IActionResult Delete(int id)
        {
            var course = _context.Courses.FirstOrDefault(c => c.Id == id);
            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }

        [HttpPost]
        public IActionResult Delete(int id, Course course)
        {
            var existingCourse = _context.Courses.FirstOrDefault(c => c.Id == id);
            if (existingCourse == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(existingCourse);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
        private bool ValidateCourse(Course course)
        {
            return !course.Name.IsNullOrEmpty()
                && !course.Description.IsNullOrEmpty()
                && course.ClassesCount > 0
                && course.Price > 0;
        }
    }
}
