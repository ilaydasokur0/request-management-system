public class CreateRequestDTO
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Requester { get; set; } = "İlayda Sokur";
    public Priority Priority { get; set; }
    public int DepartmentId { get; set; }
}