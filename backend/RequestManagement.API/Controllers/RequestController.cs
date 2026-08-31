using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
[ApiController] //bu sınıfın bir api controller olduğunu belirtiyor
[Route("api/[controller]")] //bu sınıfın route adresi api/request olacak
public class RequestController : ControllerBase //.netin verdiği temel sınıf controllarbaseden kalıtım
{
        private readonly AppDbContext _context;
        public RequestController(AppDbContext context)
        {
            _context = context;
        }

    [HttpGet("{id}")] //bu metodun http get isteği ile çağrılacağını belirtiyor ve id parametresi alıyor
    public IActionResult GetRequestById(int id) //id ile request getiren metod
    {
        var request = _context.Requests.Include(r => r.Department).FirstOrDefault(r => r.Id == id); //id ile eşleşen requesti bul

        if (request == null) //eğer request bulunamazsa
        {
            return NotFound(); //404 döndür
        }

        return Ok(request); //bulunan requesti döndür
    }
    
    [HttpGet] //bu metodun http get isteği ile çağrılacağını belirtiyor
    public IActionResult GetAllRequests() //tüm requestleri getiren metod
    {
        var requests = _context.Requests.Include(r => r.Department).ToList(); //tüm requestleri al

        return Ok(requests);
    }

    [HttpPost]
    public IActionResult CreateRequest([FromBody] CreateRequestDTO dto) //yeni request oluşturan metod
    {
        if (dto == null)
                {
                    return BadRequest("Request data is null.");
                }

        var department = _context.Departments.FirstOrDefault(d => d.Id == dto.DepartmentId); //dto ile gelen department id ile departmanı bul
        if (department == null) //eğer departman bulunamazsa
        {
            return BadRequest("Invalid DepartmentId."); //400 döndür
        }

        var newRequest = new Request
        {
            Title = dto.Title,
            Description = dto.Description,
            Priority = dto.Priority,
            DepartmentId = dto.DepartmentId,
            Department = department,
            Requester = dto.Requester,
            Status = "Pending",
            CreatedAt = DateTime.Now,
            AssignedAt = null,
            CompletedAt = null
        };
       _context.Requests.Add(newRequest); //yeni requesti ekle
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.Id }, newRequest);
    }
}