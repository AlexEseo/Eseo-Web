// ChannelChip: round glass chip (72) with a 36 channel icon in the middle. Figma "Channel chip".
// Glass look: soft white gradient, gradient outline, blue shadow and background blur (all from tokens.css).
// Props:
//   children: the icon, e.g. <IconSeo />
//   label: channel name for screen readers (optional; without it the chip is decorative)
import { cn } from '@/lib/utils'

function ChannelChip({ label, className, children, ...props }) {
  return (
    <span
      data-slot="channel-chip"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        'border-gradient-chip inline-flex size-chip shrink-0 items-center justify-center rounded-full bg-(image:--gradient-chip-fill) text-gray-900 shadow-chip backdrop-blur-background-8',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { ChannelChip }
