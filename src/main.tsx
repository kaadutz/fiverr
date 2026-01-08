import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import ini
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* Bungkus App dengan ini */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
