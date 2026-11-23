// CardCaption: title and short description under or inside a card. Figma "Card caption".
// Props: title, description (texts from site.json), className.
import { cn } from '@/lib/utils'

function CardCaption({ title, description, className }) {
  return (
    <div data-slot="card-caption" className={cn('flex flex-col gap-1', className)}>
      <p className="text-body-16 font-semibold text-gray-900">{title}</p>
      {description && <p className="text-body-14 text-gray-600">{description}</p>}
    </div>
  )
}

export { CardCaption }
