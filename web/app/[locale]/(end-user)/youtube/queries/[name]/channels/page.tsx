import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Page from 'components/Page'
import { YoutubeChart } from 'features/youtube/components/YoutubeChart'

type Props = {
  params: { locale: string; name: string }
  searchParams?: { [key: string]: string | undefined }
}

export async function generateMetadata({
  params: { locale, name }
}: Props): Promise<Metadata> {
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'QueriesNameChannels' })

  return {
    title: `${name} | ${t('title')} | ${tg('title')}`,
    description: `${t('description', { keyword: name })}`
  }
}

export default function YoutubeQueriesNameChannelsPage({
  params: { locale, name },
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
          { href: '#', name: t('channels') }
        ]}
      />
      <YoutubeChart
        keyword={name}
        searchParams={new URLSearchParams(searchParams)}
      />
    </Page>
  )
}
