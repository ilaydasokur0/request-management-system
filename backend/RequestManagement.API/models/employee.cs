public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public int DepartmentId { get; set; } // departman tablosuna id ile bağlantı kurmak için foreign key
    public Department Department { get; set; } = null!; // navigation property, employee ile department arasında ilişki kurmak için
}