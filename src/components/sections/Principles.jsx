// Principles: "Built around your business model." — heading and four industry cards. Figma Home → "Principles".
// Desktop: bento grid of 3 columns — E-commerce and Education are tall, Subscriptions and Multi-location share the middle column.
// Phone: one column (E-commerce, Subscriptions, Multi-location, Education — as in the Figma mobile frame).
// Props: text (site.principles from site.json).
import LearningGraph from '@/components/illustrations/LearningGraph'
import MarketPanel from '@/components/illustrations/MarketPanel'
import ShopPanel from '@/components/illustrations/ShopPanel'
import SubscribePill from '@/components/illustrations/SubscribePill'
import { CardCaption } from '@/components/ui/card-caption'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

// Picture and grid place for each card.
const cardSetup = {
  ecommerce: { visual: (c) => <ShopPanel rows={c.rows} />, grid: 'md:row-span-2', tall: true, order: 'order-1' },
  subscriptions: { visual: (c) => <SubscribePill label={c.button} />, grid: '', order: 'order-2' },
  education: { visual: () => <LearningGraph />, grid: 'md:row-span-2', tall: true, order: 'order-4 md:order-3' },
  multilocation: { visual: (c) => <MarketPanel label={c.market} />, grid: 'md:col-start-2', order: 'order-3 md:order-4' },
}

function Principles({ text }) {
  return (
    <section data-slot="principles" className="relative px-5 pt-12 pb-16 md:px-10 md:py-29 lg:px-20">
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-27">
        <SectionHeading title={text.title} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          {text.cards.map((card) => {
            const setup = cardSetup[card.key]
            return (
              <article
                key={card.key}
                className={cn(
                  'flex flex-col gap-8 rounded-20 border border-gray-200 bg-gray-0 px-6 pt-8 pb-6 shadow-glass-card',
                  setup.grid,
                  setup.order,
                )}
              >
                <div className={cn('overflow-hidden rounded-8', setup.tall ? 'aspect-310/402 md:aspect-auto md:flex-1' : 'aspect-310/122')}>
                  {setup.visual(card)}
                </div>
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
