import { getChannelViewCountRankings } from 'apis/insights/getChannelViewCountRankings'
import { ProgressBar } from '../_components/ProgressBar'
import { RankingRowShell } from '../_components/RankingRowShell'
import { createOgRankingImage } from '../_components/createOgRankingImage'
import {
  formatNumber,
  formatViewCount,
  getPreviousMonthLabel
} from '../_components/utils'

const HEADER_COLOR = '#e11d48'
const BAR_COLOR = '#e85454'

export async function GET() {
  const ranking = await getChannelViewCountRankings({
    period: 'monthly',
    limit: 40
  })

  const maxDiff = ranking.length > 0 ? ranking[0].diff : 1
  const maxViewCount = ranking.reduce(
    (max, item) => Math.max(max, item.viewCount),
    0
  )

  return createOgRankingImage({
    title: '月間YouTube再生数ランキングTOP40',
    dateLabel: getPreviousMonthLabel(),
    note: '※VCharts登録済みタレントが対象。毎朝09:00集計',
    headerColor: HEADER_COLOR,
    width: 2070,
    height: 1670,
    items: ranking,
    headerRight: (
      <>
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
          月間再生数
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
      </>
    ),
    renderRow: (item, i) => {
      const diffRatio = maxDiff > 0 ? item.diff / maxDiff : 0
      const viewCountRatio =
        maxViewCount > 0 ? item.viewCount / maxViewCount : 0

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
            <ProgressBar ratio={diffRatio} color={BAR_COLOR} width={170} />
          </div>

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
        </RankingRowShell>
      )
    }
  })
}
