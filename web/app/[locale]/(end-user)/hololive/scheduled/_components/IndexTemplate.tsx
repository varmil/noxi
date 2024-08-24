import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import Schedule from 'features/hololive/schedule/components/Schedule'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.hololive.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full sm:col-span-2">
          <Schedule
            title={t('scheduled.title')}
            description={t('scheduled.description')}
          />
        </section>
      </div>
    </>
  )
}
