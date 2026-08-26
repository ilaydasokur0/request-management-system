using Microsoft.AspNetCore.Mvc;
[ApiController] //bu sınıf bir API controller
[Route("api/[controller]")] //bu sınıfın route adresi api/request olacak

public class RequestController : ControllerBase //.netin verdiği temel sınıf controllarbaseden kalıtım
{
    [HttpGet] //bu metodun http get isteği ile çağrılacağını belirtiyor
    public IActionResult GetAllRequests() //tüm requestleri getiren metod
    {
        var requests = new List<Request> // request sınıfından bir liste oluşturuyoruz ve örnek veriler ekliyoruz
        {
            new Request { Id = 1, Title = "Request 1", Description = "Description 1", Requester = "User 1", Assignee = "User 2", Priority = Priority.Low, CreatedAt = DateTime.Now, Status = "Pending", Department = "IT" },
            new Request { Id = 2, Title = "Request 2", Description = "Description 2", Requester = "User 3", Assignee = "User 4", Priority = Priority.High, CreatedAt = DateTime.Now, Status = "Pending", Department = "HR" }
        };
        return Ok(requests);
    }
}