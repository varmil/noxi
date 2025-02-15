import { PropsWithoutRef } from 'react'
import ScheduledStreamGallery from 'features/group/scheduled/components/ScheduledStreamGallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <ScheduledStreamGallery where={{ group: getGroup() }} />
        </section>
      </div>
    </>
  )
}
