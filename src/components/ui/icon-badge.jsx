// IconBadge: small round badge (20) with a white 12 icon inside. Figma "Icon badge".
// Props:
//   color: "green" (default, as in Figma) | "orange" | "pink" | "coral" | "brand"
//   children: the icon, e.g. <IconBars />
//   label: text for screen readers (optional; without it the badge is decorative)
import { cn } from '@/lib/utils'

const colors = {
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  coral: 'bg-coral-500',
  brand: 'bg-brand-600',
}

function IconBadge({ color = 'green', label, className, children, ...props }) {
  return (
    <span
      data-slot="icon-badge"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('inline-flex size-icon-badge shrink-0 items-center justify-center rounded-full text-gray-0', colors[color], className)}
      {...props}
    >
      {children}
    </span>
  )
}

export { IconBadge }
