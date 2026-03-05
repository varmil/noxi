import { truncateTitle } from './utils'

export function RankingRowShell({
  rank,
  thumbnailUrl,
  channelTitle,
  groupName,
  isEven,
  zebraColor = '#f5f5f5',
  children
}: {
  rank: number
  thumbnailUrl?: string | null
  channelTitle: string
  groupName: string
  isEven: boolean
  zebraColor?: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        background: isEven ? zebraColor : 'white',
        height: 74,
        gap: 8
      }}
    >
      {/* 順位 */}
      <div
        style={{
          display: 'flex',
          width: 44,
          height: 44,
          fontSize: 26,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          borderRadius: 8,
          color: rank <= 3 ? 'white' : '#333',
          background:
            rank === 1
              ? '#b8860b'
              : rank === 2
                ? '#8a8a8a'
                : rank === 3
                  ? '#b45309'
                  : 'transparent'
        }}
      >
        {rank}
      </div>

      {/* サムネイル */}
      <div
        style={{
          display: 'flex',
          width: 68,
          height: 68,
          borderRadius: 4,
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=""
            style={{ width: 68, height: 68, objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: 68,
              height: 68,
              background: '#ddd',
              display: 'flex'
            }}
          />
        )}
      </div>

      {/* チャンネル名 / グループ名 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          gap: 2
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: '#222',
            lineHeight: 1.2,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex'
          }}
        >
          {truncateTitle(channelTitle)}
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#999',
            lineHeight: 1.2,
            display: 'flex'
          }}
        >
          {truncateTitle(groupName, 18)}
        </div>
      </div>

      {children}
    </div>
  )
}
