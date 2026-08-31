public class CompleteRequestDTO
{
    public string Status { get; set; } = "Completed";
    public DateTime CompletedAt { get; set; } = DateTime.Now;
}