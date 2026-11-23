// PricingCard: glass tariff card. Figma "Pricing card".
// Props:
//   label, title, description, price, from, period — texts from site.json
//   features: list of short lines shown with a check mark
//   cta:      button text; onCta: what the button does (for example, open the "Let's talk" form)
//   selected: true highlights the card (blue outline, blue glow, primary button) — the recommended plan
//   preview:  "hover" | "focus" — only for /styleguide
// Hover: the card lifts a little (token --motion-card-lift) while its shadow grows, slowly with ease in-out;
// when the cursor leaves, it settles back faster. An invisible strip under the card (after:) fills the gap the lift
// leaves, so the card never slips out from under the cursor and doesn't twitch. Only the hovered card moves.
// States from Figma: Default, Hover, Focus — each for a normal and a selected card.
// Focus shows when the button inside is reached with the Tab key.
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function PricingCard({
  label,
  title,
  description,
  price,
  from,
  period,
  features = [],
  cta,
  onCta,
  selected = false,
  preview,
  className,
}) {
  const hover = preview === 'hover'
  const focus = preview === 'focus'

  return (
    <article
      data-slot="pricing-card"
      data-selected={selected || undefined}
      className={cn(
        'group/pricing border-gradient flex flex-col items-start gap-8 rounded-40 px-6 py-8 backdrop-blur-(--blur-pricing) transition-[box-shadow,translate] duration-(--duration-base) ease-(--ease-in-out) hover:-translate-y-(--motion-card-lift) hover:duration-(--duration-slow) after:absolute after:inset-x-0 after:top-full after:h-(--motion-card-lift)',
        selected
          ? '[--border-gradient:var(--gradient-pricing-stroke-selected)] [--border-gradient-width:var(--border-width-pricing-selected)] bg-(image:--gradient-pricing-fill-selected) shadow-pricing-selected hover:bg-(image:--gradient-pricing-fill-selected-hover) hover:shadow-pricing-selected-hover'
          : '[--border-gradient:var(--gradient-pricing-stroke)] [--border-gradient-width:var(--border-width-pricing)] bg-(image:--gradient-pricing-fill) shadow-pricing hover:bg-(image:--gradient-pricing-fill-hover) hover:shadow-pricing-hover',
        // Keyboard focus on the button inside: blue outline and a soft blue ring around the card.
        'has-focus-visible:[--border-gradient:var(--color-brand-600)] has-focus-visible:[--border-gradient-width:var(--border-width-pricing-selected)]',
        selected
          ? 'has-focus-visible:shadow-pricing-selected-focus'
          : 'has-focus-visible:shadow-pricing-focus',
        hover &&
          (selected
            ? 'bg-(image:--gradient-pricing-fill-selected-hover) shadow-pricing-selected-hover'
            : 'bg-(image:--gradient-pricing-fill-hover) shadow-pricing-hover'),
        hover && '-translate-y-(--motion-card-lift)',
        focus &&
          cn(
            '[--border-gradient:var(--color-brand-600)] [--border-gradient-width:var(--border-width-pricing-selected)]',
            selected ? 'shadow-pricing-selected-focus' : 'shadow-pricing-focus',
          ),
        className,
      )}
    >
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-3">
          {label && <p className="text-caption-10 font-bold text-gray-950 capitalize">{label}</p>}
          <div className="flex flex-col gap-2">
            <h3 className="text-header-24 font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-body-14 text-gray-600">{description}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-header-24 font-semibold text-gray-900 tabular-nums">{price}</p>
          {(from || period) && (
            <p className="flex gap-1 text-body-12 text-gray-500">
              {from && <span>{from}</span>}
              {from && period && <span aria-hidden="true">·</span>}
              {period && <span>{period}</span>}
            </p>
          )}
        </div>
        {features.length > 0 && (
          <ul className="flex flex-col gap-2">
            {features.map((item) => (
              <li key={item} className="flex gap-1 text-body-12 text-gray-700">
                <span aria-hidden="true" className="size-4 shrink-0 text-center font-bold text-gray-500">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
      {cta && (
        <Button
          variant={selected ? 'primary' : 'secondary'}
          size="m"
          onClick={onCta}
          // Figma overrides the grey secondary button here: almost-white fill with a light blue outline.
          className={selected ? undefined : 'border border-brand-100 bg-gray-0/90 text-brand-600 hover:bg-gray-0 active:bg-brand-50'}
        >
          {cta}
        </Button>
      )}
    </article>
  )
}

export { PricingCard }
