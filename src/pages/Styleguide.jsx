// Styleguide (/styleguide): shows design tokens and every component in all its states.
// Names match Figma one to one. When a token is added to tokens.css, add it here too.
// data-preview="hover" | "active" | "focus" shows a state without the mouse (see globals.css).
import { Button } from '@/components/ui/button'
import IconLocation from '@/components/icons/IconLocation'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select-field'
import { Link } from '@/components/ui/link'
import { Divider } from '@/components/ui/divider'
import { SectionLabel } from '@/components/ui/section-label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { IconBadge } from '@/components/ui/icon-badge'
import { ChannelChip } from '@/components/ui/channel-chip'
import IconBars from '@/components/icons/IconBars'
import IconSeo from '@/components/icons/IconSeo'
import { Slider } from '@/components/ui/slider'
import { SliderRow } from '@/components/ui/slider-row'
import { CurrencySelect } from '@/components/ui/currency-select'
import { InfoTable } from '@/components/ui/info-table'
import { CardCaption } from '@/components/ui/card-caption'
import { StatCard } from '@/components/ui/stat-card'
import { IndustryCard } from '@/components/ui/industry-card'
import { PlanCard } from '@/components/ui/plan-card'
import { PlanRow } from '@/components/ui/plan-row'
import { PricingCard } from '@/components/ui/pricing-card'
import { Roadmap } from '@/components/ui/roadmap'
import { Planner } from '@/components/ui/planner'
import { useState } from 'react'
import site from '@/content/site.json'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { LetsTalk } from '@/components/sections/LetsTalk'
import IconSeo12 from '@/components/icons/IconSeo12'
import IconTarget from '@/components/icons/IconTarget'
import IconPercent from '@/components/icons/IconPercent'
import IconCheck from '@/components/icons/IconCheck'
import IconEuro from '@/components/icons/IconEuro'
import IconSwap from '@/components/icons/IconSwap'
import IconArrowUp from '@/components/icons/IconArrowUp'
import IconCalendar from '@/components/icons/IconCalendar'
import logoGoogleAds from '@/assets/icons/google-ads.svg'
import logoMeta from '@/assets/icons/meta.svg'
import logoTiktok from '@/assets/icons/tiktok.svg'

const colorGroups = [
  { title: 'gray', items: ['gray-0', 'gray-25', 'gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900', 'gray-950'] },
  { title: 'brand', items: ['brand-50', 'brand-100', 'brand-200', 'brand-600', 'brand-700', 'brand-800'] },
  { title: 'beige', items: ['beige-100', 'beige-200', 'beige-300'] },
  { title: 'coral · green · orange · pink', items: ['coral-500', 'green-500', 'orange-500', 'pink-500'] },
  { title: 'accent', items: ['accent-green', 'accent-orange', 'accent-pink', 'accent-coral'] },
]

// Tailwind needs full class names written out, so each style lists its classes.
const textStyles = [
  ['typo/display/520 - semibold', 'text-display-520 font-semibold', '160 → 520', 'Ag'],
  ['typo/display/220 - semibold', 'text-display-220 font-semibold', '220 (phone 404)', 'Ag'],
  ['typo/display/72 - semibold', 'text-display-72 font-semibold', '40 → 72'],
  ['typo/display/64 - semibold', 'text-display-64 font-semibold', '36 → 64'],
  ['typo/display/48 - semibold', 'text-display-48 font-semibold', '32 → 48'],
  ['typo/display/40 - semibold', 'text-display-40 font-semibold', '28 → 40'],
  ['typo/header/32 - semibold', 'text-header-32 font-semibold', '24 → 32'],
  ['typo/header/24 - semibold', 'text-header-24 font-semibold', '20 → 24'],
  ['typo/header/20 - bold', 'text-header-20 font-bold', '18 → 20'],
  ['typo/body/16 - semibold', 'text-body-16 font-semibold', '16'],
  ['typo/body/16 - regular', 'text-body-16 font-normal', '16'],
  ['typo/body/14 - semibold', 'text-body-14 font-semibold', '14'],
  ['typo/body/14 - medium', 'text-body-14 font-medium', '14'],
  ['typo/body/14 - regular', 'text-body-14 font-normal', '14'],
  ['typo/body/12 - semibold', 'text-body-12 font-semibold', '12'],
  ['typo/body/12 - medium', 'text-body-12 font-medium', '12'],
  ['typo/body/12 - regular', 'text-body-12 font-normal', '12'],
  ['typo/label/16 - medium', 'text-label-16 font-medium', '16'],
  ['typo/label/14 - semibold', 'text-label-14 font-semibold', '14'],
  ['typo/label/14 - medium', 'text-label-14-medium font-medium', '14'],
  ['typo/label/12 - medium', 'text-label-12 font-semibold', '12'],
  ['typo/caption/12 - bold', 'text-caption-12 font-bold lowercase', '12'],
  ['typo/caption/10 - bold', 'text-caption-10 font-bold capitalize', '10'],
  ['typo/button/16 - medium', 'text-button-16 font-medium', '16'],
  ['typo/button/15 - medium', 'text-button-15 font-medium', '15'],
  ['typo/button/13 - medium', 'text-button-13 font-medium', '13'],
]

const radii = [
  ['radius/4', 'rounded-4'],
  ['radius/8', 'rounded-8'],
  ['radius/16', 'rounded-16'],
  ['radius/20', 'rounded-20'],
  ['radius/24', 'rounded-24'],
  ['radius/40', 'rounded-40'],
  ['radius/full', 'rounded-full'],
]

const shadows = [
  ['shadow/card', 'shadow-card'],
  ['shadow/glass-card', 'shadow-glass-card'],
  ['shadow/device', 'shadow-device'],
]

// Columns of the button tables: Figma state name → how to show it here.
const buttonStates = [
  ['Default', {}],
  ['Hover', { 'data-preview': 'hover' }],
  ['Pressed', { 'data-preview': 'active' }],
  ['Focus', { 'data-preview': 'focus' }],
  ['Disabled', { disabled: true }],
  ['Loading', { loading: true }],
]

function ButtonTable({ variant, sizes, icon }) {
  return (
    <div className="overflow-x-auto rounded-16 border border-gray-200 p-6">
      <table className="border-separate border-spacing-x-6 border-spacing-y-4">
        <thead>
          <tr>
            <th />
            {buttonStates.map(([name]) => (
              <th key={name} className="text-left font-normal">
                <Token>{name}</Token>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size ?? 'one'}>
              <td>
                <Token>{size ? size.toUpperCase() : ''}</Token>
              </td>
              {buttonStates.map(([name, props]) => (
                <td key={name}>
                  <Button variant={variant} size={size} {...props}>
                    {icon}
                    Button
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Field and Select field states: Figma state name → props.
const fieldStates = [
  ['Default', {}],
  ['Hover', { preview: 'hover' }],
  ['Focus', { preview: 'focus' }],
  ['Error', { error: 'Error text' }],
  ['Disabled', { disabled: true }],
]
const selectStates = [...fieldStates.slice(0, 3), ['Open', { preview: 'open' }], ...fieldStates.slice(3)]
const demoOptions = ['Profitable customer acquisition', 'Scaling into new markets', 'Measurement & attribution', 'Something else']

function FieldGrid({ kind, states, render }) {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-16 border border-gray-200 p-6 md:grid-cols-3 lg:grid-cols-6">
      {states.map(([name, { preview, error, disabled }]) => (
        <div key={name} className="flex flex-col gap-3">
          <Token>{name}</Token>
          <Field id={`demo-${kind}-${name}`} label="Label" hint="Hint" error={error} disabled={disabled}>
            {render({ id: `demo-${kind}-${name}`, preview, disabled })}
          </Field>
        </div>
      ))}
    </div>
  )
}

function DemoInput({ id, preview, disabled }) {
  return <Input id={id} data-preview={preview} disabled={disabled} defaultValue="Value" />
}

function DemoSelect({ id, preview, disabled }) {
  return <SelectField id={id} preview={preview} disabled={disabled} options={demoOptions} defaultValue={demoOptions[0]} />
}

// Tab states: each sample is its own one-tab group, so it can be shown active or not.
const tabStates = [
  ['Default', {}],
  ['Hover', { 'data-preview': 'hover' }],
  ['Active', { active: true }],
  ['Focus', { 'data-preview': 'focus' }],
  ['Disabled', { disabled: true }],
]
const demoCurrencies = [
  { value: 'USD', code: 'USD $', name: 'US dollar', symbol: '$' },
  { value: 'EUR', code: 'EUR €', name: 'Euro', symbol: '€' },
  { value: 'GBP', code: 'GBP £', name: 'British pound', symbol: '£' },
  { value: 'CAD', code: 'CAD C$', name: 'Canadian dollar', symbol: 'C$' },
]
// Sample texts for the cards, as in Figma. On the landing page they come from site.json.
const demoPricing = {
  label: 'Label',
  title: 'Card title',
  description: 'Short description of the offer in one or two lines.',
  price: '€0,000',
  from: 'from',
  period: 'period',
  features: ['List item one', 'List item two', 'List item three', 'List item four', 'List item five', 'List item six', 'List item seven', 'List item eight'],
  cta: 'Button',
}
const demoIndustry = {
  heading: 'Your strategy starting point',
  rows: [
    { label: 'Business question', value: 'Which products and customers deserve the next euro?' },
    { label: 'Success measures', value: 'Contribution after media · New-customer CAC · MER' },
    { label: 'Initial workstream', value: 'Margin-led feeds, search demand and paid social creative tests' },
  ],
  note: 'Illustrative approach. Final scope follows discovery.',
}
const demoRoadmap = {
  heading: 'Your first six weeks, made visible.',
  steps: [
    { when: 'in 2 weeks', title: 'Diagnose', description: 'Agree business questions and audit the evidence.' },
    { when: 'in 4 weeks', title: 'Design', description: 'Define measurement and prioritise experiments.' },
    { when: 'in 6 weeks', title: 'Decide', description: 'Review the roadmap and agree the next investment.' },
  ],
}
const demoPlannerText = {
  currency: 'Currency',
  revenue: 'Net revenue',
  media: 'Media spend',
  mediaHint: 'All channels',
  margin: 'Contribution margin before media',
  change: 'Hypothetical revenue change',
  current: 'Current contribution after media',
  scenario: 'Scenario contribution after media',
  mer: 'Current → scenario MER',
}
const demoPlannerStart = { currency: 'EUR', revenue: 1200000, media: 300000, margin: 40, change: 10 }
const logo = (src) => <img src={src} alt="" width="12" height="12" />
const demoTabs = ['E-commerce', 'SaaS', 'Fintech', 'Healthcare']
const demoFaq = [
  ['How long does onboarding take?', 'Answer text goes here in one or two short sentences.'],
  ['Do you work with small budgets?', 'Answer text goes here in one or two short sentences.'],
  ['Which channels do you cover?', 'Answer text goes here in one or two short sentences.'],
]

// Header and Footer share one chosen currency, as they will on the landing page.
function HeaderFooterDemo() {
  const [currency, setCurrency] = useState(site.defaultCurrency)
  const text = { ...site.header, ...site.footer, logoAlt: site.brand.logoAlt }
  const [talkOpen, setTalkOpen] = useState(false)
  const shared = { text, currencies: site.currencies, currency, onCurrencyChange: setCurrency, onCta: () => setTalkOpen(true) }
  return (
    <div className="flex flex-col gap-6">
      <LetsTalk text={site.form} open={talkOpen} onOpenChange={setTalkOpen} />
      <div className="overflow-hidden rounded-16 border border-gray-200">
        <Header {...shared} className="static" />
      </div>
      <div className="overflow-hidden rounded-16 border border-gray-200">
        <Header {...shared} className="static" defaultOpen />
      </div>
      <div className="overflow-hidden rounded-16 border border-gray-200">
        <Footer {...shared} />
      </div>
    </div>
  )
}

// Opens the "Let's talk" window on the form or straight on the "Thanks" screen.
function LetsTalkDemo() {
  const [open, setOpen] = useState(null)
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" onClick={() => setOpen('form')}>
        Открыть форму
      </Button>
      <Button variant="secondary" onClick={() => setOpen('success')}>
        Открыть «спасибо»
      </Button>
      {open && <LetsTalk key={open} text={site.form} open initialStep={open} onOpenChange={(v) => !v && setOpen(null)} />}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-header-32 font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function Token({ children }) {
  return <code className="text-body-12 text-gray-500">{children}</code>
}

export default function Styleguide() {
  return (
    <main className="mx-auto flex w-full max-w-(--container-page) flex-col gap-16 overflow-hidden px-6 py-(--space-section)">
      <h1 className="text-display-64 font-semibold">Styleguide</h1>

      <Section title="Buttons">
        <p className="text-body-14 text-gray-600">
          Наведите мышь, нажмите или пройдите по кнопкам клавишей Tab — состояния работают по-настоящему.
          «Loading» в Figma нет, добавлено для формы.
        </p>
        <h3 className="text-header-20 font-bold">Button / primary</h3>
        <ButtonTable variant="primary" sizes={['s', 'm', 'l']} />
        <h3 className="text-header-20 font-bold">Button / secondary</h3>
        <ButtonTable variant="secondary" sizes={['s', 'm', 'l']} />
        <h3 className="text-header-20 font-bold">Button / tertiary</h3>
        <ButtonTable variant="tertiary" sizes={[undefined]} />
        <h3 className="text-header-20 font-bold">Button / white</h3>
        <ButtonTable variant="white" sizes={[undefined]} icon={<IconLocation />} />
      </Section>

      <Section title="Field · Select field">
        <h3 className="text-header-20 font-bold">Field</h3>
        <FieldGrid kind="field" states={fieldStates} render={DemoInput} />
        <h3 className="text-header-20 font-bold">Select field</h3>
        <FieldGrid kind="select" states={selectStates} render={DemoSelect} />
        <h3 className="text-header-20 font-bold">Попробовать</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field id="try-name" label="Name" hint="Optional">
            <Input id="try-name" placeholder="Your name" />
          </Field>
          <Field id="try-goal" label="What would you like to improve?">
            <SelectField id="try-goal" options={demoOptions} placeholder="Choose one" />
          </Field>
        </div>
      </Section>

      <Section title="Link · Divider · Section label">
        <h3 className="text-header-20 font-bold">Link</h3>
        <div className="flex flex-wrap gap-10 rounded-16 border border-gray-200 p-6">
          {[['Default', {}], ['Hover', { 'data-preview': 'hover' }], ['Focus', { 'data-preview': 'focus' }], ['No arrow', { arrow: false }]].map(
            ([name, props]) => (
              <div key={name} className="flex flex-col gap-3">
                <Token>{name}</Token>
                <Link href="#" {...props}>
                  Link
                </Link>
              </div>
            ),
          )}
        </div>
        <p className="text-body-14 text-gray-600">Hover и Focus у ссылки в Figma нет — добавлены: синий темнеет, стрелка чуть сдвигается.</p>
        <h3 className="text-header-20 font-bold">Divider</h3>
        <div className="flex flex-col gap-4 rounded-16 border border-gray-200 p-6">
          <p className="text-body-14">Text above</p>
          <Divider />
          <p className="text-body-14">Text below</p>
        </div>
        <h3 className="text-header-20 font-bold">Section label</h3>
        <div className="flex flex-col gap-2 rounded-16 border border-gray-200 p-6">
          <SectionLabel>Section label</SectionLabel>
          <p className="text-display-40 font-semibold">Section heading</p>
        </div>
      </Section>

      <Section title="Tabs · Accordion">
        <h3 className="text-header-20 font-bold">Tab</h3>
        <div className="flex flex-wrap gap-10 rounded-16 border border-gray-200 p-6">
          {tabStates.map(([name, { active, ...props }]) => (
            <div key={name} className="flex flex-col gap-3">
              <Token>{name}</Token>
              <Tabs value={active ? 'tab' : 'other'}>
                <TabsList>
                  <TabsTrigger value="tab" {...props}>
                    Tab
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          ))}
        </div>
        <h3 className="text-header-20 font-bold">Tabs · попробовать</h3>
        <div className="rounded-16 border border-gray-200 p-6">
          <Tabs defaultValue={demoTabs[0]}>
            <TabsList>
              {demoTabs.map((t) => (
                <TabsTrigger key={t} value={t}>
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            {demoTabs.map((t) => (
              <TabsContent key={t} value={t} className="text-body-14 text-gray-600">
                Content for {t}.
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <h3 className="text-header-20 font-bold">Accordion · попробовать</h3>
        <div className="rounded-16 border border-gray-200 px-6">
          <Accordion defaultValue={['faq-1']}>
            {demoFaq.map(([q, a], i) => (
              <AccordionItem key={q} value={`faq-${i}`} className="last:border-b-0">
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <p className="text-body-14 text-gray-600">Закрытые вопросы — Closed, открытые — Open. Можно открыть сразу несколько. Рамка фокуса у вопроса в Figma нет — добавлена для клавиатуры.</p>
      </Section>

      <Section title="Icon badge · Channel chip">
        <h3 className="text-header-20 font-bold">Icon badge</h3>
        <div className="flex flex-wrap gap-10 rounded-16 border border-gray-200 p-6">
          {['green', 'orange', 'pink', 'coral', 'brand'].map((color) => (
            <div key={color} className="flex flex-col items-start gap-3">
              <Token>{color === 'green' ? 'green (Figma)' : color}</Token>
              <IconBadge color={color}>
                <IconBars />
              </IconBadge>
            </div>
          ))}
        </div>
        <p className="text-body-14 text-gray-600">В Figma значок только зелёный. Другие цвета — из палитры, на случай если понадобятся.</p>
        <h3 className="text-header-20 font-bold">Channel chip</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[['on gray/0', 'bg-gray-0'], ['on beige/100', 'bg-beige-100'], ['on brand/50', 'bg-brand-50']].map(([name, bg]) => (
            <div key={name} className="flex flex-col gap-3">
              <Token>{name}</Token>
              <div className={`flex items-center justify-center rounded-16 border border-gray-200 p-10 ${bg}`}>
                <ChannelChip label="SEO">
                  <IconSeo />
                </ChannelChip>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Slider · Slider row">
        <h3 className="text-header-20 font-bold">Slider</h3>
        <div className="grid grid-cols-1 gap-8 rounded-16 border border-gray-200 p-6 md:grid-cols-2">
          {[['Default', {}], ['Disabled', { disabled: true }]].map(([name, props]) => (
            <div key={name} className="flex flex-col gap-3">
              <Token>{name}</Token>
              <Slider defaultValue={48} aria-label={`Slider ${name}`} {...props} />
            </div>
          ))}
        </div>
        <p className="text-body-14 text-gray-600">В Figma у ползунка одно состояние. Disabled добавлено.</p>
        <h3 className="text-header-20 font-bold">Slider row · попробовать</h3>
        <div className="grid grid-cols-1 gap-8 rounded-16 border border-gray-200 p-6 md:grid-cols-2">
          <SliderRow id="try-margin" label="Contribution margin before media" defaultValue={40} format={(v) => `${v}%`} />
          <SliderRow id="try-change" label="Hypothetical revenue change" defaultValue={10} min={-50} max={50} format={(v) => `${v}%`} />
        </div>
      </Section>

      <Section title="Currency select">
        <div className="flex flex-wrap gap-10 rounded-16 border border-gray-200 p-6">
          {['s', 'm'].map((size) =>
            [['Default', {}], ['Hover', { preview: 'hover' }], ['Open', { preview: 'open' }], ['Disabled', { disabled: true }]].map(([name, props]) => (
              <div key={size + name} className="flex flex-col items-start gap-3">
                <Token>{`Size=${size.toUpperCase()} · ${name}`}</Token>
                <CurrencySelect size={size} currencies={demoCurrencies} defaultValue="EUR" aria-label={`Currency ${size} ${name}`} {...props} />
              </div>
            )),
          )}
          <div className="flex flex-col items-start gap-3">
            <Token>Попробовать</Token>
            <div className="flex items-center gap-2">
              <span id="try-currency-label" className="text-body-12 text-gray-500">
                Currency
              </span>
              <CurrencySelect id="try-currency" currencies={demoCurrencies} defaultValue="EUR" aria-labelledby="try-currency-label" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Info table">
        <p className="text-body-14 text-gray-600">Figma «Info row»: на телефоне подпись над значением (Stacked), с планшета — в строку (Horizontal). Используется на Legal Notice.</p>
        <InfoTable
          className="max-w-(--container-document)"
          rows={[
            { label: 'Legal Company Name', value: 'ESEO LIMITED' },
            { label: 'Contact Email', value: 'info@eseoads.com' },
          ]}
        />
      </Section>

      <Section title="Cards">
        <h3 className="text-header-20 font-bold">Pricing card</h3>
        <div className="grid grid-cols-1 gap-6 rounded-16 bg-gray-100 p-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ['Default', {}],
            ['Hover', { preview: 'hover' }],
            ['Focus', { preview: 'focus' }],
            ['Selected · Default', { selected: true }],
            ['Selected · Hover', { selected: true, preview: 'hover' }],
            ['Selected · Focus', { selected: true, preview: 'focus' }],
          ].map(([name, props]) => (
            <div key={name} className="flex flex-col gap-3">
              <Token>{name}</Token>
              <PricingCard {...demoPricing} {...props} />
            </div>
          ))}
        </div>
        <h3 className="text-header-20 font-bold">Plan card · Plan row</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PlanCard>
            <PlanRow
              title="Growth plan"
              subtitle="4 channels"
              checked
              badges={[
                <IconBadge key="seo" color="white"><IconSeo12 /></IconBadge>,
                <IconBadge key="ads" color="white">{logo(logoGoogleAds)}</IconBadge>,
                <IconBadge key="meta" color="white">{logo(logoMeta)}</IconBadge>,
                <IconBadge key="tt" color="white">{logo(logoTiktok)}</IconBadge>,
              ]}
            />
            <PlanRow
              title="Measurement"
              subtitle="1 shared scorecard"
              badges={[
                <IconBadge key="r" color="green"><IconBars /></IconBadge>,
                <IconBadge key="t" color="orange"><IconTarget /></IconBadge>,
                <IconBadge key="p" color="pink"><IconPercent /></IconBadge>,
                <IconBadge key="c" color="gray-900"><IconCheck /></IconBadge>,
              ]}
            />
            <PlanRow
              title="Budget"
              subtitle="Reviewed quarterly"
              badges={[
                <IconBadge key="e" color="coral"><IconEuro /></IconBadge>,
                <IconBadge key="s" color="brand"><IconSwap /></IconBadge>,
                <IconBadge key="u" color="green"><IconArrowUp /></IconBadge>,
                <IconBadge key="q" color="gray-500"><IconCalendar /></IconBadge>,
              ]}
            />
          </PlanCard>
          <div className="flex flex-col gap-6">
            <StatCard label="Label" value="€0.00m" caption="Caption" />
            <CardCaption title="Title" description="Description" />
          </div>
        </div>
        <p className="text-body-14 text-gray-600">Сверху вниз справа: Stat card и Card caption.</p>
        <h3 className="text-header-20 font-bold">Industry card</h3>
        <IndustryCard {...demoIndustry} />
      </Section>

      <Section title="Roadmap">
        <div className="rounded-16 bg-gray-100 p-6">
          <Roadmap {...demoRoadmap} />
        </div>
        <p className="text-body-14 text-gray-600">На телефоне заголовок сверху, шаги столбиком.</p>
      </Section>

      <Section title="Planner · попробовать">
        <Planner text={demoPlannerText} currencies={demoCurrencies} initial={demoPlannerStart} />
        <p className="text-body-14 text-gray-600">
          Меняйте суммы, ползунки и валюту — результат пересчитывается сразу. Валюта меняет только знак, суммы не конвертируются.
        </p>
      </Section>

      <Section title="Header · Footer">
        <p className="text-body-14 text-gray-600">
          Широкий экран показывает версию для компьютера, узкий (телефон) — мобильную; вторая шапка — с открытым меню.
          Валюта в шапке и подвале общая: смените в одном месте — поменяется в другом.
        </p>
        <HeaderFooterDemo />
      </Section>

      <Section title="Let’s talk modal">
        <p className="text-body-14 text-gray-600">
          Форма пока не отправляется: кнопка проверяет имя и почту и показывает экран «спасибо». Кнопка «Let’s talk» в шапке выше тоже открывает форму.
        </p>
        <LetsTalkDemo />
      </Section>

      <Section title="Colors">
        {colorGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-label-14-medium font-medium text-gray-600">{group.title}</h3>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7">
              {group.items.map((name) => (
                <div key={name} className="flex flex-col gap-2">
                  <div
                    className="aspect-square w-full rounded-16 border border-gray-200"
                    style={{ background: `var(--color-${name})` }}
                  />
                  <Token>{name.replace('-', '/')}</Token>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Typography · Inter">
        <div className="flex flex-col divide-y divide-gray-200">
          {textStyles.map(([figma, cls, note, sample]) => (
            <div key={figma} className="flex flex-col gap-2 py-4 md:flex-row md:items-baseline md:gap-8">
              <div className="flex shrink-0 flex-col gap-1 md:w-1/4">
                <Token>{figma}</Token>
                <Token>{note}</Token>
              </div>
              <p className={`${cls} min-w-0 break-words`}>{sample || 'Design that drives growth'}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
          {radii.map(([figma, cls]) => (
            <div key={figma} className="flex flex-col gap-2">
              <div className={`aspect-square w-full bg-brand-50 ${cls}`} />
              <Token>{figma}</Token>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {shadows.map(([figma, cls]) => (
            <div key={figma} className="flex flex-col gap-3">
              <div className={`aspect-video w-full rounded-16 bg-gray-0 ${cls}`} />
              <Token>{figma}</Token>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
