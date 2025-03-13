export default function LiveBadge({ className }: { className?: string }) {
  return (
    <div
      className={`bg-red-600 text-white text-xs sm:text-sm font-bold px-1 py-0.5 rounded flex items-center gap-1 ${
        className ?? ''
      }`}
    >
      <LiveCircleIcon className="w-2 h-2" />
      LIVE
    </div>
  )
}

function LiveCircleIcon({ className }: { className: string }) {
  return (
    <div
      className={`w-2 h-2 bg-white rounded-full animate-pulse ${className}`}
    ></div>
  )
}
