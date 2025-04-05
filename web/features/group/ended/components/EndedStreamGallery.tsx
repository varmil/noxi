import { PropsWithoutRef } from 'react'
import { History } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getStreams } from 'apis/youtube/getStreams'
import { GroupString } from 'config/constants/Group'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import EndedStreamGalleryContent from 'features/group/ended/components/EndedStreamGalleryContent'
import StreamListFooter from 'features/group/stream/components/stream-list/StreamListFooter'
import StreamListHeader from 'features/group/stream/components/stream-list/StreamListHeader'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { CACHE_1H } from 'lib/fetchAPI'

type Props = StreamGallerySearchParams & {
  compact?: boolean
  showHeader?: boolean
  where?: { title?: string; channelId?: string; group?: GroupString }
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
    <section className="py-6">
      {showHeader ? (
        <StreamListHeader
          titleIcon={<History className="size-6 text-muted-foreground" />}
          title={t('title')}
          description={
            group
              ? t('description', {
                  group: (await getTranslations('Global.group'))(`${group}`)
                })
              : ''
          }
          badgeText="Archive"
        />
      ) : null}

      <EndedStreamGalleryContent streams={streams} />

      {compact && group && <StreamListFooter href={`/${group}/ended`} />}
    </section>
  )
}
