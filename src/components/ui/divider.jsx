// Divider: thin horizontal line (1 pixel, gray/200). Figma "Divider". Always fills the width of its container.
// Props: className.
import { cn } from '@/lib/utils'

function Divider({ className, ...props }) {
  return <hr data-slot="divider" className={cn('w-full border-0 border-t border-gray-200', className)} {...props} />
}

export { Divider }
