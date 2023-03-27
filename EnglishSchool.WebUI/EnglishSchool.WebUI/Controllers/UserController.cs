using AutoMapper;
using Azure.Core;
using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure.Dto;
using EnglishSchool.WebUI.Config;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BCryptNet = BCrypt.Net.BCrypt;

namespace EnglishSchool.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class UserController : Controller
    {
        private readonly ISchoolDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly Mapper _mapper;
        private readonly int _defaultRoleId;
        public UserController(ISchoolDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _dbContext = context;
            _defaultRoleId = context.Roles.FirstOrDefault(r => r.Name == "student").Id;
            _userManager = userManager;
            _signInManager = signInManager;

            MapperConfiguration mconfig = new MapperConfiguration(conf =>
            {
                conf.CreateMap<User, UserRegistrationDto>().ReverseMap();
            });
            _mapper = new Mapper(mconfig);
        }
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] UserRegistrationDto user)
        {
            if(ModelState.IsValid)
            {
                User newUser = _mapper.Map<UserRegistrationDto, User>(user);
                if (newUser.RoleId == 0)
                    newUser.RoleId = _defaultRoleId;

                IdentityResult result = await _userManager.CreateAsync(newUser, user.Password);
                if (result.Succeeded)
                {
                    User u = await _userManager.FindByEmailAsync(user.Email);
                    await _userManager.AddToRoleAsync(u, "student");

                    return Ok();
                }
                return BadRequest(result.Errors.Select(x => x.Description));
            }
            return BadRequest("NotValid");
        }
        [HttpPost]
        public async Task<IActionResult> Token([FromBody] UserLoginDto user)
        {
            if (ModelState.IsValid)
            {
                var foundUser = await _userManager.FindByEmailAsync(user.Login);
                if (foundUser != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(foundUser.Login, user.Password, false, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        var claim = await GetClaimsIdentity(user.Login);

                        string token = GetToken(claim);

                        var response = new
                        {
                            token = token,
                            userLogin = claim.Name
                        };
                        return Json(response);
                    }
                }
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }
            return NotFound("user not found");
            
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
            return _dbContext.Users.Any(x => x.Login.Equals(user.Login) && x.Password.Equals(user.Password));
        }
        [NonAction]
        private bool IsUserExist(string login) => _dbContext.Users.Any(x => x.Login == login);
    }
}
