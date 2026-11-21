// ShopPanel: small dark "store dashboard" picture for the E-commerce card. Figma Principles → "App panel".
// APPROXIMATE: built from the Figma layer structure; row contents to be checked against Figma.
// Props: rows — list of row names (site.json).
export default function ShopPanel({ rows = [] }) {
  return (
    <div aria-hidden="true" className="flex h-full flex-col gap-0.5 rounded-24 bg-gray-950 p-1">
      {rows.map((name, i) => (
        <div
          key={name}
          className={`flex flex-1 items-center gap-3 bg-gray-900 p-3 ${i === 0 ? 'rounded-t-20 rounded-b-4' : 'rounded-4'} ${i === rows.length - 1 ? 'rounded-b-20' : ''}`}
        >
          <span className="size-8 shrink-0 rounded-8 bg-gray-800" />
          <span className="flex-1 text-body-14 font-semibold text-gray-25">{name}</span>
          <span className="w-1/4 rounded-full bg-brand-600 py-1" />
        </div>
      ))}
    </div>
  )
}
