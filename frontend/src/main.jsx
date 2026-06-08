import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FilmesProvider } from './context/FilmesContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FilmesProvider>
        <App />
      </FilmesProvider>
    </BrowserRouter>
  </StrictMode>
)