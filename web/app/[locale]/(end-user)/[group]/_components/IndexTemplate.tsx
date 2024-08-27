import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import Site from 'config/constants/Site'
import { HololiveChart } from 'features/hololive/chart/components/HololiveChart'
import Live from 'features/hololive/live/components/Live'
import Schedule from 'features/hololive/schedule/components/Schedule'

type Props = {
  group: (typeof Site.Groups)[number]
}

export async function IndexTemplate({ group }: PropsWithoutRef<Props>) {
  const tg = await getTranslations('Global')
  const t = await getTranslations('Page.group.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full sm:col-span-2">
          <Live
            title={t('live.title')}
            description={t('live.description', { group: tg(`group.${group}`) })}
            compact
          />
        </section>
        <section className="col-span-full sm:col-span-2">
          <Schedule
            title={t('scheduled.title', { group: tg(`group.${group}`) })}
            description={t('scheduled.description', {
              group: tg(`group.${group}`)
            })}
            compact
          />
        </section>

        <section className="col-span-full">
          <HololiveChart group={group} limit={6} footer />
        </section>
      </div>
    </>
  )
}
