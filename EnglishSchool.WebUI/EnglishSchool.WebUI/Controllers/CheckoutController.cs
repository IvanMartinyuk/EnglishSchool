using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe.Checkout;
using Stripe;
using EnglishSchool.Infractructure.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Core.Entities;

namespace EnglishSchool.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class CheckoutController : Controller
    {
        private const string secretKey = "sk_test_51N0iOGA4Jt9MRG6Q0FqxwgoMiKvLwUhBfpF9ZjsO38hzRaz1of9UEujBpsRotxyleXTpSBU5hgijMVGjMg1epDQO00jdbyFE66";
        private readonly ISchoolDbContext _dbContext;
        public CheckoutController(ISchoolDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public IActionResult CreateCheckoutSession([FromBody] CheckoutDTO checkout)
        {
            var userLogin = User.Claims.First().Value;
            var currentUser = _dbContext.Users.FirstOrDefault(user => user.Login == userLogin);
            StripeConfiguration.ApiKey = secretKey;

            var options = new SessionCreateOptions()
            {
                LineItems = new List<SessionLineItemOptions>()
                {
                    new SessionLineItemOptions() {
                        Price = checkout.PriceId,
                        Quantity = 1
                    }
                },
                PaymentMethodTypes = new List<string>() {
                    "card"
                },
                Mode = "payment",
                SuccessUrl = checkout.SuccessUrl,
                CancelUrl = checkout.CancelUrl,
                CustomerEmail = currentUser?.Email
            };
            var service = new SessionService();
            Session session = service.Create(options);
            
            return Ok(new { Url = session.Url });
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public IActionResult SavePayment([FromBody] int courseId)
        {
            var userLogin = User.Claims.First().Value;
            var currentUser = _dbContext.Users.FirstOrDefault(user => user.Login == userLogin);
            if (currentUser == null)
                return BadRequest("User not found");
            var course = _dbContext.Courses.FirstOrDefault(c => c.Id == courseId);
            if (course == null)
                return BadRequest("Course not found");
                           
            currentUser.ClassesLeft += course.ClassesCount;
            _dbContext.Payments.Add(new Payment()
            {
                CourseId = courseId,
                StudentId = currentUser.Id,
                Price = course.Price,
                Date = DateTime.Now
            });
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
