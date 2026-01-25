import { PropsWithoutRef } from 'react'
import { History } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getGroupName } from 'apis/groups'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import EndedStreamGalleryContent from 'features/group/ended/components/EndedStreamGalleryContent'
import StreamGallery from 'features/group/stream/components/gallery/StreamGallery'
import StreamGalleryFooter from 'features/group/stream/components/gallery/StreamGalleryFooter'
import StreamGalleryHeader from 'features/group/stream/components/gallery/StreamGalleryHeader'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'

type Props = StreamGallerySearchParams & {
  compact?: boolean
  showHeader?: boolean
  where?: { title?: string; channelId?: string; group?: string }
}

export default async function EndedStreamGallery({
  page,
  compact,
  showHeader,
  where
}: PropsWithoutRef<Props>) {
  const { title, channelId, group } = where || {}
  const [streams, t, groupName] = await Promise.all([
    getStreams({
      title,
      status: 'ended',
      group,
      channelId,
      orderBy: [{ field: 'actualEndTime', order: 'desc' }],
      limit: StreamGalleryPagination.getLimit(compact),
      offset: StreamGalleryPagination.getOffset(page)
    }),
    getTranslations('Features.group.ended'),
    group
      ? getGroupName(group, { errorContext: 'ended stream gallery' })
      : Promise.resolve('')
  ])

  return (
    <StreamGallery>
      {showHeader ? (
        <StreamGalleryHeader
          titleIcon={<History className="size-6 text-muted-foreground" />}
          title={t('title')}
          description={groupName ? t('description', { group: groupName }) : ''}
          badgeText="Archive"
        />
      ) : null}

      <EndedStreamGalleryContent streams={streams} compact={compact} />

      {compact && group && <StreamGalleryFooter href={`/${group}/ended`} />}
    </StreamGallery>
  )
}
