import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import Schedule from 'features/hololive/schedule/components/Schedule'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.hololive.index.card')

  return (
    <main className="min-h-screen">
      <section className="p-4 sm:px-6 md:gap-8">
        <div className="w-full max-w-3xl mx-auto">
          <Schedule title={t('title')} description={t('description')} />
        </div>
      </section>
    </main>
  )
}
