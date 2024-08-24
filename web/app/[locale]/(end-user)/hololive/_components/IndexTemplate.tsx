import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { HololiveChart } from 'features/hololive/chart/components/HololiveChart'
import Live from 'features/hololive/live/components/Live'
import Schedule from 'features/hololive/schedule/components/Schedule'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.hololive.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full sm:col-span-2">
          <Live
            title={t('live.title')}
            description={t('live.description')}
            compact
          />
        </section>
        <section className="col-span-full sm:col-span-2">
          <Schedule
            title={t('scheduled.title')}
            description={t('scheduled.description')}
          />
        </section>

        <section className="col-span-full">
          <HololiveChart limit={6} footer />
        </section>
      </div>
    </>
  )
}
