import { getStatistics } from 'apis/youtube/data-api/getStatistics'
import { getChannels } from 'apis/youtube/getChannels'
import { getSupersBundles } from 'apis/supers/getSupersBundles'
import { StreamsSchema } from 'apis/youtube/schema/streamSchema'
import Stream from 'features/group/stream/components/Stream'

type Props = { streams: StreamsSchema }

export default async function EndedStreams({ streams }: Props) {
  const [channels, statisticsList, supersBundles] = await Promise.all([
    getChannels({
      ids: streams.map(stream => stream.snippet.channelId),
      limit: streams.length
    }),
    getStatistics({ videoIds: streams.map(stream => stream.videoId) }),
    getSupersBundles({
      videoIds: streams.map(stream => stream.videoId),
      limit: streams.length
    })
  ])

  return (
    <>
      {streams
        .map(stream => {
          const channel = channels.find(
            channel => channel.basicInfo.id === stream.snippet.channelId
          )
          if (!channel) return null

          const video = statisticsList.find(
            stats => stats.id === stream.videoId
          )
          // ここをコメントアウト外すと削除された配信は非表示になる
          // if (!video) return null

          const bundle = supersBundles.find(
            bundle => bundle.videoId === stream.videoId
          )

          return { stream, channel, video, bundle }
        })
        .filter(item => item !== null)
        .map(({ stream, channel, video, bundle }) => {
          return (
            <Stream
              key={stream.videoId}
              stream={stream}
              channel={channel}
              statistics={video?.statistics}
              supersBundle={bundle}
            />
          )
        })}
    </>
  )
}
