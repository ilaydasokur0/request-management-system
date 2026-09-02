using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

[ApiController] //bu sınıfın bir api controller olduğunu belirtiyor
[Route("api/[controller]")] //bu sınıfın route adresi api/auth olacak
public class AuthController : ControllerBase //.netin verdiği temel sınıf controllarbaseden
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")] //bu metodun http post isteği ile çağrılacağını belirtiyor ve route adresi api/auth/login olacak
    public IActionResult Login([FromBody] LoginDTO dto)
    {
        var employee = _context.Employees.FirstOrDefault(e => e.Email == dto.Email);
        if (employee == null)
        {
            return Unauthorized("Invalid email or password.");
        }
        var hasher = new PasswordHasher<Employee>();
        var result = hasher.VerifyHashedPassword(employee, employee.PasswordHash, dto.Password);
        if (result == PasswordVerificationResult.Failed)
        {
            return Unauthorized("Invalid email or password.");
        }
        return Ok("Login successful.");
    }
}