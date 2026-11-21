// Icons by name, so site.json can say which icon a badge shows (e.g. ["green", "bars"]).
// Channel logos keep their brand colours (files in src/assets/icons); the others take the text colour.
import IconArrowUp from '@/components/icons/IconArrowUp'
import IconBars from '@/components/icons/IconBars'
import IconCalendar from '@/components/icons/IconCalendar'
import IconCheck from '@/components/icons/IconCheck'
import IconEuro from '@/components/icons/IconEuro'
import IconPercent from '@/components/icons/IconPercent'
import IconSeo12 from '@/components/icons/IconSeo12'
import IconSwap from '@/components/icons/IconSwap'
import IconTarget from '@/components/icons/IconTarget'
import logoGoogleAds from '@/assets/icons/google-ads.svg'
import logoMeta from '@/assets/icons/meta.svg'
import logoTiktok from '@/assets/icons/tiktok.svg'

const logo = (src) => <img src={src} alt="" width="12" height="12" />

export const badgeIcons = {
  'seo-12': <IconSeo12 />,
  'google-ads': logo(logoGoogleAds),
  meta: logo(logoMeta),
  tiktok: logo(logoTiktok),
  bars: <IconBars />,
  target: <IconTarget />,
  percent: <IconPercent />,
  check: <IconCheck />,
  euro: <IconEuro />,
  swap: <IconSwap />,
  'arrow-up': <IconArrowUp />,
  calendar: <IconCalendar />,
}
