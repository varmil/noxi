import { PropsWithoutRef } from 'react'
import { ChannelGallery } from 'features/group/chart/components/ChannelGallery'

type Props = {}

export async function ChartTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      {/* <section className="mb-4">
        <FilterAndSort />
      </section> */}

      <ChannelGallery limit={1000} />
    </>
  )
}
