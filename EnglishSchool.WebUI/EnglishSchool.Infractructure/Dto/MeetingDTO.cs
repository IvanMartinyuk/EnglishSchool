using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure.Dto
{
    public class MeetingDTO
    {
        public DateTime Date { get; set; }
        public string Topic { get; set; } = "";
        public int Duration { get; set; } = 0;
    }
}
