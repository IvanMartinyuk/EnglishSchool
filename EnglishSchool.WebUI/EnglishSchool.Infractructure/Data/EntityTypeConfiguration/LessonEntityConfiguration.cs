using EnglishSchool.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure.Data.EntityTypeConfiguration
{
    internal class LessonEntityConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.HasOne(x => x.Student)
                .WithMany(x => x.Lessons)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
