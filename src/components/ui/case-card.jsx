// CaseCard: client testimonial card. Figma "Case card": photo, name and company on top, the quote below,
// the result number with a blue arrow pinned to the bottom (so numbers line up across cards in a row).
// Props: name, company, photo (image path), quote, metric (texts from site.json), className.
import IconArrowUp from '@/components/icons/IconArrowUp'
import { cn } from '@/lib/utils'

function CaseCard({ name, company, photo, quote, metric, className }) {
  return (
    <figure
      data-slot="case-card"
      className={cn('flex min-h-case-card flex-col justify-between gap-12 rounded-20 border border-gray-200 bg-gray-0 p-8', className)}
    >
      <div className="flex flex-col gap-6">
        <figcaption className="flex items-center gap-3">
          <img src={photo} alt="" className="size-10 shrink-0 rounded-full object-cover" loading="lazy" />
          <span className="flex flex-col gap-0.5">
            <span className="text-body-14 font-semibold text-gray-900">{name}</span>
            <span className="text-body-12 font-medium text-gray-500">{company}</span>
          </span>
        </figcaption>
        <blockquote className="text-body-14 text-gray-600">{quote}</blockquote>
      </div>
      <p className="flex items-center gap-1 text-display-48 font-semibold text-gray-950 tabular-nums">
        <IconArrowUp className="size-6 text-brand-600" />
        {metric}
      </p>
    </figure>
  )
}

export { CaseCard }
