import { Metadata } from 'next'
import Page from 'components/Page'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import { YoutubeDashboard } from 'features/youtube/components/YoutubeDashboard'
import Site from 'config/constants/Site'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string; name: string }
}

export async function generateMetadata({
  params: { locale, name }
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'IndexPage' })

  return {
    title: `${name}に関連するチャンネル | ${Site.TITLE}`,
    description: `${name}に関連するチャンネル | ${Site.TITLE}`
  }
}

export default function YoutubeQueriesNameChannelsPage({
  params: { locale, name }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Breadcrumb')

  return (
    <Page>
      <GlobalBreadcrumb
        items={[
          { href: '/', name: 'Home' },
          { href: '/', name: 'Youtube' },
          { href: '#', name: t('channels') }
        ]}
      />
      <YoutubeDashboard keyword={name} />
    </Page>
  )
}
