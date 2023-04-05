using AutoMapper;
using Azure.Core;
using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure.Dto;
using EnglishSchool.WebUI.Config;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
                var foundUser = await _userManager.FindByEmailAsync(user.Email);
                if (foundUser != null)
                {
                    var result = await _signInManager.CheckPasswordSignInAsync(foundUser, user.Password, false);
                    if (result.Succeeded)
                    {
                        var claim = await GetClaimsIdentity(foundUser.Login);

                        string token = GetToken(claim);

                        var response = new
                        {
                            token = token,
                            userName = claim.Name,
                            userImage = _dbContext.Users.AsNoTracking().FirstOrDefault(us => us.Email == user.Email)?.Image
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
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetProfile()
        {
            var userLogin = User.Claims.First().Value;

            var currentUser = _dbContext.Users.AsNoTracking().FirstOrDefault(user => user.Login == userLogin);
            return Json(currentUser);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> Update([FromBody] UserRegistrationDto user)
        {
            if(ModelState.IsValid)
            {
                var userLogin = User.Claims.First().Value;
                var currentUser = _dbContext.Users.FirstOrDefault(user => user.Login == userLogin);
                if (!user.Password.IsNullOrEmpty())
                    currentUser.PasswordHash = _userManager.PasswordHasher.HashPassword(currentUser, user.Password);
                currentUser.Email = user.Email;
                currentUser.Phone = user.Phone;
                currentUser.Login = user.Login;
                currentUser.Image = user.Image;
                currentUser.UserName = user.UserName;
                
                var result = await _userManager.UpdateAsync(currentUser);

                currentUser = await _userManager.FindByEmailAsync(currentUser.Email);

                var claim = await GetClaimsIdentity(currentUser.Login);

                string token = GetToken(claim);

                var response = new
                {
                    token = token,
                    userName = claim.Name,
                    userImage = currentUser.Image
                };
                return Json(response);
            }
            return BadRequest("no data");
        }
    }
}
