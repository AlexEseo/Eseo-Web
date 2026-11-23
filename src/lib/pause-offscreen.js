// usePauseOffscreen: pauses every looping animation (floating orbs, drifting gradients, pulses) inside a page
// section while that section is off the screen, and resumes it when it comes back. The visitor sees no difference,
// but the browser stops redrawing things nobody is looking at, so scrolling stays smooth.
// It marks such sections with data-offscreen; the pause itself is one CSS rule in globals.css.
import { useEffect } from 'react'

export function usePauseOffscreen() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sections = document.querySelectorAll('main section')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute('data-offscreen', !e.isIntersecting)
      },
      { rootMargin: '25% 0%' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
}
