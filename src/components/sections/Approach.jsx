// Approach: "4 channels · One commercial direction." — left-aligned heading and three steps.
// Figma Home → "01 Approach". Desktop: text and picture side by side, the picture swaps sides on the middle step.
// Phone: text above the picture. Steps start at the same left edge as the heading.
// Props: text (site.approach from site.json), onCta (opens the form). Pictures are exported from Figma (src/assets/illustrations).
import artConstraint from '@/assets/illustrations/approach-constraint.svg?raw'
import artPlan from '@/assets/illustrations/approach-plan.svg?raw'
import artScale from '@/assets/illustrations/approach-scale.svg?raw'
import { ApproachCopy } from '@/components/ui/approach-copy'
import { FigmaArt } from '@/components/ui/figma-art'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

const art = { constraint: artConstraint, plan: artPlan, scale: artScale }

function Approach({ text, onCta }) {
  return (
    <section data-slot="approach" className="px-5 py-16 md:px-10 md:py-29 lg:px-20">
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-13">
        <SectionHeading align="left" title={text.title} description={text.description} />
        <div className="flex flex-col gap-10 md:gap-24">
          {text.steps.map((step, i) => (
            <article key={step.key} className="flex flex-col gap-6 md:flex-row md:items-center md:gap-31">
              <ApproachCopy title={step.title} description={step.description} label={step.label} onCta={onCta} className={cn('md:flex-1', i % 2 === 1 && 'md:order-2')} />
              <FigmaArt svg={art[step.key]} frame={[498, 320]} className="rounded-16 md:flex-1" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Approach }
