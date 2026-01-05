import { ImageResponse } from 'next/og'
import { getGroupName } from 'apis/groups'
import ja from 'config/i18n/messages/ja.json'
import { getSnapshotSupersRanking } from 'features/channels-ranking/utils/getSnapshotSupersRanking'
import { Gender } from 'types/gender'
import { getWebUrl } from 'utils/web-url'

const font = fetch(new URL('fonts/NotoSansJP-Bold.otf', getWebUrl())).then(
  res => res.arrayBuffer()
)

/**
 * 週間ランキング OGP 画像
 * @param week string (例: 2026-W01)
 * @param group string
 * @param gender 'male' | 'female' | 'nonbinary'
 **/
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const group = searchParams.get('group') as string
  const gender = searchParams.get('gender') as Gender | undefined
  const week = searchParams.get('week') as string // 2026-W01

  // 週番号を解析: YYYY-Wxx
  const weekMatch = week?.match(/^(\d{4})-W(\d{2})$/)
  const year = weekMatch ? weekMatch[1] : ''
  const weekNum = weekMatch ? weekMatch[2] : ''

  const [ranking, groupName] = await Promise.all([
    getSnapshotSupersRanking({
      period: 'weekly',
      target: week,
      group,
      gender,
      limit: 5
    }),
    group
      ? getGroupName(group, { errorContext: 'weekly-ranking og image' })
      : Promise.resolve('VTuber総合')
  ])

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
            <div
              style={{ display: 'flex', fontSize: 30 }}
              tw="text-neutral-500"
            >
              {`${year}年 第${weekNum}週`}
            </div>
            <div tw="flex items-end">
              <span tw="font-bold mr-4" style={{ fontSize: 60, lineHeight: 1 }}>
                週間
              </span>
              <span tw="text-neutral-500" style={{ fontSize: 36 }}>
                ランキング
              </span>
            </div>
          </div>

          <div tw="flex flex-col -top-12" style={{ fontSize: 80 }}>
            <div tw="flex">{groupName}</div>
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
                  {`${e.amount} 円 / 週`}
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
