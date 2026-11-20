// IndustryCard: white card with a small heading, rows split by thin lines, and a note. Figma "Industry card".
// Shown under the Tabs in the Industries section.
// Props:
//   heading: small grey heading on top (shown in lowercase caps style, as in Figma)
//   rows:    list like [{ label: "Business question", value: "Which products..." }]
//   note:    small grey text at the bottom (optional)
// All texts come from site.json.
import { Divider } from '@/components/ui/divider'
import { PlaybookRow } from '@/components/ui/playbook-row'
import { cn } from '@/lib/utils'

function IndustryCard({ heading, rows = [], note, className }) {
  return (
    <div
      data-slot="industry-card"
      className={cn('flex flex-col rounded-16 border border-gray-200 bg-gray-0 p-6 shadow-card md:p-10', className)}
    >
      <p className="pb-4 text-caption-12 font-bold text-gray-500 lowercase">{heading}</p>
      {rows.map((row) => (
        <div key={row.label}>
          <Divider />
          <PlaybookRow label={row.label} value={row.value} />
        </div>
      ))}
      {note && (
        <>
          <Divider />
          <p className="pt-4 text-body-12 text-gray-600">{note}</p>
        </>
      )}
    </div>
  )
}

export { IndustryCard }
