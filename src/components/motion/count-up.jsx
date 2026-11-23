// CountUp: a number that rolls smoothly from the old value to the new one when it changes
// (the big result in the calculator). With "less motion" in the system it just shows the new value.
// Duration and easing come from tokens.css.
// Props: value (number), format (turns the number into text, e.g. "+€48,000"), className and other attributes.
import { useEffect, useRef, useState } from 'react'
import { cubicBezier, useReducedMotion } from 'motion/react'
import { motionTokens } from '@/lib/motion-tokens'

function CountUp({ value, format = String, ...props }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(value)
  const from = useRef(value)

  useEffect(() => {
    if (reduce) {
      from.current = value
      setShown(value)
      return
    }
    // A light frame-by-frame count (no animation engine needed for a single number).
    const t = motionTokens()
    const ease = cubicBezier(...t.easeOut)
    const start = from.current
    const began = performance.now()
    let frame
    const step = (now) => {
      const p = Math.min((now - began) / (t.slow * 1000), 1)
      const v = start + (value - start) * ease(p)
      from.current = v
      setShown(v)
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [value, reduce])

  return <span {...props}>{format(shown)}</span>
}

export { CountUp }
