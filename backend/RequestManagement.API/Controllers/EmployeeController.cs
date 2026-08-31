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

        [HttpGet("{departmentId}")] //bu metodun http get isteği ile çağrılacağını belirtiyor ve departmentId parametresi alıyor
        public IActionResult GetEmployeesByDepartment(int departmentId) //departmentId ile employee'leri getiren metod
        {
            var employees = _context.Employees.Where(e => e.DepartmentId == departmentId).ToList(); //departmentId ile eşleşen employee'leri bul

            if (employees == null || !employees.Any()) //eğer employee bulunamazsa
            {
                return NotFound(); //404 döndür
            }

            return Ok(employees); //bulunan employee'leri döndür
        }}