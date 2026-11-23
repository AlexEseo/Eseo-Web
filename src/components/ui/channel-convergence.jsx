// ChannelConvergence: illustration "four channels flow into one measurement plan".
// Figma Home → "Channel convergence" (desktop, 880×420) and the mobile version (390×340).
// Decorative block with fixed proportions (approved by the owner): every part is placed in percent
// of the Figma frame, so the whole picture shrinks evenly with the screen.
// Props:
//   label:    text under the hub, e.g. "One measurement plan" (site.json → hero.convergenceLabel)
//   channels: list of { name, icon } — icon is a React element (36 box); name is read by screen readers
// Motion ("connect"): when the picture scrolls into view the lines draw from each channel down to the hub, one after another,
// and the hub pops in. Then light pulses keep running down the lines into the "E", and the hub glows softly as they arrive.
// With "less motion" in the system the picture is simply shown, without pulses.
import { m, useReducedMotion } from 'motion/react'
import IconLogoE from '@/components/icons/IconLogoE'
import { motionTokens } from '@/lib/motion-tokens'
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
  const reduce = useReducedMotion()
  const t = motionTokens()
  const inView = { once: true, amount: 0.4 }
  // Line i starts drawing a little after line i-1; the hub appears when the lines reach it.
  const draw = (i) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: inView,
          transition: { duration: t.slow * 1.5, ease: t.easeStandard, delay: i * t.stagger },
        }
  const hubIn = reduce
    ? {}
    : {
        initial: { scale: 0.85, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: inView,
        transition: { duration: t.slow, ease: t.easeOut, delay: t.slow },
      }

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
        {g.xs.map((x, i) => {
          const d = `M${x} ${g.chipY * 2}C${x} ${g.bend} ${cx} ${g.bend} ${cx} ${g.hubY}`
          return (
            <g key={x}>
              {g.halo > 0 && <m.path d={d} strokeWidth={g.halo} strokeLinecap="round" stroke="var(--color-gray-0)" fill="none" {...draw(i)} />}
              <m.path d={d} strokeWidth={g.line} strokeLinecap="round" stroke={`url(#${id})`} fill="none" {...draw(i)} />
              {/* Light pulse running down the line; each line starts a quarter cycle later */}
              <path
                d={d}
                pathLength="1"
                strokeDasharray="0.2 1.2"
                strokeWidth={g.line * 2}
                strokeLinecap="round"
                stroke="var(--color-brand-600)"
                fill="none"
                className="animate-flow drop-shadow-(--shadow-flow-glow) motion-reduce:hidden"
                style={{ animationDelay: `calc(var(--duration-flow) * ${-i / 4})` }}
              />
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

      {/* Hub, with a soft glow ring that swells each time a pulse arrives */}
      <span aria-hidden="true" className="absolute -translate-x-1/2" style={{ left: '50%', top: pct(g.hubY, g.h), width: pct(g.hub, g.w), aspectRatio: '1' }}>
        <span className="absolute inset-0 animate-hub-pulse rounded-full bg-brand-200 motion-reduce:hidden" style={{ animationDuration: 'calc(var(--duration-flow) / 4)' }} />
        <m.span className="relative flex size-full items-center justify-center rounded-full bg-(image:--gradient-hub) text-gray-0" {...hubIn}>
          <IconLogoE className="h-auto w-1/4" />
        </m.span>
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
