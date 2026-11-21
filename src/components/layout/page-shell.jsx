// PageShell: what every page shares — Header, Footer and the "Let's talk" form, plus the chosen currency.
// Home, Privacy, Legal and 404 all use it, so the header, footer and form behave the same everywhere.
// Props:
//   footer:   false hides the footer (404 page, as in Figma)
//   children: a function that gets { openTalk, currency, setCurrency } and returns the page content,
//             e.g. {({ openTalk }) => <Hero onCta={openTalk} />}
import { useState } from 'react'
import site from '@/content/site.json'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { LetsTalk } from '@/components/sections/LetsTalk'

function PageShell({ footer = true, children }) {
  const [currency, setCurrency] = useState(site.defaultCurrency)
  const [talkOpen, setTalkOpen] = useState(false)
  const openTalk = () => setTalkOpen(true)

  const chrome = {
    text: { ...site.header, ...site.footer, logoAlt: site.brand.logoAlt },
    currencies: site.currencies,
    currency,
    onCurrencyChange: setCurrency,
  }

  return (
    <>
      <Header {...chrome} onCta={openTalk} />
      <main className="overflow-x-clip">{children({ openTalk, currency, setCurrency })}</main>
      {footer && <Footer {...chrome} />}
      <LetsTalk text={site.form} open={talkOpen} onOpenChange={setTalkOpen} />
    </>
  )
}

export { PageShell }
