using EnglishSchool.Core.Entities;
using EnglishSchool.Core.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace EnglishSchool.Infractructure.Data
{
    public static class SeedingExtensions
    {
        public static async Task DatabaseEnsureCreated(this IApplicationBuilder applicationBuilder)
        {
            using (var scope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<SchoolDbContext>();
                var database = dbContext.Database;
                await database.EnsureCreatedAsync();
            }
        }
        public static async Task DefaultDataFill(this IApplicationBuilder applicationBuilder)
        {
            using (var scope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<SchoolDbContext>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

                if (dbContext.Roles.Count() == 0)
                {
                    dbContext.Roles.Add(new Role() { Name = "student" });
                    dbContext.Roles.Add(new Role() { Name = "tutor" });
                    dbContext.SaveChanges();

                    dbContext.Courses.Add(new Course()
                    {
                        Name = "Minimum",
                        Price = 60,
                        Description = "You will refresh your English and immerse yourself in the online learning process.",
                        ClassesCount = 5,
                        PriceId = "price_1N0nExA4Jt9MRG6Q7TSZmZSv"
                    });
                    dbContext.Courses.Add(new Course()
                    {
                        Name = "Economical",
                        Price = 110,
                        Description = "You will fill the gaps in knowledge and take the first steps in overcoming the language barrier.",
                        ClassesCount = 10,
                        PriceId = "price_1N0nGmA4Jt9MRG6QrfzfQSgg"
                    });
                    dbContext.Courses.Add(new Course()
                    {
                        Name = "Popular",
                        Price = 200,
                        Description = "You will get tangible progress and confidence in your English.",
                        ClassesCount = 20,
                        PriceId = "price_1N0nHIA4Jt9MRG6Qp1fQSvZw"
                    });
                    dbContext.Courses.Add(new Course()
                    {
                        Name = "Advantageous",
                        Price = 450,
                        Description = "You will overcome the language barrier and pump English to a new level.",
                        ClassesCount = 50,
                        PriceId = "price_1N0nHlA4Jt9MRG6QEWWH0tIe"
                    });
                    dbContext.SaveChanges();

                    int tutorRoleId = dbContext.Roles.First(x => x.Name == "tutor").Id;

                    var newUser = new User()
                    {
                        RoleId = tutorRoleId,
                        Phone = "380990000000",
                        Birthplace = "USA",
                        Email = "dani@gmail.com",
                        EnglishLevel = "C2",
                        Image = "https://www.lingoda.com/wp-content/webp-express/webp-images/uploads/2022/05/tw-teacher-slider-dani.png.webp",
                        ClassesLeft = 0,
                        Login = "dani",
                        UserName = "Dani"
                    };
                    await userManager.CreateAsync(newUser, "DaniPassword110-");

                    newUser = new User()
                    {
                        RoleId = tutorRoleId,
                        Phone = "380990000000",
                        Birthplace = "USA",
                        Email = "haitham@gmail.com",
                        EnglishLevel = "C2",
                        Image = "https://www.lingoda.com/wp-content/webp-express/webp-images/uploads/2022/05/tw-teacher-slider-haitham.png.webp",
                        ClassesLeft = 0,
                        Login = "haitham",
                        UserName = "Haitham"
                    };
                    await userManager.CreateAsync(newUser, "HaithamPassword110-");

                    newUser = new User()
                    {
                        RoleId = tutorRoleId,
                        Phone = "380990000000",
                        Birthplace = "UK",
                        Email = "bea@gmail.com",
                        EnglishLevel = "C2",
                        Image = "https://www.lingoda.com/wp-content/webp-express/webp-images/uploads/2022/05/tw-teacher-slider-bea.jpeg.webp",
                        ClassesLeft = 0,
                        Login = "bea",
                        UserName = "Bea"
                    };
                    await userManager.CreateAsync(newUser, "BeaPassword110-");
                }
            }
        }
    }
}
