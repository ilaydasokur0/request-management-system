import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateRequest from './pages/CreateRequest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App>
      <CreateRequest />
    </App>
  </StrictMode>,
)