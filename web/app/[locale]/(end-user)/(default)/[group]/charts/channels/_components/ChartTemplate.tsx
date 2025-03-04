import { PropsWithoutRef } from 'react'
import { getChannelsCount } from 'apis/youtube/getChannels'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { ChannelGalleryPagination } from 'config/constants/Pagination'
import { ChannelGallery } from 'features/group/chart/components/ChannelGallery'
import { ChannelGallerySearchParams } from 'features/group/types/channel-gallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {
  searchParams: ChannelGallerySearchParams
}

export async function ChartTemplate({ searchParams }: PropsWithoutRef<Props>) {
  const count = await getChannelsCount({ group: getGroup() })
  return (
    <section className={`space-y-4`}>
      {/* <section className="mb-4">
        <FilterAndSort />
      </section> */}

      <ChannelGallery {...searchParams} />

      <section className={`${PageSMPX}`}>
        <ResponsivePagination
          totalPages={ChannelGalleryPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
