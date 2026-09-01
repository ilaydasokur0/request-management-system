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

        [HttpPost] //bu metodun http post isteği ile çağrılacağını belirtiyor
        public IActionResult CreateComment([FromBody] CreateCommentDTO dto)
    {
        if (dto== null)
        {
            return BadRequest("Comment data is null.");
        }
        var request = _context.Requests.FirstOrDefault(r => r.Id == dto.RequestId);
        if (request == null)
        {
            return BadRequest("Invalid RequestId.");
        }

        var comment = new Comment
        {
            RequestId = dto.RequestId,
            Author = dto.Author,
            Message = dto.Message,
            CreatedAt = dto.CreatedAt
        };
        _context.Comments.Add(comment);
        _context.SaveChanges();
        return Ok(comment);
    }

    }
    
            