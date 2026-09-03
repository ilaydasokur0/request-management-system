# Talep Yönetim Sistemi

Bir şirket içinde çalışanların departmanlara (IT, İK, Finans) talep açabildiği, bu taleplerin ilgili departman çalışanlarına atanıp takip edilebildiği full-stack bir web uygulaması. Gerçek şirketlerdeki "ticket sistemi" (Jira, Zendesk vb.) mantığının küçük ölçekli bir versiyonu — öğrenme amaçlı bir staj/geliştirme projesi olarak inşa edildi.

## Kullanılan Teknolojiler

**Backend:** ASP.NET Core Web API (.NET 9), Entity Framework Core, SQLite, JWT (JSON Web Token) tabanlı kimlik doğrulama

**Frontend:** React (Vite), React Router

## Özellikler

- Talep oluşturma, departman çalışanına atama, tamamlama
- Departman ve önceliğe göre filtreleme, arama
- Rol bazlı görünümler ("Taleplerim", "İşlemlerim" — aktif/geçmiş ayrımıyla)
- Talep üzerinde yorum/mesajlaşma
- Kurumsal, tema tabanlı (CSS custom properties) responsive arayüz
- JWT tabanlı kimlik doğrulama (backend tamamlandı, frontend entegrasyonu devam ediyor — bkz. [Yapılacaklar](#yapılacaklar))

## Proje Yapısı

```
backend/RequestManagement.API/
  Controllers/     → RequestController, EmployeeController, DepartmentController, CommentController, AuthController
  models/          → Request, Employee, Department, Comment + DTO sınıfları
  data/            → AppDbContext
  Migrations/      → EF Core migration geçmişi
  Program.cs       → servis kayıtları, middleware, seed (test) verisi

frontend/src/
  pages/           → Home, CreateRequest, MyRequests, MyActions, RequestDetail
  App.jsx          → layout, routing, sidebar
  labels.js        → Türkçe görünen metin karşılıkları, ortak sabitler
  App.css          → merkezi tema/tasarım sistemi
```

## Kurulum ve Çalıştırma

### Backend

```
cd backend/RequestManagement.API
dotnet restore
dotnet ef database update
dotnet run
```

`dotnet ef database update`, `Migrations/` klasöründeki geçmişe göre SQLite veritabanını (`requests.db`) oluşturur/günceller. İlk çalıştırmada `Program.cs`'teki seed bloğu devreye girer ve test verisi (3 departman, 5 çalışan, 51 mock talep) otomatik oluşturulur.

Backend varsayılan olarak `http://localhost:5145` üzerinde çalışır.

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend varsayılan olarak `http://localhost:5173` üzerinde çalışır (backend'in CORS ayarında bu adrese izin verilmiştir).

## API Endpoint'leri

| Metot | Adres | Açıklama |
|---|---|---|
| GET | `/api/request` | Tüm talepleri listele |
| GET | `/api/request/{id}` | Tek bir talebi getir |
| POST | `/api/request` | Yeni talep oluştur |
| PATCH | `/api/request/{id}/assign` | Talebi bir çalışana ata |
| PATCH | `/api/request/{id}/complete` | Talebi tamamlandı olarak işaretle |
| GET | `/api/department` | Departmanları listele |
| GET | `/api/employee` | Tüm çalışanları listele |
| GET | `/api/employee/{departmentId}` | Bir departmanın çalışanlarını listele |
| GET | `/api/comment/{requestId}` | Bir talebin yorumlarını listele |
| POST | `/api/comment` | Yeni yorum ekle |
| POST | `/api/auth/login` | Email + şifre ile giriş yap, JWT token döner |

## Veri Modeli

- **Request** → bir `Department`'a bağlı (foreign key)
- **Employee** → bir `Department`'a bağlı, `PasswordHash` alanıyla login'e hazır
- **Comment** → bir `Request`'e bağlı
- **Department** → birden çok `Employee` ve `Request`'i barındırır

## Yapılacaklar

**Backend**
- [x] Employee'ye şifre alanı (`PasswordHash`) ve migration
- [x] JWT NuGet paketi
- [x] appsettings.json'da imzalama anahtarı (key/issuer)
- [x] Program.cs'te JWT doğrulama servisi ve middleware
- [x] `POST /api/auth/login` — token üretimi
- [ ] Mevcut endpoint'leri `[Authorize]` ile koruma

**Frontend**
- [ ] Login sayfası
- [ ] Token'ı `fetch` isteklerine ekleme (Authorization header)
- [ ] `labels.js`'teki sahte `CurrentUser`/`CurrentUserDepartment` sabitlerini gerçek login verisiyle değiştirme
- [ ] Login olmadan sayfalara erişimi engelleme (route koruması)
- [ ] Logout
