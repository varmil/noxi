import { PropsWithoutRef } from 'react'
import { Radio } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import StreamListContentOfLive from 'features/group/stream/components/stream-list/StreamListContentOfLive'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  compact?: boolean
}

export default async function LiveStreamGallery({
  compact
}: PropsWithoutRef<Props>) {
  const group = getGroup()
  const [t, streams] = await Promise.all([
    getTranslations('Features.group'),
    getStreams({
      status: 'live',
      group,
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
      limit: 100
    })
  ])

  return (
    <Card>
      <StreamListHeader
        titleIcon={<Radio className="w-6 h-6 text-red-400" />}
        title={t('live.title')}
        description={t('live.description', {
          group: (await getTranslations('Global.group'))(`${group}`)
        })}
        badgeText="Live"
      />
      <StreamListContentOfLive streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/live`} />}
    </Card>
  )
}
