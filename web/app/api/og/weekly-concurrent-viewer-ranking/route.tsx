import { getGroups } from 'apis/groups/getGroups'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import { ProgressBar } from '../_components/ProgressBar'
import { RankingRowShell } from '../_components/RankingRowShell'
import { createOgRankingImage } from '../_components/createOgRankingImage'
import {
  formatConcurrentViewers,
  getWeeklyDateRange,
  getWeeklyDateRangeLabel
} from '../_components/utils'

const HEADER_COLOR = '#d08700' // yellow-700
const BAR_COLOR = '#f472b6' // pink-400
const ZEBRA_COLOR = '#fefce8' // yellow-50

export async function GET() {
  const { gte, lt } = getWeeklyDateRange()

  const streams = await getStreams({
    status: 'ended',
    startedAfter: gte,
    startedBefore: lt,
    orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
    limit: 40
  })

  const uniqueChannelIds = [...new Set(streams.map(s => s.snippet.channelId))]
  const [channels, groups] = await Promise.all([
    getChannels({ ids: uniqueChannelIds, limit: uniqueChannelIds.length }),
    getGroups()
  ])

  const channelMap = new Map(channels.map(c => [c.basicInfo.id, c]))
  const groupMap = new Map(groups.map(g => [g.id, g.name]))

  const items = streams.map((stream, i) => {
    const channel = channelMap.get(stream.snippet.channelId)
    return {
      rank: i + 1,
      channelTitle: channel?.basicInfo.title ?? '',
      channelThumbnailUrl: channel?.basicInfo.thumbnails.medium?.url ?? null,
      groupName: groupMap.get(stream.group) ?? '',
      peakConcurrentViewers: stream.metrics.peakConcurrentViewers,
      videoThumbnailUrl: stream.snippet.thumbnails.medium?.url ?? null,
      videoTitle: stream.snippet.title
    }
  })

  const maxViewers = items.length > 0 ? items[0].peakConcurrentViewers : 1

  return createOgRankingImage({
    title: '【週間】同接数ランキングTOP40',
    dateLabel: getWeeklyDateRangeLabel(),
    note: '※VCharts登録済みタレントが対象。開始時刻ベース',
    headerColor: HEADER_COLOR,
    width: 1960,
    height: 1670,
    items,
    headerRight: (
      <>
        <div
          style={{
            display: 'flex',
            width: 160,
            justifyContent: 'center',
            flexShrink: 0,
            fontWeight: 'bold',
            fontSize: 16
          }}
        >
          同接数
        </div>
        <div
          style={{
            display: 'flex',
            width: 347,
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          動画
        </div>
      </>
    ),
    renderRow: (item, i) => {
      const ratio = maxViewers > 0 ? item.peakConcurrentViewers / maxViewers : 0

      return (
        <RankingRowShell
          key={i}
          rank={item.rank}
          thumbnailUrl={item.channelThumbnailUrl}
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
              width: 160,
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
              {formatConcurrentViewers(item.peakConcurrentViewers)}
            </div>
            <ProgressBar ratio={ratio} color={BAR_COLOR} width={120} />
          </div>

          {/* 動画サムネイル */}
          <div
            style={{
              display: 'flex',
              width: 89,
              height: 50,
              borderRadius: 4,
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            {item.videoThumbnailUrl ? (
              <img
                src={item.videoThumbnailUrl}
                alt=""
                style={{ width: 89, height: 50, objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: 89,
                  height: 50,
                  background: '#ddd',
                  display: 'flex'
                }}
              />
            )}
          </div>

          {/* 動画タイトル（2行クランプ） */}
          <div
            style={{
              display: 'flex',
              width: 250,
              height: 52,
              flexShrink: 0,
              fontSize: 20,
              color: '#555',
              lineHeight: 1.3,
              overflow: 'hidden'
            }}
          >
            {item.videoTitle}
          </div>
        </RankingRowShell>
      )
    }
  })
}
