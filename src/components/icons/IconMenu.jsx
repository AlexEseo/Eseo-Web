// IconMenu: Figma icon "menu" from the 24 set (three lines). Colour follows the text colour.
// Props: className, plus any SVG attribute.
export default function IconMenu(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
