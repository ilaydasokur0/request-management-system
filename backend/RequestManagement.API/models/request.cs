namespace RequestManagement.API.Models;

public class Request
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string Description { get; set; } = "";

    public string Status { get; set; } = "Pending";
}