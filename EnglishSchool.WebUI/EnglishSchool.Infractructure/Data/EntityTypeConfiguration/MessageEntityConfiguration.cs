using EnglishSchool.Core.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure.Data.EntityTypeConfiguration
{
    internal class MessageEntityConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.HasOne(message => message.User)
                   .WithMany(user => user.Messages)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
