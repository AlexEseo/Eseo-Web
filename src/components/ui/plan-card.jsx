// PlanCard: light card holding a list of Plan rows. Figma "Plan card".
// Props: children — <PlanRow> elements; className.
import { cn } from '@/lib/utils'

function PlanCard({ className, children }) {
  return (
    <div data-slot="plan-card" className={cn('flex flex-col rounded-24 bg-gray-25 p-2 shadow-card', className)}>
      {children}
    </div>
  )
}

export { PlanCard }
