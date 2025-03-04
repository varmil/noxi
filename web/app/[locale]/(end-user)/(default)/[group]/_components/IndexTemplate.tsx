import { PropsWithoutRef, Suspense } from 'react'
import StreamGallerySkeleton from 'components/skeleton/StreamGallerySkeleton'
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
          <ChannelGallery compact />
        </section>
        <Suspense
          fallback={<StreamGallerySkeleton className="col-span-full" />}
        >
          <section className="col-span-full">
            <LiveStreamGallery
              where={{ group: getGroup() }}
              compact
              showHeader
            />
          </section>
          <section className="col-span-full">
            <ScheduledStreamGallery
              where={{ group: getGroup() }}
              compact
              showHeader
            />
          </section>
          <section className="col-span-full">
            <EndedStreamGallery
              where={{ group: getGroup() }}
              compact
              showHeader
            />
          </section>
        </Suspense>
      </div>
    </>
  )
}
