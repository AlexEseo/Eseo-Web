// Select: shadcn select (Radix) restyled to Figma "Select field" and "Select menu".
// Parts: Select (root), SelectTrigger (the rounded box), SelectValue, SelectContent (the menu), SelectItem.
// Usually you do not need the parts: use SelectField (select-field.jsx), it puts them together.
// Trigger states from Figma: Default, Hover, Focus, Open, Error, Disabled.
// Menu item states: Default, Hover, Selected.
import { Select as SelectPrimitive } from 'radix-ui'
import IconChevronDown from '@/components/icons/IconChevronDown'
import { fieldBoxClass } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function Select(props) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup(props) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue(props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

// data-preview="open" shows the Open look on /styleguide without opening the menu.
const openLook = 'border-brand-600 inset-ring-1 inset-ring-brand-600 hover:border-brand-600 [&>svg]:rotate-180'

function SelectTrigger({ className, children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        fieldBoxClass,
        'group flex cursor-pointer items-center justify-between gap-2 text-left whitespace-nowrap data-placeholder:text-gray-400',
        '*:data-[slot=select-value]:truncate',
        'data-[state=open]:border-brand-600 data-[state=open]:inset-ring-1 data-[state=open]:inset-ring-brand-600',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <IconChevronDown className="shrink-0 text-gray-900 transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-180 group-disabled:opacity-40" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, position = 'popper', ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={4}
        className={cn(
          'relative z-50 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) overflow-x-hidden overflow-y-auto rounded-8 border border-gray-200 bg-gray-25 shadow-card',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-gray-600">
          <IconChevronDown className="rotate-180" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="flex flex-col gap-0.5 p-1">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-gray-600">
          <IconChevronDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'flex w-full cursor-pointer items-center rounded-4 px-3 py-2 text-body-14 text-gray-900 outline-none select-none',
        'data-highlighted:bg-gray-100 data-[state=checked]:bg-brand-50 data-[state=checked]:text-brand-600',
        'data-disabled:pointer-events-none data-disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, openLook }
