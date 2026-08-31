public class UpdateRequestDTO
{
    public string Status { get; set; } = "InProgress";
    public string Assignee { get; set; } = "";
    public DateTime AssignedAt { get; set; } = DateTime.Now;
}