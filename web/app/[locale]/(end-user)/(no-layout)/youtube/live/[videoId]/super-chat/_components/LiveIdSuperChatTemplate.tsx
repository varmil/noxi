import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import StatsSuperChatTotalAmountCard from 'features/youtube-stats/components/simple-card/StatsSuperChatTotalAmountCard'

type Props = { videoId: string }

export async function LiveIdSuperChatTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <SuperChat stream={stream} />
}

/**
 * Hide when scheduled
 * TODO: スパチャ累積チャート
 **/
async function SuperChat({ stream }: { stream: StreamSchema }) {
  const t = await getTranslations('Features.live.superChat')
  const { videoId, status } = stream
  if (status === 'scheduled') return <p>{t('notice')}</p>

  return (
    <section>
      <StatsSuperChatTotalAmountCard
        videoId={videoId}
        className="flex-1 grow"
      />
    </section>
  )
}
