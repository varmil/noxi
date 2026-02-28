import { ImageResponse } from 'next/og'
import { getChannel } from 'apis/youtube/getChannel'
import { getWebUrl } from 'utils/web-url'

const font = fetch(new URL('fonts/NotoSansJP-Bold.otf', getWebUrl())).then(
  res => res.arrayBuffer()
)

function getBackgroundFileName(sub: number): string {
  const unit = sub / 10000
  if (unit <= 10) return `${unit}.png`
  if (unit <= 90) return '20-90.png'
  if (unit % 100 === 0) return '100.png'
  return '110-.png'
}

/** text-shadow 非対応のため、影レイヤーを重ねて疑似ドロップシャドウを実現 */
function ShadowText({
  children,
  fontSize,
  color,
  strokeWidth,
  strokeColor = 'white',
  shadowOffset = 5,
  shadowColor = 'rgba(0,0,0,0.35)'
}: {
  children: React.ReactNode
  fontSize: number
  color: string
  strokeWidth: number
  strokeColor?: string
  shadowOffset?: number
  shadowColor?: string
}) {
  const base = {
    fontSize,
    fontWeight: 'bold' as const,
    lineHeight: 1.1,
    WebkitTextStroke: `${strokeWidth}px ${strokeColor}`
  }
  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          ...base,
          position: 'absolute',
          top: shadowOffset,
          left: shadowOffset,
          color: shadowColor,
          WebkitTextStroke: `${strokeWidth}px ${shadowColor}`
        }}
      >
        {children}
      </div>
      <div style={{ display: 'flex', ...base, color }}>{children}</div>
    </div>
  )
}

const FULLWIDTH_DIGITS = '０１２３４５６７８９' as const

function toFullwidth(str: string): string {
  return str.replace(/[0-9]/g, ch => FULLWIDTH_DIGITS[Number(ch)])
}

function formatSubscriberParts(sub: number): {
  number: string
  unit: string
} {
  const man = sub / 10000
  if (man < 2) return { number: sub.toLocaleString(), unit: '人' }
  if (man <= 9) return { number: toFullwidth(String(man)), unit: '万人' }
  return { number: String(man), unit: '万人' }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const channelId = searchParams.get('channelId')
  const subParam = searchParams.get('sub')

  if (!channelId || !subParam) {
    return new Response('Missing channelId or sub', { status: 400 })
  }

  const sub = Number(subParam)
  if (isNaN(sub) || sub <= 0 || sub % 10000 !== 0) {
    return new Response('Invalid sub parameter', { status: 400 })
  }

  const { basicInfo } = await getChannel(channelId)
  const thumbnailUrl = basicInfo.thumbnails.high?.url ?? ''
  const bgFileName = getBackgroundFileName(sub)
  const bgUrl = `${getWebUrl()}/images/ogp/ogp-subs/${bgFileName}`
  const { number: subNumber, unit: subUnit } = formatSubscriberParts(sub)

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* 背景画像 */}
      <img
        src={bgUrl}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630
        }}
      />

      {/* コンテンツ */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: '20px 20px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* 左側テキスト */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 650,
            maxWidth: 710,
            gap: 5
          }}
        >
          <ShadowText
            fontSize={120}
            color="#ff8c00"
            strokeWidth={15}
            shadowOffset={8}
            shadowColor="rgba(0,0,0,0.6)"
          >
            祝
          </ShadowText>
          <ShadowText
            fontSize={130}
            color="#ff4589"
            strokeWidth={10}
            shadowOffset={8}
            shadowColor="rgba(0,0,0,0.6)"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                marginBottom: 20
              }}
            >
              <div style={{ display: 'flex', fontSize: 180 }}>{subNumber}</div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 90,
                  letterSpacing: '0.08em'
                }}
              >
                {subUnit}
              </div>
            </div>
          </ShadowText>
          <ShadowText
            fontSize={130}
            color="#ff4589"
            strokeWidth={10}
            shadowOffset={8}
            shadowColor="rgba(0,0,0,0.6)"
          >
            <div style={{ display: 'flex', letterSpacing: '0.15em' }}>登録</div>
          </ShadowText>
        </div>

        {/* 右側: サムネイル + メッセージ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            width: 500
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 420,
              height: 420,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '8px solid white',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
            }}
          >
            <img
              src={thumbnailUrl}
              alt={basicInfo.title}
              style={{
                width: 420,
                height: 420,
                objectFit: 'cover'
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: -60,
              left: '55%',
              transform: 'translateX(-50%) rotate(-8deg)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                letterSpacing: '0.24em'
              }}
            >
              <ShadowText
                fontSize={52}
                color="white"
                strokeWidth={6}
                strokeColor="rgba(0,0,0,0.7)"
                shadowOffset={3}
                shadowColor="rgba(0,0,0,0.5)"
              >
                おめでとう
              </ShadowText>
              <div style={{ display: 'flex', paddingLeft: 90 }}>
                <ShadowText
                  fontSize={52}
                  color="white"
                  strokeWidth={6}
                  strokeColor="rgba(0,0,0,0.7)"
                  shadowOffset={3}
                  shadowColor="rgba(0,0,0,0.5)"
                >
                  ございます！
                </ShadowText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
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
