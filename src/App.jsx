// Landing page: assembles the sections in the order of Figma Home. All texts come from site.json.
// Shared state: the chosen currency (header, footer, Planner) and whether the "Let's talk" form is open.
import { useEffect, useState } from 'react'
import site from './content/site.json'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { LetsTalk } from '@/components/sections/LetsTalk'
import { Principles } from '@/components/sections/Principles'
import { Approach } from '@/components/sections/Approach'
import IconSeo from '@/components/icons/IconSeo'
import logoGoogleAds from '@/assets/icons/google-ads.svg'
import logoMeta from '@/assets/icons/meta.svg'
import logoTiktok from '@/assets/icons/tiktok.svg'

// Channel logos for the Hero illustration (names come from site.json).
const channelIcons = {
  seo: <IconSeo />,
  'google-ads': <img src={logoGoogleAds} alt="" width="36" height="36" />,
  meta: <img src={logoMeta} alt="" width="36" height="36" />,
  tiktok: <img src={logoTiktok} alt="" width="36" height="36" />,
}

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
      <main className="overflow-x-clip">
        <Hero
          text={site.hero}
          channels={site.hero.channels.map((c) => ({ name: c.name, icon: channelIcons[c.icon] }))}
          onCta={openTalk}
        />
        <Principles text={site.principles} />
        <Approach text={site.approach} />
      </main>
      <Footer {...chrome} />
      <LetsTalk text={site.form} open={talkOpen} onOpenChange={setTalkOpen} />
    </>
  )
}
