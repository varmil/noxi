import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Page from 'components/Page'
import { YoutubeChart } from 'features/youtube/components/YoutubeChart'

type Props = {
  params: { locale: string }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'ChartsChannels' })

  return {
    title: `${'Travel vlog english'} | ${t('title')} | ${tg('title')}`,
    description: `${t('description', { keyword: 'Travel vlog english' })}`
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
          { href: '/', name: 'YouTube' },
          { href: '/youtube/charts/channels', name: t('channels') }
        ]}
      />
      <YoutubeChart searchParams={new URLSearchParams(searchParams)} />
    </Page>
  )
}
