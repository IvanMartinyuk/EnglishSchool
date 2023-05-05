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
                string url = await service.CreateMeeting(topic, meeting.Date, duration);
                Lesson newLesson = new Lesson()
                {
                    MeetingUrl = url,
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
        public async Task<IActionResult> GetStudentLessons()
        {
            var userLogin = User.Claims.First().Value;
            var user = _dbContext.Users.FirstOrDefault(us => us.Login == userLogin);
            int tutorId = Convert.ToInt32(user?.TutorId);
            if (user == null)
                return NotFound("User not found");
            var lessons = _dbContext.Lessons.Where(lesson => lesson.StudentId == user.Id).ToList();
            return Json(lessons);
        }
    }
}
