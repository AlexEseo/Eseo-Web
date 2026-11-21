// SectionHeading: big heading of a home page section, optionally with a small label above and a line of text below.
// Figma "Section heading" (Align=Center / Left).
// Props: label, title, description (texts from site.json), align "center" (default) | "left", className.
// Line breaks in the title ("\n") are kept on wide screens.
import { SectionLabel } from '@/components/ui/section-label'
import { cn } from '@/lib/utils'

function SectionHeading({ label, title, description, align = 'center', className }) {
  return (
    <div
      data-slot="section-heading"
      className={cn('flex flex-col gap-4 md:gap-5', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}
    >
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="text-display-48 font-semibold text-gray-950 md:whitespace-pre-line">{title}</h2>
      {description && <p className="text-body-14 text-gray-600 md:text-body-16">{description}</p>}
    </div>
  )
}

export { SectionHeading }
