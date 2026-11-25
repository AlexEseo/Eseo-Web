// PartnerAward: a partner status between two laurel branches. Figma "Partner award" (Partner=Meta / Google / TikTok).
// The partner logo and its caption are one SVG exported from Figma (caption text turned into outlines,
// so no extra fonts are loaded). Brand colours inside the SVG are the partners' own and are kept as they are.
// Props: partner "meta" | "google" | "tiktok", name (text for screen readers, from site.json), className.
import laurel from '@/assets/logos/laurel.svg'
import meta from '@/assets/logos/partners/meta.svg'
import google from '@/assets/logos/partners/google.svg'
import tiktok from '@/assets/logos/partners/tiktok.svg'
import { cn } from '@/lib/utils'

const logos = { meta, google, tiktok }

function PartnerAward({ partner, name, className }) {
  return (
    <div data-slot="partner-award" className={cn('flex items-center', className)}>
      <img src={laurel} alt="" aria-hidden="true" className="h-award w-auto" />
      <img src={logos[partner]} alt={name} className="h-award w-auto" />
      <img src={laurel} alt="" aria-hidden="true" className="h-award w-auto -scale-x-100" />
    </div>
  )
}

export { PartnerAward }
