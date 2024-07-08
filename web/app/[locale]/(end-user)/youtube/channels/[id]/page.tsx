import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import GlobalBreadcrumb from 'components/GlobalBreadcrumb'
import Page from 'components/Page'
import Site from 'config/constants/Site'
import { getChannel } from 'features/youtube/api/getChannel'
import { ChannelIdDashboard } from 'features/youtube/components/ChannelIdDashboard'

type Props = {
  params: { locale: string; id: string }
}

export async function generateMetadata({
  params: { locale, id }
}: Props): Promise<Metadata> {
  const { basicInfo } = await getChannel(id)
  const t = await getTranslations({ locale, namespace: 'IndexPage' })

  return {
    title: `${basicInfo.title}のチャンネル情報 | ${Site.TITLE}`,
    description: `${basicInfo.title}のチャンネル情報 | ${Site.TITLE}`
  }
}

export default async function YoutubeChannelsIdPage({
  params: { locale, id }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)

  const { basicInfo } = await getChannel(id)
  const t = await getTranslations('Breadcrumb')

  return (
    <Page>
      <GlobalBreadcrumb
        items={[
          { href: '/', name: 'Home' },
          { href: '/', name: 'Youtube' },
          { href: '#', name: t('channels') },
          { href: '#', name: basicInfo.title }
        ]}
      />
      <ChannelIdDashboard id={id} />
    </Page>
  )
}
