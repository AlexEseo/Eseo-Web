// PlaybookRow: small grey label above a dark line of text. Figma "Playbook row" (used in Industry card).
// Props: label, value (texts from site.json), className.
import { cn } from '@/lib/utils'

function PlaybookRow({ label, value, className }) {
  return (
    <div data-slot="playbook-row" className={cn('flex flex-col gap-2 py-4', className)}>
      <p className="text-body-12 text-gray-600">{label}</p>
      <p className="text-label-14-medium font-medium text-gray-900">{value}</p>
    </div>
  )
}

export { PlaybookRow }
