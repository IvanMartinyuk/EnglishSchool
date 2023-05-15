using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateTime { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int? ChatId { get; set; }
        public virtual Chat Chat { get; set; }
    }
}
