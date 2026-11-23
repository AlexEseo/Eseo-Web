// Principles: "Built around your business model." — heading and four industry cards. Figma Home → "Principles".
// Desktop: bento grid of 3 columns — E-commerce and Education are tall, Subscriptions and Multi-location share the middle column.
// Phone: one column (E-commerce, Subscriptions, Multi-location, Education — as in the Figma mobile frame).
// Props: text (site.principles from site.json). Card pictures are the animated Figma illustrations (PrincipleArt);
// their small texts ("Revenue", "Start free trial"…) are part of the pictures, not of site.json.
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { CardCaption } from '@/components/ui/card-caption'
import { FigmaArt } from '@/components/ui/figma-art'
import { PrincipleArt } from '@/components/ui/principle-art'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

// Picture place inside the 310-wide "Visual" box (as in Figma) and grid place for each card.
// Education and Multi-location pictures run past the box and are cut only by the card edge, as in Figma.
const cardSetup = {
  ecommerce: { art: { frame: [310, 402], at: [0, 0], size: [310, 402] }, grid: 'lg:row-span-2', order: 'order-1' },
  subscriptions: { art: { frame: [310, 122], at: [0, 0], size: [310, 123], bleed: true }, grid: '', order: 'order-2' },
  education: { art: { frame: [310, 402], at: [-88, 0], size: [486, 402], bleed: true }, grid: 'lg:row-span-2', order: 'order-4 lg:order-3' },
  multilocation: { art: { frame: [310, 122], at: [-48, 0], size: [358, 122], bleed: true }, grid: 'lg:col-start-2', order: 'order-3 lg:order-4' },
}

function Principles({ text }) {
  return (
    <section data-slot="principles" className="relative px-5 pt-12 pb-16 md:px-10 md:py-29 lg:px-20">
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-27">
        <Reveal>
          <SectionHeading title={text.title} />
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {text.cards.map((card) => {
            const setup = cardSetup[card.key]
            return (
              <RevealItem
                as="article"
                key={card.key}
                className={cn(
                  'flex flex-col justify-between gap-8 overflow-hidden rounded-20 border border-gray-200 bg-gray-0 px-6 pt-8 pb-6 shadow-glass-card',
                  setup.grid,
                  setup.order,
                )}
              >
                <FigmaArt {...setup.art} className="rounded-8">
                  <PrincipleArt kind={card.key} className="size-full" />
                </FigmaArt>
                <CardCaption title={card.title} description={card.description} />
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

export { Principles }
