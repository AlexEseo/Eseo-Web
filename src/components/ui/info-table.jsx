// InfoTable: a list of "label — value" rows with lines between them. Figma "Info table" made of "Info row".
// Phone: label above value (Info row / Layout=Stacked). From tablet up: label left, value right (Layout=Horizontal).
// Props: rows — [{ label, value }] (texts from site.json); emails inside values become links.
import { linkEmails } from '@/lib/link-emails'
import { cn } from '@/lib/utils'

function InfoTable({ rows = [], className }) {
  return (
    <dl data-slot="info-table" className={cn('flex flex-col border-t border-gray-200', className)}>
      {rows.map((row) => (
        <div key={row.label} data-slot="info-row" className="flex flex-col gap-1 border-b border-gray-200 py-4 text-body-14 md:flex-row md:gap-6">
          <dt className="text-gray-500 md:w-info-label md:shrink-0">{row.label}</dt>
          <dd className="font-medium text-gray-900 md:flex-1">{linkEmails(row.value)}</dd>
        </div>
      ))}
    </dl>
  )
}

export { InfoTable }
