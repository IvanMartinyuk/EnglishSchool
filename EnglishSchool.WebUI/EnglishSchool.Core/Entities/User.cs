using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Entities
{    
    public class User : IdentityUser<int>
    {     
        public string Login { get; set; }
        public string Image { get; set; }
        public string Phone { get; set; }
        public string Birthplace { get; set; }
        public string EnglishLevel { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public int ClessesLeft { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public int? TutorId { get; set; }
        public virtual User Tutor { get; set; }
        public virtual ICollection<User> Students { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set;  }
        public virtual ICollection<Payment> Payments { get; set;  }
    }
}
