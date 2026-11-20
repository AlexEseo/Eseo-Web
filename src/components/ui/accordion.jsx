// Accordion: shadcn accordion (Radix) restyled to Figma "Accordion item" (FAQ).
// Parts: Accordion (root: type="single" collapsible, or type="multiple"),
//        AccordionItem (value), AccordionTrigger (the question), AccordionContent (the answer).
// States from Figma: Closed, Open. Keyboard focus outline is added here (not in Figma).
import { Accordion as AccordionPrimitive } from 'radix-ui'
import IconChevronDown20 from '@/components/icons/IconChevronDown20'
import { cn } from '@/lib/utils'

function Accordion(props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b border-gray-200 py-5', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group flex flex-1 cursor-pointer items-center justify-between gap-6 rounded-4 text-left text-body-16 font-semibold text-gray-900 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-40',
          className,
        )}
        {...props}
      >
        {children}
        <IconChevronDown20 className="shrink-0 text-gray-500 transition-transform duration-(--duration-base) ease-(--ease-out) group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pt-3 text-body-14 text-gray-600', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
