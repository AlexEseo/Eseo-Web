// RoadmapSection: the roadmap block on the home page. Figma Home → "05 Roadmap".
// Props: text (site.roadmap).
import { Reveal } from '@/components/motion/reveal'
import { Roadmap } from '@/components/ui/roadmap'

function RoadmapSection({ text }) {
  return (
    <section data-slot="roadmap-section" className="relative z-10 px-5 py-16 md:px-10 md:py-27 lg:px-20">
      <Reveal className="mx-auto max-w-(--container-page)">
        <Roadmap heading={text.heading} steps={text.steps} />
      </Reveal>
    </section>
  )
}

export { RoadmapSection }
