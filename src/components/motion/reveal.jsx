// Reveal / RevealGroup / RevealItem: wrappers around page blocks.
// The scroll-in effect (blocks fading in and rising when they scroll into view) is switched OFF at the owner's
// request: blocks loaded unevenly on the live site. The wrappers now just render the block as it is, so nothing
// moves on scroll. Sections keep using these names, so the effect can be brought back here in one place.
// Props:
//   as:        which element to render ("div" by default; "section", "li"... also work)
//   delay:     kept for compatibility, ignored
//   className and any other normal attributes

function Static({ as: Tag = "div", delay, children, ...props }) {
  return <Tag {...props}>{children}</Tag>;
}

const Reveal = Static;
const RevealGroup = Static;
const RevealItem = Static;

export { Reveal, RevealGroup, RevealItem };
