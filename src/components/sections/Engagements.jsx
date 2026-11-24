// Engagements: left-aligned heading and three pricing cards (the middle one highlighted).
// Figma Home → "04 Engagements". Card buttons open the "Let's talk" form. Blue gradient behind — exact copy of Figma "Engagements gradient" (starts 158 above the section).
// Props: text (site.engagements), onCta.
import { GradientScene } from '@/components/ui/gradient-scene'
import { PricingCard } from '@/components/ui/pricing-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { engagementsScene } from '@/lib/gradients'

function Engagements({ text, onCta }) {
  return (
    <section data-slot="engagements" className="relative isolate px-5 py-16 md:px-10 md:py-32 lg:px-20">
      <GradientScene scene={engagementsScene} className="inset-x-0 top-0 -z-10 -mt-(--eng-glow-shift)" />
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-16">
        <SectionHeading align="left" title={text.title} />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          {text.plans.map((plan) => (
            <PricingCard
              key={plan.key}
              label={plan.label}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              from={plan.from}
              period={plan.period}
              features={plan.features}
              cta={plan.cta}
              selected={plan.selected}
              onCta={onCta}
              className="lg:flex-1"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Engagements }
