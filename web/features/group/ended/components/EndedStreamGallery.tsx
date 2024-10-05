import { PropsWithoutRef } from 'react'
import { History } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import StreamListContentOfEnded from 'features/group/stream/components/stream-list/StreamListContentOfEnded'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  compact?: boolean
  where?: { channelId?: string }
}

export default async function EndedStreamGallery({
  compact,
  where
}: PropsWithoutRef<Props>) {
  const { channelId } = where || {}
  const streams = await getStreams({
    status: 'ended',
    group: getGroup(),
    channelId,
    orderBy: [{ field: 'actualEndTime', order: 'desc' }],
    limit: 99
  })

  const t = await getTranslations('Features.group.ended')
  const group = getGroup()

  return (
    <Card>
      <StreamListHeader
        titleIcon={<History className="w-6 h-6 text-muted-foreground" />}
        title={t('title')}
        description={t('description', {
          group: (await getTranslations('Global.group'))(`${getGroup()}`)
        })}
        badgeText="Archive"
      />
      <StreamListContentOfEnded streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/ended`} />}
    </Card>
  )
}
