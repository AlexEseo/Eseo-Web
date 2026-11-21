// Industries: tabs for four industries; each tab shows its heading, the industry card and a link.
// Figma Home → "02 Industries" (+ the three variant frames). The link opens the "Let's talk" form.
// A soft beige circle sits behind the content (decor, refined in stage 6).
// Props: text (site.industries from site.json), onCta (opens the form).
import { IndustryCard } from '@/components/ui/industry-card'
import { Link } from '@/components/ui/link'
import { SectionHeading } from '@/components/ui/section-heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Industries({ text, onCta }) {
  return (
    <section data-slot="industries" className="relative isolate overflow-hidden px-5 py-16 md:px-10 md:py-40 lg:px-20">
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 aspect-square w-full max-w-(--container-page) -translate-1/2 bg-(image:--gradient-industries)" />
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
