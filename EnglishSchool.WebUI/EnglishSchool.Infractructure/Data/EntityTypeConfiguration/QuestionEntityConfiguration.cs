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
    internal class QuestionEntityConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasMany(x => x.Answers)
                   .WithOne(x => x.Question)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
