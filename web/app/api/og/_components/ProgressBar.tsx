export function ProgressBar({
  ratio,
  color,
  width,
  showTrack = true
}: {
  ratio: number
  color: string
  width: number
  showTrack?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        width,
        height: 24,
        background: showTrack ? '#e8e8e8' : 'transparent',
        borderRadius: 4
      }}
    >
      <div
        style={{
          display: 'flex',
          width: Math.max(Math.round(width * ratio), 2),
          height: 24,
          background: color,
          borderRadius: 4
        }}
      />
    </div>
  )
}
