using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure.Dto;
using EnglishSchool.WebUI.Hubs;
using Google;
using Microsoft.AspNet.SignalR.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Message = EnglishSchool.Core.Entities.Message;

namespace EnglishSchool.WebUI.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class ChatController : Controller
    {
        private readonly ISchoolDbContext _dbContext;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(ISchoolDbContext dbContext, IHubContext<ChatHub> hubContext)
        {
            _dbContext = dbContext;
            _hubContext = hubContext;
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetChats()
        {
            var userLogin = User.Claims.First().Value;
            var currentUser = _dbContext.Users.FirstOrDefault(user => user.Login == userLogin);
            var chats = _dbContext.Chats
                                  .Include(ch => ch.Users)
                                  .Where(ch => ch.Users.Where(x => x.Id == currentUser.Id).Count() > 0)                                     
                                  .ToList();
            List<ChatDTO> chatdtos = new List<ChatDTO>();
            foreach(var chat in chats)
                foreach(var user in chat.Users)
                    if (user.Id != currentUser.Id 
                        && chatdtos.Where(x => x.TutorName == user.UserName).Count() == 0)
                        chatdtos.Add(new ChatDTO()
                        {
                            TutorId = user.Id,
                            TutorName = user.UserName,
                            ChatId = chat.Id,
                            TutorImage = user.Image
                        });
            return Json(chatdtos);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetMessages(int chatId)
        {
            var messages = _dbContext.Messages
                                        .Where(mess => mess.ChatId == chatId)
                                        .ToList();
            return Json(messages);
        }
    }
}
