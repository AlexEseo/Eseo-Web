// Roadmap: heading on the left and steps in a row (desktop); heading on top and steps in a column (phone).
// Figma "Roadmap" (Size=Desktop / Size=Mobile).
// Props:
//   heading: text on the left, e.g. "Your first six weeks, made visible."
//   steps:   list like [{ when: "in 2 weeks", title: "Diagnose", description: "..." }]
// All texts come from site.json.
import { RoadmapStep } from '@/components/ui/roadmap-step'
import { cn } from '@/lib/utils'

function Roadmap({ heading, steps = [], className }) {
  return (
    <div data-slot="roadmap" className={cn('flex flex-col gap-6 md:flex-row md:gap-9', className)}>
      <h3 className="text-header-24 font-semibold text-gray-900 md:max-w-roadmap-heading md:shrink-0">{heading}</h3>
      <ol className="flex flex-1 flex-col gap-6 md:flex-row md:gap-9">
        {steps.map((step) => (
          <RoadmapStep key={step.title} {...step} className="md:flex-1" />
        ))}
      </ol>
    </div>
  )
}

export { Roadmap }
