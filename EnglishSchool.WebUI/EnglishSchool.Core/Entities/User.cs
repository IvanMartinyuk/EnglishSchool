using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Entities
{
    public class User
    {
        public int Id { get; set; }        
        public string Login { get; set; }        
        public string Password { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public int CourseId { get; set; }
        public virtual Course ChoosedCourse { get; set; }
        public int TutorId { get; set; }
        public virtual User Tutor { get; set; }
        public virtual ICollection<User> Students { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set;  }
        public virtual ICollection<Payment> Payments { get; set;  }
    }
}
