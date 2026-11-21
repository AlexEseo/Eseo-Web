// ChannelConvergence: illustration "four channels flow into one measurement plan".
// Figma Home → "Channel convergence" (desktop, 880×420) and the mobile version (390×340).
// Decorative block with fixed proportions (approved by the owner): every part is placed in percent
// of the Figma frame, so the whole picture shrinks evenly with the screen.
// Props:
//   label:    text under the hub, e.g. "One measurement plan" (site.json → hero.convergenceLabel)
//   channels: list of { name, icon } — icon is a React element (36 box); name is read by screen readers
import IconLogoE from '@/components/icons/IconLogoE'
import { ChannelChip } from '@/components/ui/channel-chip'
import { cn } from '@/lib/utils'

// Geometry from Figma: frame size, chip centres, where the lines bend, chip and hub size, hub top, label top.
const layouts = {
  desktop: { w: 880, h: 420, chip: 72, xs: [80, 320, 560, 800], chipY: 36, bend: 176, hub: 128, hubY: 236, labelY: 384, line: 2, halo: 0 },
  mobile: { w: 390, h: 340, chip: 56, xs: [59, 155, 235, 331], chipY: 28, bend: 132, hub: 96, hubY: 188, labelY: 296, line: 1.5, halo: 5 },
}

const pct = (v, total) => `${(v / total) * 100}%`

function Scene({ kind, label, channels, className }) {
  const g = layouts[kind]
  const cx = g.w / 2
  const id = `flow-${kind}`

  return (
    <div className={cn('relative w-full', className)} style={{ aspectRatio: `${g.w} / ${g.h}` }}>
      {/* Lines from every chip down to the hub: blue gradient, as in Figma. */}
      <svg viewBox={`0 0 ${g.w} ${g.h}`} className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1={g.chipY * 2} x2="0" y2={g.hubY} gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-brand-200)" />
            <stop offset="1" stopColor="var(--color-brand-600)" />
          </linearGradient>
        </defs>
        {g.xs.map((x) => {
          const d = `M${x} ${g.chipY * 2}C${x} ${g.bend} ${cx} ${g.bend} ${cx} ${g.hubY}`
          return (
            <g key={x}>
              {g.halo > 0 && <path d={d} strokeWidth={g.halo} strokeLinecap="round" stroke="var(--color-gray-0)" fill="none" />}
              <path d={d} strokeWidth={g.line} strokeLinecap="round" stroke={`url(#${id})`} fill="none" />
            </g>
          )
        })}
      </svg>

      {/* Channel chips */}
      {channels.map((c, i) => (
        <ChannelChip
          key={c.name}
          label={c.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 [&>*]:size-1/2"
          style={{ left: pct(g.xs[i], g.w), top: pct(g.chipY, g.h), width: pct(g.chip, g.w), height: 'auto', aspectRatio: '1' }}
        >
          {c.icon}
        </ChannelChip>
      ))}

      {/* Hub */}
      <span
        aria-hidden="true"
        className="absolute flex -translate-x-1/2 items-center justify-center rounded-full bg-(image:--gradient-hub) text-gray-0"
        style={{ left: '50%', top: pct(g.hubY, g.h), width: pct(g.hub, g.w), aspectRatio: '1' }}
      >
        <IconLogoE className="h-auto w-1/4" />
      </span>

      {/* Label under the hub */}
      <p
        className="absolute left-1/2 -translate-x-1/2 text-center text-label-14-medium font-medium whitespace-nowrap text-gray-900"
        style={{ top: pct(g.labelY, g.h) }}
      >
        {label}
      </p>
    </div>
  )
}

function ChannelConvergence({ label, channels, className }) {
  return (
    <div data-slot="channel-convergence" className={cn('mx-auto w-full max-w-(--container-convergence)', className)}>
      <Scene kind="mobile" label={label} channels={channels} className="md:hidden" />
      <Scene kind="desktop" label={label} channels={channels} className="hidden md:block" />
    </div>
  )
}

export { ChannelConvergence }
