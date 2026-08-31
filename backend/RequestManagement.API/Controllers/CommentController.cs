using Microsoft.AspNetCore.Mvc;
[ApiController] //bu sınıfın bir api controller olduğunu belirtiyor
[Route("api/[controller]")] //bu sınıfın route adresi api/comment olacak
public class CommentController : ControllerBase //.netin verdiği temel sınıf controllarbaseden
    {
        private readonly AppDbContext _context;
        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{requestId}")] //bu metodun http get isteği ile çağrılacağını belirtiyor ve requestId parametresi alıyor
        public IActionResult GetCommentsByRequestId(int requestId) //requestId ile commentleri
        {
            var comments = _context.Comments.Where(c => c.RequestId == requestId).ToList();
            return Ok(comments);
        }

    }
    
            