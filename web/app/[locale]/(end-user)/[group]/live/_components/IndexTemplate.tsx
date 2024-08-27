import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import Live from 'features/hololive/live/components/Live'
import { getGroup } from 'lib/server-only-context/cache'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const group = (await getTranslations('Global.group'))(`${getGroup()}`)
  const t = await getTranslations('Page.group.index.card')

  return (
    <>
      <div className="grid grid-cols-4 gap-2 sm:gap-2">
        <section className="col-span-full">
          <Live
            title={t('live.title')}
            description={t('live.description', { group })}
          />
        </section>
      </div>
    </>
  )
}