using EnglishSchool.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Core.Interfaces
{
    public interface ISchoolDbContext : IDisposable
    {
        DbSet<Course> Courses { get; set; }
        DbSet<Lesson> Lessons { get; set; }
        DbSet<Payment> Payments { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Question> Questions { get; set; }
        DbSet<Answer> Answers { get; set; }

        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
