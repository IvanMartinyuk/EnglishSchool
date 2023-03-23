using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure;
using EnglishSchool.Infractructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddStorage(builder.Configuration);
builder.Services.AddCors(c => 
        c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()) );
builder.Services.AddDbContext<ISchoolDbContext, SchoolDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("LocalDbSqlServer")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
await app.DatabaseEnsureCreated();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
