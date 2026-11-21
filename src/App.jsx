// Landing page: assembles the sections in the order of Figma Home. All texts come from site.json.
// Shared state: the chosen currency (header, footer, Planner) and whether the "Let's talk" form is open.
import { useEffect, useState } from 'react'
import site from './content/site.json'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { LetsTalk } from '@/components/sections/LetsTalk'

export default function App() {
  const [currency, setCurrency] = useState(site.defaultCurrency)
  const [talkOpen, setTalkOpen] = useState(false)
  const openTalk = () => setTalkOpen(true)

  useEffect(() => {
    document.title = site.meta.title
  }, [])

  const chrome = {
    text: { ...site.header, ...site.footer, logoAlt: site.brand.logoAlt },
    currencies: site.currencies,
    currency,
    onCurrencyChange: setCurrency,
  }

  return (
    <>
      <Header {...chrome} onCta={openTalk} />
      <main>
        <Hero text={site.hero} onCta={openTalk} />
      </main>
      <Footer {...chrome} />
      <LetsTalk text={site.form} open={talkOpen} onOpenChange={setTalkOpen} />
    </>
  )
}
