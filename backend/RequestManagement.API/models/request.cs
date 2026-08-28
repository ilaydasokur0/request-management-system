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

    public int DepartmentId { get; set; } // departman tablosuna id ile bağlantı kurmak için foreign key
    public Department Department { get; set; } = null!; // department classıyla kompozisyon kurulur.
}