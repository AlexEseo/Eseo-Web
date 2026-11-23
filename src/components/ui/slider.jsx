// Slider: shadcn slider (Radix) restyled to Figma "Slider": 4 track (gray/200), blue fill, 16 blue thumb with white ring.
// Props:
//   value / onValueChange(number), or defaultValue (number)
//   min (0), max (100), step (1), disabled, name, aria-label or aria-labelledby
// Drag with the mouse or finger; arrow keys, Page Up/Down, Home/End work too (Radix behaviour).
// Figma has one state; no focus ring (owner's decision). Disabled is added here.
import { Slider as SliderPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

function Slider({ className, value, defaultValue, onValueChange, min = 0, max = 100, step = 1, ...props }) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value === undefined ? undefined : [value]}
      defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
      onValueChange={onValueChange ? ([v]) => onValueChange(v) : undefined}
      min={min}
      max={max}
      step={step}
      className={cn(
        'relative flex w-full cursor-pointer touch-none items-center select-none data-disabled:pointer-events-none data-disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className="relative h-slider-track w-full grow overflow-hidden rounded-4 bg-gray-200">
        <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full rounded-4 bg-brand-600" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        className="block size-4 shrink-0 rounded-full border-2 border-gray-0 bg-brand-600 outline-none"
      />
    </SliderPrimitive.Root>
  )
}

export { Slider }
