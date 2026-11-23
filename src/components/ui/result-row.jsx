// ResultRow: label on the left, value on the right, used in the Planner results. Figma "Result row".
// Props: label, value, className.
import { cn } from '@/lib/utils'

function ResultRow({ label, value, className }) {
  return (
    <div data-slot="result-row" className={cn('flex items-center justify-between gap-4 py-3 text-body-12', className)}>
      <span className="text-gray-600">{label}</span>
      <span className="text-right font-semibold whitespace-nowrap text-gray-900 tabular-nums">{value}</span>
    </div>
  )
}

export { ResultRow }
