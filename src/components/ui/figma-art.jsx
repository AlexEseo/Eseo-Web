// FigmaArt: puts an illustration exported from Figma (SVG file in src/assets/illustrations) into the page.
// The SVG is inserted as part of the page, so its texts use the site's Inter font.
// It is placed inside a box with the proportions of the Figma "Visual" frame and clipped to it,
// so the picture scales with the card exactly like in Figma.
// Props:
//   svg:    the SVG file contents (import x from '@/assets/illustrations/x.svg?raw'), or
//   children: a React picture (e.g. an animated one) placed in the same way
//   frame:  [width, height] of the Figma box around the picture
//   at:     [x, y] where the SVG starts inside that box (can be negative when the picture bleeds out)
//   size:   [width, height] of the SVG itself
//   bleed:  true lets the picture run past the box (as in Figma, where only the card edge cuts it)
//   className: for the box (rounded corners etc.)
import { cn } from '@/lib/utils'

const pct = (v, total) => `${(v / total) * 100}%`

function FigmaArt({ svg, children, frame, at = [0, 0], size, bleed = false, className }) {
  const [fw, fh] = frame
  const [sw, sh] = size ?? frame
  return (
    <div aria-hidden="true" data-slot="figma-art" className={cn('relative', !bleed && 'overflow-hidden', className)} style={{ aspectRatio: `${fw} / ${fh}` }}>
      <div
        className="absolute [&>svg]:block [&>svg]:size-full"
        style={{ left: pct(at[0], fw), top: pct(at[1], fh), width: pct(sw, fw), height: pct(sh, fh) }}
        {...(svg ? { dangerouslySetInnerHTML: { __html: svg } } : { children })}
      />
    </div>
  )
}

export { FigmaArt }
