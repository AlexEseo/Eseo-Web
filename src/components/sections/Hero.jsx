// Hero: first screen of the home page. Figma Home → "Hero" (desktop) and "Hero" (mobile).
// Small label, big centred title, subtitle and a white button that opens the "Let's talk" form.
// The decorative background (gradient, glass orbs, channel illustration) is added separately.
// Props: text (site.hero from site.json), onCta (opens the form).
import IconLocation from '@/components/icons/IconLocation'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/ui/section-label'

function Hero({ text, onCta }) {
  return (
    <section data-slot="hero" className="relative px-5 pt-12 pb-8 md:px-10 md:pt-31 md:pb-40 lg:px-20">
      <div className="mx-auto flex max-w-(--container-hero-copy) flex-col items-center gap-4 text-center md:gap-6">
        <SectionLabel className="text-gray-900">{text.label}</SectionLabel>
        <h1 className="text-display-72 font-semibold text-gray-950">{text.title}</h1>
        <div className="flex max-w-(--container-hero-sub) flex-col items-center gap-6 md:gap-10">
          <p className="text-body-14 text-gray-600 md:text-body-16">{text.subtitle}</p>
          <Button variant="white" onClick={onCta}>
            <IconLocation />
            {text.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

export { Hero }
