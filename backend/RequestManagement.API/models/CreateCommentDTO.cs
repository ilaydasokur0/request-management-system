public class CreateCommentDTO
{
    public string Author { get; set; } = "";
    public string Message { get; set; } = "";
    public int RequestId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}