// Label: shadcn label (Radix) restyled to Figma "Field" → Label (typo/label/14 - medium).
// Props: htmlFor (id of the input), className, children.
import { Label as LabelPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn('text-label-14-medium font-medium text-gray-900 select-none', className)}
      {...props}
    />
  )
}

export { Label }
