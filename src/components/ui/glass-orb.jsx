// GlassOrb: decorative glass sphere. Figma "Glass orb" (Size=S 44, Size=L 128).
// Look: soft white gradient, light outline, inner highlights, soft blue shadow, background blur — all from tokens.css.
// Props: size "s" | "l" (default "l"), className (for placing it), style.
import { cn } from '@/lib/utils'

const sizes = { s: 'size-11', l: 'size-32' }

function GlassOrb({ size = 'l', className, style }) {
  return (
    <span
      aria-hidden="true"
      data-slot="glass-orb"
      style={style}
      className={cn(
        'border-gradient pointer-events-none block rounded-full bg-(image:--gradient-orb) shadow-orb backdrop-blur-(--blur-orb) [--border-gradient-width:var(--border-width-orb)] [--border-gradient:var(--gradient-orb-stroke)]',
        sizes[size],
        className,
      )}
    />
  )
}

export { GlassOrb }
