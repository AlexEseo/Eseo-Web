// Dialog: shadcn dialog (Radix) restyled to Figma "Let's talk modal" (window, close cross, shadow).
// Parts: Dialog (root: open / onOpenChange), DialogTrigger, DialogContent (the window), DialogTitle, DialogDescription.
// Behaviour from Radix: dims the page, keeps keyboard focus inside, closes on Esc, on the cross and on a click outside.
// The dimmed background is not in Figma: gray/950 at 40%.
import { Dialog as DialogPrimitive } from 'radix-ui'
import IconClose from '@/components/icons/IconClose'
import { cn } from '@/lib/utils'

function Dialog(props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogContent({ className, children, closeLabel = 'Close', ...props }) {
  return (
    <DialogPrimitive.Portal>
      {/* The window sits inside the dimmed layer, so a tall form can scroll on small phones. */}
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-gray-950/40 p-4"
      >
        <DialogPrimitive.Content
          data-slot="dialog-content"
          aria-describedby={undefined}
          className={cn(
            'relative flex w-full max-w-(--container-modal) flex-col rounded-16 bg-gray-25 shadow-modal outline-none md:rounded-40',
            className,
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="absolute top-4 right-4 cursor-pointer rounded-4 text-gray-600 outline-none hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-brand-600 md:top-7 md:right-9"
          >
            <IconClose />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  )
}

function DialogTitle({ className, ...props }) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('text-header-32 font-semibold text-gray-900', className)} {...props} />
}

function DialogDescription({ className, ...props }) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn('text-body-14 text-gray-600 md:text-body-16', className)} {...props} />
}

export { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger }
