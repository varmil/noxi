import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { IndexTemplate } from 'app/[locale]/(end-user)/hololive/scheduled/_components/IndexTemplate'
import Page from 'components/Page'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.hololive.scheduled.metadata'
  })

  return {
    title: `${t('title')} | ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default function HololiveScheduledPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        { href: '/hololive', name: t('hololive') },
        { href: '/hololive/scheduled', name: t('scheduled') }
      ]}
    >
      <IndexTemplate />
    </Page>
  )
}
