import { PropsWithoutRef } from 'react'
import { Radio } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card } from '@/components/ui/card'
import { getStreams } from 'apis/youtube/getStreams'
import { GroupString } from 'config/constants/Site'
import LiveStreamGalleryContent from 'features/group/live/components/LiveStreamGalleryContent'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { STREAM_GALLERY_LIMIT } from 'features/group/types/stream-gallery'

type Props = {
  compact?: boolean
  showHeader?: boolean
  where?: { title?: string; channelId?: string; group?: GroupString }
  limit?: number
  className?: string
}

export default async function LiveStreamGallery({
  compact,
  showHeader,
  where,
  limit,
  className
}: PropsWithoutRef<Props>) {
  const { title, channelId, group } = where || {}
  const [t, streams] = await Promise.all([
    getTranslations('Features.group'),
    getStreams({
      title,
      status: 'live',
      group,
      channelId,
      orderBy: [{ field: 'maxViewerCount', order: 'desc' }],
      limit: limit ?? STREAM_GALLERY_LIMIT
    })
  ])

  return (
    <Card className={className ?? ''}>
      {showHeader ? (
        <StreamListHeader
          titleIcon={<Radio className="w-6 h-6 text-red-400" />}
          title={t('live.title')}
          description={
            group
              ? t('live.description', {
                  group: (await getTranslations('Global.group'))(`${group}`)
                })
              : ''
          }
          badgeText="Live"
        />
      ) : (
        <div className="pb-6"></div>
      )}

      <LiveStreamGalleryContent streams={streams} compact={compact} />
      {compact && <StreamListFooter href={`/${group}/live`} />}
    </Card>
  )
}
