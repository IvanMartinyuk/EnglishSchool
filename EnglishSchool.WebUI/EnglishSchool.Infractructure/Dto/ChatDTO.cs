using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure.Dto
{
    [Serializable]
    public class ChatDTO
    {
        public string TutorName { get; set; }
        public string TutorImage { get; set; }
        public int ChatId { get; set; }
        public int TutorId { get; set; }
    }
}
