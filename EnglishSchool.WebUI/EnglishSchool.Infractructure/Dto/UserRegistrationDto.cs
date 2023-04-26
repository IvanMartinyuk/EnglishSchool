using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure.Dto
{
    [Serializable]
    public class UserRegistrationDTO
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public int TutorId { get; set; }
    }
}
