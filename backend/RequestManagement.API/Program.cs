using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

var jwtKey = builder.Configuration["Jwt:Key"]!;
var jwtIssuer = builder.Configuration["Jwt:Issuer"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    Department it, hr, finance;

    if (!context.Departments.Any())
    {
        it = new Department { Name = "IT" };
        hr = new Department { Name = "HR" };
        finance = new Department { Name = "Finance" };

        context.Departments.AddRange(it, hr, finance);

        context.Employees.AddRange(
            new Employee { Name = "Mehmet Demir", Email = "mehmet.demir@example.com", Department = it },
            new Employee { Name = "Ayşe Kaya", Email = "ayse.kaya@example.com", Department = it },
            new Employee { Name = "Zeynep Aydın", Email = "zeynep.aydin@example.com", Department = hr },
            new Employee { Name = "İlayda Sokur", Email = "ilayda.sokur@example.com", Department = hr },
            new Employee { Name = "Can Öztürk", Email = "can.ozturk@example.com", Department = finance }
        );

        context.SaveChanges();
    }
    else
    {
        it = context.Departments.First(d => d.Name == "IT");
        hr = context.Departments.First(d => d.Name == "HR");
        finance = context.Departments.First(d => d.Name == "Finance");
    }

    if (!context.Requests.Any())
    {
        context.Requests.AddRange(
            new Request { Title = "Yazıcı arızası", Description = "3. kat yazıcı kağıt sıkıştırıyor, acil bakım gerekiyor.", Requester = "Ayşe Kaya", Assignee = "İlayda Sokur", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 14), AssignedAt = new DateTime(2026, 8, 15), Status = "InProgress", Department = it },
            new Request { Title = "Yeni ekipman talebi", Description = "Ek monitör ve klavye talebi.", Requester = "İlayda Sokur", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 15), AssignedAt = new DateTime(2026, 8, 16), Status = "InProgress", Department = it },
            new Request { Title = "İzin talebi", Description = "3 günlük yıllık izin talebi.", Requester = "İlayda Sokur", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 1), AssignedAt = new DateTime(2026, 8, 2), CompletedAt = new DateTime(2026, 8, 5), Status = "Completed", Department = hr },
            new Request { Title = "Bordro hatası", Description = "Ağustos ayı bordrosunda mesai ücreti eksik görünüyor.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 28), AssignedAt = new DateTime(2026, 7, 29), CompletedAt = new DateTime(2026, 8, 3), Status = "Completed", Department = finance },
            new Request { Title = "VPN erişim talebi", Description = "Uzaktan çalışma için VPN hesabı açılması gerekiyor.", Requester = "İlayda Sokur", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 22), Status = "Pending", Department = it },
            new Request { Title = "Maaş bordrosu talebi", Description = "Temmuz ayı maaş bordrosu PDF formatında talep ediliyor.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 10), AssignedAt = new DateTime(2026, 8, 11), Status = "InProgress", Department = finance },
            new Request { Title = "Laptop arızası", Description = "Laptop açılışta mavi ekran veriyor.", Requester = "İlayda Sokur", Assignee = "", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 23), Status = "Pending", Department = it },
            new Request { Title = "Yazılım lisansı talebi", Description = "Tasarım ekibi için yeni lisans talebi.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 18), AssignedAt = new DateTime(2026, 8, 19), Status = "InProgress", Department = it },
            new Request { Title = "Zam talebi", Description = "Performans değerlendirmesi sonrası zam talebi.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 7, 20), AssignedAt = new DateTime(2026, 7, 21), CompletedAt = new DateTime(2026, 7, 30), Status = "Completed", Department = hr },
            new Request { Title = "Fatura itirazı", Description = "Tedarikçi faturasında tutar hatası var.", Requester = "Ayşe Kaya", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 5), AssignedAt = new DateTime(2026, 8, 6), CompletedAt = new DateTime(2026, 8, 12), Status = "Completed", Department = finance },
            new Request { Title = "Yeni yazıcı kurulumu", Description = "2. kat ofis için yeni yazıcı kurulumu talebi.", Requester = "Ayşe Kaya", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 25), Status = "Pending", Department = it },
            new Request { Title = "İzin iptali talebi", Description = "Planlanan yıllık izin iptali talebi.", Requester = "Can Öztürk", Assignee = "Zeynep Aydın", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 12), AssignedAt = new DateTime(2026, 8, 13), Status = "InProgress", Department = hr },
            new Request { Title = "Klavye ve mouse talebi", Description = "Eski klavye ve mouse arızalı, yenisi gerekiyor.", Requester = "Mehmet Demir", Assignee = "Ayşe Kaya", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 3), AssignedAt = new DateTime(2026, 8, 4), CompletedAt = new DateTime(2026, 8, 6), Status = "Completed", Department = it },
            new Request { Title = "Sağlık raporu bildirimi", Description = "2 günlük sağlık raporu ekleniyor.", Requester = "Zeynep Aydın", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 19), Status = "Pending", Department = hr },
            new Request { Title = "Masraf iadesi", Description = "Şehir dışı toplantı için yol ve konaklama masrafı iade talebi.", Requester = "Mehmet Demir", Assignee = "Can Öztürk", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 7), AssignedAt = new DateTime(2026, 8, 8), Status = "InProgress", Department = finance },
            new Request { Title = "İnternet bağlantı sorunu", Description = "4. kat internet bağlantısı sürekli kopuyor.", Requester = "Zeynep Aydın", Assignee = "", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 24), Status = "Pending", Department = it },
            new Request { Title = "Bütçe onayı talebi", Description = "Yeni dönem departman bütçesinin onaylanması gerekiyor.", Requester = "Can Öztürk", Assignee = "Ayşe Kaya", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 25), AssignedAt = new DateTime(2026, 7, 26), CompletedAt = new DateTime(2026, 7, 31), Status = "Completed", Department = finance },
            new Request { Title = "Yeni personel oryantasyonu", Description = "Yeni işe başlayan personel için oryantasyon programı talebi.", Requester = "İlayda Sokur", Assignee = "Zeynep Aydın", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 9), AssignedAt = new DateTime(2026, 8, 10), Status = "InProgress", Department = hr },
            new Request { Title = "Ofis malzemesi talebi", Description = "Kırtasiye malzemeleri (kağıt, kalem, dosya) tükendi.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 7, 15), AssignedAt = new DateTime(2026, 7, 16), CompletedAt = new DateTime(2026, 7, 18), Status = "Completed", Department = it },
            new Request { Title = "Uzaktan çalışma izni", Description = "1 haftalık uzaktan çalışma talebi.", Requester = "Can Öztürk", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 26), Status = "Pending", Department = hr },
            new Request { Title = "Tedarikçi ödeme gecikmesi", Description = "Bir tedarikçiye yapılması gereken ödeme gecikti, kontrol edilmesi gerekiyor.", Requester = "Mehmet Demir", Assignee = "Can Öztürk", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 20), AssignedAt = new DateTime(2026, 8, 21), Status = "InProgress", Department = finance },
            new Request { Title = "Monitör arızası", Description = "Monitörde titreme ve renk bozulması var.", Requester = "Zeynep Aydın", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 27), Status = "Pending", Department = it },
            new Request { Title = "E-posta hesabı açılması", Description = "Yeni başlayan personel için e-posta hesabı açılması gerekiyor.", Requester = "İlayda Sokur", Assignee = "", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 27), Status = "Pending", Department = it },
            new Request { Title = "Yazılım güncelleme talebi", Description = "Muhasebe yazılımının yeni sürüme güncellenmesi gerekiyor.", Requester = "Can Öztürk", Assignee = "", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 27), Status = "Pending", Department = it },
            new Request { Title = "İş sözleşmesi yenileme", Description = "Deneme süresi biten personelin sözleşmesinin yenilenmesi gerekiyor.", Requester = "Zeynep Aydın", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 26), Status = "Pending", Department = hr },
            new Request { Title = "Doğum izni talebi", Description = "Doğum izni başvurusu yapılıyor.", Requester = "Ayşe Kaya", Assignee = "", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 25), Status = "Pending", Department = hr },
            new Request { Title = "Performans değerlendirme formu", Description = "Yıllık performans değerlendirme formunun doldurulması gerekiyor.", Requester = "Mehmet Demir", Assignee = "", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 25), Status = "Pending", Department = hr },
            new Request { Title = "Fazla mesai ödemesi", Description = "Ağustos ayı fazla mesai ödemesi hesaba yansımadı.", Requester = "Ayşe Kaya", Assignee = "", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 26), Status = "Pending", Department = finance },
            new Request { Title = "Avans talebi", Description = "Kişisel ihtiyaç için maaş avansı talebi.", Requester = "Can Öztürk", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 24), Status = "Pending", Department = finance },
            new Request { Title = "Bütçe raporu talebi", Description = "3. çeyrek bütçe raporunun hazırlanması gerekiyor.", Requester = "Mehmet Demir", Assignee = "", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 23), Status = "Pending", Department = finance },
            new Request { Title = "VPN şifre sıfırlama", Description = "VPN şifresi unutuldu, sıfırlanması gerekiyor.", Requester = "Zeynep Aydın", Assignee = "İlayda Sokur", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 6), AssignedAt = new DateTime(2026, 8, 7), Status = "InProgress", Department = it },
            new Request { Title = "Klima arızası", Description = "3. kat toplantı odasında klima çalışmıyor.", Requester = "Can Öztürk", Assignee = "Ayşe Kaya", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 11), AssignedAt = new DateTime(2026, 8, 12), Status = "InProgress", Department = it },
            new Request { Title = "Yeni telefon hattı talebi", Description = "Satış ekibi için yeni bir dahili hat açılması gerekiyor.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 13), AssignedAt = new DateTime(2026, 8, 14), Status = "InProgress", Department = it },
            new Request { Title = "İşe alım süreci", Description = "Yeni bir yazılım geliştirici pozisyonu için işe alım süreci başlatılması gerekiyor.", Requester = "Mehmet Demir", Assignee = "Zeynep Aydın", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 15), AssignedAt = new DateTime(2026, 8, 16), Status = "InProgress", Department = hr },
            new Request { Title = "Eğitim talebi", Description = "Ekip için liderlik eğitimi düzenlenmesi talep ediliyor.", Requester = "Ayşe Kaya", Assignee = "Zeynep Aydın", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 17), AssignedAt = new DateTime(2026, 8, 18), Status = "InProgress", Department = hr },
            new Request { Title = "Fatura düzeltme talebi", Description = "Kesilen faturada müşteri bilgileri hatalı.", Requester = "Zeynep Aydın", Assignee = "Can Öztürk", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 20), AssignedAt = new DateTime(2026, 8, 21), Status = "InProgress", Department = finance },
            new Request { Title = "Ödeme planı talebi", Description = "Büyük bir siparişin taksitli ödeme planına bağlanması isteniyor.", Requester = "Ayşe Kaya", Assignee = "Can Öztürk", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 22), AssignedAt = new DateTime(2026, 8, 23), Status = "InProgress", Department = finance },
            new Request { Title = "Klavye Türkçe Q düzeni talebi", Description = "İngilizce klavye yerine Türkçe Q klavye talep ediliyor.", Requester = "Can Öztürk", Assignee = "Ayşe Kaya", Priority = Priority.Low, CreatedAt = new DateTime(2026, 7, 10), AssignedAt = new DateTime(2026, 7, 11), CompletedAt = new DateTime(2026, 7, 12), Status = "Completed", Department = it },
            new Request { Title = "Yazıcı toner değişimi", Description = "2. kat yazıcının toneri bitti.", Requester = "İlayda Sokur", Assignee = "Mehmet Demir", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 7, 12), AssignedAt = new DateTime(2026, 7, 13), CompletedAt = new DateTime(2026, 7, 14), Status = "Completed", Department = it },
            new Request { Title = "Yeni yazılım lisansı", Description = "Tasarım ekibi için Adobe lisansı talep ediliyor.", Requester = "Ayşe Kaya", Assignee = "Mehmet Demir", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 18), AssignedAt = new DateTime(2026, 7, 19), CompletedAt = new DateTime(2026, 7, 22), Status = "Completed", Department = it },
            new Request { Title = "İzin devri talebi", Description = "Kullanılmayan izin günlerinin bir sonraki yıla devredilmesi talep ediliyor.", Requester = "Zeynep Aydın", Assignee = "İlayda Sokur", Priority = Priority.Low, CreatedAt = new DateTime(2026, 7, 5), AssignedAt = new DateTime(2026, 7, 6), CompletedAt = new DateTime(2026, 7, 8), Status = "Completed", Department = hr },
            new Request { Title = "Sağlık sigortası talebi", Description = "Özel sağlık sigortası kaydının yapılması gerekiyor.", Requester = "Can Öztürk", Assignee = "İlayda Sokur", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 7, 9), AssignedAt = new DateTime(2026, 7, 10), CompletedAt = new DateTime(2026, 7, 13), Status = "Completed", Department = hr },
            new Request { Title = "Referans mektubu talebi", Description = "İşten ayrılan personel için referans mektubu hazırlanması gerekiyor.", Requester = "Mehmet Demir", Assignee = "İlayda Sokur", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 14), AssignedAt = new DateTime(2026, 7, 15), CompletedAt = new DateTime(2026, 7, 16), Status = "Completed", Department = hr },
            new Request { Title = "Vergi belgesi talebi", Description = "Yıllık vergi beyannamesi için gelir belgesi talep ediliyor.", Requester = "Zeynep Aydın", Assignee = "Can Öztürk", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 7, 20), AssignedAt = new DateTime(2026, 7, 21), CompletedAt = new DateTime(2026, 7, 23), Status = "Completed", Department = finance },
            new Request { Title = "Masraf raporu onayı", Description = "Şehir dışı seyahat masraf raporunun onaylanması gerekiyor.", Requester = "Ayşe Kaya", Assignee = "Can Öztürk", Priority = Priority.Low, CreatedAt = new DateTime(2026, 7, 24), AssignedAt = new DateTime(2026, 7, 25), CompletedAt = new DateTime(2026, 7, 27), Status = "Completed", Department = finance },
            new Request { Title = "Banka hesabı güncelleme", Description = "Maaş ödemesi için banka hesap bilgilerinin güncellenmesi gerekiyor.", Requester = "Mehmet Demir", Assignee = "Can Öztürk", Priority = Priority.High, CreatedAt = new DateTime(2026, 7, 29), AssignedAt = new DateTime(2026, 7, 30), CompletedAt = new DateTime(2026, 8, 1), Status = "Completed", Department = finance },
            new Request { Title = "Yedekleme sistemi kontrolü", Description = "Sunucu yedekleme sisteminin düzgün çalıştığının kontrol edilmesi gerekiyor.", Requester = "Zeynep Aydın", Assignee = "", Priority = Priority.High, CreatedAt = new DateTime(2026, 8, 28), Status = "Pending", Department = it },
            new Request { Title = "Ekip toplantı odası talebi", Description = "Haftalık ekip toplantısı için oda rezervasyonu gerekiyor.", Requester = "Ayşe Kaya", Assignee = "", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 28), Status = "Pending", Department = hr },
            new Request { Title = "Şirket kredi kartı talebi", Description = "Saha ekibi için şirket kredi kartı çıkartılması talep ediliyor.", Requester = "Can Öztürk", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 28), Status = "Pending", Department = finance },
            new Request { Title = "Ofis taşınma planlaması", Description = "IT ekibinin yeni ofise taşınma planının hazırlanması gerekiyor.", Requester = "Mehmet Demir", Assignee = "", Priority = Priority.Medium, CreatedAt = new DateTime(2026, 8, 29), Status = "Pending", Department = it },
            new Request { Title = "Yıllık izin planı talebi", Description = "Ekip için yıllık izin takviminin oluşturulması gerekiyor.", Requester = "İlayda Sokur", Assignee = "", Priority = Priority.Low, CreatedAt = new DateTime(2026, 8, 29), Status = "Pending", Department = hr }
        );
        context.SaveChanges();
    }
}


app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();