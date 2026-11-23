// Hero: first screen of the home page. Figma Home → "Hero" + "Channel convergence" (desktop and mobile).
// Small label, big centred title, subtitle, a white button that opens the "Let's talk" form,
// then the channel illustration on a soft gradient. Two glass orbs float near the title on desktop.
// Decorative parts (gradient, orbs, illustration) have fixed proportions — approved by the owner.
// Motion: the texts appear one after another on load, the illustration follows; the orbs float slowly.
// Props: text (site.hero from site.json), channels (list of { name, icon } for the illustration), onCta (opens the form).
import IconLocation from '@/components/icons/IconLocation'
import { Button } from '@/components/ui/button'
import { ChannelConvergence } from '@/components/ui/channel-convergence'
import { GlassOrb } from '@/components/ui/glass-orb'
import { GradientScene } from '@/components/ui/gradient-scene'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { heroScene } from '@/lib/gradients'

function Hero({ text, channels, onCta }) {
  return (
    <section data-slot="hero" className="relative isolate pt-12 md:pt-31">
      {/* Glass orbs (desktop): positions from the 1280 Figma frame. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-full max-w-(--container-hero-frame) md:block">
        <GlassOrb size="s" className="absolute animate-float" style={{ left: '32.97%', top: '17.0625rem' }} />
        <GlassOrb size="l" className="absolute animate-float [animation-delay:var(--duration-float-offset)]" style={{ left: '60.55%', top: '20.6875rem' }} />
      </div>

      <RevealGroup className="relative z-10 mx-auto flex max-w-(--container-hero-copy) flex-col items-center gap-4 px-5 text-center md:gap-6">
        <RevealItem>
          <SectionLabel className="text-gray-900">{text.label}</SectionLabel>
        </RevealItem>
        <RevealItem as="h1" className="text-display-72 font-semibold text-gray-950">
          {text.title}
        </RevealItem>
        <RevealItem className="flex max-w-(--container-hero-sub) flex-col items-center gap-6 md:gap-10">
          <p className="text-body-14 text-gray-600 md:text-body-16">{text.subtitle}</p>
          <Button variant="white" onClick={onCta}>
            <IconLocation />
            {text.cta}
          </Button>
        </RevealItem>
      </RevealGroup>

      {/* Channel illustration on the gradient. The gradient square starts a little above the illustration
          (Figma: 50 of 390 on phones, 98 of 1280 on desktop) and runs on behind the next section. */}
      <div className="relative mt-20 md:mt-51">
        <GradientScene scene={heroScene} className="inset-x-0 -z-10 -mt-(--hero-glow-shift-phone) md:-mt-(--hero-glow-shift-desktop)" />
        <Reveal delay={0.3} className="px-5 md:px-10">
          <ChannelConvergence label={text.convergenceLabel} channels={channels} />
        </Reveal>
      </div>
    </section>
  )
}

export { Hero }
