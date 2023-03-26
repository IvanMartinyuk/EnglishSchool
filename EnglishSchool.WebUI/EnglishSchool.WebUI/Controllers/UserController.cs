using AutoMapper;
using Azure.Core;
using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure.Dto;
using EnglishSchool.WebUI.Config;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace EnglishSchool.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class UserController : Controller
    {
        private readonly ISchoolDbContext _dbContext;
        private readonly Mapper _mapper;
        private readonly int _defaultRoleId;
        public UserController(ISchoolDbContext context)
        {
            _dbContext = context;
            _defaultRoleId = context.Roles.FirstOrDefault(r => r.Name == "student").Id;

            MapperConfiguration mconfig = new MapperConfiguration(conf =>
            {
                conf.CreateMap<User, UserRegistrationDto>().ReverseMap();
            });
            _mapper = new Mapper(mconfig);
        }
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] UserRegistrationDto user)
        {
            if (user == null || user.Login.IsNullOrEmpty() || user.Password.IsNullOrEmpty())
                return BadRequest(new { error = "No data received" });
            if (IsUserExist(user.Login))
                return Conflict(new { error = "User with this login is already exist" });
            if (user.RoleId == 0)
                user.RoleId = _defaultRoleId;
            _dbContext.Users.Add(_mapper.Map<UserRegistrationDto, User>(user));
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> Token([FromBody] UserLoginDto user)
        {
            if (user == null || user.Login.IsNullOrEmpty() || user.Password.IsNullOrEmpty())
                return BadRequest(new { error = "No data received" });
            if (!Login(user))
                return Unauthorized(new { error = "Invalid login or password" });
            var claim = await GetClaimsIdentity(user.Login);

            string token = GetToken(claim);

            var response = new
            {
                token = token,
                userLogin = claim.Name
            };
            return Json(response);
        }
        [NonAction]
        private string GetToken(ClaimsIdentity claim)
        {
            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: claim.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);

        }
        [NonAction]
        private async Task<ClaimsIdentity> GetClaimsIdentity(string login)
        {
            var claims = new List<Claim>()
                {
                new Claim(ClaimsIdentity.DefaultNameClaimType, login)
                };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
        [NonAction]
        private bool Login(UserLoginDto user)
        {
            return _dbContext.Users.Any(x => x.Login == user.Login && x.Password == user.Password);
        }
        [NonAction]
        private bool IsUserExist(string login) => _dbContext.Users.Any(x => x.Login == login);
    }
}
