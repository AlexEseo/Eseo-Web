// Footer: bottom of the site. Figma "Footer" (desktop) and "Footer / mobile".
// Desktop: logo and currency pill on top, a line, then copyright left and links right.
// Phone: logo and currency pill, a line, links in a column, copyright last.
// Props:
//   text:       site.footer + site.brand (from site.json): copyright, email, links, logoAlt, currencyLabel
//   currencies: site.currencies; currency / onCurrencyChange: the chosen currency (shared with the header)
import { CurrencySelect } from '@/components/ui/currency-select'
import { Divider } from '@/components/ui/divider'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

function Footer({ text, currencies, currency, onCurrencyChange, className }) {
  return (
    <footer data-slot="footer" className={cn('bg-gray-0 px-5 pt-12 pb-10 md:px-10 md:py-16 lg:px-20', className)}>
      <div className="mx-auto flex max-w-(--container-page) flex-col gap-6 md:gap-8">
        <div className="flex items-center justify-between gap-4">
          <Logo alt={text.logoAlt} />
          <CurrencySelect
            variant="pill"
            currencies={currencies}
            value={currency}
            onValueChange={onCurrencyChange}
            aria-label={text.currencyLabel}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="order-last text-body-12 text-gray-500 md:order-first md:text-gray-600">{text.copyright}</p>
          <nav className="flex flex-col items-start gap-3 text-body-14 text-gray-600 md:flex-row md:items-center md:gap-6 md:text-body-12">
            <a href={`mailto:${text.email}`} className="hover:text-gray-900">
              {text.email}
            </a>
            {text.links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-gray-900 md:text-gray-700">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
