// SubscribePill: green "Subscribe" button picture for the Subscriptions & apps card. Figma Principles → "Subscribe button".
// Props: label (site.json).
export default function SubscribePill({ label }) {
  return (
    <div aria-hidden="true" className="flex h-full items-center justify-center">
      <span className="rounded-full border border-green-500 p-1">
        <span className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-body-16 font-semibold text-gray-25">{label}</span>
      </span>
    </div>
  )
}
