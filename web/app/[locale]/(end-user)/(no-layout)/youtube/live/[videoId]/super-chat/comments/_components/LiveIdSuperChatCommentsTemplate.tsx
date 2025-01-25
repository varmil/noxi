import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { getStream } from 'apis/youtube/getStream'
import { StreamSchema } from 'apis/youtube/schema/streamSchema'
import SuperChatGallery from 'features/supers/chat/components/SuperChatGallery'

type Props = { videoId: string }

export async function LiveIdSuperChatCommentsTemplate({
  videoId
}: PropsWithoutRef<Props>) {
  const stream = await getStream(videoId)
  return <SuperChatComments stream={stream} />
}

/** SuperChat: Hide when scheduled */
async function SuperChatComments({ stream }: { stream: StreamSchema }) {
  const t = await getTranslations('Features.live.superChatComments')
  const { videoId, status, membersOnly } = stream

  // スケジュール
  if (status === 'scheduled') return <p>{t('notice')}</p>
  // メンバー限定
  if (membersOnly) return <p>{t('membersOnly')}</p>

  return <SuperChatGallery videoId={videoId} />
}
