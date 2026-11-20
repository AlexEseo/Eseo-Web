// Styleguide (/styleguide): shows design tokens and every component in all its states.
// Names match Figma one to one. When a token is added to tokens.css, add it here too.
// data-preview="hover" | "active" | "focus" shows a state without the mouse (see globals.css).
import { Button } from '@/components/ui/button'
import IconLocation from '@/components/icons/IconLocation'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select-field'

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
  ['typo/display/220 - semibold', 'text-display-220 font-semibold', '96 → 220', 'Ag'],
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
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
