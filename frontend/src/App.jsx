import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import CreateRequest from './pages/CreateRequest'
import MyActions from './pages/MyActions'
import { useState } from 'react'

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
            <li><a href="/">Anasayfa</a></li>
            <li><a href="/create-request">Talep Oluştur</a></li>

            <li>
              <a href="#" onClick={() => setIsActionsOpen(!isActionsOpen)}>
                İşlemlerim ▾
              </a>
              {isActionsOpen && (
                <ul className="actions-submenu">
                  <li className = "sub-menu-item"><a href="/my-requests">Aktif İşlemler</a></li>
                  <li className = "sub-menu-item"><a href="/my-actions">Geçmiş İşlemler</a></li>
                </ul>
              )}
            </li>

            <li>
              <a href="#" onClick={() => setIsRequestsOpen(!isRequestsOpen)}>
                Taleplerim ▾
              </a>
              {isRequestsOpen && (
                <ul className="requests-submenu">
                  <li className = "sub-menu-item"><a href="/my-requests">Aktif Taleplerim</a></li>
                  <li className = "sub-menu-item"><a href="/my-actions">Geçmiş Taleplerim</a></li>
                </ul>
              )}
            </li>

            <li><a href="/logout">Çıkış Yap</a></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/my-requests" element={<div>Taleplerim Sayfası</div>} />
            <Route path="/my-actions" element={<MyActions />} />
            <Route path="/logout" element={<div>Çıkış Yapıldı</div>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
