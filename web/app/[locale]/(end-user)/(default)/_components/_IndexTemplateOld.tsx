import { PropsWithoutRef } from 'react'
import { getTranslations } from 'next-intl/server'
import IconSection from 'features/icon-section/IconSection'

type Props = {}

export async function IndexTemplate({}: PropsWithoutRef<Props>) {
  const t = await getTranslations('Page.index')

  return (
    <>
      <div className="max-w-2xl mx-auto px-6 sm:px-0 py-16 lg:py-24">
        <div className="grid gap-12 mb-20">
          <h2 className="text-3xl font-bold lg:text-4xl">{t('title')}</h2>
          <p className="whitespace-pre-wrap break-anywhere mt-3 text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <section className="grid gap-12 px-0">
          <h2 className="text-2xl font-bold lg:text-3xl">
            {t('section.live.ranking')}
          </h2>

          <div className="">
            <IconSection />
          </div>
        </section>
      </div>
    </>
  )
}
