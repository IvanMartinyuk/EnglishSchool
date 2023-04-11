using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EnglishSchool.WebUI.Config
{
    public class AuthOptions
    {
        public const string ISSUER = "MyServer";
        public const string AUDIENCE = "MyClient";
        const string KEY = "SomeKeySomeKeySomeKey";
        public const int LIFETIME = 50;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
