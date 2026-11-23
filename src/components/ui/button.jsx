// Button: shadcn button restyled to Figma "Buttons" (Design System page).
// Props:
//   variant: "primary" (default) | "secondary" | "tertiary" | "white"
//   size:    "s" | "m" (default) | "l"  — primary and secondary only (Figma S 26 · M 32 · L 38)
//   loading: true shows a spinner and blocks clicks (not in Figma; added for forms)
//   asChild: true renders the child element (for example a link) with button styles
//   disabled, onClick, type and other normal button attributes.
// States from Figma: Default, Hover, Pressed, Focus (keyboard), Disabled.
import { cva } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-medium outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard) disabled:pointer-events-none aria-busy:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'rounded-full bg-brand-600 text-gray-25 hover:bg-brand-700 active:bg-brand-800 focus-visible:ring-4 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-0 disabled:opacity-40',
        secondary:
          'rounded-full bg-gray-300 text-gray-900 hover:bg-gray-400 active:bg-gray-400 focus-visible:bg-gray-200 focus-visible:inset-ring-2 focus-visible:inset-ring-brand-600 disabled:bg-gray-200 disabled:text-gray-900/40',
        tertiary:
          'rounded-4 text-body-14 font-semibold text-brand-600 active:underline focus-visible:text-gray-900 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-brand-600 disabled:text-gray-900 disabled:opacity-40',
        white:
          'h-button-white gap-2 rounded-full border border-brand-100 bg-gray-0 pr-4 pl-3 text-button-16 text-brand-600 hover:border-brand-200 active:border-brand-200 active:bg-brand-50 focus-visible:border-brand-600 focus-visible:inset-ring-1 focus-visible:inset-ring-brand-600 disabled:opacity-40',
      },
      size: {
        s: 'h-button-s px-2.5 text-button-13',
        m: 'h-button-m px-3 text-button-15',
        l: 'h-button-l px-3.5 text-button-16',
      },
    },
    defaultVariants: { variant: 'primary', size: 'm' },
  },
)

function Button({ className, variant = 'primary', size = 'm', asChild = false, loading = false, children, ...props }) {
  const Comp = asChild ? Slot.Root : 'button'
  // Tertiary and white have one size in Figma, so the size setting is ignored for them.
  const fixedSize = variant === 'tertiary' || variant === 'white'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size: fixedSize ? null : size }), className)}
      {...props}
    >
      {loading ? (
        <>
          <span className="invisible inline-flex items-center gap-2">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
