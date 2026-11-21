// IconClose: Figma icon "close" from the 24 set (cross). Colour follows the text colour.
// Props: className, plus any SVG attribute.
export default function IconClose(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
