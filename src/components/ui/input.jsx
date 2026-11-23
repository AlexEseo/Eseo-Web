// Input: shadcn text input restyled to Figma "Field" → Input.
// Props: normal input attributes (type, value, placeholder, disabled, name...).
//   aria-invalid: true shows the Error state (Field sets it for you).
// States from Figma: Default, Hover, Focus, Error, Disabled.
import { cn } from '@/lib/utils'

// Shared look of the rounded box; Select field uses it too.
export const fieldBoxClass =
  'h-field w-full min-w-0 rounded-full border border-gray-200 bg-transparent px-5 text-body-14 text-gray-900 outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) placeholder:text-gray-400 hover:border-gray-400 focus-visible:border-brand-600 focus-visible:inset-ring-1 focus-visible:inset-ring-brand-600 aria-invalid:border-coral-500 aria-invalid:inset-ring-1 aria-invalid:inset-ring-coral-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400'

function Input({ className, type = 'text', ...props }) {
  return <input type={type} data-slot="input" className={cn(fieldBoxClass, className)} {...props} />
}

export { Input }
