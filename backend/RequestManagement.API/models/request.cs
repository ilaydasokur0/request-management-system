public class Request
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Requester { get; set; } = "";
    public string Assignee { get; set; } = "";
    public string Priority { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime? AssignedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string Status { get; set; } = "Pending";
    public string Department { get; set; } = "";
}