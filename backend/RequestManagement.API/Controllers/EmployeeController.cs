using Microsoft.AspNetCore.Mvc;
[ApiController] //bu sınıfın bir api controller olduğunu belirtiyor
[Route("api/[controller]")] //bu sınıfın route adresi api/employee olacak
public class EmployeeController : ControllerBase //.netin verdiği temel sınıf controllarbaseden kalıtım
{
        private readonly AppDbContext _context;
        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllEmployees() //tüm employee'leri getiren metod
        {
            var employees = _context.Employees.ToList(); //tüm employee'leri al

            return Ok(employees);
        }
}