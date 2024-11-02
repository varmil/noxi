import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getChannel } from 'apis/youtube/getChannel'
import { Page } from 'components/page'
import { GroupString } from 'config/constants/Site'
import { setGroup } from 'lib/server-only-context/cache'
import { ChannelIdTemplate } from './_components/ChannelIdTemplate'

type Props = {
  params: { locale: string; group: GroupString; id: string }
}

export async function generateMetadata({
  params: { locale, group, id }
}: Props): Promise<Metadata> {
  const { basicInfo } = await getChannel(id)
  const tg = await getTranslations({ locale, namespace: 'Global' })
  const t = await getTranslations({
    locale,
    namespace: 'Page.group.channelsId.metadata'
  })
  const groupName = tg(`group.${group}`)

  return {
    title: `${t('title', { channel: basicInfo.title })} - ${tg('title')}`,
    description: `${t('description', {
      channel: basicInfo.title,
      group: groupName
    })}`
  }
}

export default async function GroupChannelsIdPage({
  params: { locale, group, id }
}: Props) {
  // Enable static rendering
  setRequestLocale(locale)
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
