// CaseSlider: a row of testimonial cards that scrolls sideways in an endless loop. Figma "Case studies" (Device=Desktop / Mobile).
// Desktop: three cards are visible, round arrows sit on the left and right edges, dots below (one dot per card).
// Phone: one card plus the edge of the next one, swipe to scroll, dots below.
// Endless loop: the strip is rendered three times; when scrolling stops outside the middle copy,
// it jumps by one copy without animation, so the same cards stay on screen and you can keep going either way.
// The copies are hidden from screen readers and keyboard. Arrows never become inactive.
// Edges: the strip runs into the section side padding and fades out there (token --mask-slider-fade),
// so cards are never cut off with a hard edge.
// Built with plain CSS scrolling and snapping, no extra library. Cards stretch to the tallest one.
// Under "reduce motion" the jump between cards is instant instead of a smooth scroll.
// Props:
//   items:  list of { name, company, photo, quote, metric } (site.json → caseStudies.items)
//   labels: { previous, next, goTo } — texts for screen readers (site.json → caseStudies)
//   className
// SliderArrow (Figma "Slider arrow", Direction=Prev / Next) is exported for the styleguide.
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
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

const COPIES = [0, 1, 2] // middle copy (1) is the real one, the other two let the loop continue

function CaseSlider({ items, labels, className }) {
  const scroller = useRef(null)
  const settle = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const count = items.length

  // Distance from one card to the next (card width + gap), measured from the page.
  const step = useCallback(() => {
    const cards = scroller.current?.children
    if (!cards || cards.length < 2) return 1
    return cards[1].offsetLeft - cards[0].offsetLeft
  }, [])

  // Card number under the left edge, counted across all three copies.
  const position = useCallback(() => Math.round((scroller.current?.scrollLeft ?? 0) / step()), [step])

  // After scrolling stops, move back into the middle copy without animation.
  const recenter = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const card = ((position() % count) + count) % count
    el.scrollTo({ left: (count + card) * step(), behavior: 'auto' })
  }, [count, position, step])

  const onScroll = () => {
    setIndex(((position() % count) + count) % count)
    clearTimeout(settle.current)
    settle.current = setTimeout(recenter, 150)
  }

  useLayoutEffect(() => {
    recenter()
    window.addEventListener('resize', recenter)
    return () => {
      window.removeEventListener('resize', recenter)
      clearTimeout(settle.current)
    }
  }, [recenter])

  const move = (cards) => {
    clearTimeout(settle.current)
    scroller.current?.scrollTo({ left: (position() + cards) * step(), behavior: reduce ? 'auto' : 'smooth' })
  }

  // Dots take the shortest way round the loop.
  const goTo = (i) => {
    let delta = i - index
    if (delta > count / 2) delta -= count
    if (delta < -count / 2) delta += count
    move(delta)
  }

  return (
    <div data-slot="case-slider" className={cn('flex flex-col gap-8', className)}>
      <div className="relative">
        <ul
          ref={scroller}
          onScroll={onScroll}
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [mask-image:var(--mask-slider-fade)] [scrollbar-width:none] md:-mx-10 md:scroll-px-10 md:gap-5 md:px-10 lg:-mx-20 lg:scroll-px-20 lg:px-20 [&::-webkit-scrollbar]:hidden"
        >
          {COPIES.flatMap((copy) =>
            items.map((item) => (
              <li
                key={`${copy}-${item.name}`}
                aria-hidden={copy !== 1 || undefined}
                inert={copy !== 1 || undefined}
                className="flex w-case-card-sm shrink-0 snap-start md:w-case-card"
              >
                <CaseCard {...item} className="w-full" />
              </li>
            )),
          )}
        </ul>
        <SliderArrow
          direction="prev"
          aria-label={labels.previous}
          onClick={() => move(-1)}
          className="absolute top-1/2 -left-6 hidden -translate-y-1/2 md:flex"
        />
        <SliderArrow
          direction="next"
          aria-label={labels.next}
          onClick={() => move(1)}
          className="absolute top-1/2 -right-6 hidden -translate-y-1/2 md:flex"
        />
      </div>
      <div className="flex justify-center gap-1.5">
        {items.map((item, i) => (
          <button
            key={item.name}
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
