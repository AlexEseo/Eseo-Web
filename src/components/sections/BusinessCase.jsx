// BusinessCase: left-aligned heading, the profit calculator and notes on how it is calculated.
// Figma Home → "03 Business case". The currency is shared with the header and footer.
// Props: text (site.businessCase), currencies, currency, onCurrencyChange.
import { Reveal } from '@/components/motion/reveal'
import { Planner } from '@/components/ui/planner'
import { SectionHeading } from '@/components/ui/section-heading'

function BusinessCase({ text, currencies, currency, onCurrencyChange }) {
  return (
    <section data-slot="business-case" className="px-5 py-16 md:px-10 md:py-32 lg:px-20">
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-8 md:gap-13">
        <Reveal>
          <SectionHeading align="left" title={text.title} description={text.description} />
        </Reveal>
        <Reveal>
          <Planner
            text={text.planner}
            currencies={currencies}
            initial={{ currency, ...text.start }}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
          />
        </Reveal>
        <div className="flex max-w-(--container-card-wide) flex-col gap-2 text-body-12 text-gray-500">
          <p className="font-semibold text-gray-700">{text.notesTitle}</p>
          {text.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export { BusinessCase }
