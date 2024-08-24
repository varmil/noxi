import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getChannel } from 'api/youtube/getChannel'
import { ChannelIdDashboard } from 'app/[locale]/(end-user)/_components/ChannelIdDashboard'
import Page from 'components/Page'

type Props = {
  params: { locale: string; id: string }
}

export async function generateMetadata({
  params: { locale, id }
}: Props): Promise<Metadata> {
  const { basicInfo } = await getChannel(id)
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({ locale, namespace: 'Page.channelsId' })

  return {
    title: `${basicInfo.title} - ${t('title')} | ${tg('title')}`,
    description: `${t('description', { channel: basicInfo.title })}`
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
    <Page
      breadcrumb={[
        { href: '/', name: 'YouTube' },
        { href: '/youtube/charts/channels', name: t('channels') },
        { href: '#', name: basicInfo.title }
      ]}
    >
      <ChannelIdDashboard id={id} />
    </Page>
  )
}
