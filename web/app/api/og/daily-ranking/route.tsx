import { ImageResponse } from 'next/og'
import { GroupString } from 'config/constants/Group'
import ja from 'config/i18n/messages/ja.json'
import { getDailySupersRanking } from 'features/channels-ranking/utils/getDailySupersRanking'
import dayjs from 'lib/dayjs'
import { Gender } from 'types/gender'
import { getWebUrl } from 'utils/web-url'
// App router includes @vercel/og.
// No need to install it.

const font = fetch(new URL('fonts/NotoSansJP-Bold.otf', getWebUrl())).then(
  res => res.arrayBuffer()
)

/**
 * @param group GroupString
 * @param gender 'male' | 'female' | 'nonbinary'
 * @param date <Date>
 **/
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const group = searchParams.get('group') as GroupString
  const gender = searchParams.get('gender') as Gender | undefined

  const ranking = await getDailySupersRanking({
    group,
    gender,
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
          padding: '34px 20px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 44
        }}
      >
        <section tw="flex flex-col items-start justify-between w-[530px] h-full text-4xl font-bold">
          <div tw="flex flex-col items-start mt-4" style={{ gap: 10 }}>
            <div style={{ fontSize: 30 }} tw="text-neutral-500">
              {formatter.format(
                dayjs(searchParams.get('date') ?? undefined).toDate()
              )}
            </div>
            <div tw="text-neutral-500" style={{ fontSize: 50 }}>
              過去24hランキング
            </div>
          </div>

          <div tw="flex flex-col -top-12" style={{ fontSize: 80 }}>
            <div tw="flex">{group ? ja.Global.group[group] : `VTuber総合`}</div>
            <div tw="flex">{gender ? ja.Global.gender[gender] : ``}</div>
          </div>

          <div style={{ fontSize: 12 }} tw="text-neutral-500">
            ※スーパーステッカーを含む
          </div>
        </section>

        <section style={{ gap: 26 }} tw="flex-1 flex flex-col">
          {ranking.map((e, i) => (
            <div key={i} style={{ gap: 20 }} tw="flex flex-row items-center">
              <div tw="flex items-baseline">
                <span tw="font-bold" style={{ fontSize: 55, lineHeight: 1 }}>
                  {e.rank}
                </span>
                <span tw="text-2xl text-neutral-500">位</span>
              </div>

              <div tw="flex w-[94px] h-[94px] justify-center items-center rounded-full overflow-hidden">
                <img
                  src={e.channelThumbnails}
                  alt={e.channelTitle}
                  style={{
                    width: 94,
                    height: 94,
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div tw="flex flex-1 flex-col">
                <div
                  tw="text-left text-3xl text-neutral-600 overflow-hidden"
                  style={{ height: '1.3em' }}
                >
                  {e.channelTitle.length > 28
                    ? `${e.channelTitle.slice(0, 28)}...`
                    : e.channelTitle}
                </div>
                <div tw="flex text-xl text-neutral-500 ">
                  {e.amount} 円 / 日
                </div>
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
