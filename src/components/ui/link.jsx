// Link: blue text link with an arrow. Figma "Link" (typo/label/14 - semibold, brand/600, arrow-up-right 16).
// Props:
//   href, target and other normal link attributes
//   arrow: false hides the arrow (default true)
// Figma has one state. Hover (darker blue, arrow moves) and keyboard focus are added here.
import IconArrowUpRight from '@/components/icons/IconArrowUpRight'
import { cn } from '@/lib/utils'

function Link({ className, arrow = true, children, ...props }) {
  return (
    <a
      data-slot="link"
      className={cn(
        'group inline-flex items-center gap-1 rounded-4 text-label-14 font-semibold text-brand-600 outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-brand-600',
        className,
      )}
      {...props}
    >
      {children}
      {arrow && (
        <IconArrowUpRight className="shrink-0 transition-transform duration-(--duration-fast) ease-(--ease-standard) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </a>
  )
}

export { Link }
