// Entry point: loads styles and shows the landing page, or the styleguide at /styleguide.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import Styleguide from './pages/Styleguide.jsx'

const isStyleguide = window.location.pathname.replace(/\/$/, '') === '/styleguide'

createRoot(document.getElementById('root')).render(
  <StrictMode>{isStyleguide ? <Styleguide /> : <App />}</StrictMode>,
)
