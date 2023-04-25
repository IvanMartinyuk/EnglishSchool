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

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(c =>
        c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
                })
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
                })
                .AddGoogle(options =>
                {
                    options.ClientId = "<Your Google Client ID>";
                    options.ClientSecret = "<Your Google Client Secret>";
                });

builder.Services.AddControllers();
builder.Services.AddDbContext<ISchoolDbContext, SchoolDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("LocalDbSqlServer")));

builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
{
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.éöóêåíãøùçõ¿ô³âàïğîëäæºÿ÷ñìèòüáşÉÖÓÊÅÍÃØÙÇÕ¯Ô²ÂÀÏĞÎËÄÆªß×ÑÌÈÒÜÁŞ'";
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

app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
