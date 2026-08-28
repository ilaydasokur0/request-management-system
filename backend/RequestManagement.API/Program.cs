using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>options.UseSqlite("Data Source=requests.db"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!context.Requests.Any())
    {
        context.Requests.AddRange(
            new Request { Title = "Yazıcı arızası", Description = "3. kat yazıcı kağıt sıkıştırıyor, acil bakım gerekiyor.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 14), AssignedAt = new DateTime(2026, 8, 15), Status = "InProgress", Department = "IT" },
            new Request { Title = "Yeni ekipman talebi", Description = "Ek monitör ve klavye talebi.", Requester = "Ilayda Sokur", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 15), AssignedAt = new DateTime(2026, 8, 16), Status = "InProgress", Department = "IT" },
            new Request { Title = "İzin talebi", Description = "3 günlük yıllık izin talebi.", Requester = "Ilayda Sokur", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 1), AssignedAt = new DateTime(2026, 8, 2), CompletedAt = new DateTime(2026, 8, 5), Status = "Completed", Department = "HR" },
            new Request { Title = "Bordro hatası", Description = "Ağustos ayı bordrosunda mesai ücreti eksik görünüyor.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 28), AssignedAt = new DateTime(2026, 7, 29), CompletedAt = new DateTime(2026, 8, 3), Status = "Completed", Department = "Finance" },
            new Request { Title = "VPN erişim talebi", Description = "Uzaktan çalışma için VPN hesabı açılması gerekiyor.", Requester = "Ilayda Sokur", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 22), Status = "Pending", Department = "IT" },
            new Request { Title = "Maaş bordrosu talebi", Description = "Temmuz ayı maaş bordrosu PDF formatında talep ediliyor.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 10), AssignedAt = new DateTime(2026, 8, 11), Status = "InProgress", Department = "Finance" },
            new Request { Title = "Laptop arızası", Description = "Laptop açılışta mavi ekran veriyor.", Requester = "Ilayda Sokur", Assignee = "", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 23), Status = "Pending", Department = "IT" },
            new Request { Title = "Yazılım lisansı talebi", Description = "Tasarım ekibi için yeni lisans talebi.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 18), AssignedAt = new DateTime(2026, 8, 19), Status = "InProgress", Department = "IT" },
            new Request { Title = "Zam talebi", Description = "Performans değerlendirmesi sonrası zam talebi.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 7, 20), AssignedAt = new DateTime(2026, 7, 21), CompletedAt = new DateTime(2026, 7, 30), Status = "Completed", Department = "HR" },
            new Request { Title = "Fatura itirazı", Description = "Tedarikçi faturasında tutar hatası var.", Requester = "Ayşe Kaya", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 5), AssignedAt = new DateTime(2026, 8, 6), CompletedAt = new DateTime(2026, 8, 12), Status = "Completed", Department = "Finance" },
            new Request { Title = "Yeni yazıcı kurulumu", Description = "2. kat ofis için yeni yazıcı kurulumu talebi.", Requester = "Ayşe Kaya", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 25), Status = "Pending", Department = "IT" },
            new Request { Title = "İzin iptali talebi", Description = "Planlanan yıllık izin iptali talebi.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 12), AssignedAt = new DateTime(2026, 8, 13), Status = "InProgress", Department = "HR" },
            new Request { Title = "Klavye ve mouse talebi", Description = "Eski klavye ve mouse arızalı, yenisi gerekiyor.", Requester = "Mehmet Demir", Assignee = "Ayşe Kaya", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 3), AssignedAt = new DateTime(2026, 8, 4), CompletedAt = new DateTime(2026, 8, 6), Status = "Completed", Department = "IT" },
            new Request { Title = "Sağlık raporu bildirimi", Description = "2 günlük sağlık raporu ekleniyor.", Requester = "Zeynep Aydın", Assignee = "Can Öztürk", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 19), Status = "Pending", Department = "HR" },
            new Request { Title = "Masraf iadesi", Description = "Şehir dışı toplantı için yol ve konaklama masrafı iade talebi.", Requester = "Mehmet Demir", Assignee = "Can Öztürk", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 7), AssignedAt = new DateTime(2026, 8, 8), Status = "InProgress", Department = "Finance" },
            new Request { Title = "İnternet bağlantı sorunu", Description = "4. kat internet bağlantısı sürekli kopuyor.", Requester = "Zeynep Aydın", Assignee = "Mehmet Demir", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 24), Status = "Pending", Department = "IT" },
            new Request { Title = "Bütçe onayı talebi", Description = "Yeni dönem departman bütçesinin onaylanması gerekiyor.", Requester = "Can Öztürk", Assignee = "Ayşe Kaya", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 25), AssignedAt = new DateTime(2026, 7, 26), CompletedAt = new DateTime(2026, 7, 31), Status = "Completed", Department = "Finance" },
            new Request { Title = "Yeni personel oryantasyonu", Description = "Yeni işe başlayan personel için oryantasyon programı talebi.", Requester = "Ilayda Sokur", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 9), AssignedAt = new DateTime(2026, 8, 10), Status = "InProgress", Department = "HR" },
            new Request { Title = "Ofis malzemesi talebi", Description = "Kırtasiye malzemeleri (kağıt, kalem, dosya) tükendi.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 7, 15), AssignedAt = new DateTime(2026, 7, 16), CompletedAt = new DateTime(2026, 7, 18), Status = "Completed", Department = "IT" },
            new Request { Title = "Uzaktan çalışma izni", Description = "1 haftalık uzaktan çalışma talebi.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 26), Status = "Pending", Department = "HR" },
            new Request { Title = "Tedarikçi ödeme gecikmesi", Description = "Bir tedarikçiye yapılması gereken ödeme gecikti, kontrol edilmesi gerekiyor.", Requester = "Mehmet Demir", Assignee = "Can Öztürk", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 20), AssignedAt = new DateTime(2026, 8, 21), Status = "InProgress", Department = "Finance" }
        );
        context.SaveChanges();
    }

    if (!context.Departments.Any())
    {
        var it = new Department { Name = "IT" };
        var hr = new Department { Name = "HR" };
        var finance = new Department { Name = "Finance" };

        context.Departments.AddRange(it, hr, finance);

        context.Employees.AddRange(
            new Employee { Name = "Mehmet Demir", Email = "mehmet.demir@example.com", Department = it },
            new Employee { Name = "Ayşe Kaya", Email = "ayse.kaya@example.com", Department = it },
            new Employee { Name = "Zeynep Aydın", Email = "zeynep.aydin@example.com", Department = hr },
            new Employee { Name = "Ilayda Sokur", Email = "ilayda.sokur@example.com", Department = hr },
            new Employee { Name = "Can Öztürk", Email = "can.ozturk@example.com", Department = finance }
        );

        context.SaveChanges();
    }
}


app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();