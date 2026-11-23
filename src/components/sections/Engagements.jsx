// Engagements: left-aligned heading, three pricing cards (the middle one highlighted) and a footnote.
// Figma Home → "04 Engagements". Card buttons open the "Let's talk" form. Blue gradient behind — exact copy of Figma "Engagements gradient" (starts 158 above the section).
// Props: text (site.engagements), onCta.
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Divider } from '@/components/ui/divider'
import { GradientScene } from '@/components/ui/gradient-scene'
import { PricingCard } from '@/components/ui/pricing-card'
import { SectionHeading } from '@/components/ui/section-heading'
import { engagementsScene } from '@/lib/gradients'

function Engagements({ text, onCta }) {
  return (
    <section data-slot="engagements" className="relative isolate px-5 py-16 md:px-10 md:py-32 lg:px-20">
      <GradientScene scene={engagementsScene} className="inset-x-0 top-0 -z-10 -mt-(--eng-glow-shift)" />
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-16">
        <Reveal>
          <SectionHeading align="left" title={text.title} />
        </Reveal>
        <RevealGroup className="flex flex-col gap-5 lg:flex-row lg:items-start">
          {text.plans.map((plan) => (
            <RevealItem key={plan.key} className="group/lift flex lg:flex-1">
              <PricingCard
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
                className="flex-1"
              />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="flex max-w-(--container-footnote) flex-col gap-6">
          <Divider />
          <p className="text-body-12 text-gray-600">{text.footnote}</p>
        </div>
      </div>
    </section>
  )
}

export { Engagements }
