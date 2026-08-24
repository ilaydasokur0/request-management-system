import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import CreateRequest from './pages/CreateRequest'
import MyActions from './pages/MyActions'
import { useState } from 'react'
import MyRequests from './pages/MyRequests'

function App() {
const [isActionsOpen, setIsActionsOpen] = useState(false)
const [isRequestsOpen, setIsRequestsOpen] = useState(false)

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
            <li><Link to="/">Anasayfa</Link></li>
            <li><Link to="/create-request">Talep Oluştur</Link></li>

            <li>
             <button onClick={() => setIsActionsOpen(!isActionsOpen)}>
                İşlemlerim ▾
            </button>
              {isActionsOpen && (
                <ul className="actions-submenu">
                  <Link to="/my-actions?view=current" className="sub-menu-item">Aktif İşlemler</Link>
                  <Link to="/my-actions?view=past" className="sub-menu-item">Geçmiş İşlemler</Link>
                </ul>
              )}
            </li>

            <li>
              <button onClick={() => setIsRequestsOpen(!isRequestsOpen)}>
                Taleplerim ▾
              </button>
              {isRequestsOpen && (
                <ul className="requests-submenu">
                  <Link to="/my-requests?view=current" className="sub-menu-item">Aktif Taleplerim</Link>
                  <Link to="/my-requests?view=past" className="sub-menu-item">Geçmiş Taleplerim</Link>
                </ul>
              )}
            </li>

            <li><Link to="/logout">Çıkış Yap</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/my-actions" element={<MyActions />} />
            <Route path="/logout" element={<div>Çıkış Yapıldı</div>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
