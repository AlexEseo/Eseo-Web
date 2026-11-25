// CaseSlider: a row of testimonial cards that scrolls sideways. Figma "Case studies" (Device=Desktop / Mobile).
// Desktop: three cards are visible, round arrows sit on the left and right edges, dots below
// (one dot per scroll stop, so 4 dots for 6 cards on desktop and 6 on a phone).
// Phone: one card plus the edge of the next one (it runs to the screen edge), swipe to scroll, dots below.
// Built with plain CSS scrolling and snapping, no extra library. Cards stretch to the tallest one.
// Under "reduce motion" the jump between cards is instant instead of a smooth scroll.
// Props:
//   items:  list of { name, company, photo, quote, metric } (site.json → caseStudies.items)
//   labels: { previous, next, goTo } — texts for screen readers (site.json → caseStudies)
//   className
// SliderArrow (Figma "Slider arrow", Direction=Prev / Next) is exported for the styleguide.
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import IconChevronDown20 from '@/components/icons/IconChevronDown20'
import { CaseCard } from '@/components/ui/case-card'
import { cn } from '@/lib/utils'

function SliderArrow({ direction = 'next', className, ...props }) {
  return (
    <button
      type="button"
      data-slot="slider-arrow"
      className={cn(
        'flex size-12 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-gray-0 text-gray-900 shadow-slider-arrow outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard)',
        'hover:border-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-brand-600',
        'disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:border-gray-200',
        className,
      )}
      {...props}
    >
      <IconChevronDown20 className={direction === 'next' ? '-rotate-90' : 'rotate-90'} />
    </button>
  )
}

function CaseSlider({ items, labels, className }) {
  const scroller = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [pages, setPages] = useState(items.length)
  const [edges, setEdges] = useState({ start: true, end: false })

  // Distance from one card to the next (card width + gap), measured from the page.
  const step = useCallback(() => {
    const cards = scroller.current?.children
    if (!cards || cards.length < 2) return 1
    return cards[1].offsetLeft - cards[0].offsetLeft
  }, [])

  const update = useCallback(() => {
    const el = scroller.current
    if (!el) return
    // One dot per stop: with three cards visible there are fewer stops than cards.
    const visible = Math.max(1, Math.floor((el.clientWidth + 1) / step()))
    const count = Math.max(1, items.length - visible + 1)
    setPages(count)
    setIndex(Math.min(count - 1, Math.round(el.scrollLeft / step())))
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 })
  }, [items.length, step])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const goTo = (i) => {
    const target = Math.max(0, Math.min(pages - 1, i))
    scroller.current?.scrollTo({ left: target * step(), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div data-slot="case-slider" className={cn('flex flex-col gap-8', className)}>
      <div className="relative">
        <ul
          ref={scroller}
          onScroll={update}
          className="-mr-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-5 [scrollbar-width:none] md:mr-0 md:gap-5 md:pr-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li key={item.name} className="flex w-case-card-sm shrink-0 snap-start md:w-case-card">
              <CaseCard {...item} className="w-full" />
            </li>
          ))}
        </ul>
        <SliderArrow
          direction="prev"
          aria-label={labels.previous}
          disabled={edges.start}
          onClick={() => goTo(index - 1)}
          className="absolute top-1/2 -left-6 hidden -translate-y-1/2 md:flex"
        />
        <SliderArrow
          direction="next"
          aria-label={labels.next}
          disabled={edges.end}
          onClick={() => goTo(index + 1)}
          className="absolute top-1/2 -right-6 hidden -translate-y-1/2 md:flex"
        />
      </div>
      <div className="flex justify-center gap-1.5">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${labels.goTo} ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className="group cursor-pointer rounded-full py-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-brand-600"
          >
            <span
              className={cn(
                'block h-1.5 rounded-full transition-[width,background-color] duration-(--duration-base) ease-(--ease-standard) motion-reduce:transition-none',
                i === index ? 'w-dot-active bg-brand-600' : 'w-1.5 bg-gray-300 group-hover:bg-gray-400',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export { CaseSlider, SliderArrow }
