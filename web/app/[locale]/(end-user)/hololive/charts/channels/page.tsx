import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { ChartTemplate } from 'app/[locale]/(end-user)/hololive/charts/channels/_components/ChartTemplate'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Page from 'components/Page'

type Props = {
  params: { locale: string }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page' })

  return {
    title: `${t('holilive.charts.title')} | ${tg('title')}`,
    description: `${t('holilive.charts.description')}`
  }
}

export default function HololivePage({
  params: { locale },
  searchParams
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Breadcrumb')

  return (
    <Page>
      <GlobalBreadcrumb
        items={[
          { href: '/', name: t('hololive') },
          { href: '/hololive/charts/channels', name: t('channels') }
        ]}
      />
      <ChartTemplate searchParams={new URLSearchParams(searchParams)} />
    </Page>
  )
}
