import { PropsWithoutRef } from 'react'
import ScheduledStreamGallery from 'features/group/scheduled/components/ScheduledStreamGallery'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <ScheduledStreamGallery />
        </section>
      </div>
    </>
  )
}
