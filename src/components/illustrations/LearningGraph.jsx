// LearningGraph: coloured circles with symbols for the Education card. Figma Principles → Education "Illustration".
// APPROXIMATE: circle sizes, colours and symbols are from Figma; the connecting "rungs" are not drawn yet.
// Circles are placed in percent of the Figma box (310 × 402), so the picture scales with the card.
const nodes = [
  // [left, top, size, colour, symbol] in Figma pixels
  [-33, 189, 24, 'bg-green-500', ''],
  [167, 189, 24, 'bg-pink-500', ''],
  [26, 136, 40, 'bg-pink-500', ''],
  [292, 226, 40, 'bg-green-500', ''],
  [60, 250, 68, 'bg-orange-500', '√'],
  [200, 90, 68, 'bg-coral-500', '{}'],
  [100, 20, 80, 'bg-coral-500', '{}'],
  [190, 300, 80, 'bg-gray-900', '∑'],
  [-10, 320, 80, 'bg-pink-500', 'B'],
]

const pct = (v, total) => `${(v / total) * 100}%`

export default function LearningGraph() {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden">
      {nodes.map(([x, y, size, colour, symbol], i) => (
        <span
          key={i}
          className={`absolute flex items-center justify-center rounded-full border-2 border-gray-0 font-semibold text-gray-25 ${colour} ${size >= 80 ? 'text-header-24' : 'text-body-16'}`}
          style={{ left: pct(x, 310), top: pct(y, 402), width: pct(size, 310), aspectRatio: '1' }}
        >
          {symbol}
        </span>
      ))}
      <span className="absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-gray-0 to-transparent" />
      <span className="absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-gray-0 to-transparent" />
    </div>
  )
}
