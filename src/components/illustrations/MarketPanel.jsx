// MarketPanel: "market switcher" picture for the Multi-location card. Figma Principles → "Market panel".
// APPROXIMATE: built from the Figma layer structure; value block to be checked against Figma.
// Props: label (site.json).
export default function MarketPanel({ label }) {
  return (
    <div aria-hidden="true" className="flex h-full items-center">
      <div className="flex w-full items-center gap-4 rounded-24 border border-gray-200 bg-gray-50 py-4 pr-4 pl-10">
        <span className="text-header-20 font-bold text-gray-300">{label}</span>
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="w-3/4 rounded-full bg-gray-300 py-1.5" />
          <span className="w-1/2 rounded-full bg-gray-200 py-1" />
        </span>
        <span className="flex flex-col items-center gap-1.5 rounded-full border border-gray-200 bg-gray-0 px-1.5 py-2">
          <span className="size-2 rounded-full bg-brand-600" />
          <span className="size-2 rounded-full bg-gray-300" />
          <span className="size-2 rounded-full bg-gray-300" />
        </span>
      </div>
    </div>
  )
}
