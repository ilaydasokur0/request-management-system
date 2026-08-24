import './App.css'

function App({ children }) {
  return (
    <div>
      <header className="app-header">
        <div>
          <h1>Talep Yönetim Sistemi</h1>
        </div>

        <div>
          <span>Hoşgeldiniz, Kullanıcı!</span>
        </div>
      </header>

      <div className="layout">
        <nav className="sidebar">
          <h1>MENÜ</h1>
          <div className="sidebar-line" id="sidebar-line"></div>
          <ul>
            <li><a href="#">Anasayfa</a></li>
            <li><a href="#">Talep Oluştur</a></li>
            <li><a href="#">Taleplerim</a></li>
            <li><a href="#">İşlemlerim</a></li>
            <li><a href="#">Çıkış Yap</a></li>
          </ul>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  )
}

export default App
