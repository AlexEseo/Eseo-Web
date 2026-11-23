// PrincipleArt: the four animated pictures in the Principles cards (Figma "Illustrations (Principles)" on the
// Design System page: E-commerce, Subscriptions & apps, Education, Multi-location). Each picture loops through
// its Figma states (State=1/2/3, Default/Hover/Pressed/Release, Europe/US/Canada) with the same waits, durations
// and easings as the Figma prototype (Smart animate). Shapes and positions are copied from the Figma layers.
// The loop runs only while the card is on screen; with "less motion" in the system the first state stays still.
// Props: kind ("ecommerce" | "subscriptions" | "education" | "multilocation"), className.
// Placed in the card through FigmaArt-like boxes (frame / at / size), see Principles.jsx.
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

// Easings named after Figma's options (values in tokens.css)
const EASE = {
  inOut: 'var(--ease-figma-in-out)',
  out: 'var(--ease-figma-out)',
  swap: 'var(--ease-art-swap)',
}

// Figma prototype timelines: for every state, how long it waits (hold, s) and how it moves on to the next one
// (dur in s, ease). The last state goes back to the first.
const timelines = {
  ecommerce: [
    { hold: 0.6, dur: 0.9, ease: EASE.swap },
    { hold: 0.6, dur: 0.9, ease: EASE.swap },
    { hold: 0.6, dur: 0.9, ease: EASE.swap },
  ],
  subscriptions: [
    { hold: 2, dur: 0.6, ease: EASE.inOut }, // Default → Hover
    { hold: 0.3, dur: 0.12, ease: EASE.out }, // Hover → Pressed
    { hold: 0.01, dur: 0.18, ease: EASE.out }, // Pressed → Release
    { hold: 0.15, dur: 0.6, ease: EASE.inOut }, // Release → Default
  ],
  education: [
    { hold: 2, dur: 1.6, ease: EASE.inOut },
    { hold: 0.01, dur: 1.6, ease: EASE.inOut },
    { hold: 0.01, dur: 1.6, ease: EASE.inOut },
  ],
  multilocation: [
    { hold: 2, dur: 0.5, ease: EASE.inOut }, // Europe → US
    { hold: 1.5, dur: 0.5, ease: EASE.inOut }, // US → Canada
    { hold: 1.5, dur: 0.5, ease: EASE.inOut }, // Canada → Europe
  ],
}

// Steps through a timeline while `active`. Returns the current state index, how many steps were taken
// (for things that keep turning), and the transition used to arrive at the current state.
function useCycle(steps, active) {
  const [pos, setPos] = useState({ i: 0, n: 0 })
  useEffect(() => {
    if (!active) return
    const step = steps[pos.i]
    const t = setTimeout(() => setPos((p) => ({ i: (p.i + 1) % steps.length, n: p.n + 1 })), (step.hold + (pos.n ? steps[(pos.i - 1 + steps.length) % steps.length].dur : 0)) * 1000)
    return () => clearTimeout(t)
  }, [active, pos, steps])
  const prev = steps[(pos.i - 1 + steps.length) % steps.length]
  return { i: pos.i, n: pos.n, transition: (props) => props.map((p) => `${p} ${prev.dur}s ${prev.ease}`).join(', ') }
}

// Style helpers: move/turn/scale an SVG element around its own centre, with the current transition.
const move = (c, dx = 0, dy = 0, o = 1, extra = '') => ({
  transform: `translate(${dx}px, ${dy}px) ${extra}`,
  opacity: o,
  transition: c.transition(['transform', 'opacity']),
  transformBox: 'fill-box',
  transformOrigin: 'center',
})

const Glyph = ({ x = 16, y, size = 16, children, style }) => (
  <text x={x} y={y} textAnchor="middle" fill="var(--color-gray-25)" fontFamily="Inter" fontSize={size} fontWeight="600" style={style}>
    {children}
  </text>
)

/* ---------- E-commerce: list of four rows; the icons swap and turn ---------- */
function Ecommerce({ c }) {
  const s = c.i // 0, 1, 2
  // [dy, opacity] for each stacked glyph in each state (Figma layers Up 1-3, € A/B and $, % A-C)
  const pick = (table) => table[s]
  const rows = [
    { top: 33.875, color: 'var(--color-green-500)', title: 'Revenue', lines: ['€1m managed across', '30+ brands.'] },
    { top: 134.625, color: 'var(--color-orange-500)', title: 'Orders', lines: ['New order +€128', 'from paid social.'] },
    { top: 235.375, color: 'var(--color-pink-500)', title: 'Margin', lines: ['Contribution after media,', 'per product.'] },
    { top: 336.125, color: 'var(--color-gray-500)', title: 'Returns', lines: ['Net of refunds', 'and returns.'] },
  ]
  const base = (top) => top + 21.818 // glyph baseline inside the icon circle (SVG units) design-ok
  return (
    <svg viewBox="0 0 310 402" className="block size-full" aria-hidden="true">
      <defs>
        {rows.map((r, k) => (
          <clipPath key={k} id={`pa-ecom-icon-${k}`}>
            <circle cx="16" cy={r.top + 16} r="16" />
          </clipPath>
        ))}
      </defs>
      {rows.map((r, k) => (
        <g key={r.title}>
          {k < 3 && <line x1="0" x2="310" y1={100.75 * (k + 1) - 0.5} y2={100.75 * (k + 1) - 0.5} stroke="var(--color-gray-200)" />}
          <circle cx="16" cy={r.top + 16} r="16" fill={r.color} />
          <text x="44" y={r.top + 4.818} fill="var(--color-gray-900)" fontFamily="Inter" fontSize="16" fontWeight="600">
            {r.title}
          </text>
          <text x="44" y={r.top + 24.364} fill="var(--color-gray-500)" fontFamily="Inter" fontSize="12">
            <tspan x="44">{r.lines[0]}</tspan>
            <tspan x="44" dy="16">
              {r.lines[1]}
            </tspan>
          </text>
        </g>
      ))}
      {/* Revenue: arrow slides up and a new one comes from below, then they cross-fade */}
      <g clipPath="url(#pa-ecom-icon-0)">
        <Glyph y={base(33.875)} style={move(c, 0, ...pick([[0, 1], [-26, 0], [0, 0]]))}>↑</Glyph>
        <Glyph y={base(33.875)} style={move(c, 0, 0, pick([0, 0, 1]))}>↑</Glyph>
        <Glyph y={base(33.875)} style={move(c, 0, ...pick([[26, 0], [0, 1], [0, 0]]))}>↑</Glyph>
      </g>
      {/* Orders: € cross-fades, then $ rises in, then € comes back from below */}
      <g clipPath="url(#pa-ecom-icon-1)">
        <Glyph y={base(134.625)} style={move(c, 0, ...pick([[0, 1], [0, 0], [20, 0]]))}>€</Glyph>
        <Glyph y={base(134.625)} style={move(c, 0, ...pick([[-20, 0], [20, 0], [0, 1]]))}>$</Glyph>
        <Glyph y={base(134.625)} style={move(c, 0, ...pick([[0, 0], [0, 1], [-20, 0]]))}>€</Glyph>
      </g>
      {/* Margin: % cross-fades, then one slides out right while another slides in from the left */}
      <g clipPath="url(#pa-ecom-icon-2)">
        <Glyph y={base(235.375)} style={move(c, ...pick([[26, 0, 0], [0, 0, 0], [0, 0, 1]]))}>%</Glyph>
        <Glyph y={base(235.375)} style={move(c, 0, 0, pick([0, 1, 0]))}>%</Glyph>
        <Glyph y={base(235.375)} style={move(c, ...pick([[0, 0, 1], [0, 0, 0], [-26, 0, 0]]))}>%</Glyph>
      </g>
      {/* Returns: the arrow keeps turning a third of a circle per step */}
      <g
        style={{ transform: `rotate(${c.n * 120}deg)`, transformBox: 'fill-box', transformOrigin: 'center', transition: c.transition(['transform']) }}
      >
        <g transform="translate(9 345.125) scale(0.5833)" stroke="var(--color-gray-25)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </g>
      </g>
    </svg>
  )
}

/* ---------- Subscriptions & apps: the cursor moves to the button, presses it, the button springs ---------- */
const PILL = 'M63 61C63 46.6406 74.6406 35 89 35H221C235.359 35 247 46.6406 247 61C247 75.3594 235.359 87 221 87H89C74.6406 87 63 75.3594 63 61Z'
const HAND =
  'M10.793 3.5C11.893 3.5 12.793 4.4 12.793 5.5V11.5C12.793 10.7 13.493 10.1 14.293 10.1C15.093 10.1 15.793 10.7 15.793 11.5V12.1C15.793 11.3 16.493 10.7 17.293 10.7C18.093 10.7 18.793 11.3 18.793 12.1V12.9C18.793 12.1 19.493 11.5 20.293 11.5C21.093 11.5 21.793 12.1 21.793 12.9V17.5C21.793 21.1 19.293 24 15.793 24H13.793C11.893 24 10.593 23.3 9.49299 21.9L5.89299 17.1C5.29299 16.3 5.39299 15.3 6.09299 14.7C6.89299 14.1 7.89299 14.2 8.49299 14.9L8.79299 15.3V5.5C8.79299 4.4 9.69299 3.5 10.793 3.5Z'
const ARROW = 'M268 96V113L272.5 109L275.5 115.5L278.2 114.3L275.3 108H281L268 96Z'

function Subscriptions({ c }) {
  const s = c.i // 0 Default, 1 Hover, 2 Pressed, 3 Release
  const btnScale = [1, 1, 0.94, 1.043][s]
  const shade = [0, 0.12, 0.18, 0.12][s]
  const away = s === 0 // cursor far from the button
  const curScale = s === 2 ? 0.9 : 1
  return (
    <svg viewBox="0 0 310 123" className="block size-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id="pa-sub-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
      <g style={{ transform: `scale(${btnScale})`, transformBox: 'fill-box', transformOrigin: 'center', transition: c.transition(['transform']) }}>
        <path
          d="M89 30H221C238.121 30 252 43.8792 252 61C252 78.1208 238.121 92 221 92H89C71.8792 92 58 78.1208 58 61C58 43.8792 71.8792 30 89 30Z"
          stroke="var(--color-green-500)"
          strokeWidth="2"
          fill="none"
        />
        <path d={PILL} fill="var(--color-green-500)" />
        <path d={PILL} fill="var(--color-gray-950)" style={{ opacity: shade, transition: c.transition(['opacity']) }} />
        <text x="155" y="68.2727" textAnchor="middle" fill="var(--color-gray-25)" fontFamily="Inter" fontSize="20" fontWeight="700">
          Start free trial
        </text>
      </g>
      {/* Cursor: arrow far away → hand over the button (moves by −35, −36 like in Figma); shrinks a little when pressing */}
      <g
        filter="url(#pa-sub-shadow)"
        style={{
          transform: `translate(${away ? 0 : -35}px, ${away ? 0 : -36}px) scale(${curScale})`,
          transformBox: 'view-box',
          transformOrigin: '268px 96px', // design-ok: arrow tip in SVG units
          transition: c.transition(['transform']),
        }}
      >
        <g style={{ opacity: away ? 1 : 0, transition: c.transition(['opacity']) }}>
          <path d={ARROW} fill="var(--color-gray-950)" stroke="var(--color-gray-0)" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
        <g transform="translate(257.3 92.5)" style={{ opacity: away ? 0 : 1, transition: c.transition(['opacity']) }}>
          <path d={HAND} fill="var(--color-gray-950)" stroke="var(--color-gray-0)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12.793 12V16.5M15.793 12.5V16.5M18.793 13.3V16.5" strokeLinecap="round" stroke="var(--color-gray-0)" />
        </g>
      </g>
    </svg>
  )
}

/* ---------- Education: a wave of circles gently rises and falls ---------- */
// [size, x, y in Figma state 1, fill, symbol, symbol size, opacity] and moves in states 2 and 3 ([dx, dy])
const nodes = [
  { d: 24, x: -33, y: 189, fill: '--color-green-500', o: 0.55, m: [[6, -19.3], [-3, 12.1]] },
  { d: 24, x: 167, y: 189, fill: '--color-pink-500', o: 0.55, m: [[6, 19.3], [-3, -12.1]] },
  { d: 24, x: 367, y: 189, fill: '--color-gray-900', o: 0.55, m: [[6, -19.3], [-3, 12.1]] },
  { d: 40, x: 26, y: 136, fill: '--color-pink-500', m: [[3, -10.4], [-1.5, 9.9]] },
  { d: 40, x: 292, y: 226, fill: '--color-green-500', m: [[3, -8.7], [-1.5, 2.1]] },
  { d: 68, x: 78, y: 122, fill: '--color-orange-500', sym: '√', sz: 16, m: [[5.1, 8.7], [-2.6, -2.1]] },
  { d: 68, x: 212, y: 212, fill: '--color-coral-500', sym: '{}', sz: 16, m: [[5.1, 10.4], [-2.6, -9.9]] },
  { d: 80, x: -61, y: 161, fill: '--color-coral-500', sym: '{}', sz: 24, m: [[6, -19.3], [-3, 12.1]] },
  { d: 80, x: 139, y: 161, fill: '--color-gray-900', sym: '∑', sz: 24, m: [[6, 19.3], [-3, -12.1]] },
  { d: 80, x: 339, y: 161, fill: '--color-pink-500', sym: 'B', sz: 24, m: [[6, -19.3], [-3, 12.1]] },
]

function Education({ c }) {
  const s = c.i
  // the SVG starts 64 units left of the Figma component (circles stick out on the left), like the Figma export
  return (
    <svg viewBox="0 0 486 402" className="block size-full" aria-hidden="true">
      <defs>
        <linearGradient id="pa-edu-fade-l" x1="64" x2="120" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-gray-0)" />
          <stop offset="1" stopColor="var(--color-gray-0)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pa-edu-fade-r" x1="422" x2="366" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-gray-0)" />
          <stop offset="1" stopColor="var(--color-gray-0)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {nodes.map((n, k) => {
        const [dx, dy] = s === 0 ? [0, 0] : n.m[s - 1]
        const cx = n.x + 64 + n.d / 2
        const cy = n.y + n.d / 2
        return (
          <g key={k} opacity={n.o} style={{ transform: `translate(${dx}px, ${dy}px)`, transition: c.transition(['transform']) }}>
            <circle cx={cx} cy={cy} r={n.d / 2 + 1.5} fill={`var(${n.fill})`} stroke="var(--color-gray-0)" strokeWidth="3" />
            {n.sym && (
              <text x={cx} y={cy + n.sz * 0.36} textAnchor="middle" fill="var(--color-gray-25)" fontFamily="Inter" fontSize={n.sz} fontWeight="600">
                {n.sym}
              </text>
            )}
          </g>
        )
      })}
      <rect x="64" width="56" height="402" fill="url(#pa-edu-fade-l)" />
      <rect x="366" width="56" height="402" fill="url(#pa-edu-fade-r)" />
    </svg>
  )
}

/* ---------- Multi-location: the region rolls Europe → US → Canada, its dot grows ---------- */
const regions = [
  { name: 'Europe', count: '~ 9 locations', dot: '--color-green-500' },
  { name: 'US', count: '~ 24 locations', dot: '--color-orange-500' },
  { name: 'Canada', count: '~ 12 locations', dot: '--color-pink-500' },
]
// dot centre y per state (from Figma: the big dot pushes the small ones), index = [EU, US, CA]
const dotY = [
  [47, 65, 79],
  [43, 61, 79],
  [43, 57, 75],
]

function Multilocation({ c }) {
  const s = c.i
  return (
    <svg viewBox="0 0 358 122" className="block size-full" aria-hidden="true">
      <defs>
        <clipPath id="pa-multi-value">
          <rect x="187" y="35" width="108" height="52" />
        </clipPath>
      </defs>
      <rect x="0.5" y="13.5" width="357" height="95" rx="23.5" fill="var(--color-gray-50)" stroke="var(--color-gray-100)" />
      <text x="41" y="68.2727" fill="var(--color-gray-300)" fontFamily="Inter" fontSize="20" fontWeight="700">
        Market
      </text>
      <g clipPath="url(#pa-multi-value)">
        {regions.map((r, k) => {
          // the current region sits in place; the next one waits below, the previous one leaves upwards
          const rel = (k - s + 3) % 3 // 0 current, 1 next, 2 previous
          const dy = [0, 28, -28][rel]
          return (
            <g key={r.name} style={{ transform: `translateY(${dy}px)`, opacity: rel === 0 ? 1 : 0, transition: c.transition(['transform', 'opacity']) }}>
              <text x="295" y="57.7273" textAnchor="end" fill="var(--color-gray-900)" fontFamily="Inter" fontSize="24" fontWeight="600">
                {r.name}
              </text>
              <text x="295" y="81.8182" textAnchor="end" fill="var(--color-gray-500)" fontFamily="Inter" fontSize="16">
                {r.count}
              </text>
            </g>
          )
        })}
      </g>
      <rect x="311.5" y="30.5" width="29" height="61" rx="14.5" fill="var(--color-gray-0)" stroke="var(--color-gray-100)" />
      {regions.map((r, k) => (
        <circle
          key={r.dot}
          cx="326"
          cy={dotY[0][k]}
          r="4"
          fill={`var(${r.dot})`}
          style={{
            transform: `translateY(${dotY[s][k] - dotY[0][k]}px) scale(${k === s ? 2 : 1})`,
            transformBox: 'fill-box',
            transformOrigin: 'center',
            transition: c.transition(['transform']),
          }}
        />
      ))}
    </svg>
  )
}

const pictures = { ecommerce: Ecommerce, subscriptions: Subscriptions, education: Education, multilocation: Multilocation }

function PrincipleArt({ kind, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const c = useCycle(timelines[kind], inView && !reduce)
  const Picture = pictures[kind]
  return (
    <div ref={ref} className={className}>
      <Picture c={c} />
    </div>
  )
}

export { PrincipleArt }
