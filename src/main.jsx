// Entry point: loads styles and shows the page that matches the address.
//   /            → home (App)
//   /privacy     → Privacy Policy
//   /legal       → Legal Notice
//   /styleguide  → component showcase
//   anything else → 404
// Each address also has its own HTML file (privacy/index.html, legal/index.html, 404.html) with the right title,
// so the pages work on any static hosting without extra settings.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import site from './content/site.json'
import App from './App.jsx'
import DocumentPage from './pages/DocumentPage.jsx'
import NotFound from './pages/NotFound.jsx'
import Styleguide from './pages/Styleguide.jsx'

const path = window.location.pathname.replace(/\/(index\.html)?$/, '') || '/'

function Page() {
  if (path === '/') return <App />
  if (path === '/privacy') return <DocumentPage text={site.privacy} />
  if (path === '/legal') return <DocumentPage text={site.legal} />
  if (path === '/styleguide') return <Styleguide />
  return <NotFound />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
