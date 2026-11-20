// StatCard: white card with a small label, a big number and a caption. Figma "Stat card".
// Props: label, value (e.g. "€1.2m"), caption — texts from site.json; className.
import { cn } from '@/lib/utils'

function StatCard({ label, value, caption, className }) {
  return (
    <div data-slot="stat-card" className={cn('flex flex-col gap-3 rounded-16 border border-gray-200 bg-gray-0 p-5', className)}>
      <p className="text-caption-10 font-bold text-gray-500 capitalize">{label}</p>
      <p className="text-display-40 font-semibold text-gray-900 tabular-nums">{value}</p>
      {caption && <p className="text-body-14 text-gray-600">{caption}</p>}
    </div>
  )
}

export { StatCard }
