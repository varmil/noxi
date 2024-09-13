import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { ChannelIdTemplate } from 'app/[locale]/(end-user)/(default)/_components/ChannelIdTemplate'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'

type Props = {
  params: { locale: string; group: GroupString; id: string }
}

export async function generateMetadata({
  params: { locale, id }
}: Props): Promise<Metadata> {
  const { basicInfo } = await getChannel(id)
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.group.channelsId'
  })

  return {
    title: `${basicInfo.title} - ${t('title')} | ${tg('title')}`,
    description: `${t('description', { channel: basicInfo.title })}`
  }
}

export default async function GroupChannelsIdPage({
  params: { locale, group, id }
}: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale)
  setGroup(group)

  const { basicInfo } = await getChannel(id)
  const tg = await getTranslations('Global')
  const t = await getTranslations('Breadcrumb')

  return (
    <Page
      breadcrumb={[
        {
          href: `/${group}`,
          name: t('group', { group: tg(`group.${group}`) })
        },
        { href: `/${group}/charts/channels`, name: t('channels') },
        { href: '#', name: basicInfo.title }
      ]}
    >
      <ChannelIdTemplate id={id} />
    </Page>
  )
}
