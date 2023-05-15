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
    internal class ChatEntityConfiguration : IEntityTypeConfiguration<Chat>
    {
        public void Configure(EntityTypeBuilder<Chat> builder)
        {
            builder.HasMany(chat => chat.Messages)
                   .WithOne(message => message.Chat)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
