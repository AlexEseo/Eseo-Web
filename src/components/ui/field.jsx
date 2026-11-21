// Field: label row (label on the left, hint on the right), the input or select, and an error line under it. Figma "Field".
// Props:
//   label:    text above the input
//   hint:     small grey text on the right of the label (optional)
//   error:    coral text under the input; also turns the input border coral
//   disabled: greys out the label (pass disabled to the input itself too)
//   id:       id of the input inside, so a click on the label focuses it
//   children: the input — <Input id=... /> or <SelectField id=... />
import { Children, cloneElement, isValidElement } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

function Field({ label, hint, error, disabled = false, id, className, children }) {
  const hintId = hint && id ? `${id}-hint` : undefined
  const errorId = error && id ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  // Tell the input about the error and the hint, for screen readers and the coral border.
  const control = Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          'aria-invalid': error ? true : child.props['aria-invalid'],
          'aria-describedby': describedBy,
        })
      : child,
  )

  return (
    <div data-slot="field" className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={id} className={cn(disabled && 'text-gray-400')}>
          {label}
        </Label>
        {hint && (
          <span id={hintId} className="text-body-12 text-gray-600">
            {hint}
          </span>
        )}
      </div>
      {control}
      {error && (
        <p id={errorId} className="text-body-12 text-coral-500">
          {error}
        </p>
      )}
    </div>
  )
}

export { Field }
