using Microsoft.AspNetCore.Mvc;
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
        var request = _context.Requests.FirstOrDefault(r => r.Id == id); //id ile eşleşen requesti bul

        if (request == null) //eğer request bulunamazsa
        {
            return NotFound(); //404 döndür
        }

        return Ok(request); //bulunan requesti döndür
    }
    
    [HttpGet] //bu metodun http get isteği ile çağrılacağını belirtiyor
    public IActionResult GetAllRequests() //tüm requestleri getiren metod
    {
        var requests = _context.Requests.ToList(); //tüm requestleri al

        return Ok(requests);
    }

    [HttpPost]
    public IActionResult CreateRequest([FromBody] Request newRequest)
    {
        if (newRequest == null)
        {
            return BadRequest("Request data is null.");
        }
        newRequest.CreatedAt = DateTime.Now;
        newRequest.Status = "Pending";
        newRequest.Requester = "Ilayda Sokur"; // Örnek olarak sabit bir requester atandı, gerçek uygulamada kullanıcıdan alınabilir.
        _context.Requests.Add(newRequest);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.Id }, newRequest);
    }
}