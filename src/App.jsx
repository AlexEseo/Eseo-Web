// Landing page: assembles sections in order. Sections will be added after approval on /styleguide.
import site from './content/site.json'

export default function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-(--container-page) flex-col justify-center gap-4 px-6 py-(--space-section)">
      <h1 className="text-display-xl font-semibold">{site.hero.title}</h1>
      <p className="text-body-lg text-text-secondary">{site.hero.subtitle}</p>
    </main>
  )
}
