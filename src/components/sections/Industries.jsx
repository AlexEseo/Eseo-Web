// Industries: tabs for four industries; each tab shows its heading, the industry card and a link.
// Figma Home → "02 Industries" (+ the three variant frames). The link opens the "Let's talk" form.
// A warm gradient circle sits behind the content — exact copy of Figma "Circle right · gradient".
// Props: text (site.industries from site.json), onCta (opens the form).
import { GradientScene } from '@/components/ui/gradient-scene'
import { IndustryCard } from '@/components/ui/industry-card'
import { Link } from '@/components/ui/link'
import { SectionHeading } from '@/components/ui/section-heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { industriesScene } from '@/lib/gradients'

function Industries({ text, onCta }) {
  return (
    <section data-slot="industries" className="relative isolate px-5 py-16 md:px-10 md:py-40 lg:px-20">
      {/* Figma: circle 1032 wide, 124 from the left and 117 from the top of the 1280 section. */}
      <GradientScene scene={industriesScene} className="-z-10" style={{ left: '9.69%', width: '80.63%', top: '7.31rem' }} />
      <Tabs defaultValue={text.items[0].key} className="mx-auto max-w-(--container-page) items-center gap-8 md:gap-13">
        <TabsList className="justify-center gap-x-8 gap-y-3">
          {text.items.map((item) => (
            <TabsTrigger key={item.key} value={item.key}>
              {item.tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {text.items.map((item) => (
          <TabsContent key={item.key} value={item.key} className="flex flex-col items-center gap-8 md:gap-13">
            <SectionHeading title={item.title} description={item.description} />
            <IndustryCard heading={item.card.heading} rows={item.card.rows} note={item.card.note} className="w-full max-w-(--container-card-wide)" />
            <Link
              href="#lets-talk"
              onClick={(e) => {
                e.preventDefault()
                onCta?.()
              }}
            >
              {item.link}
            </Link>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

export { Industries }
