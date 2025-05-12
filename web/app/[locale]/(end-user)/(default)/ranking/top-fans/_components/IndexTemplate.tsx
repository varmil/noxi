import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { TopFansPagination } from 'config/constants/Pagination'
import TopFansFilterGallery from 'features/cheer/top-fans/components/filter/TopFansFilterGallery'
import TopFansGallery from 'features/cheer/top-fans/components/gallery/TopFansGallery'
import { TopFansSearchParams } from 'features/cheer/top-fans/types/top-fans.type'

type Props = {
  searchParams: TopFansSearchParams
}

export default async function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  // TODO: 通信で取る
  const count = 100

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <TopFansFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <TopFansGallery className="max-w-6xl mx-auto" {...searchParams} />
        <ResponsivePagination
          totalPages={TopFansPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
