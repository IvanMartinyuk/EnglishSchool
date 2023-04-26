using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
