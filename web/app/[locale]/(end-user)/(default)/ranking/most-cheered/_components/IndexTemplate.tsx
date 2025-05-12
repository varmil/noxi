import { PropsWithoutRef } from 'react'
import { PageSMPX } from 'components/page'
import ResponsivePagination from 'components/pagination/ResponsivePagination'
import { MostCheeredPagination } from 'config/constants/Pagination'
import MostCheeredFilterGallery from 'features/cheer/most-cheered/components/filter/MostCheeredFilterGallery'
import MostCheeredGallery from 'features/cheer/most-cheered/components/gallery/MostCheeredGallery'
import { MostCheeredSearchParams } from 'features/cheer/most-cheered/types/most-cheered.type'

type Props = {
  searchParams: MostCheeredSearchParams
}

export default async function IndexTemplate({
  searchParams
}: PropsWithoutRef<Props>) {
  // TODO: 通信で取る
  const count = 100

  return (
    <section className={`space-y-4`}>
      <section className={`py-4 ${PageSMPX} sm:py-5 bg-muted`}>
        <MostCheeredFilterGallery className="max-w-6xl mx-auto" />
      </section>

      <section className={`${PageSMPX} space-y-6`}>
        <MostCheeredGallery className="max-w-6xl mx-auto" {...searchParams} />
        <ResponsivePagination
          totalPages={MostCheeredPagination.getTotalPages(count)}
        />
      </section>
    </section>
  )
}
