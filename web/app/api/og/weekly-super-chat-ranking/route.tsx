import { getChannelSupersRankings } from 'apis/insights/getChannelSupersRankings'
import { ProgressBar } from '../_components/ProgressBar'
import { RankingRowShell } from '../_components/RankingRowShell'
import { createOgRankingImage } from '../_components/createOgRankingImage'
import {
  formatSuperChatAmount,
  getWeeklyDateRangeLabel
} from '../_components/utils'

const HEADER_COLOR = '#d97706'
const BAR_COLOR = '#f59e0b'
const ZEBRA_COLOR = '#fffbeb'

export async function GET() {
  const ranking = await getChannelSupersRankings({
    period: 'weekly',
    limit: 40
  })

  const maxCurrentAmount = ranking.length > 0 ? ranking[0].currentAmount : 1
  const maxPreviousAmount = ranking.reduce(
    (max, item) => Math.max(max, item.previousAmount),
    0
  )

  return createOgRankingImage({
    title: '【週間】スパチャランキングTOP40',
    dateLabel: getWeeklyDateRangeLabel(),
    note: '※VCharts登録済みタレントが対象。プレミア公開・待機所分は含まれません。',
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
          週間スパチャ金額
        </div>
        <div
          style={{
            display: 'flex',
            width: 200,
            justifyContent: 'flex-end',
            flexShrink: 0
          }}
        >
          前週金額
        </div>
      </>
    ),
    renderRow: (item, i) => {
      const currentRatio =
        maxCurrentAmount > 0 ? item.currentAmount / maxCurrentAmount : 0
      const previousRatio =
        maxPreviousAmount > 0 ? item.previousAmount / maxPreviousAmount : 0

      return (
        <RankingRowShell
          key={i}
          rank={item.rank}
          thumbnailUrl={item.thumbnailUrl}
          channelTitle={item.channelTitle}
          groupName={item.groupName}
          isEven={i % 2 === 0}
          zebraColor={ZEBRA_COLOR}
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
              ￥{Math.round(item.currentAmount / 1_000_000).toLocaleString()}
            </div>
            <ProgressBar ratio={currentRatio} color={BAR_COLOR} width={170} />
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
              {formatSuperChatAmount(item.previousAmount)}
            </div>
            <ProgressBar
              ratio={previousRatio}
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
