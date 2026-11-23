// Tabs: shadcn tabs (Radix) restyled to Figma "Tab" / "Tabs" (used in Industries).
// Parts: Tabs (root: defaultValue or value/onValueChange), TabsList (row of tabs),
//        TabsTrigger (one tab: value, disabled), TabsContent (panel shown for a value).
// Tab states from Figma: Default, Hover, Active, Focus, Disabled.
// Arrow keys move between tabs (Radix behaviour).
import { Tabs as TabsPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

function Tabs({ className, ...props }) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-6', className)} {...props} />
}

function TabsList({ className, ...props }) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn('flex flex-wrap gap-8', className)} {...props} />
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'cursor-pointer border-b-2 border-gray-200 pb-3 text-left text-label-14 font-semibold whitespace-nowrap text-gray-600 outline-none transition-colors duration-(--duration-fast) ease-(--ease-standard)',
        'hover:border-gray-300 hover:text-gray-900',
        'data-[state=active]:border-brand-600 data-[state=active]:text-gray-900',
        'focus-visible:rounded-4 focus-visible:inset-ring-2 focus-visible:inset-ring-gray-400',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('outline-none', className)} {...props} />
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
