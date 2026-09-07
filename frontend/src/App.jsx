import './App.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/home'
import CreateRequest from './pages/CreateRequest'
import MyActions from './pages/MyActions'
import { useState } from 'react'
import MyRequests from './pages/MyRequests'
import RequestDetail from './pages/RequestDetail'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from './labels'

function App() {
const [isActionsOpen, setIsActionsOpen] = useState(false)
const [isRequestsOpen, setIsRequestsOpen] = useState(false)
const location = useLocation()
const navigate = useNavigate()
const isLoginPage = location.pathname === '/login'
console.log("Current User:", getCurrentUser()) // CurrentUser değerini konsola yazdır
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Talep Yönetim Sistemi</h1>
        </div>
      </header>
        <div className="layout">
          {!isLoginPage && (
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
                <button onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Çıkış Yap
                </button>
              </li>
            </ul>
          </nav>
          )}

        <main className={isLoginPage ? "main-fullscreen" : ""}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
            <Route path="/my-requests" element={<ProtectedRoute><MyRequests /></ProtectedRoute>} />
            <Route path="/my-actions" element={<ProtectedRoute><MyActions /></ProtectedRoute>} />
            <Route path="/logout" element={<ProtectedRoute><div>Ayarlar</div></ProtectedRoute>} />
            <Route path="/request/:id" element={<ProtectedRoute><RequestDetail /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
