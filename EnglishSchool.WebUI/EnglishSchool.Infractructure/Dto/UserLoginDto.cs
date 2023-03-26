using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure.Dto
{
    [Serializable]
    public class UserLoginDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
