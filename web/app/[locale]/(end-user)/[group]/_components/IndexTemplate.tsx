import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import { GroupChart } from 'features/group/chart/components/GroupChart'
import Live from 'features/group/live/components/Live'
import Schedule from 'features/group/schedule/components/Schedule'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const group = (await getTranslations('Global.group'))(`${getGroup()}`)
  const t = await getTranslations('Page.group.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full sm:col-span-2">
          <Live
            title={t('live.title')}
            description={t('live.description', { group })}
            compact
          />
        </section>
        <section className="col-span-full sm:col-span-2">
          <Schedule
            title={t('scheduled.title', { group })}
            description={t('scheduled.description', { group })}
            compact
          />
        </section>

        <section className="col-span-full">
          <GroupChart limit={6} footer />
        </section>
      </div>
    </>
  )
}
