// CurrencySelect: currency picker — one round "pill" component in two sizes. Figma "Currency select" (Size=S / Size=M).
//   S — in the calculator (token h-button-s), M — in the header and footer (token h-header-select). Both open the same "Currency menu".
// Built on the shadcn Select (Radix): opens on click, arrows and Enter work, Esc closes.
// Props:
//   size: "s" (default, calculator) | "m" (header, footer). Both: sign in a grey circle + code ("€ EUR").
//   currencies: list like [{ value: "EUR", code: "EUR €", name: "Euro", symbol: "€" }] (texts come from site.json)
//   value / onValueChange(value), or defaultValue
//   disabled, id, aria-label or aria-labelledby
//   preview: "hover" | "open" — only for /styleguide
// Button states from Figma: Default, Hover, Open, Disabled. The menu uses the same rows as every dropdown (SelectItem in select.jsx).
import { useState } from 'react'
import { Select as SelectPrimitive } from 'radix-ui'
import IconChevronDown from '@/components/icons/IconChevronDown'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const openLook = 'border-brand-600 inset-ring-1 inset-ring-brand-600 hover:border-brand-600 [&>svg]:rotate-180'

// What differs between the sizes. Shape, colours, states and the menu are the same.
const sizes = {
  s: 'h-button-s gap-1 pr-2 pl-1.5 text-body-12',
  m: 'h-header-select gap-1.5 pr-2 pl-2.5 text-label-14-medium',
}

function CurrencySelect({ currencies = [], size = 's', id, preview, className, disabled, ...props }) {
  const { 'aria-label': ariaLabel, 'aria-labelledby': labelledBy, value, defaultValue, onValueChange, ...rootProps } = props
  // The button shows the sign and the code itself, so it needs to know the chosen currency.
  const [own, setOwn] = useState(defaultValue)
  const current = currencies.find((c) => c.value === (value ?? own))

  return (
    <Select
      disabled={disabled}
      value={value ?? own}
      onValueChange={(v) => {
        setOwn(v)
        onValueChange?.(v)
      }}
      {...rootProps}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        data-slot="currency-trigger"
        data-preview={preview === 'open' ? undefined : preview}
        className={cn(
          'group inline-flex cursor-pointer items-center border border-gray-200 bg-transparent whitespace-nowrap outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard)',
          'rounded-full font-medium text-gray-700 [&>svg]:text-gray-600 disabled:opacity-40',
          sizes[size],
          'hover:border-gray-400 focus-visible:border-brand-600 focus-visible:inset-ring-1 focus-visible:inset-ring-brand-600',
          'data-[state=open]:border-brand-600 data-[state=open]:inset-ring-1 data-[state=open]:inset-ring-brand-600',
          'disabled:cursor-not-allowed disabled:border-gray-200',
          preview === 'open' && openLook,
          className,
        )}
      >
        <SelectPrimitive.Value>
          <span className={cn('flex items-center', size === 'm' ? 'gap-1.5' : 'gap-1')}>
            <span aria-hidden="true" className="flex size-4 items-center justify-center rounded-full bg-gray-100 text-caption-10 font-bold tracking-normal text-gray-700">
              {current?.symbol}
            </span>
            {current?.value}
          </span>
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon asChild>
          <IconChevronDown className="shrink-0 transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectContent align="start" className="w-auto min-w-currency-menu">
        {currencies.map((c) => (
          <SelectItem key={c.value} value={c.value} note={c.name}>
            {c.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { CurrencySelect }
