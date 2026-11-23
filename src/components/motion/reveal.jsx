// Reveal: a block softly fades in and rises a little when it scrolls into view (once).
// RevealGroup + RevealItem: the same, but the items inside appear one after another (cards, steps, rows).
// For people who ask their system for less motion, nothing moves: blocks are simply shown.
// Durations, easing, distance and the pause between items come from tokens.css (see motion-tokens.js).
// Props:
//   as:        which element to render ("div" by default; "section", "li"... also work)
//   delay:     extra wait in seconds before it starts (optional)
//   className and any other normal attributes
import { m, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

// A block starts appearing as soon as its top edge comes a little into the screen (8% above the bottom edge),
// so tall blocks don't sit empty first and then pop in.
const viewport = { once: true, amount: 0, margin: "0% 0% -8% 0%" };

function hidden() {
  return { opacity: 0, y: motionTokens().revealDistance };
}
function shown(delay = 0) {
  const t = motionTokens();
  return {
    opacity: 1,
    y: 0,
    transition: { duration: t.reveal, ease: t.easeOut, delay },
  };
}

function Reveal({ as = "div", delay = 0, children, ...props }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag {...props}>{children}</Tag>;
  }
  const Tag = m[as];
  return (
    <Tag
      initial={hidden()}
      whileInView={shown(delay)}
      viewport={viewport}
      {...props}
    >
      {children}
    </Tag>
  );
}

function RevealGroup({ as = "div", delay = 0, children, ...props }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag {...props}>{children}</Tag>;
  }
  const Tag = m[as];
  const variants = {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: motionTokens().stagger,
        delayChildren: delay,
      },
    },
  };
  return (
    <Tag
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={variants}
      {...props}
    >
      {children}
    </Tag>
  );
}

function RevealItem({ as = "div", children, ...props }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag {...props}>{children}</Tag>;
  }
  const Tag = m[as];
  return (
    <Tag variants={{ hidden: hidden(), shown: shown() }} {...props}>
      {children}
    </Tag>
  );
}

export { Reveal, RevealGroup, RevealItem };
