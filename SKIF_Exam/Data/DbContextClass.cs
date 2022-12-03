using Microsoft.EntityFrameworkCore;

namespace SKIF_Exam.Data
{
    public class DbContextClass : DbContext
    {
        protected readonly IConfiguration Configuration;
        public DbContextClass(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        //public DbSet<Product> Products { get; set; }
        //public DbSet<Login> Logins { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            string str = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build().GetConnectionString("DefaultConnection");
            options.UseSqlServer(str);
        }
    }
    
}
