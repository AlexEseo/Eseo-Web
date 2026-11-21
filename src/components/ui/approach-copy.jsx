// ApproachCopy: title, short text and a blue label for one step of the Approach section. Figma "Approach copy".
// Props: title, description, label (texts from site.json), className.
import { cn } from '@/lib/utils'

function ApproachCopy({ title, description, label, className }) {
  return (
    <div data-slot="approach-copy" className={cn('flex flex-col gap-4', className)}>
      <h3 className="text-header-24 font-semibold text-gray-900">{title}</h3>
      <p className="text-body-14 text-gray-600">{description}</p>
      {label && <p className="text-body-14 font-semibold text-brand-600">{label}</p>}
    </div>
  )
}

export { ApproachCopy }
