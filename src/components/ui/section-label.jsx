// SectionLabel: small grey label above a section heading. Figma "Section label" (typo/label/12, semibold, gray/500).
// Props: className, children (the text, from site.json).
import { cn } from '@/lib/utils'

function SectionLabel({ className, ...props }) {
  return <p data-slot="section-label" className={cn('text-label-12 font-semibold text-gray-500', className)} {...props} />
}

export { SectionLabel }
