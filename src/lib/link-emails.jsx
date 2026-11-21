// linkEmails: turns every email address inside a text into a clickable mailto link.
// The link keeps the text colour and gets an underline on hover, so the page looks as in Figma.
const emailPattern = /([\w.+-]+@[\w-]+\.[\w.-]*\w)/g

export function linkEmails(text) {
  return String(text)
    .split(emailPattern)
    .map((part, i) =>
      i % 2 === 1 ? (
        <a key={i} href={`mailto:${part}`} className="underline-offset-2 hover:text-gray-900 hover:underline">
          {part}
        </a>
      ) : (
        part
      ),
    )
}
