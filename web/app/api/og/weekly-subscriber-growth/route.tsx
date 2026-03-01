import { ImageResponse } from 'next/og'
import { getChannelGrowthRankings } from 'apis/insights/getChannelGrowthRankings'
import { ChannelGrowthRankingSchema } from 'apis/insights/schema/channelGrowthRankingSchema'
import { getWebUrl } from 'utils/web-url'

const font = fetch(new URL('fonts/NotoSansJP-Bold.otf', getWebUrl())).then(
  res => res.arrayBuffer()
)

const WIDTH = 2330
const HEIGHT = 1670
const ROWS_PER_COLUMN = 20

const RATE_BAR_COLOR = '#e85454'

function formatNumber(n: number): string {
  return n.toLocaleString('ja-JP')
}

function formatRate(rate: number): string {
  return `${rate.toFixed(2)}%`
}

function getDateRangeLabel(): string {
  const now = new Date()
  const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  const year = jstNow.getUTCFullYear()
  const month = jstNow.getUTCMonth()
  const day = jstNow.getUTCDate()

  const lt = new Date(Date.UTC(year, month, day, -9))
  const gte = new Date(Date.UTC(year, month, day - 7, -9))

  // 表示用: gte が開始日、lt は排他なので -1日 が終了日
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
  maxRate,
  maxSubscriberCount
}: {
  item: ChannelGrowthRankingSchema
  isEven: boolean
  maxRate: number
  maxSubscriberCount: number
}) {
  const rateRatio = maxRate > 0 ? item.rate / maxRate : 0
  const prevRatio =
    maxSubscriberCount > 0
      ? item.previousSubscriberCount / maxSubscriberCount
      : 0
  const currRatio =
    maxSubscriberCount > 0 ? item.subscriberCount / maxSubscriberCount : 0

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
          fontSize: 26,
          fontWeight: 'bold',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#333'
        }}
      >
        {item.rank}
      </div>

      {/* サムネイル */}
      <div
        style={{
          display: 'flex',
          width: 58,
          height: 58,
          borderRadius: 4,
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt=""
            style={{ width: 58, height: 58, objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: 58,
              height: 58,
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
            fontSize: 22,
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

      {/* 週間伸び率（メイン指標：大きく太く赤で強調） */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: 210,
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
          {formatRate(item.rate)}
        </div>
        <ProgressBar ratio={rateRatio} color={RATE_BAR_COLOR} width={160} />
      </div>

      {/* 週初登録者数 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: 180,
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
          {formatNumber(item.previousSubscriberCount)}
        </div>
        <ProgressBar
          ratio={prevRatio}
          color="#c8c8c8"
          width={130}
          showTrack={false}
        />
      </div>

      {/* 現在登録者数 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: 180,
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
          {formatNumber(item.subscriberCount)}
        </div>
        <ProgressBar
          ratio={currRatio}
          color="#c8c8c8"
          width={130}
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
        background: '#1a202c',
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
          width: 210,
          justifyContent: 'flex-end',
          flexShrink: 0,
          fontWeight: 'bold',
          fontSize: 16
        }}
      >
        週間伸び率
      </div>
      <div
        style={{
          display: 'flex',
          width: 180,
          justifyContent: 'flex-end',
          flexShrink: 0
        }}
      >
        週初登録者数
      </div>
      <div
        style={{
          display: 'flex',
          width: 180,
          justifyContent: 'flex-end',
          flexShrink: 0
        }}
      >
        現在登録者数
      </div>
    </div>
  )
}

export async function GET() {
  const ranking = await getChannelGrowthRankings({
    period: 'weekly',
    orderBy: 'rate',
    limit: 40,
    minSubscriberCount: 3000
  })

  const dateRange = getDateRangeLabel()

  // 相対プログレスバー用の最大値を算出
  const maxRate = ranking.length > 0 ? ranking[0].rate : 1
  const maxSubscriberCount = ranking.reduce(
    (max, item) => Math.max(max, item.subscriberCount),
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
          padding: '15px 24px 15px',
          gap: 32
        }}
      >
        <div
          style={{
            fontSize: 46,
            fontWeight: 'bold',
            color: '#1a202c',
            display: 'flex'
          }}
        >
          週間YouTube登録者伸び率ランキングTOP40
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
              maxRate={maxRate}
              maxSubscriberCount={maxSubscriberCount}
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
              maxRate={maxRate}
              maxSubscriberCount={maxSubscriberCount}
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
        ※週初時点で登録者数3,000人以上のチャンネルを対象
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
