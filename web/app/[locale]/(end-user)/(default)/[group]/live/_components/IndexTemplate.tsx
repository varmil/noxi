import { PropsWithoutRef } from 'react'
import LiveStreamGallery from 'features/group/live/components/LiveStreamGallery'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <LiveStreamGallery />
        </section>
      </div>
    </>
  )
}
