// PartnerAward: a partner status between two laurel branches. Figma "Partner award" (Partner=Meta / Google / TikTok).
// The whole award (both laurels, partner logo and caption) is one SVG exported from Figma, so the parts can never
// shift against each other. Caption text is turned into outlines, so no extra fonts are loaded.
// Brand colours inside the SVG are the partners' own and are kept as they are.
// Props: partner "meta" | "google" | "tiktok", name (text for screen readers, from site.json), className.
import meta from '@/assets/logos/partners/meta.svg'
import google from '@/assets/logos/partners/google.svg'
import tiktok from '@/assets/logos/partners/tiktok.svg'
import { cn } from '@/lib/utils'

const logos = { meta, google, tiktok }

function PartnerAward({ partner, name, className }) {
  return <img data-slot="partner-award" src={logos[partner]} alt={name} className={cn('h-award w-auto', className)} />
}

export { PartnerAward }
