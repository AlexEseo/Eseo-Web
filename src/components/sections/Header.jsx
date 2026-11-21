// Header: top bar of the site. Figma "Header" (desktop) and "Header / mobile" (Menu=Closed / Menu=Open).
// Desktop: logo left; currency pill, thin line and "Let's talk" button right.
// Phone: logo and a round menu button; the menu opens below with currency, a wide button and links.
// Stays on top of the page while scrolling.
// Props:
//   text:       site.header + site.footer + site.brand (from site.json): cta, currencyLabel, menuOpen, menuClose, email, links, logoAlt
//   currencies: site.currencies; currency / onCurrencyChange: the chosen currency (shared with the footer and the Planner)
//   onCta:      what "Let's talk" does (opens the form)
//   defaultOpen: true shows the phone menu open (for /styleguide)
import { useState } from 'react'
import { Collapsible } from 'radix-ui'
import IconClose from '@/components/icons/IconClose'
import IconMenu from '@/components/icons/IconMenu'
import { Button } from '@/components/ui/button'
import { CurrencySelect } from '@/components/ui/currency-select'
import { Divider } from '@/components/ui/divider'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

function Header({ text, currencies, currency, onCurrencyChange, onCta, defaultOpen = false, className }) {
  const [open, setOpen] = useState(defaultOpen)
  const currencyPicker = (
    <CurrencySelect
      variant="pill"
      currencies={currencies}
      value={currency}
      onValueChange={onCurrencyChange}
      aria-label={text.currencyLabel}
    />
  )

  return (
    <header data-slot="header" className={cn('sticky top-0 z-40 bg-gray-0', className)}>
      {/* Desktop */}
      <div className="hidden px-10 py-5 md:block lg:px-20">
        <div className="mx-auto flex max-w-(--container-page) items-center justify-between gap-8">
          <Logo alt={text.logoAlt} />
          <div className="flex items-center gap-4">
            {currencyPicker}
            <span aria-hidden="true" className="self-stretch border-l border-gray-200" />
            <Button variant="primary" size="m" onClick={onCta}>
              {text.cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Phone */}
      <Collapsible.Root open={open} onOpenChange={setOpen} className="md:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <Logo alt={text.logoAlt} />
          <Collapsible.Trigger
            aria-label={open ? text.menuClose : text.menuOpen}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-900 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-brand-600"
          >
            {open ? <IconClose /> : <IconMenu />}
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content className="flex flex-col gap-6 px-5 pt-2 pb-8">
          <div className="flex">{currencyPicker}</div>
          <Button
            variant="primary"
            size="m"
            className="h-button-white w-full"
            onClick={() => {
              setOpen(false)
              onCta?.()
            }}
          >
            {text.cta}
          </Button>
          <Divider />
          <nav className="flex flex-col items-start gap-3 text-body-14 text-gray-600">
            <a href={`mailto:${text.email}`} className="hover:text-gray-900">
              {text.email}
            </a>
            {text.links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-gray-900">
                {link.label}
              </a>
            ))}
          </nav>
        </Collapsible.Content>
      </Collapsible.Root>

      <Divider />
    </header>
  )
}

export { Header }
