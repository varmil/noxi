import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { ChartTemplate } from 'app/[locale]/(end-user)/[group]/charts/channels/_components/ChartTemplate'
import Page from 'components/Page'
import Site from 'config/constants/Site'

type Props = {
  params: { locale: string; group: (typeof Site.Groups)[number] }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.hololive.charts' })

  return {
    title: `${t('title')} | ${tg('title')}`,
    description: `${t('description')}`
  }
}

export default function HololiveChartsPage({
  params: { locale, group },
  searchParams
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const tg = useTranslations('Global')
  const t = useTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/${group}`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: '/hololive/charts/channels', name: t('channels') }
      ]}
    >
      <ChartTemplate />
    </Page>
  )
}
