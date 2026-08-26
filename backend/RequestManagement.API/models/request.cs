public class Request
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Requester { get; set; } = "";
    public string Assignee { get; set; } = "";
    public Priority Priority { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? AssignedAt { get; set; } = null;
    public DateTime? CompletedAt { get; set; } = null;
    public string Status { get; set; } = "Pending";
    public string Department { get; set; } = "";
}