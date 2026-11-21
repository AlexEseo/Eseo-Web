// Faq: centred heading and the questions list (several answers can stay open). Figma Home → "FAQ".
// Props: text (site.faq).
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

function Faq({ text }) {
  return (
    <section data-slot="faq" className="px-5 pt-16 pb-16 md:px-10 md:pt-32 md:pb-32 lg:px-20">
      <div className="mx-auto flex max-w-(--container-page) flex-col items-center gap-8 md:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-display-40 font-semibold text-gray-900 md:whitespace-pre-line">{text.title}</h2>
          <p className="text-body-14 text-gray-600 md:whitespace-pre-line">{text.description}</p>
        </div>
        <Accordion className="w-full max-w-(--container-faq)">
          {text.items.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export { Faq }
