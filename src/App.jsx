// Landing page: assembles the sections in the order of Figma Home. All texts come from site.json.
// Header, footer, the "Let's talk" form and the shared currency come from PageShell.
import { useEffect } from 'react'
import site from './content/site.json'
import { PageShell } from '@/components/layout/page-shell'
import { Hero } from '@/components/sections/Hero'
import { Principles } from '@/components/sections/Principles'
import { Approach } from '@/components/sections/Approach'
import { Industries } from '@/components/sections/Industries'
import { BusinessCase } from '@/components/sections/BusinessCase'
import { RoadmapSection } from '@/components/sections/RoadmapSection'
import { Engagements } from '@/components/sections/Engagements'
import { Faq } from '@/components/sections/Faq'
import { Closing } from '@/components/sections/Closing'
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
  useEffect(() => {
    document.title = site.meta.title
  }, [])

  return (
    <PageShell>
      {({ openTalk, currency, setCurrency }) => (
        <>
          <Hero
            text={site.hero}
            channels={site.hero.channels.map((c) => ({ name: c.name, icon: channelIcons[c.icon] }))}
            onCta={openTalk}
          />
          <Principles text={site.principles} />
          <Approach text={site.approach} onCta={openTalk} />
          <Industries text={site.industries} onCta={openTalk} />
          <BusinessCase text={site.businessCase} currencies={site.currencies} currency={currency} onCurrencyChange={setCurrency} />
          <RoadmapSection text={site.roadmap} />
          <Engagements text={site.engagements} onCta={openTalk} />
          <Faq text={site.faq} />
          <Closing text={site.closing} onCta={openTalk} />
        </>
      )}
    </PageShell>
  )
}
