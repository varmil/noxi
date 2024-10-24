import { use } from "react";
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Page } from 'components/page'
import IconSection from 'features/icon-section/IconSection'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.index' })

  return {
    title: `${t('metadata.title')} - ${tg('title')}`,
    description: `${t('metadata.description')}`
  }
}

export default function IndexPage(props: Props) {
  const params = use(props.params);

  const {
    locale
  } = params;

  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Page.index')

  return (
    <Page breadcrumb={[]}>
      <div className="max-w-2xl mx-auto px-6 sm:px-0 py-16 lg:py-24">
        <div className="grid gap-12 mb-20">
          <h2 className="text-3xl font-bold lg:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-muted-foreground">{t('description')}</p>
        </div>

        <section className="grid gap-12 px-0">
          <h2 className="text-3xl font-bold lg:text-4xl">
            {t('section.keyword.title')}
          </h2>

          <div className="">
            <IconSection />
          </div>
        </section>
      </div>
    </Page>
  )
}
