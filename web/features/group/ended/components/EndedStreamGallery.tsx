import { PropsWithoutRef } from 'react'
import { History } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import { GroupString } from 'config/constants/Site'
import StreamListContentOfEnded from 'features/group/stream/components/stream-list/StreamListContentOfEnded'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  compact?: boolean
  where?: { channelId?: string; group?: GroupString }
}

export default async function EndedStreamGallery({
  compact,
  where
}: PropsWithoutRef<Props>) {
  const { channelId, group } = where || {}
  const streams = await getStreams({
    status: 'ended',
    group,
    channelId,
    orderBy: [{ field: 'actualEndTime', order: 'desc' }],
    limit: 99
  })

  const t = await getTranslations('Features.group.ended')

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
      {compact && group && <StreamListFooter href={`/${group}/ended`} />}
    </Card>
  )
}
