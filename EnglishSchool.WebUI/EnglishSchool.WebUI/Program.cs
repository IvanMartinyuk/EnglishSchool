using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure;
using EnglishSchool.Infractructure.Data;
using EnglishSchool.WebUI;
using EnglishSchool.WebUI.Config;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(c =>
        c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Login";
    options.AccessDeniedPath = "/Login/AccessDenied";

});
builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
                }).AddCookie()
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = AuthOptions.ISSUER,
                        ValidateAudience = true,
                        ValidAudience = AuthOptions.AUDIENCE,
                        ValidateLifetime = true,
                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true
                    };
                });
builder.Services.AddMvc()
       .AddSessionStateTempDataProvider();
builder.Services.AddSession();
builder.Services.AddControllers();
builder.Services.AddDbContext<ISchoolDbContext, SchoolDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("LocalDbSqlServer")));

builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
{
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.�����������������������������������������կԲ�������ƪ���������'";
})
 .AddEntityFrameworkStores<SchoolDbContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

await app.DatabaseEnsureCreated();
await app.DefaultDataFill();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseSession();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();