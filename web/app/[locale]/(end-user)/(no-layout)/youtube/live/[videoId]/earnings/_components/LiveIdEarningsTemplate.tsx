import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import StatsSuperChatTotalAmountCard from 'features/youtube-stats/components/simple-card/StatsSuperChatTotalAmountCard'

type Props = { videoId: string }

export async function LiveIdEarningsTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <Earnings stream={stream} />
}

/**
 * Hide when scheduled
 * TODO: スパチャ累積チャート
 **/
async function Earnings({ stream }: { stream: StreamSchema }) {
  const t = await getTranslations('Features.live.earnings')
  const { videoId, status, membersOnly } = stream

  // スケジュール
  if (status === 'scheduled') return <p>{t('notice')}</p>
  // メンバー限定
  if (membersOnly) return <p>{t('membersOnly')}</p>

  return (
    <section>
      <StatsSuperChatTotalAmountCard
        videoId={videoId}
        className="flex-1 grow"
      />
    </section>
  )
}
