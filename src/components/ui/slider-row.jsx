// SliderRow: label on the left, current value on the right, slider below. Figma "Slider row".
// Props:
//   label:  text on the left (from site.json)
//   id:     unique id, links the label to the slider for screen readers
//   format: turns the number into the text on the right, e.g. (v) => `${v}%` (default: the number itself)
//   value / onValueChange(number), or defaultValue; min, max, step, disabled — passed to Slider
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

function SliderRow({ label, id, format = (v) => String(v), value, defaultValue, onValueChange, className, ...props }) {
  // Works both ways: the page can control the value, or the row keeps it itself.
  const [own, setOwn] = useState(defaultValue ?? props.min ?? 0)
  const current = value ?? own
  const labelId = `${id}-label`

  return (
    <div data-slot="slider-row" className={cn('flex w-full flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-4 text-body-12 font-semibold">
        <span id={labelId} className="text-gray-900">
          {label}
        </span>
        <output htmlFor={id} className="text-gray-950 tabular-nums">
          {format(current)}
        </output>
      </div>
      <Slider
        id={id}
        aria-labelledby={labelId}
        value={current}
        onValueChange={(v) => {
          setOwn(v)
          onValueChange?.(v)
        }}
        {...props}
      />
    </div>
  )
}

export { SliderRow }
