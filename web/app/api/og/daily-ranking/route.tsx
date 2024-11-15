import { ImageResponse } from 'next/og'
import { getDailySupersRanking } from 'features/supers-ranking/utils/getSupersRanking'
import dayjs from 'lib/dayjs'
import { getWebUrl } from 'utils/web-url'
// App router includes @vercel/og.
// No need to install it.

const font = fetch(new URL('fonts/NotoSansJP-Bold.otf', getWebUrl())).then(
  res => res.arrayBuffer()
)

/** ?date=<Date> */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const ranking = await getDailySupersRanking({
    date: searchParams.get('date') ?? undefined,
    limit: 5
  })

  const formatter = Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short'
  })

  return new ImageResponse(
    (
      <div
        style={{
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
          <div tw="flex items-center mb-28" style={{ gap: 20 }}>
            <div style={{ fontSize: 50 }}>日刊</div>
            <div style={{ fontSize: 30 }} tw="self-end">
              {formatter.format(
                dayjs(searchParams.get('date') ?? undefined).toDate()
              )}
            </div>
          </div>

          <div style={{ fontSize: 80 }}>スパチャ</div>
          <div style={{ fontSize: 60 }}>ランキング</div>
          <div style={{ fontSize: 12 }} tw="mt-auto">
            ※PeakX登録タレント集計。ステッカー含む
          </div>
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
              <div tw="flex flex-1 flex-col font-bold">
                <div tw="flex text-2xl">
                  {e.channelTitle.length > 33
                    ? `${e.channelTitle.slice(0, 33)}...`
                    : e.channelTitle}
                </div>
                <div tw="flex text-lg">{e.amount} 円 / 日</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    ),
    {
      width: 1200,
      height: 630,
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
