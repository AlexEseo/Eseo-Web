// Industries: tabs for four industries; each tab shows its heading, the industry card and a link.
// One IndustryCard component for every tab — only the texts change. All tab panels are kept on the page
// and stacked in the same spot, so the block and the card keep the size of the tallest tab and do not jump.
// Figma Home → "02 Industries" (+ the three variant frames). The link opens the "Let's talk" form.
// A warm gradient circle sits behind the content — exact copy of Figma "Circle right · gradient".
// Props: text (site.industries from site.json), onCta (opens the form).
import { Reveal } from '@/components/motion/reveal'
import { GradientScene } from '@/components/ui/gradient-scene'
import { IndustryCard } from '@/components/ui/industry-card'
import { Link } from '@/components/ui/link'
import { SectionHeading } from '@/components/ui/section-heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { industriesScene } from '@/lib/gradients'
import { cn } from '@/lib/utils'

// Switching tabs: the old texts fade out, then the new ones slowly fade in and rise a little (tokens --duration-tab-*, ease in-out)
// (so two texts never overlap). Hidden texts can't be clicked or read by screen readers (visibility hidden).
const tabFade =
  'transition-[opacity,translate,visibility] duration-(--duration-tab-in) delay-(--duration-tab-out) ease-(--ease-in-out) group-data-[state=inactive]/tab:invisible group-data-[state=inactive]/tab:translate-y-1 group-data-[state=inactive]/tab:opacity-0 group-data-[state=inactive]/tab:delay-0 group-data-[state=inactive]/tab:duration-(--duration-tab-out)'

function Industries({ text, onCta }) {
  return (
    <section data-slot="industries" className="relative isolate px-5 py-16 md:px-10 md:py-40 lg:px-20">
      {/* Figma: circle 1032 wide, centred, 117 from the top of the 1280 section.
          It scales with the screen but never grows past the Figma size (--industries-circle-max),
          so on wide screens it does not spill over the neighbouring blocks. */}
      <GradientScene
        scene={industriesScene}
        className="left-1/2 -z-10 -translate-x-1/2"
        style={{ width: 'min(80.63%, var(--industries-circle-max))', top: '7.31rem' }}
      />
      <Tabs defaultValue={text.items[0].key} className="mx-auto max-w-(--container-page) items-center gap-8 md:gap-13">
        <Reveal>
          <TabsList className="justify-center gap-x-8 gap-y-3">
            {text.items.map((item) => (
              <TabsTrigger key={item.key} value={item.key}>
                {item.tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Reveal>
        {/* Every tab's heading, card and link share one grid: same rows for all tabs, so every card
            gets the height of the tallest one. Inactive tabs stay in place but are hidden.
            Switching tabs: the old texts fade out and the new ones fade in, rising a little (tabFade). */}
        <Reveal className="grid w-full grid-cols-1 justify-items-center gap-y-8 md:gap-y-13">
          {text.items.map((item) => (
            <TabsContent key={item.key} value={item.key} forceMount className="group/tab contents">
              <SectionHeading title={item.title} description={item.description} className={cn(tabFade, 'col-start-1 row-start-1')} />
              <IndustryCard
                heading={item.card.heading}
                rows={item.card.rows}
                note={item.card.note}
                className={cn(tabFade, 'col-start-1 row-start-2 w-full max-w-(--container-card-wide)')}
              />
              <Link
                href="#lets-talk"
                className={cn(tabFade, 'col-start-1 row-start-3')}
                onClick={(e) => {
                  e.preventDefault()
                  onCta?.()
                }}
              >
                {item.link}
              </Link>
            </TabsContent>
          ))}
        </Reveal>
      </Tabs>
    </section>
  )
}

export { Industries }
