using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace EnglishSchool.WebUI.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ISchoolDbContext _context;

        public ChatHub(ISchoolDbContext context)
        {
            _context = context;
        }

        public async Task CreateChat()
        {
            var chat = new Chat();
            _context.Chats.Add(chat);
            _context.SaveChanges();

            await Clients.Caller.SendAsync("ChatCreated", chat.Id);
        }

        public async Task SendMessage(int chatId, int userId, string content)
        {
            var chat = await _context.Chats.FindAsync(chatId);
            if (chat == null)
            {
                return;
            }

            var message = new Message
            {
                Content = content,
                DateTime = DateTime.Now,
                UserId = userId,
                ChatId = chatId
            };

            _context.Messages.Add(message);
            _context.SaveChanges();

            await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", new
            {
                Message = message.Content,
                UserId = userId
            });
        }

        public async Task JoinGroup(int chatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
        }

        public async Task LeaveGroup(int chatId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId.ToString());
        }
    }
}
