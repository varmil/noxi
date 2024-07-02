import { Metadata } from 'next'
import Page from 'components/Page'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import { YoutubeDashboard } from 'features/youtube/YoutubeDashboard'
import Site from 'config/constants/Site'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'IndexPage' })

  return {
    title: `チャンネル | ${Site.TITLE}`,
    description: `チャンネル | ${Site.TITLE}`
  }
}

export default function Home({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const t = useTranslations('Breadcrumb')

  return (
    <Page>
      <GlobalBreadcrumb
        items={[
          { href: '#', name: 'Home' },
          { href: '#', name: 'Youtube' },
          { href: '#', name: t('channels') }
        ]}
      />
      <YoutubeDashboard />
    </Page>
  )
}
