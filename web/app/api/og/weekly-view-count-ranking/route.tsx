import { ImageResponse } from 'next/og'
import { getChannelViewCountRankings } from 'apis/insights/getChannelViewCountRankings'
import { ChannelViewCountRankingSchema } from 'apis/insights/schema/channelViewCountRankingSchema'
import { getWebUrl } from 'utils/web-url'

const font = fetch(new URL('fonts/NotoSansJP-Bold.otf', getWebUrl())).then(
  res => res.arrayBuffer()
)

const WIDTH = 2070
const HEIGHT = 1670
const ROWS_PER_COLUMN = 20

const DIFF_BAR_COLOR = '#e85454'

function formatNumber(n: number): string {
  return n.toLocaleString('ja-JP')
}

function formatViewCount(n: number): string {
  if (n >= 100_000_000) {
    return `${(n / 100_000_000).toFixed(1)}億`
  }
  if (n >= 10_000) {
    return `${Math.round(n / 10_000).toLocaleString('ja-JP')}万`
  }
  return n.toLocaleString('ja-JP')
}

function getDateRangeLabel(): string {
  const now = new Date()
  const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  const year = jstNow.getUTCFullYear()
  const month = jstNow.getUTCMonth()
  const day = jstNow.getUTCDate()

  const lt = new Date(Date.UTC(year, month, day, -9))
  const gte = new Date(Date.UTC(year, month, day - 7, -9))

  const startJst = new Date(gte.getTime() + 9 * 60 * 60 * 1000)
  const endJst = new Date(lt.getTime() + (9 - 24) * 60 * 60 * 1000)

  const startStr = `${startJst.getUTCMonth() + 1}/${startJst.getUTCDate()}`
  const endStr = `${endJst.getUTCMonth() + 1}/${endJst.getUTCDate()}`

  return `${startStr}〜${endStr}`
}

function truncateTitle(title: string, maxLength: number = 16): string {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '…'
  }
  return title
}

function ProgressBar({
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

function RankingRow({
  item,
  isEven,
  maxDiff,
  maxViewCount
}: {
  item: ChannelViewCountRankingSchema
  isEven: boolean
  maxDiff: number
  maxViewCount: number
}) {
  const diffRatio = maxDiff > 0 ? item.diff / maxDiff : 0
  const viewCountRatio = maxViewCount > 0 ? item.viewCount / maxViewCount : 0

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        background: isEven ? '#f5f5f5' : 'white',
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
          color: item.rank <= 3 ? 'white' : '#333',
          background:
            item.rank === 1
              ? '#b8860b'
              : item.rank === 2
                ? '#8a8a8a'
                : item.rank === 3
                  ? '#b45309'
                  : 'transparent'
        }}
      >
        {item.rank}
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
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
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
            display: 'flex'
          }}
        >
          {truncateTitle(item.channelTitle)}
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#999',
            lineHeight: 1.2,
            display: 'flex'
          }}
        >
          {truncateTitle(item.groupName, 18)}
        </div>
      </div>

      {/* 週間再生数（メイン指標） */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: 220,
          flexShrink: 0,
          gap: 3
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            display: 'flex',
            height: 28,
            alignItems: 'flex-end'
          }}
        >
          +{formatNumber(item.diff)}回
        </div>
        <ProgressBar ratio={diffRatio} color={DIFF_BAR_COLOR} width={170} />
      </div>

      {/* 総再生数 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: 200,
          flexShrink: 0,
          gap: 3
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: '#555',
            display: 'flex',
            height: 28,
            alignItems: 'flex-end'
          }}
        >
          {formatViewCount(item.viewCount)}回
        </div>
        <ProgressBar
          ratio={viewCountRatio}
          color="#c8c8c8"
          width={150}
          showTrack={false}
        />
      </div>
    </div>
  )
}

function ColumnHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        background: '#e11d48',
        color: 'white',
        height: 40,
        fontSize: 15,
        gap: 8
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 44,
          justifyContent: 'flex-end',
          flexShrink: 0
        }}
      >
        順位
      </div>
      <div style={{ display: 'flex', width: 54, flexShrink: 0 }} />
      <div style={{ display: 'flex', flex: 1 }}>名前・グループ</div>
      <div
        style={{
          display: 'flex',
          width: 220,
          justifyContent: 'flex-end',
          flexShrink: 0,
          fontWeight: 'bold',
          fontSize: 16
        }}
      >
        週間再生数
      </div>
      <div
        style={{
          display: 'flex',
          width: 200,
          justifyContent: 'flex-end',
          flexShrink: 0
        }}
      >
        総再生数
      </div>
    </div>
  )
}

export async function GET() {
  const ranking = await getChannelViewCountRankings({
    period: 'weekly',
    limit: 40
  })

  const dateRange = getDateRangeLabel()

  const maxDiff = ranking.length > 0 ? ranking[0].diff : 1
  const maxViewCount = ranking.reduce(
    (max, item) => Math.max(max, item.viewCount),
    0
  )

  const leftColumn = ranking.slice(0, ROWS_PER_COLUMN)
  const rightColumn = ranking.slice(ROWS_PER_COLUMN, ROWS_PER_COLUMN * 2)

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#f0f0f0',
        fontFamily: 'NotoSansJP'
      }}
    >
      {/* ヘッダー */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '16px 24px',
          gap: 32
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 'bold',
            color: '#1a202c',
            display: 'flex'
          }}
        >
          週間YouTube再生数ランキングTOP40
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#666',
            display: 'flex'
          }}
        >
          {dateRange}
        </div>
      </div>

      {/* テーブル（2カラム） */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          padding: '0 20px',
          gap: 16
        }}
      >
        {/* 左カラム（1-20位） */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}
        >
          <ColumnHeader />
          {leftColumn.map((item, i) => (
            <RankingRow
              key={i}
              item={item}
              isEven={i % 2 === 0}
              maxDiff={maxDiff}
              maxViewCount={maxViewCount}
            />
          ))}
        </div>

        {/* 右カラム（21-40位） */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}
        >
          <ColumnHeader />
          {rightColumn.map((item, i) => (
            <RankingRow
              key={i}
              item={item}
              isEven={i % 2 === 0}
              maxDiff={maxDiff}
              maxViewCount={maxViewCount}
            />
          ))}
        </div>
      </div>

      {/* 注釈 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '8px 24px 14px',
          fontSize: 20,
          color: '#888'
        }}
      >
        ※VCharts登録済みタレントが対象。毎朝09:00集計
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'NotoSansJP',
          data: await font,
          style: 'normal'
        }
      ]
    }
  )
}
