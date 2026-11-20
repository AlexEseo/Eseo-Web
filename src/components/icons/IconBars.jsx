// IconBars: Figma icon "bars" from the 12 set (used in Icon badge). Colour follows the text colour.
// Props: className, plus any SVG attribute.
export default function IconBars(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" {...props}>
      <path d="M2.5 9.5V6.5M6 9.5V2.5M9.5 9.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
