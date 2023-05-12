using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnglishSchool.WebUI.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class TestController : Controller
    {
        public readonly ISchoolDbContext _dbContext;
        public TestController(ISchoolDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> Question(int number)
        {
            Question question = _dbContext.Questions.Include(q => q.Answers).Skip(number - 1).FirstOrDefault();
            foreach (var answer in question.Answers)
                answer.Question = null;
            if (question == null)
                return BadRequest("There is no question with this number");
            return Json(question);
        }
        [HttpGet]
        public async Task<IActionResult> QuestionCount() => Json(_dbContext.Questions.Count());
    }
}
