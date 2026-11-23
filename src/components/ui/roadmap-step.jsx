// RoadmapStep: one step of the roadmap — blue "when", title, short description. Figma "Roadmap step".
// Props: when (e.g. "in 2 weeks"), title, description — texts from site.json; className.
import { cn } from '@/lib/utils'

function RoadmapStep({ when, title, description, className }) {
  return (
    <li data-slot="roadmap-step" className={cn('flex flex-col gap-2', className)}>
      <p className="text-body-12 font-semibold text-brand-600">{when}</p>
      <p className="text-body-16 font-semibold text-gray-900">{title}</p>
      {description && <p className="text-body-12 text-gray-600">{description}</p>}
    </li>
  )
}

export { RoadmapStep }
