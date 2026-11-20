// MoneyInput: text field for an amount of money. Shows the currency sign and groups digits ("€ 1,200,000").
// Only digits can be typed; the page gets a plain number back.
// Props:
//   value (number), onValueChange(number)
//   symbol: currency sign shown before the number, e.g. "€"
//   id, name, disabled, aria-invalid, aria-describedby — passed to Input (Field sets some of them)
import { Input } from '@/components/ui/input'

const groups = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

function MoneyInput({ value, onValueChange, symbol = '', ...props }) {
  const text = value === null || value === undefined || Number.isNaN(value) ? '' : `${symbol} ${groups.format(value)}`.trim()

  return (
    <Input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={text}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, '')
        onValueChange?.(digits === '' ? 0 : Number(digits))
      }}
      {...props}
    />
  )
}

export { MoneyInput }
