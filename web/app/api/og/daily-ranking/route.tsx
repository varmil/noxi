import BigNumber from 'bignumber.js'
import { ImageResponse } from 'next/og'
import { getChannels } from 'apis/youtube/getChannels'
import { getStreams } from 'apis/youtube/getStreams'
import { getSupersBundles } from 'apis/youtube/getSupersBundles'
import dayjs from 'lib//dayjs'
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  const supersBudles = await getSupersBundles({
    actualEndTimeGTE: dayjs().subtract(1, 'day').toDate(),
    orderBy: [{ field: 'amountMicros', order: 'desc' }],
    limit: 5
  })
  const [channels, streams] = await Promise.all([
    getChannels({ ids: supersBudles.map(e => e.channelId) }),
    getStreams({ videoIds: supersBudles.map(e => e.videoId) })
  ])
  const formatter = Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  })

  const ranking = supersBudles
    .map((bundle, i) => {
      const channel = channels.find(e => e.basicInfo.id === bundle.channelId)
      const stream = streams.find(e => e.videoId === bundle.videoId)
      if (!channel || !stream) return null

      const {
        basicInfo: { title, thumbnails }
      } = channel
      const {
        snippet: { title: streamTitle, thumbnails: streamThumbnails }
      } = stream

      return {
        rank: i + 1,
        channelTitle: title,
        channelThumbnails: thumbnails['medium']?.url,
        streamTitle: streamTitle,
        amount: Math.round(
          BigNumber(bundle.amountMicros.toString()).div(1_000_000).toNumber()
        ).toLocaleString()
      }
    })
    .filter(e => !!e)

  // console.log(ranking)

  return new ImageResponse(
    (
      <div
        style={{
          // fontSize: 40,
          color: 'black',
          background: 'white',
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '30px 70px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 100
        }}
      >
        <section tw="flex flex-col items-center w-[330px] h-full text-4xl font-bold">
          <div style={{ fontSize: 40 }} tw="mb-32">
            {formatter.format(new Date())}
          </div>
          <div style={{ fontSize: 100 }}>日間</div>
          <div>スーパーチャット額</div>
          <div>ランキング</div>
        </section>
        <section style={{ gap: 20 }} tw="flex-1 flex flex-col">
          {ranking.map((e, i) => (
            <div key={i} style={{ gap: 20 }} tw="flex flex-row items-center">
              <div tw="flex text-xl font-extrabold">{e.rank}位</div>

              <div tw="flex w-[100px] h-[100px] justify-center items-center rounded-full overflow-hidden">
                <img
                  src={e.channelThumbnails}
                  alt={e.channelTitle}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div tw="flex flex-col font-bold">
                <div tw="flex text-2xl">{e.channelTitle}</div>
                <div tw="flex text-lg">{e.amount} 円 / 日</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
