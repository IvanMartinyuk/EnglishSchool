using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool IsTrue { get; set; }
        public int? QuestionId { get; set; }
        public virtual Question Question { get; set; }
    }
}
