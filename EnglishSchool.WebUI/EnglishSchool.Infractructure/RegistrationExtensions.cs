using EnglishSchool.Core.Interfaces;
using EnglishSchool.Infractructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnglishSchool.Infractructure
{
    public static class RegistrationExtensions
    {
        public static void AddStorage(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection.AddDbContext<SchoolDbContext>(options =>
            {
                options.UseSqlServer(configuration["ConnectionStrings:LocalDbSqlServer"]);
            });

            serviceCollection.AddScoped<ISchoolDbContext, SchoolDbContext>();
        }
    }
}
