// HeroGlow: soft blue gradient background behind the lower part of the Hero and the top of Principles.
// Figma Home → "Hero→Principles gradient" (1280×1280 square): a light base and six soft blobs.
// Decorative block with fixed proportions (approved by the owner): blobs are placed in percent of the square.
// Colours live in tokens.css (--gradient-hero-*). Blobs fade out at their edges instead of a heavy blur.
// Props: className (for placing the square), size: "l" (desktop, default) | "s" (phone: smaller blobs).
import { cn } from '@/lib/utils'

// [token, left, top, width, height, opacity] in Figma pixels of the 1280 square.
const blobs = [
  ['--gradient-hero-sweep', 190, -106, 900, 900, 0.5],
  ['--gradient-hero-blob-1', -160, 300, 620, 520, 1],
  ['--gradient-hero-blob-2', 820, 220, 700, 560, 1],
  ['--gradient-hero-blob-3', 380, 620, 560, 460, 1],
  ['--gradient-hero-highlight-1', 320, 360, 640, 420, 1],
  ['--gradient-hero-highlight-2', 760, 560, 420, 320, 1],
]

const pct = (v) => `${(v / 1280) * 100}%`

function HeroGlow({ className }) {
  return (
    <div aria-hidden="true" data-slot="hero-glow" className={cn('pointer-events-none absolute aspect-square', className)}>
      <div className="absolute inset-0 bg-(image:--gradient-hero-base)" />
      {blobs.map(([token, x, y, w, h, opacity]) => (
        <div
          key={token}
          className="absolute rounded-full"
          style={{
            left: pct(x),
            top: pct(y),
            width: pct(w),
            height: pct(h),
            opacity,
            backgroundImage: `var(${token})`,
            // The sweep is a colour wheel; hide its sharp centre and fade its edge so it reads as a soft wash.
            ...(token === '--gradient-hero-sweep' && { maskImage: 'radial-gradient(closest-side, transparent, black 45%, transparent)' }),
          }}
        />
      ))}
    </div>
  )
}

export { HeroGlow }
