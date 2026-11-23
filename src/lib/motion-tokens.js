// Animation values for Motion, read from tokens.css so durations and easings are changed in one place.
// Motion needs seconds and numbers, so CSS values like "600ms" and "cubic-bezier(...)" are converted here.
const css = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const seconds = (v) =>
  v.endsWith("ms") ? parseFloat(v) / 1000 : parseFloat(v);
const bezier = (v) => (v.match(/-?[\d.]+/g) ?? [0, 0, 1, 1]).map(Number);
const rem = (v) =>
  parseFloat(v) *
  parseFloat(getComputedStyle(document.documentElement).fontSize);

let cache;
export function motionTokens() {
  if (!cache) {
    cache = {
      fast: seconds(css("--duration-fast")),
      base: seconds(css("--duration-base")),
      slow: seconds(css("--duration-slow")),
      reveal: seconds(css("--duration-reveal")),
      easeOut: bezier(css("--ease-out")),
      easeStandard: bezier(css("--ease-standard")),
      revealDistance: rem(css("--motion-reveal-distance")),
      stagger: seconds(css("--motion-stagger")),
    };
  }
  return cache;
}
