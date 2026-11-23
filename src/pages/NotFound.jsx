// NotFound: the 404 page. Figma page "404" (Error (404), desktop and mobile).
// Grey page with a huge pale "404" behind the message (blue fading to transparent, top to bottom),
// a label, title, short text, two buttons (home / open the "Let's talk" form) and the email. No footer, as in Figma.
// Texts: site.json → notFound.
import { useEffect } from 'react'
import site from '@/content/site.json'
import { PageShell } from '@/components/layout/page-shell'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/ui/section-label'
import { linkEmails } from '@/lib/link-emails'

export default function NotFound() {
  const text = site.notFound
  useEffect(() => {
    document.title = text.metaTitle
  }, [text.metaTitle])

  return (
    <PageShell footer={false}>
      {({ openTalk }) => (
        <section className="relative isolate flex min-h-not-found items-center justify-center overflow-hidden bg-gray-100 px-5 py-16 md:px-20">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 bg-linear-to-b from-brand-100 to-transparent bg-clip-text text-center text-display-220 font-semibold text-transparent select-none md:text-display-520"
          >
            {text.code}
          </p>
          <div className="flex w-full max-w-(--container-not-found) flex-col items-center gap-4 text-center md:gap-5">
            <SectionLabel>{text.label}</SectionLabel>
            <h1 className="text-display-40 font-semibold text-gray-900 md:text-display-64 md:whitespace-pre-line">{text.title}</h1>
            <p className="max-w-(--container-hero-sub) text-body-14 text-gray-600 md:text-body-16">{text.body}</p>
            <div className="mt-3 flex w-full flex-col items-center gap-3 md:w-auto md:flex-row">
              <Button asChild variant="primary" size="l" className="h-button-white w-full md:h-button-l md:w-auto">
                <a href="/">{text.home}</a>
              </Button>
              <Button variant="white" className="w-full md:w-auto" onClick={openTalk}>
                {text.contact}
              </Button>
            </div>
            <p className="text-body-12 text-gray-500">
              {text.writePrefix} {linkEmails(site.footer.email)}
            </p>
          </div>
        </section>
      )}
    </PageShell>
  )
}
