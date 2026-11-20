// Styleguide (/styleguide): shows design tokens and every component in all its states.
// Lists below mirror tokens.css. When a token is added there, add it here too.

const colorGroups = [
  { title: 'Фон', items: ['bg', 'surface', 'surface-muted', 'surface-brand', 'surface-warm', 'surface-inverse'] },
  { title: 'Текст', items: ['text', 'text-secondary', 'text-muted', 'text-disabled', 'text-inverse', 'text-brand', 'text-brand-hover'] },
  { title: 'Бренд', items: ['brand', 'brand-hover', 'brand-press', 'brand-contrast', 'brand-soft', 'brand-softer'] },
  { title: 'Границы', items: ['border', 'border-strong', 'border-focus'] },
  { title: 'Статусы', items: ['success', 'warning', 'error'] },
  { title: 'Декор', items: ['warm', 'warm-strong', 'accent-green', 'accent-orange', 'accent-pink', 'accent-coral', 'accent-magenta'] },
]

const textStyles = [
  { token: 'display-xl', weight: 'font-semibold', note: '40 → 72' },
  { token: 'display-lg', weight: 'font-semibold', note: '36 → 64' },
  { token: 'display-md', weight: 'font-semibold', note: '32 → 48' },
  { token: 'display-sm', weight: 'font-semibold', note: '28 → 40' },
  { token: 'heading-lg', weight: 'font-semibold', note: '24 → 32' },
  { token: 'heading-md', weight: 'font-semibold', note: '20 → 24' },
  { token: 'heading-sm', weight: 'font-bold', note: '18 → 20' },
  { token: 'body-lg', weight: 'font-normal', note: '16' },
  { token: 'body-md', weight: 'font-normal', note: '14' },
  { token: 'body-sm', weight: 'font-normal', note: '12' },
  { token: 'label-lg', weight: 'font-medium', note: '16' },
  { token: 'label-md', weight: 'font-medium', note: '14' },
  { token: 'label-sm', weight: 'font-semibold', note: '12' },
  { token: 'caption', weight: 'font-bold lowercase', note: '12' },
  { token: 'caption-sm', weight: 'font-bold', note: '10' },
  { token: 'button-lg', weight: 'font-medium', note: '16' },
  { token: 'button-md', weight: 'font-medium', note: '15' },
  { token: 'button-sm', weight: 'font-medium', note: '13' },
]

// Tailwind needs full class names written out, so sizes are listed here.
const textClass = {
  'display-xl': 'text-display-xl', 'display-lg': 'text-display-lg', 'display-md': 'text-display-md',
  'display-sm': 'text-display-sm', 'heading-lg': 'text-heading-lg', 'heading-md': 'text-heading-md',
  'heading-sm': 'text-heading-sm', 'body-lg': 'text-body-lg', 'body-md': 'text-body-md',
  'body-sm': 'text-body-sm', 'label-lg': 'text-label-lg', 'label-md': 'text-label-md',
  'label-sm': 'text-label-sm', caption: 'text-caption', 'caption-sm': 'text-caption-sm',
  'button-lg': 'text-button-lg', 'button-md': 'text-button-md', 'button-sm': 'text-button-sm',
}

const radii = [
  { token: 'sm', cls: 'rounded-sm', note: '4' },
  { token: 'md', cls: 'rounded-md', note: '8' },
  { token: 'lg', cls: 'rounded-lg', note: '16' },
  { token: 'xl', cls: 'rounded-xl', note: '40' },
  { token: 'full', cls: 'rounded-full', note: '999' },
]

const shadows = [
  { token: 'card', cls: 'shadow-card' },
  { token: 'glass', cls: 'shadow-glass' },
  { token: 'device', cls: 'shadow-device' },
]

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-heading-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function Token({ children }) {
  return <code className="text-body-sm text-text-muted">{children}</code>
}

export default function Styleguide() {
  return (
    <main className="mx-auto flex w-full max-w-(--container-page) flex-col gap-16 px-6 py-(--space-section)">
      <h1 className="text-display-lg font-semibold">Styleguide</h1>

      <Section title="Цвета">
        {colorGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-label-md font-medium text-text-secondary">{group.title}</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
              {group.items.map((name) => (
                <div key={name} className="flex flex-col gap-2">
                  <div
                    className="aspect-square w-full rounded-lg border border-border"
                    style={{ background: `var(--color-${name})` }}
                  />
                  <Token>{name}</Token>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Типографика · Inter">
        <div className="flex flex-col divide-y divide-border">
          {textStyles.map(({ token, weight, note }) => (
            <div key={token} className="flex flex-col gap-2 py-4 md:flex-row md:items-baseline md:gap-8">
              <div className="flex shrink-0 flex-col gap-1 md:w-1/4">
                <Token>text-{token}</Token>
                <Token>{note}</Token>
              </div>
              <p className={`${textClass[token]} ${weight} min-w-0 break-words`}>Design that drives growth</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Скругления">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {radii.map(({ token, cls, note }) => (
            <div key={token} className="flex flex-col gap-2">
              <div className={`aspect-square w-full bg-surface-brand ${cls}`} />
              <Token>rounded-{token} · {note}</Token>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Тени">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {shadows.map(({ token, cls }) => (
            <div key={token} className="flex flex-col gap-3">
              <div className={`aspect-video w-full rounded-lg bg-bg ${cls}`} />
              <Token>shadow-{token}</Token>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
