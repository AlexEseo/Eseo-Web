// CurrencySelect: small currency picker for the Planner. Figma "Currency select" + "Currency menu".
// Built on the shadcn Select (Radix): opens on click, arrows and Enter work, Esc closes.
// Props:
//   currencies: list like [{ value: "EUR", code: "EUR €", name: "Euro" }] (texts come from site.json)
//   value / onValueChange(value), or defaultValue
//   disabled, id, aria-label or aria-labelledby
//   preview: "hover" | "open" — only for /styleguide
// Button states from Figma: Default, Hover, Open, Disabled. Menu item states: Default, Hover, Selected (with a check).
import { Select as SelectPrimitive } from 'radix-ui'
import IconCheck from '@/components/icons/IconCheck'
import IconChevronDown from '@/components/icons/IconChevronDown'
import { Select, SelectContent } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const openLook = 'border-brand-600 inset-ring-1 inset-ring-brand-600 hover:border-brand-600 [&>svg]:rotate-180'

function CurrencySelect({ currencies = [], id, preview, className, disabled, ...props }) {
  const { 'aria-label': ariaLabel, 'aria-labelledby': labelledBy, ...rootProps } = props

  return (
    <Select disabled={disabled} {...rootProps}>
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        data-slot="currency-trigger"
        data-preview={preview === 'open' ? undefined : preview}
        className={cn(
          'group inline-flex cursor-pointer items-center gap-1 rounded-4 [&_span]:font-normal [&_span]:text-inherit border border-gray-200 bg-transparent px-2 py-1 text-body-12 whitespace-nowrap text-gray-900 outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard)',
          'hover:border-gray-400 focus-visible:border-brand-600 focus-visible:inset-ring-1 focus-visible:inset-ring-brand-600',
          'data-[state=open]:border-brand-600 data-[state=open]:inset-ring-1 data-[state=open]:inset-ring-brand-600',
          'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-60',
          preview === 'open' && openLook,
          className,
        )}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon asChild>
          <IconChevronDown className="shrink-0 transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectContent align="start" className="w-auto min-w-currency-menu">
        {currencies.map((c) => (
          <SelectPrimitive.Item
            key={c.value}
            value={c.value}
            className="group/item flex w-full cursor-pointer items-center gap-2 rounded-4 px-3 py-2 text-body-12 outline-none select-none data-highlighted:bg-gray-100 data-[state=checked]:bg-brand-50"
          >
            <SelectPrimitive.ItemText>
              <span className="font-semibold text-gray-900 group-data-[state=checked]/item:text-brand-600">{c.code}</span>
            </SelectPrimitive.ItemText>
            <span className="flex-1 text-gray-500">{c.name}</span>
            <SelectPrimitive.ItemIndicator>
              <IconCheck className="text-brand-600" />
            </SelectPrimitive.ItemIndicator>
          </SelectPrimitive.Item>
        ))}
      </SelectContent>
    </Select>
  )
}

export { CurrencySelect }
