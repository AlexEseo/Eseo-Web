// Styleguide (/styleguide): shows design tokens and every component in all its states.
const colors = ['bg', 'surface', 'text', 'text-muted', 'brand', 'brand-contrast', 'border']

export default function Styleguide() {
  return (
    <main className="mx-auto flex w-full max-w-(--container-page) flex-col gap-12 px-6 py-(--space-section)">
      <h1 className="text-(length:--text-h1) font-bold">Styleguide</h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Цвета</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {colors.map((name) => (
            <div key={name} className="flex flex-col gap-2">
              <div
                className="aspect-square w-full rounded-(--radius-md) border border-(--color-border)"
                style={{ background: `var(--color-${name})` }}
              />
              <code className="text-sm text-(--color-text-muted)">--color-{name}</code>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
