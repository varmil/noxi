function getBackgroundColor(tier: number): string {
  if (tier >= 7) return 'bg-[#e62117]'
  if (tier === 6) return 'bg-[#d13f64]'
  if (tier === 5) return 'bg-[#e18424]'
  if (tier === 4) return 'bg-[#f4cc42]'
  if (tier === 3) return 'bg-[#78e4b8]'
  if (tier === 2) return 'bg-[#75e1fd]'
  return 'bg-[#1564bf]'
}

/** @deprecated DBに色コードを直接保存して使う */
export default function SuperTierIcon({
  tier,
  className
}: {
  tier: number
  className?: string
}) {
  return (
    <div
      className={`w-2 h-2 ${getBackgroundColor(tier)} rounded-full ${
        className ?? ''
      }`}
    ></div>
  )
}
