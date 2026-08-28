using Microsoft.AspNetCore.Mvc;
[ApiController] //bu sınıfın bir api controller olduğunu belirtiyor
[Route("api/[controller]")] //bu sınıfın route adresi api/department olacak
public class DepartmentController : ControllerBase //.netin verdiği temel sınıf controllarbaseden kalıtım
{
        private readonly AppDbContext _context;
        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllDepartments() //tüm departmentleri getiren metod
        {
            var departments = _context.Departments.ToList(); //tüm departmentleri al

            return Ok(departments);
        }
}