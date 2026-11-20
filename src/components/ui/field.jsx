// Field: label row (label on the left, hint on the right) above an input or select. Figma "Field".
// Props:
//   label:    text above the input
//   hint:     small text on the right (optional)
//   error:    text shown instead of the hint, in coral; also turns the input border coral
//   disabled: greys out the label (pass disabled to the input itself too)
//   id:       id of the input inside, so a click on the label focuses it
//   children: the input — <Input id=... /> or <SelectField id=... />
import { Children, cloneElement, isValidElement } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

function Field({ label, hint, error, disabled = false, id, className, children }) {
  const note = error || hint
  const noteId = note && id ? `${id}-note` : undefined

  // Tell the input about the error and the hint, for screen readers and the coral border.
  const control = Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          'aria-invalid': error ? true : child.props['aria-invalid'],
          'aria-describedby': noteId,
        })
      : child,
  )

  return (
    <div data-slot="field" className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={id} className={cn(disabled && 'text-gray-400')}>
          {label}
        </Label>
        {note && (
          <span id={noteId} className={cn('text-body-12 text-gray-600', error && 'text-coral-500')}>
            {note}
          </span>
        )}
      </div>
      {control}
    </div>
  )
}

export { Field }
