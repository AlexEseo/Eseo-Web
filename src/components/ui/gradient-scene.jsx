// GradientScene: draws a decor gradient exactly as in Figma from a scene description (src/lib/gradients.js).
// Every layer keeps its Figma place, size, colour stops, opacity, order and blur. The whole scene keeps the
// Figma frame proportions and scales with its width; blur scales too, so it looks the same on any screen.
// Decorative block with fixed proportions — approved by the owner.
// Drift: if the scene has "drift" and its layers have "to", every layer floats from its Figma State=A place to State=B
// and back, forever (Figma Smart animate). Done with transform only (move, turn, resize), so it stays smooth.
// With "less motion" in the system the scene stays still in State=A.
// Props: scene (from gradients.js), className / style (to place the scene).
import { cn } from '@/lib/utils'

const pct = (v, total) => `${(v / total) * 100}%`

function GradientScene({ scene, className, style }) {
  const [fw, fh] = scene.frame
  // Figma "blur" is a radius; CSS blur() takes half of it (the same as Figma's own SVG export).
  // It is given in "cqw" — a share of the scene width — so it shrinks with the scene.
  const blur = (px) => (px ? `blur(${(px / 2 / fw) * 100}cqw)` : undefined)

  return (
    <div
      aria-hidden="true"
      data-slot="gradient-scene"
      className={cn('pointer-events-none absolute @container', className)}
      style={{ aspectRatio: `${fw} / ${fh}`, ...style }}
    >
      <div
        className="absolute inset-0"
        style={{
          ...(scene.radius && { overflow: 'hidden', borderRadius: pct(scene.radius, fw) }),
          ...(scene.fill && { backgroundColor: `var(${scene.fill})` }),
          filter: blur(scene.blur),
        }}
      >
        {scene.layers.map((l, i) => {
          const base = l.rotate ? `rotate(${l.rotate}deg)` : 'none'
          // From A to B: move by the difference (in % of the layer's own size), turn, then resize.
          const drift = l.to
            ? `translate(${((l.to.x - l.x) / l.w) * 100}%, ${((l.to.y - l.y) / l.h) * 100}%) rotate(${l.to.rotate ?? 0}deg) scale(${l.to.w / l.w}, ${l.to.h / l.h})`
            : null
          return (
            <span
              key={i}
              className={cn('absolute', drift && 'animate-gradient-drift motion-reduce:animate-none')}
              style={{
                left: pct(l.x, fw),
                top: pct(l.y, fh),
                width: pct(l.w, fw),
                height: pct(l.h, fh),
                borderRadius: l.shape === 'rect' ? undefined : '50%',
                backgroundImage: `var(${l.token})`,
                opacity: l.opacity,
                filter: blur(l.blur),
                transform: l.rotate ? base : undefined,
                transformOrigin: l.rotate || drift ? 'top left' : undefined,
                mixBlendMode: l.blend,
                ...(drift && { '--drift-from': base, '--drift-to': drift, animationDuration: `var(${scene.drift})` }),
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export { GradientScene }
