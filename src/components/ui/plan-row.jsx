// PlanRow: a 2×2 group of small icon badges, a title with a subtitle, and an optional blue check. Figma "Plan row".
// Props:
//   badges:   up to four <IconBadge> elements
//   title, subtitle: texts from site.json
//   checked:  true shows the blue check circle on the right
import IconCheckCircle from '@/components/icons/IconCheckCircle'
import { cn } from '@/lib/utils'

function PlanRow({ badges = [], title, subtitle, checked = false, className }) {
  return (
    <div data-slot="plan-row" className={cn('flex items-center gap-4 rounded-16 p-3', className)}>
      <div className="grid size-14 shrink-0 grid-cols-2 gap-1 rounded-16 bg-gray-100 p-1.5">{badges}</div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-body-16 font-semibold text-gray-900">{title}</p>
        {subtitle && <p className="text-body-14 text-gray-500">{subtitle}</p>}
      </div>
      {checked && <IconCheckCircle className="shrink-0 text-brand-600" />}
    </div>
  )
}

export { PlanRow }
