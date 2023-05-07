using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure.Dto;
using EnglishSchool.WebUI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Data;
using System.Data.SqlTypes;
using System.Net;

namespace EnglishSchool.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class LessonController : Controller
    {
        private const string _defaultTopic = "english class";
        private const int _defaultDuration = 40;
        private readonly ISchoolDbContext _dbContext;
        private const int pageCount = 5;
        public LessonController(ISchoolDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GenerateZoom([FromBody]MeetingDTO meeting)
        {
            var userLogin = User.Claims.First().Value;
            var user = _dbContext.Users.FirstOrDefault(us => us.Login == userLogin);
            int tutorId = Convert.ToInt32(user?.TutorId);
            if (user == null)
                return NotFound("User not found");
            if (user.ClassesLeft > 0)
            {
                List<Lesson> lessons = _dbContext.Lessons
                                             .Where(l => l.TutorId == user.TutorId && l.Date > DateTime.Now)
                                             .ToList();
                foreach (var lesson in lessons)
                    if (meeting.Date >= lesson.Date && meeting.Date <= lesson.Date.AddMinutes(_defaultDuration))
                        return BadRequest("This time is not avalible");

                ZoomService service = new ZoomService();
                string topic = meeting.Topic.Length > 0 ? meeting.Topic : _defaultTopic;
                int duration = meeting.Duration > 0 ? meeting.Duration : _defaultDuration;
                Lesson urls = await service.CreateMeeting(topic, meeting.Date, duration);
                Lesson newLesson = new Lesson()
                {
                    MeetingStartUrl = urls.MeetingStartUrl,
                    MeetingJoinUrl = urls.MeetingJoinUrl,
                    StudentId = user.Id,
                    TutorId = tutorId,
                    Date = meeting.Date
                };
                _dbContext.Lessons.Add(newLesson);
                user.ClassesLeft -= 1;
                _dbContext.SaveChanges();
                return Ok();
            }
            return new StatusCodeResult(StatusCodes.Status402PaymentRequired);
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> StudentPrevLessons(int page)
        {
            var userLogin = User.Claims.First().Value;
            var user = _dbContext.Users.FirstOrDefault(us => us.Login == userLogin);
            if (user == null)
                return NotFound("User not found");
            DateTime now = DateTime.Now.AddMinutes(-1 * _defaultDuration);
            now = now.AddHours(-3);
            var lessons = _dbContext.Lessons
                                    .AsNoTracking()
                                    .Include(l => l.Tutor)
                                    .Where(lesson => lesson.StudentId == user.Id
                                                  && (DateTime.Compare(lesson.Date, 
                                                                       now) 
                                                        < 0 
                                                     || !lesson.IsActive))
                                    .OrderByDescending(lesson => lesson.Date)
                                    .Skip(pageCount * (page - 1))
                                    .Take(pageCount)
                                    .ToList();
            return Json(lessons);
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> StudentPrevLessonsCount()
        {
            var userLogin = User.Claims.First().Value;
            var user = _dbContext.Users.FirstOrDefault(us => us.Login == userLogin);
            if (user == null)
                return NotFound("User not found");
            DateTime now = DateTime.Now.AddMinutes(-1 * _defaultDuration);
            now = now.AddHours(-3);
            var lessonsCount = _dbContext.Lessons
                                    .AsNoTracking()
                                    .Include(l => l.Tutor)
                                    .Where(lesson => lesson.StudentId == user.Id
                                                  && (DateTime.Compare(lesson.Date,
                                                                       now)
                                                        < 0
                                                     || !lesson.IsActive))
                                    .Count();
            return Json(lessonsCount);
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> StudentFutureLessons(int page)
        {
            var userLogin = User.Claims.First().Value;
            var user = _dbContext.Users.FirstOrDefault(us => us.Login == userLogin);
            if (user == null)
                return NotFound("User not found");
            DateTime now = DateTime.Now.AddMinutes(-1 * _defaultDuration);
            now = now.AddHours(-3);
            var lessons = _dbContext.Lessons
                                    .AsNoTracking()
                                    .Include(l => l.Tutor)
                                    .Where(lesson => lesson.StudentId == user.Id 
                                                  && DateTime.Compare(lesson.Date, 
                                                                      now)
                                                     >= 0
                                                  && lesson.IsActive)
                                    .OrderByDescending(lesson => lesson.Date)
                                    .Skip(pageCount * (page - 1))
                                    .Take(pageCount)
                                    .ToList();
            return Json(lessons);
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> StudentFutureLessonsCount()
        {
            var userLogin = User.Claims.First().Value;
            var user = _dbContext.Users.FirstOrDefault(us => us.Login == userLogin);
            if (user == null)
                return NotFound("User not found");
            DateTime now = DateTime.Now.AddMinutes(-1 * _defaultDuration);
            now = now.AddHours(-3);
            var lessonsCount = _dbContext.Lessons
                                    .AsNoTracking()
                                    .Include(l => l.Tutor)
                                    .Where(lesson => lesson.StudentId == user.Id
                                                  && DateTime.Compare(lesson.Date,
                                                                      now)
                                                     >= 0
                                                  && lesson.IsActive)
                                    .Count();
            return Json(lessonsCount);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> DeactivateLesson([FromBody] int lessonId)
        {
            var userLogin = User.Claims.First().Value;
            var user = _dbContext.Users.FirstOrDefault(us => us.Login == userLogin);
            if (user == null)
                return NotFound("User not found");
            var lesson = _dbContext.Lessons.FirstOrDefault(less => less.Id == lessonId);
            if (lesson == null)
                return BadRequest("lesson is not found");
            lesson.IsActive = false;
            user.ClassesLeft += 1;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
