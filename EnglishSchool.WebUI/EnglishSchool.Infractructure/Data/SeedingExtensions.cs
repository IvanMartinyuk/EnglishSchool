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

                    var question = new Question() { Content = "We are __________ a party at my apartment. Would you like to come?This question is required." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "having", IsTrue = true, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "have", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "to have", IsTrue = false, QuestionId = question.Id });

                    question = new Question() { Content = "Peter loves his students and he is __________ favourite teacher." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "his", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "their", IsTrue = true, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "its", IsTrue = false, QuestionId = question.Id });                    

                    question = new Question() { Content = "Peter: Can I smoke in here? Cameron: No, you can't do that inside. You __________ go outside.This question is required." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "must", IsTrue = true, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "shouldn't", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "can", IsTrue = false, QuestionId = question.Id });
                    
                    question = new Question() { Content = "The phone's ringing!This question is required." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "I'll get it", IsTrue = true, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "I get it", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "I'm going to get it", IsTrue = false, QuestionId = question.Id });
                    
                    question = new Question() { Content = "Maria has been working at the company __________ seven years. Now, she's head of HR.This question is required." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "from", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "for", IsTrue = true, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "since", IsTrue = false, QuestionId = question.Id });
                    
                    question = new Question() { Content = "Freddie couldn't come to the meeting last Wednesday. He __________ for his business trip to India by then.This question is required." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "had already left", IsTrue = true, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "already left", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "has already left", IsTrue = false, QuestionId = question.Id });
                    
                    question = new Question() { Content = "I love reading posts on social media __________ me laugh.This question is required." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "which make", IsTrue = true, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "make", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "that they make", IsTrue = false, QuestionId = question.Id });
                    
                    question = new Question() { Content = "She thought she could stay at her friend's place while her bathroom __________." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "was being repaired", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "have been repaired", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "has been repaired", IsTrue = true, QuestionId = question.Id });
                    
                    question = new Question() { Content = "If you hadn't told me that the meeting was cancelled, I __________ straight into the room." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "will have walked", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "would walk", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "would have walked", IsTrue = true, QuestionId = question.Id });
                    
                    question = new Question() { Content = "Our boss gave us some pretty negative feedback. He said that we __________ much harder than we did towards the end of the project." };
                    dbContext.Questions.Add(question);
                    dbContext.SaveChanges();
                    question = dbContext.Questions.FirstOrDefault(q => q.Content == question.Content);

                    dbContext.Answers.Add(new Answer() { Content = "were trying", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "could have tried", IsTrue = false, QuestionId = question.Id });
                    dbContext.Answers.Add(new Answer() { Content = "might have tried", IsTrue = true, QuestionId = question.Id });
                    dbContext.SaveChanges();
                }
            }
        }
    }
}
