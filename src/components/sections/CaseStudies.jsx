// CaseStudies: client testimonials in a slider. Figma "Case studies" (Desktop / Mobile).
// Sits after "4 channels · One commercial direction." Left-aligned heading, then the slider.
// Props: text (site.caseStudies from site.json).
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { CaseSlider } from '@/components/ui/case-slider'

function CaseStudies({ text }) {
  return (
    <section data-slot="case-studies" className="px-5 py-16 md:px-10 md:py-24 lg:px-20">
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-12">
        <Reveal>
          <SectionHeading align="left" label={text.label} title={text.title} description={text.description} />
        </Reveal>
        <Reveal>
          <CaseSlider items={text.items} labels={text} />
        </Reveal>
      </div>
    </section>
  )
}

export { CaseStudies }
