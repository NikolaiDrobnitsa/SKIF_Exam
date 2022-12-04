using Microsoft.EntityFrameworkCore;
using SKIF_Exam.Models;

namespace SKIF_Exam.Data
{
    public class DbContextClass : DbContext
    {
        protected readonly IConfiguration Configuration;
        public DbContextClass(IConfiguration configuration)
        {
            Configuration = configuration;
        }
   


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            string str = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build().GetConnectionString("DefaultConnection");
            options.UseSqlServer(str);
        }
        public DbSet<Skif> skifs { get; set; }
        public DbSet<User> users { get; set; }
    }
    
}
