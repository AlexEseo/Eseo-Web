// IconCheckCircle: Figma icon "check-circle" from the 24 set (filled circle with a white check; circle follows the text colour).
// Props: className, plus any SVG attribute.
export default function IconCheckCircle(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="12" fill="currentColor" />
      <path d="M8.5 12.5L11 15L15.5 9.5" stroke="var(--color-gray-0)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
