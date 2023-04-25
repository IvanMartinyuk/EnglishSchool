using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe.Checkout;
using Stripe;
using EnglishSchool.Infractructure.Dto;

namespace EnglishSchool.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class CheckoutController : Controller
    {
        [HttpPost]
        public IActionResult CreateCheckoutSession([FromBody] CheckoutDTO checkout)
        {
            StripeConfiguration.ApiKey = "sk_test_51N0iOGA4Jt9MRG6Q0FqxwgoMiKvLwUhBfpF9ZjsO38hzRaz1of9UEujBpsRotxyleXTpSBU5hgijMVGjMg1epDQO00jdbyFE66";

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
                CancelUrl = checkout.CancelUrl
            };
            var service = new SessionService();
            Session session = service.Create(options);
            
            return Ok(new { Url = session.Url });
        }
    }
}
