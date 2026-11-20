// SelectField: ready-made dropdown made of the Select parts. Put it inside <Field> for a label and hint.
// Props:
//   options:       list of choices, e.g. ["Option 1", "Option 2"] or [{ value: "a", label: "Option A" }]
//   placeholder:   grey text shown before anything is chosen
//   value / onValueChange, or defaultValue: the chosen option
//   name:          field name sent with the form
//   disabled, id, aria-invalid (Field sets it on error)
//   preview:       "hover" | "focus" | "open" — only for /styleguide
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, openLook } from '@/components/ui/select'
import { cn } from '@/lib/utils'

function SelectField({ options = [], placeholder, id, className, preview, disabled, ...props }) {
  const { 'aria-invalid': invalid, 'aria-describedby': describedBy, ...rootProps } = props
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))

  return (
    <Select disabled={disabled} {...rootProps}>
      <SelectTrigger
        id={id}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        data-preview={preview === 'open' ? undefined : preview}
        className={cn(preview === 'open' && openLook, className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SelectField }
