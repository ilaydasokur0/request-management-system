import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/home'
import CreateRequest from './pages/CreateRequest'
import MyActions from './pages/MyActions'
import { useState } from 'react'
import MyRequests from './pages/MyRequests'
import RequestDetail from './pages/RequestDetail'

function App() {
const [isActionsOpen, setIsActionsOpen] = useState(false)
const [isRequestsOpen, setIsRequestsOpen] = useState(false)
const location = useLocation()

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
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10"/></svg>
                Anasayfa
              </Link>
            </li>
            <li>
              <Link to="/create-request" className={location.pathname === "/create-request" ? "active" : ""}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Talep Oluştur
              </Link>
            </li>

            <li>
             <button onClick={() => setIsActionsOpen(!isActionsOpen)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
                İşlemlerim ▾
            </button>
              {isActionsOpen && (
                <ul className="actions-submenu">
                  <Link to="/my-actions?view=current" className={location.pathname === "/my-actions" && location.search === "?view=current" ? "sub-menu-item active" : "sub-menu-item"}>Aktif İşlemler</Link>
                  <Link to="/my-actions?view=past" className={location.pathname === "/my-actions" && location.search === "?view=past" ? "sub-menu-item active" : "sub-menu-item"}>Geçmiş İşlemler</Link>
                </ul>
              )}
            </li>

            <li>
              <button onClick={() => setIsRequestsOpen(!isRequestsOpen)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
                Taleplerim ▾
              </button>
              {isRequestsOpen && (
                <ul className="requests-submenu">
                  <Link to="/my-requests?view=current" className={location.pathname === "/my-requests" && location.search === "?view=current" ? "sub-menu-item active" : "sub-menu-item"}>Aktif Taleplerim</Link>
                  <Link to="/my-requests?view=past" className={location.pathname === "/my-requests" && location.search === "?view=past" ? "sub-menu-item active" : "sub-menu-item"}>Geçmiş Taleplerim</Link>
                </ul>
              )}
            </li>
            <li>
              <Link to="/logout" className={location.pathname === "/logout" ? "active" : ""}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/></svg>
                Ayarlar
              </Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/my-actions" element={<MyActions />} />
            <Route path="/logout" element={<div>Ayarlar</div>} />
            <Route path="/request/:id" element={<RequestDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
