import { PropsWithoutRef } from 'react'
import { History } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import EndedStreamGalleryContent from 'features/group/ended/components/EndedStreamGalleryContent'
import StreamGallery from 'features/group/stream/components/gallery/StreamGallery'
import StreamGalleryFooter from 'features/group/stream/components/gallery/StreamGalleryFooter'
import StreamGalleryHeader from 'features/group/stream/components/gallery/StreamGalleryHeader'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { CACHE_1H } from 'lib/fetchAPI'

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
  const streams = await getStreams({
    title,
    status: 'ended',
    group,
    channelId,
    orderBy: [{ field: 'actualEndTime', order: 'desc' }],
    limit: StreamGalleryPagination.getLimit(compact),
    offset: StreamGalleryPagination.getOffset(page),
    revalidate: CACHE_1H
  })
  const t = await getTranslations('Features.group.ended')

  return (
    <StreamGallery>
      {showHeader ? (
        <StreamGalleryHeader
          titleIcon={<History className="size-6 text-muted-foreground" />}
          title={t('title')}
          description={
            group
              ? t('description', {
                  group: ((await getTranslations('Global.group')) as any)(
                    `${group}`
                  )
                })
              : ''
          }
          badgeText="Archive"
        />
      ) : null}

      <EndedStreamGalleryContent streams={streams} compact={compact} />

      {compact && group && <StreamGalleryFooter href={`/${group}/ended`} />}
    </StreamGallery>
  )
}
