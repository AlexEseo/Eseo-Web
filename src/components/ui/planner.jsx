// Planner: the profit calculator. Figma "Planner" (Size=Desktop: form left, results right; Size=Mobile: stacked).
// Formula agreed with the owner:
//   current contribution after media  = revenue × margin − media spend
//   scenario contribution after media = revenue × (1 + revenue change) × margin − media spend
//   big number = scenario − current;  MER = revenue ÷ media spend (current → scenario)
// The currency only changes the sign; amounts are not converted.
// The big number rolls to the new value when inputs change (CountUp). It uses the plain sign without letters ("C$" → "$"), as the owner asked; rows keep the full sign.
// Props:
//   text:       all labels (from site.json): currency, revenue, media, mediaHint, margin, change, current, scenario, mer
//   currencies: list for the currency picker, e.g. [{ value: "EUR", code: "EUR €", name: "Euro", symbol: "€" }]
//   initial:    starting values { currency, revenue, media, margin, change } (margin and change in %)
//   currency / onCurrencyChange: optional — the page's shared currency (header, footer); without them the Planner keeps its own
import { useId, useState } from 'react'
import { CountUp } from '@/components/motion/count-up'
import { CurrencySelect } from '@/components/ui/currency-select'
import { Divider } from '@/components/ui/divider'
import { Field } from '@/components/ui/field'
import { MoneyInput } from '@/components/ui/money-input'
import { ResultRow } from '@/components/ui/result-row'
import { SliderRow } from '@/components/ui/slider-row'
import { cn } from '@/lib/utils'

const groups = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const ratio = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// "€180,000", "−€12,000"; with sign=true also "+€48,000".
function money(n, symbol, sign = false) {
  const body = `${symbol}${groups.format(Math.abs(Math.round(n)))}`
  if (n < 0) return `−${body}`
  return sign && n > 0 ? `+${body}` : body
}

function calculate({ revenue, media, margin, change }) {
  const m = margin / 100
  const scenarioRevenue = revenue * (1 + change / 100)
  const current = revenue * m - media
  const scenario = scenarioRevenue * m - media
  return {
    current,
    scenario,
    uplift: scenario - current,
    merNow: media > 0 ? revenue / media : null,
    merScenario: media > 0 ? scenarioRevenue / media : null,
  }
}

function Planner({ text, currencies = [], initial, currency, onCurrencyChange, className }) {
  const uid = useId()
  const [values, setValues] = useState(initial)
  const set = (key) => (v) => setValues((old) => ({ ...old, [key]: v }))
  const shared = currency !== undefined
  const chosen = shared ? currency : values.currency

  const symbol = currencies.find((c) => c.value === chosen)?.symbol ?? ''
  const bigSymbol = symbol.replace(/[A-Za-z]/g, '')
  const r = calculate(values)
  const mer = r.merNow === null ? '—' : `${ratio.format(r.merNow)}× → ${ratio.format(r.merScenario)}×`

  return (
    <div data-slot="planner" className={cn('flex flex-col overflow-hidden rounded-20 border border-gray-200 md:flex-row', className)}>
      <div className="flex flex-col gap-6 px-5 py-6 md:flex-1 md:p-10">
        <div className="flex items-center gap-2">
          <span id={`${uid}-currency`} className="text-body-12 text-gray-600">
            {text.currency}
          </span>
          <CurrencySelect
            currencies={currencies}
            value={chosen}
            onValueChange={shared ? onCurrencyChange : set('currency')}
            aria-labelledby={`${uid}-currency`}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-5">
          <Field id={`${uid}-revenue`} label={text.revenue}>
            <MoneyInput id={`${uid}-revenue`} symbol={symbol} value={values.revenue} onValueChange={set('revenue')} />
          </Field>
          <Field id={`${uid}-media`} label={text.media} hint={text.mediaHint}>
            <MoneyInput id={`${uid}-media`} symbol={symbol} value={values.media} onValueChange={set('media')} />
          </Field>
        </div>
        <SliderRow
          id={`${uid}-margin`}
          label={text.margin}
          value={values.margin}
          onValueChange={set('margin')}
          min={0}
          max={100}
          format={(v) => `${v}%`}
        />
        <SliderRow
          id={`${uid}-change`}
          label={text.change}
          value={values.change}
          onValueChange={set('change')}
          min={-50}
          max={50}
          format={(v) => `${v}%`}
        />
      </div>
      <div className="flex flex-col justify-center gap-6 bg-gray-50 px-5 py-6 md:flex-1 md:p-10">
        <p aria-live="polite" className="text-display-40 font-semibold text-gray-900 tabular-nums md:text-display-64">
          <CountUp value={r.uplift} format={(n) => money(n, bigSymbol, true)} />
        </p>
        <div className="flex flex-col">
          <ResultRow label={text.current} value={money(r.current, symbol)} />
          <Divider />
          <ResultRow label={text.scenario} value={money(r.scenario, symbol)} />
          <Divider />
          <ResultRow label={text.mer} value={mer} />
          <Divider />
        </div>
      </div>
    </div>
  )
}

export { Planner, calculate }
