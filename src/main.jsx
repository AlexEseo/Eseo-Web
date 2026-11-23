// Entry point: loads styles and shows the page that matches the address.
//   /            → home (App)
//   /privacy     → Privacy Policy
//   /legal       → Legal Notice
//   /styleguide  → component showcase
//   anything else → 404
// Each page also has its own HTML file (privacy/index.html, legal/index.html, 404.html) with the right title,
// so the pages work on any static hosting without extra settings.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import site from './content/site.json'
import App from './App.jsx'
import DocumentPage from './pages/DocumentPage.jsx'
import NotFound from './pages/NotFound.jsx'
import Styleguide from './pages/Styleguide.jsx'

// The address decides; for an unknown address the HTML file names its page (<div id="root" data-page="notFound">).
const root = document.getElementById('root')
const path = window.location.pathname.replace(/\/(index\.html)?$/, '') || '/'
const byPath = { '/': 'home', '/privacy': 'privacy', '/legal': 'legal', '/styleguide': 'styleguide' }
const page = byPath[path] ?? root.dataset.page ?? 'notFound'

function Page() {
  if (page === 'home') return <App />
  if (page === 'privacy') return <DocumentPage text={site.privacy} />
  if (page === 'legal') return <DocumentPage text={site.legal} />
  if (page === 'styleguide') return <Styleguide />
  return <NotFound />
}

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
