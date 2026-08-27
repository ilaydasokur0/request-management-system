using Microsoft.AspNetCore.Mvc;
[ApiController] //bu sınıfın bir api controller olduğunu belirtiyor
[Route("api/[controller]")] //bu sınıfın route adresi api/request olacak


public class RequestController : ControllerBase //.netin verdiği temel sınıf controllarbaseden kalıtım
{
    private static List<Request> _requests = new List<Request> //requestleri tutacak liste
        {
            new Request { Id = 1, Title = "Yazıcı arızası", Description = "3. kat yazıcı kağıt sıkıştırıyor, acil bakım gerekiyor.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 14), AssignedAt = new DateTime(2026, 8, 15), Status = "InProgress", Department = "IT" },
            new Request { Id = 2, Title = "Yeni ekipman talebi", Description = "Ek monitör ve klavye talebi.", Requester = "Ilayda Sokur", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 15), AssignedAt = new DateTime(2026, 8, 16), Status = "InProgress", Department = "IT" },
            new Request { Id = 3, Title = "İzin talebi", Description = "3 günlük yıllık izin talebi.", Requester = "Ilayda Sokur", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 1), AssignedAt = new DateTime(2026, 8, 2), CompletedAt = new DateTime(2026, 8, 5), Status = "Completed", Department = "HR" },
            new Request { Id = 4, Title = "Bordro hatası", Description = "Ağustos ayı bordrosunda mesai ücreti eksik görünüyor.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 28), AssignedAt = new DateTime(2026, 7, 29), CompletedAt = new DateTime(2026, 8, 3), Status = "Completed", Department = "Finance" },
            new Request { Id = 5, Title = "VPN erişim talebi", Description = "Uzaktan çalışma için VPN hesabı açılması gerekiyor.", Requester = "Ilayda Sokur", Assignee = "Mehmet Demir", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 22), Status = "Pending", Department = "IT" },  
            new Request { Id = 6, Title = "Maaş bordrosu talebi", Description = "Temmuz ayı maaş bordrosu PDF formatında talep ediliyor.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 10), AssignedAt = new DateTime(2026, 8, 11), Status = "InProgress", Department = "Finance" },
            new Request { Id = 7, Title = "Laptop arızası", Description = "Laptop açılışta mavi ekran veriyor.", Requester = "Ilayda Sokur", Assignee = "Mehmet Demir", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 23), Status = "Pending", Department = "IT" },
            new Request { Id = 8, Title = "Yazılım lisansı talebi", Description = "Tasarım ekibi için yeni lisans talebi.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 18), AssignedAt = new DateTime(2026, 8, 19), Status = "InProgress", Department = "IT" },
            new Request { Id = 9, Title = "Zam talebi", Description = "Performans değerlendirmesi sonrası zam talebi.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 7, 20), AssignedAt = new DateTime(2026, 7, 21), CompletedAt = new DateTime(2026, 7, 30), Status = "Completed", Department = "HR" },
            new Request { Id = 10, Title = "Fatura itirazı", Description = "Tedarikçi faturasında tutar hatası var.", Requester = "Ayşe Kaya", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 5), AssignedAt = new DateTime(2026, 8, 6), CompletedAt = new DateTime(2026, 8, 12), Status = "Completed", Department = "Finance" },
            new Request { Id = 11, Title = "Yeni yazıcı kurulumu", Description = "2. kat ofis için yeni yazıcı kurulumu talebi.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 25), Status = "Pending", Department = "IT" },   
            new Request { Id = 12, Title = "İzin iptali talebi", Description = "Planlanan yıllık izin iptali talebi.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 12), AssignedAt = new DateTime(2026, 8, 13), Status = "InProgress", Department = "HR" }  
        };

    [HttpGet("{id}")] //bu metodun http get isteği ile çağrılacağını belirtiyor ve id parametresi alıyor
    public IActionResult GetRequestById(int id) //id ile request getiren metod
    {
        var requests = _requests; //mock requestleri al
        var request = requests.FirstOrDefault(r => r.Id == id); //id ile eşleşen requesti bul

        if (request == null) //eğer request bulunamazsa
        {
            return NotFound(); //404 döndür
        }

        return Ok(request); //bulunan requesti döndür
    }
    
    [HttpGet] //bu metodun http get isteği ile çağrılacağını belirtiyor
    public IActionResult GetAllRequests() //tüm requestleri getiren metod
    {
        var requests = _requests; //mock requestleri al

        return Ok(requests);
    }

    [HttpPost]
    public IActionResult CreateRequest([FromBody] Request newRequest)
    {
        if (newRequest == null)
        {
            return BadRequest("Request data is null.");
        }
        newRequest.Id = _requests.Max(r => r.Id) + 1;
        newRequest.CreatedAt = DateTime.Now;
        newRequest.Status = "Pending";
        _requests.Add(newRequest);
        return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.Id }, newRequest);
    }
}