using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Entities
{
    public class Chat
    {
        public int Id { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Message> Messages { get; set; }

    }
}
