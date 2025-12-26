import { PropsWithoutRef } from 'react'
import { getStreamsCount } from 'apis/youtube/getStreams'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { StreamGalleryPagination } from 'config/constants/Pagination'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import { StreamGallerySearchParams } from 'features/group/types/stream-gallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  searchParams: StreamGallerySearchParams
}

export async function IndexTemplate({ searchParams }: PropsWithoutRef<Props>) {
  const count = await getStreamsCount({
    status: 'ended',
    group: getGroup()
  })
  return (
    <section className="space-y-4">
      <EndedStreamGallery where={{ group: getGroup() }} {...searchParams} />
      <section className={`${PageSMPX}`}>
        <ResponsivePagination
          totalPages={StreamGalleryPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
