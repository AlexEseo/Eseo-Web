// DocumentPage: a text page — Privacy Policy and Legal Notice. Figma pages "Privacy Policy" and "Legal Notice".
// One centred column (720 on desktop): small label, big title, optional intro, "Last updated", then numbered sections.
// A section has a title and blocks: a paragraph { text }, a paragraph with a bold start { lead, text }, or a table { table }.
// Emails in the texts become links. All texts come from site.json (privacy, legal).
// Props: text — site.privacy or site.legal.
import { useEffect } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { InfoTable } from '@/components/ui/info-table'
import { SectionLabel } from '@/components/ui/section-label'
import { linkEmails } from '@/lib/link-emails'

function Block({ block }) {
  if (block.table) return <InfoTable rows={block.table} />
  return (
    <p>
      {block.lead && <span className="font-semibold text-gray-900">{block.lead} </span>}
      {linkEmails(block.text)}
    </p>
  )
}

export default function DocumentPage({ text }) {
  useEffect(() => {
    document.title = text.metaTitle
  }, [text.metaTitle])

  return (
    <PageShell>
      {() => (
        <article className="px-5 pt-10 pb-16 md:px-10 md:pt-24 md:pb-30 lg:px-20">
          <div className="mx-auto flex max-w-(--container-document) flex-col gap-8 md:gap-12">
            <header className="flex flex-col gap-5">
              <SectionLabel>{text.label}</SectionLabel>
              <h1 className="text-display-48 font-semibold text-gray-900">{text.title}</h1>
              {text.intro && <p className="text-body-14 text-gray-600 md:text-body-16">{text.intro}</p>}
              <p className="text-body-14 text-gray-500">{text.updated}</p>
            </header>
            {text.sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-3">
                <h2 className="text-header-24 font-semibold text-gray-900">{section.title}</h2>
                <div className="flex flex-col gap-3 text-body-14 text-gray-600 md:text-body-16">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      )}
    </PageShell>
  )
}
