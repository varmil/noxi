import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { ChannelGallery } from 'features/group/chart/components/ChannelGallery'
import EndedStreamGallery from 'features/group/ended/components/EndedStreamGallery'
import LiveStreamGallery from 'features/group/live/components/LiveStreamGallery'
import ScheduledStreamGallery from 'features/group/scheduled/components/ScheduledStreamGallery'
import { HighlightClipGallery } from 'features/youtube/highlight-clip/components/HighlightClipGallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const group = (await getTranslations('Global.group'))(`${getGroup()}`)
  const t = await getTranslations('Page.group.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <LiveStreamGallery
            title={t('live.title')}
            description={t('live.description', { group })}
            compact
          />
        </section>
        <section className="col-span-full">
          <ScheduledStreamGallery
            title={t('scheduled.title', { group })}
            description={t('scheduled.description', { group })}
            compact
          />
        </section>
        <section className="col-span-full">
          <EndedStreamGallery where={{ group: getGroup() }} compact />
        </section>

        <section className="col-span-full">
          <ChannelGallery limit={6} footer />
        </section>

        <section className="col-span-full">
          <HighlightClipGallery />
        </section>
      </div>
    </>
  )
}
