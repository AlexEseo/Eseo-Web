// IconArrowUp: Figma icon "arrow-up" from the 12 set (arrow up). Colour follows the text colour.
// Props: className, plus any SVG attribute.
export default function IconArrowUp(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path d="M6 9.5V2.5M9 5.5L6 2.5L3 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
