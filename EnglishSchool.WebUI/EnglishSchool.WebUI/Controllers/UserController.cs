using AutoMapper;
using Azure.Core;
using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure.Dto;
using EnglishSchool.WebUI.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Google.Apis.Auth;
using TokenResponse = EnglishSchool.Infractructure.Dto.TokenResponse;

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
        private const string _defaultPhone = "380990000000";
        private const string minEnglishLevel = "A1";
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
        public async Task<IActionResult> GoogleLogin([FromBody] string token)
        {
            var payload = new GoogleJsonWebSignature.Payload();
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(token, new GoogleJsonWebSignature.ValidationSettings());
            }
            catch (InvalidJwtException)
            {
                return BadRequest("Invalid token");
            }

            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user != null)
                return Json(await GenerateToken(user));

            user = new User
            {
                Email = payload.Email,
                Login = payload.Name,
                Image = payload.Picture,
                UserName = payload.GivenName,
                Phone = _defaultPhone,
                RoleId = _defaultRoleId,
                EnglishLevel = minEnglishLevel,
                Birthplace = string.Empty
            };
            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            user = await _userManager.FindByEmailAsync(payload.Email);

            return Json(await GenerateToken(user));
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
                        return Json(await GenerateToken(foundUser));
                }
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            }
            return NotFound("user not found");
            
        }
        [NonAction]
        private async Task<TokenResponse> GenerateToken(User user)
        {
            var claim = await GetClaimsIdentity(user.Login);

            string token = GetToken(claim);

            var response = new TokenResponse()
            {
                Token = token,
                UserName = claim.Name,
                UserImage = user.Image
            };
            return response;
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
                if (currentUser == null)
                    return NotFound("User not found");
                if (!user.Password.IsNullOrEmpty())
                    currentUser.PasswordHash = _userManager.PasswordHasher.HashPassword(currentUser, user.Password);
                currentUser.Email = user.Email;
                currentUser.Phone = user.Phone;
                currentUser.Login = user.Login;
                currentUser.Image = user.Image;
                currentUser.UserName = user.UserName;
                
                var result = await _userManager.UpdateAsync(currentUser);

                if (result.Succeeded)
                    return Json(await GenerateToken(currentUser));
                return BadRequest("Saving error");
            }
            return BadRequest("no data");
        }
        [HttpGet]
        public async Task<IActionResult> TutorList(int tutorsCount = 3)
        {
            Role? tutorRole = _dbContext.Roles.FirstOrDefault(role => role.Name == "tutor");
            if (tutorRole != null)
            {
                var tutors = _dbContext.Users
                                       .Where(user => user.RoleId == tutorRole.Id)
                                       .Select(user => new { 
                                                                id = user.Id, 
                                                                name = user.UserName, 
                                                                image = user.Image,
                                                                birthplace = user.Birthplace,
                                                                englishLevel = user.EnglishLevel
                                                            })
                                       .Take(tutorsCount)
                                       .ToList();
                return Json(tutors);
            }
            return NotFound("There are no tutors");
        }
    }
}
