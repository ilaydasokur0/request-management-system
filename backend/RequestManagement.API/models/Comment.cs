public class Comment
{
    public int Id { get; set; }
    public string Author { get; set; } = "";
    public string Message { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public Request Request { get; set; } = null!;
    public int RequestId { get; set; }
}