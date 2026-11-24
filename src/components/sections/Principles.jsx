// Principles: "Built around your business model." — heading and four industry cards. Figma Home → "Principles".
// Desktop: bento grid of 3 columns — E-commerce and Education are tall, Subscriptions and Multi-location share the middle column.
// Phone: one column (E-commerce, Subscriptions, Multi-location, Education — as in the Figma mobile frame).
// Props: text (site.principles from site.json). Card pictures are exported from Figma (src/assets/illustrations);
// their small texts ("Revenue", "Start free trial"…) are part of the pictures, not of site.json.
import artEducation from '@/assets/illustrations/principles-education.svg?raw'
import artMarket from '@/assets/illustrations/principles-market.svg?raw'
import artShop from '@/assets/illustrations/principles-shop.svg?raw'
import artSubscribe from '@/assets/illustrations/principles-subscribe.svg?raw'
import { CardCaption } from '@/components/ui/card-caption'
import { FigmaArt } from '@/components/ui/figma-art'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

// Picture (exported from Figma, with its place inside the 310-wide "Visual" box) and grid place for each card.
// E-commerce and Multi-location panels run past the box and are cut only by the card edge, as in Figma.
const cardSetup = {
  ecommerce: { art: { svg: artShop, frame: [310, 402], at: [0, -1], size: [376, 334], bleed: true }, grid: 'lg:row-span-2', order: 'order-1' },
  subscriptions: { art: { svg: artSubscribe, frame: [310, 122] }, grid: '', order: 'order-2' },
  education: { art: { svg: artEducation, frame: [310, 402], at: [-24, 0], size: [360, 402] }, grid: 'lg:row-span-2', order: 'order-4 lg:order-3' },
  multilocation: { art: { svg: artMarket, frame: [310, 122], at: [-48, 13], size: [358, 96], bleed: true }, grid: 'lg:col-start-2', order: 'order-3 lg:order-4' },
}

function Principles({ text }) {
  return (
    <section data-slot="principles" className="relative px-5 pt-12 pb-16 md:px-10 md:py-29 lg:px-20">
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-27">
        <SectionHeading title={text.title} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {text.cards.map((card) => {
            const setup = cardSetup[card.key]
            return (
              <article
                key={card.key}
                className={cn(
                  'flex flex-col justify-between gap-8 overflow-hidden rounded-20 border border-gray-200 bg-gray-0 px-6 pt-8 pb-6 shadow-glass-card',
                  setup.grid,
                  setup.order,
                )}
              >
                <FigmaArt {...setup.art} className="rounded-8" />
                <CardCaption title={card.title} description={card.description} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Principles }
