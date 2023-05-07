using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Entities
{
    public class Lesson
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int StudentId { get; set; }
        public User Student { get; set; }
        public int TutorId { get; set; }
        public User Tutor { get; set; }
        public string MeetingStartUrl { get; set; }
        public string MeetingJoinUrl { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
