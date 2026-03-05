import { getChannelGrowthRankings } from 'apis/insights/getChannelGrowthRankings'
import { ProgressBar } from '../_components/ProgressBar'
import { RankingRowShell } from '../_components/RankingRowShell'
import { createOgRankingImage } from '../_components/createOgRankingImage'
import {
  formatNumber,
  formatRate,
  getPreviousMonthLabel
} from '../_components/utils'

const HEADER_COLOR = '#0891b2'
const BAR_COLOR = '#06b6d4'

export async function GET() {
  const ranking = await getChannelGrowthRankings({
    period: 'monthly',
    orderBy: 'rate',
    limit: 40,
    minSubscriberCount: 3000
  })

  const maxRate = ranking.length > 0 ? ranking[0].rate : 1
  const maxSubscriberCount = ranking.reduce(
    (max, item) => Math.max(max, item.subscriberCount),
    0
  )

  return createOgRankingImage({
    title: 'チャンネル登録者推移 - 成長率ランキングTOP40',
    dateLabel: getPreviousMonthLabel(),
    note: '※月初時点で登録者数3,000人以上のチャンネルを対象。毎朝09:00集計',
    headerColor: HEADER_COLOR,
    width: 2330,
    height: 1670,
    items: ranking,
    headerRight: (
      <>
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
          月間成長率
        </div>
        <div
          style={{
            display: 'flex',
            width: 180,
            justifyContent: 'flex-end',
            flexShrink: 0
          }}
        >
          月初登録者数
        </div>
        <div
          style={{
            display: 'flex',
            width: 180,
            justifyContent: 'flex-end',
            flexShrink: 0
          }}
        >
          月末登録者数
        </div>
      </>
    ),
    renderRow: (item, i) => {
      const rateRatio = maxRate > 0 ? item.rate / maxRate : 0
      const prevRatio =
        maxSubscriberCount > 0
          ? item.previousSubscriberCount / maxSubscriberCount
          : 0
      const currRatio =
        maxSubscriberCount > 0
          ? item.subscriberCount / maxSubscriberCount
          : 0

      return (
        <RankingRowShell
          key={i}
          rank={item.rank}
          thumbnailUrl={item.thumbnailUrl}
          channelTitle={item.channelTitle}
          groupName={item.groupName}
          isEven={i % 2 === 0}
        >
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
            <ProgressBar ratio={rateRatio} color={BAR_COLOR} width={160} />
          </div>

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
        </RankingRowShell>
      )
    }
  })
}
