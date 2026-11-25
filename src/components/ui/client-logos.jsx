// ClientLogos: grey client logos. Figma "Client logo" (Brand=...) inside "Partners & clients".
// Desktop: one row spread across the full width. Phone: two logos per row, each centred in its cell.
// The SVGs come from Figma and use the text colour (gray/500), so the colour is changed here, not in the files.
// Props: clients (list of { key, name } from site.json), className.
import booking from '@/assets/logos/clients/booking.svg?raw'
import amazon from '@/assets/logos/clients/amazon.svg?raw'
import citi from '@/assets/logos/clients/citi.svg?raw'
import pg from '@/assets/logos/clients/pg.svg?raw'
import oura from '@/assets/logos/clients/oura.svg?raw'
import bytedance from '@/assets/logos/clients/bytedance.svg?raw'
import { cn } from '@/lib/utils'

const logos = { booking, amazon, citi, pg, oura, bytedance }

function ClientLogo({ logo, name, className }) {
  return (
    <div
      role="img"
      aria-label={name}
      data-slot="client-logo"
      className={cn('h-client-logo-sm text-gray-500 md:h-client-logo [&>svg]:h-full [&>svg]:w-auto', className)}
      dangerouslySetInnerHTML={{ __html: logos[logo] }}
    />
  )
}

function ClientLogos({ clients, className }) {
  return (
    <ul data-slot="client-logos" className={cn('grid w-full grid-cols-2 gap-6 px-6 md:flex md:items-center md:justify-between md:gap-10 md:px-0', className)}>
      {clients.map((c) => (
        <li key={c.key} className="flex items-center justify-center">
          <ClientLogo logo={c.key} name={c.name} />
        </li>
      ))}
    </ul>
  )
}

export { ClientLogos, ClientLogo }
