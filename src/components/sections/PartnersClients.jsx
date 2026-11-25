// PartnersClients: partner statuses in laurels and the client logo row. Figma "Partners & clients" (Desktop / Mobile).
// Sits right after the Hero. Desktop: three awards in a row, caption, logos in one row.
// Tablet: awards wrap (two + one). Phone: awards stacked, caption wraps, logos two per row.
// The section is "relative" so it sits above the Hero gradient that runs into it (the gradient stays visible behind).
// Props: text (site.partners from site.json).
import { Reveal } from '@/components/motion/reveal'
import { PartnerAward } from '@/components/ui/partner-award'
import { ClientLogos } from '@/components/ui/client-logos'

function PartnersClients({ text }) {
  return (
    <section data-slot="partners-clients" className="relative px-5 py-16 md:px-10 md:py-18 lg:px-20">
      <Reveal className="mx-auto flex max-w-(--container-page) flex-col items-center gap-8">
        <ul className="flex flex-col items-center gap-8 pb-6 md:flex-row md:flex-wrap md:justify-center md:gap-x-16 lg:gap-x-24">
          {text.awards.map((a) => (
            <li key={a.key}>
              <PartnerAward partner={a.key} name={a.name} />
            </li>
          ))}
        </ul>
        <p className="text-center text-body-14 font-medium text-gray-500">{text.caption}</p>
        <ClientLogos clients={text.clients} />
      </Reveal>
    </section>
  )
}

export { PartnersClients }
