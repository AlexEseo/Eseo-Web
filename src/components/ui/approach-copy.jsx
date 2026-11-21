// ApproachCopy: title, short text and a link-button for one step of the Approach section. Figma "Approach copy".
// The link-button looks like "Discuss your e-commerce strategy" (Link with an arrow) and opens the "Let's talk" form.
// Props: title, description, label (texts from site.json), onCta (opens the form), className.
import { Link } from '@/components/ui/link'
import { cn } from '@/lib/utils'

function ApproachCopy({ title, description, label, onCta, className }) {
  return (
    <div data-slot="approach-copy" className={cn('flex flex-col items-start gap-4', className)}>
      <h3 className="text-header-24 font-semibold text-gray-900">{title}</h3>
      <p className="text-body-14 text-gray-600">{description}</p>
      {label && (
        <Link
          href="#lets-talk"
          onClick={(e) => {
            e.preventDefault()
            onCta?.()
          }}
        >
          {label}
        </Link>
      )}
    </div>
  )
}

export { ApproachCopy }
