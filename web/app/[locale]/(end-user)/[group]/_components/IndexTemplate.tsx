import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { ChannelGallery } from 'features/group/chart/components/ChannelGallery'
import LiveStreamGallery from 'features/group/live/components/LiveStreamGallery'
import ScheduledStreamGallery from 'features/group/scheduled/components/ScheduledStreamGallery'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const group = (await getTranslations('Global.group'))(`${getGroup()}`)
  const t = await getTranslations('Page.group.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full sm:col-span-2">
          <LiveStreamGallery
            title={t('live.title')}
            description={t('live.description', { group })}
            compact
          />
        </section>
        <section className="col-span-full sm:col-span-2">
          <ScheduledStreamGallery
            title={t('scheduled.title', { group })}
            description={t('scheduled.description', { group })}
            compact
          />
        </section>

        <section className="col-span-full">
          <ChannelGallery limit={6} footer />
        </section>
      </div>
    </>
  )
}
