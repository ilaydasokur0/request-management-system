using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Request> Requests { get; set; }
    public DbSet<Employee> Employees { get; set; }

    public DbSet<Department> Departments { get; set; }

    public DbSet<Comment> Comments { get; set; }
}
