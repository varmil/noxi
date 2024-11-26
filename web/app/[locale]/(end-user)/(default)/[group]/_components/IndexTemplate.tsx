import { PropsWithoutRef } from 'react'
import { ChannelGallery } from 'features/group/chart/components/ChannelGallery'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import LiveStreamGallery from 'features/group/live/components/LiveStreamGallery'
import ScheduledStreamGallery from 'features/group/scheduled/components/ScheduledStreamGallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <ChannelGallery limit={6} footer />
        </section>
        <section className="col-span-full">
          <LiveStreamGallery compact />
        </section>
        <section className="col-span-full">
          <ScheduledStreamGallery compact />
        </section>
        <section className="col-span-full">
          <EndedStreamGallery where={{ group: getGroup() }} compact />
        </section>
      </div>
    </>
  )
}
