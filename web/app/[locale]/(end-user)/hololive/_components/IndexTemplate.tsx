import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import Live from 'features/hololive/live/components/Live'
import Schedule from 'features/hololive/schedule/components/Schedule'
import { Link } from 'lib/navigation'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.hololive.index.card')

  return (
    <main className="min-h-screen">
      <section className="p-4 sm:px-6 md:gap-8">
        <div className="w-full max-w-3xl mx-auto grid gap-4 sm:gap-6">
          <Live title={t('live.title')} description={t('live.description')} />
          <Schedule
            title={t('scheduled.title')}
            description={t('scheduled.description')}
          />

          <section>
            <Link href="hololive/charts/channels" prefetch={true}>
              <h2 className="text-2xl font-bold">チャート</h2>
            </Link>
          </section>
        </div>
      </section>
    </main>
  )
}
