import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import Site from 'config/constants/Site'
import Live from 'features/hololive/live/components/Live'

type Props = {
  group: (typeof Site.Groups)[number]
}

export async function IndexTemplate({ group }: PropsWithoutRef<Props>) {
  const tg = await getTranslations('Global')
  const t = await getTranslations('Page.group.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <Live
            title={t('live.title')}
            description={t('live.description', { group: tg(`group.${group}`) })}
          />
        </section>
      </div>
    </>
  )
}
