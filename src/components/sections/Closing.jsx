// Closing: last call to action on a light grey band — label, big title, button and a short note.
// Desktop: slowly floating blue circles, a slightly tilted Plan card and a red pin on it, on the right (decor). Phone: the Plan card under the text.
// Figma Home → "Closing". The button opens the "Let's talk" form.
// Props: text (site.closing), onCta.
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { IconBadge } from '@/components/ui/icon-badge'
import { PlanCard } from '@/components/ui/plan-card'
import { PlanRow } from '@/components/ui/plan-row'
import { SectionLabel } from '@/components/ui/section-label'
import { badgeIcons } from '@/lib/badge-icons'

// Circles: [token, left, top, size] in Figma pixels of the 640 × 380 right half.
const circles = [
  ['--gradient-closing-medium', -181, -217, 424],
  ['--gradient-closing-large', 205, 97, 380],
  ['--gradient-closing-small', 490, 10, 104],
]
const pct = (v, total) => `${(v / total) * 100}%`

function Plan({ rows }) {
  return (
    <PlanCard className="w-full max-w-(--container-card-wide)">
      {rows.map((row) => (
        <PlanRow
          key={row.title}
          title={row.title}
          subtitle={row.subtitle}
          checked={row.checked}
          badges={row.badges.map(([color, icon]) => (
            <IconBadge key={icon} color={color}>
              {badgeIcons[icon]}
            </IconBadge>
          ))}
        />
      ))}
    </PlanCard>
  )
}

function Closing({ text, onCta }) {
  return (
    <section data-slot="closing" className="relative isolate overflow-hidden bg-gray-100 px-5 py-16 md:px-10 lg:px-20 lg:py-21">
      {/* Decor on the right half (desktop) */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block">
        {circles.map(([token, x, y, size], i) => (
          <span
            key={token}
            className="absolute animate-float rounded-full [--motion-float-distance:var(--motion-float-distance-large)] [animation-duration:var(--duration-float-slow)]"
            style={{
              left: pct(x, 640),
              top: pct(y, 380),
              width: pct(size, 640),
              aspectRatio: '1',
              backgroundImage: `var(${token})`,
              // each circle starts at a different point of the cycle, so they drift independently
              animationDelay: `calc(var(--duration-float-slow) * ${-i / 3})`,
            }}
          />
        ))}
        {/* Figma rotation −3° = 3° clockwise, turned around the card's top-left corner (Figma keeps x/y there) */}
        <div className="absolute origin-top-left rotate-3" style={{ left: pct(86, 640), top: pct(60, 380), width: pct(400, 640) }}>
          <Reveal delay={0.15}>
            <Plan rows={text.plan} />
          </Reveal>
        </div>
        {/* Red "Magnet" pin on the card */}
        <span
          className="absolute aspect-square rounded-full shadow-magnet"
          style={{ left: pct(327, 640), top: pct(52, 380), width: pct(32, 640), backgroundImage: 'var(--gradient-magnet)' }}
        />
      </div>

      <div className="mx-auto flex max-w-(--container-page) flex-col gap-10">
        <Reveal className="flex flex-col items-start gap-5">
          <SectionLabel>{text.label}</SectionLabel>
          <h2 className="text-display-40 font-semibold text-gray-900 md:whitespace-pre-line">{text.title}</h2>
          <Button variant="primary" size="m" onClick={onCta}>
            {text.cta}
          </Button>
          <p className="text-body-12 text-gray-600">{text.note}</p>
        </Reveal>
        <Reveal className="lg:hidden">
          <Plan rows={text.plan} />
        </Reveal>
      </div>
    </section>
  )
}

export { Closing }
